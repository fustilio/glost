/**
 * Extension Processor
 *
 * Processes GLOST documents with registered extensions.
 *
 * @packageDocumentation
 */

import type {
  GLOSTWord,
  GLOSTSentence,
  GLOSTParagraph,
  GLOSTRoot,
  GLOSTExtras,
} from "glost";
import { visit } from "unist-util-visit";
import type {
  GLOSTExtension,
  ExtensionContext,
  ExtensionResult,
  ProcessorOptions,
} from "./types.js";
import { extensionRegistry } from "./registry.js";
import { deepMerge } from "./utils/deep-merge.js";
import { MissingNodeTypeError } from "./errors.js";

/**
 * Check if a document contains a specific node type
 *
 * @param document - The document to check
 * @param nodeType - The node type to look for
 * @returns true if the node type exists in the document
 *
 * @internal
 */
function hasNodeType(document: GLOSTRoot, nodeType: string): boolean {
  let found = false;
  visit(document, (node) => {
    if (node.type === nodeType) {
      found = true;
      return false; // Stop visiting
    }
  });
  return found;
}

/**
 * Validate that required node types exist in the document
 *
 * @param extension - The extension with requirements
 * @param document - The document to validate
 * @param context - Processing context
 * @param options - Processor options
 * @returns Array of errors (empty if validation passed)
 *
 * @internal
 */
function validateNodeRequirements(
  extension: GLOSTExtension,
  document: GLOSTRoot,
  options: ProcessorOptions,
): Error[] {
  const errors: Error[] = [];

  if (!extension.requires?.nodes) {
    return errors;
  }

  for (const nodeType of extension.requires.nodes) {
    if (!hasNodeType(document, nodeType)) {
      // Try to find which extension provides this node type
      const provider = findProviderForNode(nodeType);

      const error = new MissingNodeTypeError(
        extension.id,
        nodeType,
        provider?.id,
      );

      if (options.lenient) {
        console.warn(`[glost-extensions] ${error.message}`);
      } else {
        errors.push(error);
      }
    }
  }

  return errors;
}

/**
 * Find an extension that provides a specific node type
 *
 * @param nodeType - The node type to find a provider for
 * @returns The extension that provides this node type, or undefined
 *
 * @internal
 */
function findProviderForNode(nodeType: string): GLOSTExtension | undefined {
  const allExtensions = extensionRegistry.getAll();
  return allExtensions.find((ext) => ext.provides?.nodes?.includes(nodeType));
}

/**
 * Process an GLOST document with extensions
 *
 * Applies all specified extensions in dependency order, transforming
 * the document tree and enhancing node metadata. Extensions are processed
 * in three phases:
 * 1. Transform phase: Global tree transformations
 * 2. Visit phase: Node-specific modifications
 * 3. Enhance phase: Metadata enhancement
 *
 * Extensions that fail are skipped, but processing continues with remaining
 * extensions. Errors are captured in the result metadata.
 *
 * @param document - The GLOST document to process
 * @param extensions - Array of extensions to apply
 * @param options - Optional processing options
 * @returns Result containing processed document and metadata
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import { ReadingScoreExtension, LearnerHintsExtension } from "glost-extensions/extensions";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   ReadingScoreExtension,
 *   LearnerHintsExtension,
 * ]);
 *
 * console.log(result.document); // Processed document
 * console.log(result.metadata.appliedExtensions); // ["frequency", "difficulty"]
 * ```
 *
 * @example
 * ```typescript
 * // With lenient mode - warn instead of throwing on errors
 * const result = processGLOSTWithExtensions(document, extensions, {
 *   lenient: true,
 *   conflictStrategy: "warn",
 * });
 * ```
 *
 * @throws {Error} If circular dependencies are detected in extensions
 * @throws {MissingNodeTypeError} If required node types are missing (unless lenient)
 * @throws {ExtensionConflictError} If metadata conflicts occur (unless conflictStrategy !== "error")
 *
 * @see {@link processGLOSTWithExtensionIds} - Process with extension IDs
 * @see {@link ExtensionResult} - Result type
 *
 * @since 0.0.1
 */
