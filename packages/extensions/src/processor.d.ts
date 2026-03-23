/**
 * Extension Processor
 *
 * Processes GLOST documents with registered extensions.
 *
 * @packageDocumentation
 */
import type { GLOSTSentence, GLOSTRoot } from "glost-core";
import type { GLOSTExtension, ExtensionResult, ProcessorOptions } from "./types.js";
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
export declare function processGLOSTWithExtensions(document: GLOSTRoot, extensions: GLOSTExtension[], options?: ProcessorOptions): ExtensionResult;
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
export declare function processGLOSTWithExtensionIds(document: GLOSTRoot, extensionIds: string[], options?: ProcessorOptions): ExtensionResult;
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
export declare function processGLOSTWithExtensionsAsync(document: GLOSTRoot, extensions: GLOSTExtension[], options?: ProcessorOptions): Promise<ExtensionResult>;
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
export declare function processGLOST(document: GLOSTRoot, extensions: GLOSTExtension[], options?: ProcessorOptions): Promise<GLOSTRoot>;
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
export declare function processGLOSTWithMeta(document: GLOSTRoot, extensions: GLOSTExtension[], options?: ProcessorOptions): Promise<ExtensionResult>;
/**
 * Process a chunk of sentences with chunk-compatible extensions
 *
 * Used by the streaming processor to apply `visit` and
 * `enhanceMetadata` hooks from extensions whose `streamingSupport`
 * is `'chunk'`. The `transform` hook is intentionally skipped here
 * because document-level transforms must run on the full document
 * before streaming begins.
 *
 * Sentences are wrapped in a temporary GLOSTRoot so that the
 * existing visitor machinery (which walks from a root node) can be
 * reused without modification.
 *
 * @param sentences - Sentences in the current chunk
 * @param extensions - Extensions to apply (only chunk-compatible
 *   ones should be passed; others are silently skipped)
 * @param options - Optional processing options
 * @returns Promise resolving to the processed sentences
 *
 * @since 0.7.0
 */
export declare function processGLOSTChunkAsync(sentences: GLOSTSentence[], extensions: GLOSTExtension[], options?: ProcessorOptions): Promise<GLOSTSentence[]>;
//# sourceMappingURL=processor.d.ts.map