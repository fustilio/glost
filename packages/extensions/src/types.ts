/**
 * GLOST Extension Types
 * 
 * Framework-agnostic extension interfaces for GLOST AST transformation.
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

/**
 * AST Transformation Extension
 * 
 * Framework-agnostic extension that can transform the GLOST tree structure
 * and enhance node metadata. Similar to remark plugins.
 * 
 * @example
 * ```typescript
 * const myExtension: GLOSTExtension = {
 *   id: "my-extension",
 *   name: "My Extension",
 *   enhanceMetadata: (node) => {
 *     return { customField: "value" };
 *   }
 * };
 * ```
 * 
 * @see {@link ExtensionContext} - Context passed to extension functions
 * @see {@link ExtensionResult} - Result of processing with extensions
 * 
 * @since 0.0.1
 */
export interface GLOSTExtension {
  /**
   * Unique identifier for the extension
   * 
   * Must be unique across all extensions. Used for dependency resolution
   * and extension lookup.
   * 
   * @example
   * ```typescript
   * id: "frequency"
   * ```
   */
  id: string;

  /**
   * Human-readable name for the extension
   * 
   * Used for display and documentation purposes.
   * 
   * @example
   * ```typescript
   * name: "Word Frequency"
   * ```
   */
  name: string;

  /**
   * Optional description of what the extension does
   * 
   * Provides additional context about the extension's purpose and behavior.
   * 
   * @example
   * ```typescript
   * description: "Processes and enhances word frequency metadata"
   * ```
   */
  description?: string;

  /**
   * Transform the entire GLOST tree
   * 
   * This is called once per document and can perform global transformations.
   * Return a new tree or modify the existing one.
   * 
   * @param tree - The GLOST root node to transform
   * @returns The transformed tree (or the same tree if modified in place)
   * 
   * @example
   * ```typescript
   * transform: (tree) => {
   *   return {
   *     ...tree,
   *     metadata: {
   *       ...tree.metadata,
   *       processed: true
   *     }
   *   };
   * }
   * ```
   */
  transform?: (tree: GLOSTRoot) => GLOSTRoot | Promise<GLOSTRoot>;

  /**
   * Visit and modify specific node types
   * 
   * Each visitor function receives a node and can return a modified node
   * or void (to modify in place).
   * 
   * @example
   * ```typescript
   * visit: {
   *   word: (node) => {
   *     // Modify node in place
   *     node.extras = { ...node.extras, processed: true };
   *   },
   *   sentence: (node) => {
   *     // Return modified node
   *     return { ...node, metadata: { ...node.metadata, count: 1 } };
   *   }
   * }
   * ```
   */
  visit?: {
    /**
     * Visit word nodes
     * 
     * Called for each word node in the document. Can return a modified node
     * or void to modify in place. Can be async for async operations.
     * 
     * @param node - The word node to visit
     * @returns Modified node or void (or Promise for async operations)
     */
    word?: (node: GLOSTWord) => GLOSTWord | void | Promise<GLOSTWord | void>;

    /**
     * Visit sentence nodes
     * 
     * Called for each sentence node in the document. Can return a modified node
     * or void to modify in place. Can be async for async operations.
     * 
     * @param node - The sentence node to visit
     * @returns Modified node or void (or Promise for async operations)
     */
    sentence?: (node: GLOSTSentence) => GLOSTSentence | void | Promise<GLOSTSentence | void>;

    /**
     * Visit paragraph nodes
     * 
     * Called for each paragraph node in the document. Can return a modified node
     * or void to modify in place. Can be async for async operations.
     * 
     * @param node - The paragraph node to visit
     * @returns Modified node or void (or Promise for async operations)
     */
    paragraph?: (node: GLOSTParagraph) => GLOSTParagraph | void | Promise<GLOSTParagraph | void>;
  };