export function processGLOSTWithExtensions(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options: ProcessorOptions = {},
): ExtensionResult {
  // Register extensions temporarily if not already registered
  const tempExtensions: string[] = [];
  for (const ext of extensions) {
    if (!extensionRegistry.has(ext.id)) {
      extensionRegistry.register(ext);
      tempExtensions.push(ext.id);
    }
  }

  try {
    // Resolve dependencies
    const extensionIds = extensions.map((ext) => ext.id);
    const orderedIds = extensionRegistry.resolveDependencies(extensionIds);

    // Get extensions in order
    const orderedExtensions = orderedIds
      .map((id) => extensionRegistry.get(id))
      .filter((ext): ext is GLOSTExtension => ext !== undefined);

    // Create mutable context that tracks applied extensions
    const context: ExtensionContext = {
      originalDocument: document,
      extensionIds: orderedIds,
      appliedExtensions: [],
      options,
    };

    let processedDocument = document;
    const appliedExtensions: string[] = [];
    const skippedExtensions: string[] = [];
    const errors: Array<{ extensionId: string; error: Error }> = [];

    // Track which extension wrote which fields for conflict detection
    const fieldOwnership: Map<string, string> = new Map();

    // Apply extensions in order
    for (const extension of orderedExtensions) {
      try {
        // Validate node requirements before running extension
        const validationErrors = validateNodeRequirements(
          extension,
          processedDocument,
          options,
        );

        if (validationErrors.length > 0) {
          for (const error of validationErrors) {
            errors.push({ extensionId: extension.id, error });
          }
          skippedExtensions.push(extension.id);

          // In strict mode, throw the first validation error
          if (!options.lenient && validationErrors[0]) {
            throw validationErrors[0];
          }
          continue;
        }

        // Apply transform if present (sync transforms only - use processGLOSTWithExtensionsAsync for async)
        if (extension.transform) {
          const result = extension.transform(processedDocument, context);
          // Type assertion: sync function expects sync transforms
          processedDocument = result as GLOSTRoot;
        }

        // Apply visitors
        if (extension.visit) {
          processedDocument = applyVisitors(
            processedDocument,
            extension.visit,
            context,
          );
        }

        // Apply metadata enhancement with deep merge
        if (extension.enhanceMetadata) {
          processedDocument = enhanceMetadata(
            processedDocument,
            extension.enhanceMetadata as (node: GLOSTWord, context?: ExtensionContext) => Partial<GLOSTExtras> | void,
            extension.id,
            fieldOwnership,
            options,
            context,
          );
        }

        appliedExtensions.push(extension.id);
        context.appliedExtensions.push(extension.id);
      } catch (error) {
        errors.push({
          extensionId: extension.id,
          error: error instanceof Error ? error : new Error(String(error)),
        });
        skippedExtensions.push(extension.id);

        // In strict mode, re-throw the error to stop processing
        if (!options.lenient) {
          throw error;
        }
      }
    }

    return {
      document: processedDocument,
      metadata: {
        appliedExtensions,
        skippedExtensions,
        errors,
      },
    };
  } finally {
    // Clean up temporarily registered extensions
    for (const id of tempExtensions) {
      extensionRegistry.unregister(id);
    }
  }
}

/**
 * Apply visitor functions to the document tree
 *
 * Visits nodes of specified types and applies visitor functions.
 *
 * @param document - The document to process
 * @param visitors - Visitor functions for different node types
 * @param context - Extension context
 * @returns The processed document
 *
 * @internal
 */
function applyVisitors(
  document: GLOSTRoot,
  visitors: NonNullable<GLOSTExtension["visit"]>,
  context: ExtensionContext,
): GLOSTRoot {
  let processed = document;

  // Visit word nodes
  if (visitors.word) {
    visit(processed, "WordNode", (node) => {
      if (node.type === "WordNode") {
        const result = visitors.word!(node, context);
        if (result) {
          // Replace node with result
          Object.assign(node, result);
        }
      }
    });
  }

  // Visit sentence nodes
  if (visitors.sentence) {
    visit(processed, "SentenceNode", (node) => {
      if (node.type === "SentenceNode") {
        const result = visitors.sentence!(node, context);
        if (result) {
          Object.assign(node, result);
        }
      }
    });
  }

  // Visit paragraph nodes
  if (visitors.paragraph) {
    visit(processed, "ParagraphNode", (node) => {
      if (node.type === "ParagraphNode") {
        const result = visitors.paragraph!(node, context);
        if (result) {
          Object.assign(node, result);
        }
      }
    });
  }

  return processed;
}

/**
 * Enhance metadata for all word nodes
 *
 * Applies metadata enhancement function to all word nodes in the document.
 * Uses deep merge with conflict detection.
 *
 * @param document - The document to process
 * @param enhancer - Function that enhances metadata for word nodes
 * @param extensionId - ID of the current extension (for conflict tracking)
 * @param fieldOwnership - Map tracking which extension owns which fields
 * @param options - Processor options
 * @param context - Extension context
 * @returns The processed document
 *
 * @internal
 */
