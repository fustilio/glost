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
} from "@glost/core";
import { visit } from "unist-util-visit";
import type {
  GLOSTExtension,
  ExtensionContext,
  ExtensionResult,
} from "./types";
import { extensionRegistry } from "./registry";

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
 * import { processGLOSTWithExtensions } from "@glost/core-extensions/processor";
 * import { FrequencyExtension, DifficultyExtension } from "@glost/core-extensions/extensions";
 * 
 * const result = processGLOSTWithExtensions(document, [
 *   FrequencyExtension,
 *   DifficultyExtension,
 * ]);
 * 
 * console.log(result.document); // Processed document
 * console.log(result.metadata.appliedExtensions); // ["frequency", "difficulty"]
 * ```
 * 
 * @throws {Error} If circular dependencies are detected in extensions
 * 
 * @see {@link processGLOSTWithExtensionIds} - Process with extension IDs
 * @see {@link ExtensionResult} - Result type
 * 
 * @since 0.0.1
 */
export function processGLOSTWithExtensions(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options?: Record<string, unknown>,
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

    const context: ExtensionContext = {
      originalDocument: document,
      extensionIds: orderedIds,
      options,
    };

    let processedDocument = document;
    const appliedExtensions: string[] = [];
    const skippedExtensions: string[] = [];
    const errors: Array<{ extensionId: string; error: Error }> = [];

    // Apply extensions in order
    for (const extension of orderedExtensions) {
      try {
        // Apply transform if present (sync transforms only - use processGLOSTWithExtensionsAsync for async)
        if (extension.transform) {
          const result = extension.transform(processedDocument);
          // Type assertion: sync function expects sync transforms
          processedDocument = result as GLOSTRoot;
        }

        // Apply visitors
        if (extension.visit) {
          processedDocument = applyVisitors(processedDocument, extension.visit);
        }

        // Apply metadata enhancement
        if (extension.enhanceMetadata) {
          processedDocument = enhanceMetadata(
            processedDocument,
            extension.enhanceMetadata,
          );
        }

        appliedExtensions.push(extension.id);
      } catch (error) {
        errors.push({
          extensionId: extension.id,
          error: error instanceof Error ? error : new Error(String(error)),
        });
        skippedExtensions.push(extension.id);
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
 * @returns The processed document
 * 
 * @internal
 */
function applyVisitors(
  document: GLOSTRoot,
  visitors: NonNullable<GLOSTExtension["visit"]>,
): GLOSTRoot {
  let processed = document;

  // Visit word nodes
  if (visitors.word) {
    visit(processed, "WordNode", (node) => {
      if (node.type === "WordNode") {
        const result = visitors.word!(node);
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
        const result = visitors.sentence!(node);
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
        const result = visitors.paragraph!(node);
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
 * 
 * @param document - The document to process
 * @param enhancer - Function that enhances metadata for word nodes
 * @returns The processed document
 * 
 * @internal
 */
function enhanceMetadata(
  document: GLOSTRoot,
  enhancer: (node: GLOSTWord) => Partial<import("@glost/core").GLOSTExtras> | void,
): GLOSTRoot {
  visit(document, "WordNode", (node) => {
    if (node.type === "WordNode") {
      const enhancement = enhancer(node);
      if (enhancement) {
        node.extras = {
          ...node.extras,
          ...enhancement,
        };
      }
    }
  });

  return document;
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
 * import { processGLOSTWithExtensionIds, registerExtension } from "@glost/core-extensions/processor";
 * import { FrequencyExtension } from "@glost/core-extensions/extensions";
 * 
 * // Register extension first
 * registerExtension(FrequencyExtension);
 * 
 * // Process by ID
 * const result = processGLOSTWithExtensionIds(document, ["frequency"]);
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
  options?: Record<string, unknown>,
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
 * import { processGLOSTWithExtensionsAsync } from "@glost/core-extensions/processor";
 * import { TranscriptionExtension, TranslationExtension } from "@glost/core-extensions/extensions";
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
  options?: Record<string, unknown>,
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
      options,
    };

    let processedDocument = document;
    const appliedExtensions: string[] = [];
    const skippedExtensions: string[] = [];
    const errors: Array<{ extensionId: string; error: Error }> = [];

    // Apply extensions in order
    for (const extension of orderedExtensions) {
      try {
        // Apply transform if present (supports async)
        if (extension.transform) {
          processedDocument = await extension.transform(processedDocument);
        }

        // Apply visitors (supports async)
        if (extension.visit) {
          processedDocument = await applyVisitorsAsync(processedDocument, extension.visit);
        }

        // Apply metadata enhancement (supports async)
        if (extension.enhanceMetadata) {
          processedDocument = await enhanceMetadataAsync(
            processedDocument,
            extension.enhanceMetadata,
          );
        }

        appliedExtensions.push(extension.id);
      } catch (error) {
        errors.push({
          extensionId: extension.id,
          error: error instanceof Error ? error : new Error(String(error)),
        });
        skippedExtensions.push(extension.id);
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
 * Apply visitor functions to the document tree (async version)
 * 
 * Visits nodes of specified types and applies visitor functions.
 * Supports async visitor functions.
 * 
 * @param document - The document to process
 * @param visitors - Visitor functions for different node types
 * @returns Promise resolving to the processed document
 * 
 * @internal
 */
async function applyVisitorsAsync(
  document: GLOSTRoot,
  visitors: NonNullable<GLOSTExtension["visit"]>,
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
        const result = await visitors.word!(node);
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
        const result = await visitors.sentence!(node);
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
        const result = await visitors.paragraph!(node);
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
 * Supports async enhancement functions.
 * 
 * @param document - The document to process
 * @param enhancer - Function that enhances metadata for word nodes
 * @returns Promise resolving to the processed document
 * 
 * @internal
 */
async function enhanceMetadataAsync(
  document: GLOSTRoot,
  enhancer: (node: GLOSTWord) => Partial<import("@glost/core").GLOSTExtras> | void | Promise<Partial<import("@glost/core").GLOSTExtras> | void>,
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
      const enhancement = await enhancer(node);
      if (enhancement) {
        node.extras = {
          ...node.extras,
          ...enhancement,
        };
      }
    }),
  );

  return document;
}