  /**
   * Enhance metadata for word nodes
   * 
   * This function is called for each word node and should return
   * a partial GLOSTExtras object that will be merged into the node's extras.
   * Can be async for async operations like dictionary lookups.
   * 
   * @param node - The word node to enhance
   * @returns Partial GLOSTExtras object to merge, or void if no enhancement (or Promise for async operations)
   * 
   * @example
   * ```typescript
   * enhanceMetadata: (node) => {
   *   const frequency = node.extras?.metadata?.frequency;
   *   if (!frequency) return {};
   *   
   *   return {
   *     frequency: {
   *       level: frequency,
   *       display: getDisplay(frequency)
   *     }
   *   };
   * }
   * ```
   */
  enhanceMetadata?: (node: GLOSTWord) => Partial<GLOSTExtras> | void | Promise<Partial<GLOSTExtras> | void>;

  /**
   * Extension dependencies
   * 
   * List of extension IDs that must be processed before this one.
   * The processor will automatically resolve dependencies and process
   * extensions in the correct order.
   * 
   * @example
   * ```typescript
   * dependencies: ["frequency", "difficulty"]
   * ```
   * 
   * @throws {Error} If circular dependencies are detected
   */
  dependencies?: string[];

  /**
   * Extension options/configuration
   * 
   * Custom configuration object for the extension. Can contain any
   * extension-specific options.
   * 
   * @example
   * ```typescript
   * options: {
   *   normalize: true,
   *   customMapping: { "word1": "common" }
   * }
   * ```
   */
  options?: Record<string, unknown>;
}

/**
 * Extension processing context
 * 
 * Passed to extension functions to provide context about the processing state.
 * Currently not directly passed to extension functions, but available for
 * future enhancements.
 * 
 * @example
 * ```typescript
 * const context: ExtensionContext = {
 *   originalDocument: document,
 *   extensionIds: ["frequency", "difficulty"],
 *   options: { language: "th-TH" }
 * };
 * ```
 * 
 * @since 0.0.1
 */
export interface ExtensionContext {
  /**
   * The original document before processing
   * 
   * Useful for comparing before/after states or accessing original data.
   */
  originalDocument: GLOSTRoot;

  /**
   * List of all registered extension IDs
   * 
   * Contains all extension IDs that will be processed, in dependency order.
   */
  extensionIds: string[];

  /**
   * Current processing options
   * 
   * Options passed to the processor that may affect extension behavior.
   */
  options?: Record<string, unknown>;
}

/**
 * Extension processing result
 * 
 * Returned by `processGLOSTWithExtensions` and `processGLOSTWithExtensionIds`.
 * Contains the processed document and metadata about the processing.
 * 
 * @example
 * ```typescript
 * const result: ExtensionResult = {
 *   document: processedDocument,
 *   metadata: {
 *     appliedExtensions: ["frequency", "difficulty"],
 *     skippedExtensions: [],
 *     errors: []
 *   }
 * };
 * ```
 * 
 * @see {@link processGLOSTWithExtensions} - Main processing function
 * 
 * @since 0.0.1
 */
export interface ExtensionResult {
  /**
   * The processed document
   * 
   * The GLOST document after all extensions have been applied.
   * Extensions that failed are skipped, but the document is still
   * processed with successful extensions.
   */
  document: GLOSTRoot;

  /**
   * Processing metadata
   * 
   * Contains information about which extensions were applied,
   * which were skipped, and any errors that occurred.
   */
  metadata: {
    /**
     * Extensions that were applied
     * 
     * Array of extension IDs that were successfully processed.
     * 
     * @example
     * ```typescript
     * ["frequency", "difficulty", "gender"]
     * ```
     */
    appliedExtensions: string[];

    /**
     * Extensions that were skipped
     * 
     * Array of extension IDs that were skipped due to errors.
     * Check `errors` for details about why they were skipped.
     * 
     * @example
     * ```typescript
     * ["custom-extension"]
     * ```
     */
    skippedExtensions: string[];

    /**
     * Processing errors (if any)
     * 
     * Array of errors that occurred during processing, with the
     * extension ID and error details.
     * 
     * @example
     * ```typescript
     * [
     *   {
     *     extensionId: "custom-extension",
     *     error: new Error("Invalid data format")
     *   }
     * ]
     * ```
     */
    errors: Array<{ extensionId: string; error: Error }>;
  };
}