function enhanceMetadata(
  document: GLOSTRoot,
  enhancer: (
    node: GLOSTWord,
    context?: ExtensionContext,
  ) => Partial<GLOSTExtras> | void,
  extensionId: string,
  fieldOwnership: Map<string, string>,
  options: ProcessorOptions,
  context: ExtensionContext,
): GLOSTRoot {
  visit(document, "WordNode", (node) => {
    if (node.type === "WordNode") {
      const enhancement = enhancer(node, context);
      if (enhancement) {
        // Use deep merge with conflict detection
        node.extras = deepMerge(node.extras ?? {}, enhancement, {
          arrayStrategy: "concat",
          conflictStrategy: options.conflictStrategy ?? "error",
          existingExtensionId: getOwnerForFields(
            node.extras ?? {},
            enhancement,
            fieldOwnership,
          ),
          incomingExtensionId: extensionId,
        }) as GLOSTExtras;

        // Track ownership of new fields
        trackFieldOwnership(enhancement, extensionId, fieldOwnership);
      }
    }
  });

  return document;
}

/**
 * Get the owner extension for conflicting fields
 *
 * Returns undefined if the field comes from the original document (not an extension).
 * This allows extensions to transform/enrich original data without triggering conflicts.
 * Only returns an extension ID if another extension wrote to this field.
 *
 * @internal
 */
function getOwnerForFields(
  existing: Record<string, unknown>,
  incoming: Record<string, unknown>,
  fieldOwnership: Map<string, string>,
): string | undefined {
  for (const key of Object.keys(incoming)) {
    if (key in existing && fieldOwnership.has(key)) {
      return fieldOwnership.get(key)!;
    }
  }
  // Field comes from original document, not another extension
  return undefined;
}

/**
 * Track which extension owns which fields
 *
 * @internal
 */
function trackFieldOwnership(
  enhancement: Record<string, unknown>,
  extensionId: string,
  fieldOwnership: Map<string, string>,
  prefix = "",
): void {
  for (const [key, value] of Object.entries(enhancement)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    fieldOwnership.set(fullKey, extensionId);

    // Track nested objects too
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      trackFieldOwnership(
        value as Record<string, unknown>,
        extensionId,
        fieldOwnership,
        fullKey,
      );
    }
  }
}

/**
 * Process document with registered extensions by ID
 *
 * Processes a document using extensions that have been previously registered
 * with the extension registry. Extensions are looked up by ID.
 *
 * @param document - The GLOST document to process
 * @param extensionIds - Array of extension IDs to apply
 * @param options - Optional processing options
 * @returns Result containing processed document and metadata
 *
 * @throws {Error} If any extension ID is not found in the registry
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensionIds, registerExtension } from "glost-extensions/processor";
 * import { ReadingScoreExtension } from "glost-extensions/extensions";
 *
 * // Register extension first
 * registerExtension(ReadingScoreExtension);
 *
 * // Process by ID
 * const result = processGLOSTWithExtensionIds(document, ["reading-score"]);
 * ```
 *
 * @see {@link processGLOSTWithExtensions} - Process with extension objects
 * @see {@link registerExtension} - Register extensions
 *
 * @since 0.0.1
 */
export function processGLOSTWithExtensionIds(
  document: GLOSTRoot,
  extensionIds: string[],
  options: ProcessorOptions = {},
): ExtensionResult {
  const extensions = extensionIds
    .map((id) => extensionRegistry.get(id))
    .filter((ext): ext is GLOSTExtension => ext !== undefined);

  if (extensions.length !== extensionIds.length) {
    const missing = extensionIds.filter(
      (id) => !extensions.some((ext) => ext.id === id),
    );
    throw new Error(`Extensions not found: ${missing.join(", ")}`);
  }

  return processGLOSTWithExtensions(document, extensions, options);
}

/**
 * Process an GLOST document with extensions (async version)
 *
 * Async version of `processGLOSTWithExtensions` that supports async extensions.
 * Extensions can have async transform, visit, and enhanceMetadata functions.
 *
 * @param document - The GLOST document to process
 * @param extensions - Array of extensions to apply
 * @param options - Optional processing options
 * @returns Promise resolving to result containing processed document and metadata
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensionsAsync } from "glost-extensions/processor";
 * import { TranscriptionExtension, TranslationExtension } from "glost-extensions/extensions";
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [
 *   TranscriptionExtension,
 *   TranslationExtension,
 * ]);
 * ```
 *
 * @since 0.0.1
 */
export async function processGLOSTWithExtensionsAsync(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options: ProcessorOptions = {},
): Promise<ExtensionResult> {
  // Register extensions temporarily if not already registered
  const tempExtensions: string[] = [];
  for (const ext of extensions) {
    if (!extensionRegistry.has(ext.id)) {
      extensionRegistry.register(ext);
      tempExtensions.push(ext.id);
    }
  }

  try {
    // Resolve dependencies
    const extensionIds = extensions.map((ext) => ext.id);
    const orderedIds = extensionRegistry.resolveDependencies(extensionIds);

    // Get extensions in order
    const orderedExtensions = orderedIds
      .map((id) => extensionRegistry.get(id))
      .filter((ext): ext is GLOSTExtension => ext !== undefined);

    const context: ExtensionContext = {
      originalDocument: document,
      extensionIds: orderedIds,
      appliedExtensions: [],
      options,
    };

    let processedDocument = document;
    const appliedExtensions: string[] = [];
    const skippedExtensions: string[] = [];
    const errors: Array<{ extensionId: string; error: Error }> = [];

    // Track which extension wrote which fields for conflict detection
    const fieldOwnership: Map<string, string> = new Map();

    // Apply extensions in order
    for (const extension of orderedExtensions) {
      try {
        // Validate node requirements before running extension
        const validationErrors = validateNodeRequirements(
          extension,
          processedDocument,
          options,
        );

        if (validationErrors.length > 0) {
          for (const error of validationErrors) {
            errors.push({ extensionId: extension.id, error });
          }
          skippedExtensions.push(extension.id);

          // In strict mode, throw the first validation error
          if (!options.lenient && validationErrors[0]) {
            throw validationErrors[0];
          }
          continue;
        }

        // Apply transform if present (supports async)
        if (extension.transform) {
          processedDocument = await extension.transform(
            processedDocument,
            context,
          );
        }

        // Apply visitors (supports async)
        if (extension.visit) {
          processedDocument = await applyVisitorsAsync(
            processedDocument,
            extension.visit,
            context,
          );
        }

        // Apply metadata enhancement (supports async)
        if (extension.enhanceMetadata) {
          processedDocument = await enhanceMetadataAsync(
            processedDocument,
            extension.enhanceMetadata,
            extension.id,
            fieldOwnership,
            options,
            context,
          );
        }

        appliedExtensions.push(extension.id);
        context.appliedExtensions.push(extension.id);
      } catch (error) {
        errors.push({
          extensionId: extension.id,
          error: error instanceof Error ? error : new Error(String(error)),
        });
        skippedExtensions.push(extension.id);

        // In strict mode, re-throw the error to stop processing
        if (!options.lenient) {
          throw error;
        }
      }
    }

    return {
      document: processedDocument,
      metadata: {
        appliedExtensions,
        skippedExtensions,
        errors,
      },
    };
  } finally {
    // Clean up temporarily registered extensions
    for (const id of tempExtensions) {
      extensionRegistry.unregister(id);
    }
  }
}

/**
 * Process GLOST document with extensions (simplified API)
 * 
 * Processes a document with the given extensions and returns the processed document directly.
 * This is a convenience wrapper around processGLOSTWithExtensionsAsync that extracts
 * the document from the result.
 * 
 * Use this function when you only need the processed document and don't need
 * detailed metadata about the processing. For metadata access, use processGLOSTWithMeta()
 * or processGLOSTWithExtensionsAsync() instead.
 * 
 * @param document - The GLOST document to process
 * @param extensions - Array of extensions to apply
 * @param options - Optional processing options
 * @returns Promise resolving to the processed document
 * 
 * @example
 * ```typescript
 * import { processGLOST } from "glost-extensions";
 * import { createTranscriptionExtension } from "glost-transcription";
 * 
 * const extension = createTranscriptionExtension({ provider, targetLanguage: "th" });
 * const processedDoc = await processGLOST(document, [extension]);
 * 
 * // Access words directly without .document
 * const words = getAllWords(processedDoc);
 * ```
 */
export async function processGLOST(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options?: ProcessorOptions,
): Promise<GLOSTRoot> {
  const result = await processGLOSTWithExtensionsAsync(document, extensions, options);
  return result.document;
}

/**
 * Process GLOST document with extensions and return detailed metadata
 * 
 * Alias for processGLOSTWithExtensionsAsync with a clearer name.
 * Use this when you need access to processing metadata (applied extensions,
 * errors, skipped extensions, etc.).
 * 
 * @param document - The GLOST document to process
 * @param extensions - Array of extensions to apply
 * @param options - Optional processing options
 * @returns Promise resolving to ExtensionResult with document and metadata
 * 
 * @example
 * ```typescript
 * import { processGLOSTWithMeta } from "glost-extensions";
 * 
 * const result = await processGLOSTWithMeta(document, extensions);
 * 
 * console.log("Applied:", result.metadata.appliedExtensions);
 * console.log("Errors:", result.metadata.errors);
 * 
 * // Access the processed document
 * const processedDoc = result.document;
 * ```
 */
export async function processGLOSTWithMeta(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options?: ProcessorOptions,
): Promise<ExtensionResult> {
  return processGLOSTWithExtensionsAsync(document, extensions, options);
}

/**
 * Apply visitor functions to the document tree (async version)
 *
 * Visits nodes of specified types and applies visitor functions.
 * Supports async visitor functions.
 *
 * @param document - The document to process
 * @param visitors - Visitor functions for different node types
 * @param context - Extension context
 * @returns Promise resolving to the processed document
 *
 * @internal
 */
async function applyVisitorsAsync(
  document: GLOSTRoot,
  visitors: NonNullable<GLOSTExtension["visit"]>,
  context: ExtensionContext,
): Promise<GLOSTRoot> {
  let processed = document;

  // Visit word nodes (supports async)
  if (visitors.word) {
    const wordNodes: GLOSTWord[] = [];
    visit(processed, "WordNode", (node) => {
      if (node.type === "WordNode") {
        wordNodes.push(node);
      }
    });

    // Process all word nodes in parallel
    await Promise.all(
      wordNodes.map(async (node) => {
        const result = await visitors.word!(node, context);
        if (result) {
          // Replace node with result
          Object.assign(node, result);
        }
      }),
    );
  }

  // Visit sentence nodes (supports async)
  if (visitors.sentence) {
    const sentenceNodes: GLOSTSentence[] = [];
    visit(processed, "SentenceNode", (node) => {
      if (node.type === "SentenceNode") {
        sentenceNodes.push(node);
      }
    });

    await Promise.all(
      sentenceNodes.map(async (node) => {
        const result = await visitors.sentence!(node, context);
        if (result) {
          Object.assign(node, result);
        }
      }),
    );
  }

  // Visit paragraph nodes (supports async)
  if (visitors.paragraph) {
    const paragraphNodes: GLOSTParagraph[] = [];
    visit(processed, "ParagraphNode", (node) => {
      if (node.type === "ParagraphNode") {
        paragraphNodes.push(node);
      }
    });

    await Promise.all(
      paragraphNodes.map(async (node) => {
        const result = await visitors.paragraph!(node, context);
        if (result) {
          Object.assign(node, result);
        }
      }),
    );
  }

  return processed;
}

/**
 * Enhance metadata for all word nodes (async version)
 *
 * Applies metadata enhancement function to all word nodes in the document.
 * Supports async enhancement functions. Uses deep merge with conflict detection.
 *
 * @param document - The document to process
 * @param enhancer - Function that enhances metadata for word nodes
 * @param extensionId - ID of the current extension (for conflict tracking)
 * @param fieldOwnership - Map tracking which extension owns which fields
 * @param options - Processor options
 * @param context - Extension context
 * @returns Promise resolving to the processed document
 *
 * @internal
 */
async function enhanceMetadataAsync(
  document: GLOSTRoot,
  enhancer: (
    node: GLOSTWord,
    context?: ExtensionContext,
  ) =>
    | Partial<GLOSTExtras>
    | void
    | Promise<Partial<GLOSTExtras> | void>,
  extensionId: string,
  fieldOwnership: Map<string, string>,
  options: ProcessorOptions,
  context: ExtensionContext,
): Promise<GLOSTRoot> {
  const wordNodes: GLOSTWord[] = [];
  visit(document, "WordNode", (node) => {
    if (node.type === "WordNode") {
      wordNodes.push(node);
    }
  });

  // Process all word nodes in parallel
  await Promise.all(
    wordNodes.map(async (node) => {
      const enhancement = await enhancer(node, context);
      if (enhancement) {
        // Use deep merge with conflict detection
        node.extras = deepMerge(node.extras ?? {}, enhancement, {
          arrayStrategy: "concat",
          conflictStrategy: options.conflictStrategy ?? "error",
          existingExtensionId: getOwnerForFields(
            node.extras ?? {},
            enhancement,
            fieldOwnership,
          ),
          incomingExtensionId: extensionId,
        }) as GLOSTExtras;

        // Track ownership of new fields
        trackFieldOwnership(enhancement, extensionId, fieldOwnership);
      }
    }),
  );

  return document;
}
