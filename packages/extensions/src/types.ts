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
   * @param context - Extension context with pipeline state
   * @returns The transformed tree (or the same tree if modified in place)
   *
   * @example
   * ```typescript
   * transform: (tree, context) => {
   *   // Check if a dependency ran
   *   if (!context?.appliedExtensions.includes("clause-segmenter")) {
   *     throw new Error("clause-segmenter must run first");
   *   }
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
  transform?: (
    tree: GLOSTRoot,
    context?: ExtensionContext,
  ) => GLOSTRoot | Promise<GLOSTRoot>;

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
     * @param context - Extension context with pipeline state
     * @returns Modified node or void (or Promise for async operations)
     */
    word?: (
      node: GLOSTWord,
      context?: ExtensionContext,
    ) => GLOSTWord | void | Promise<GLOSTWord | void>;

    /**
     * Visit sentence nodes
     *
     * Called for each sentence node in the document. Can return a modified node
     * or void to modify in place. Can be async for async operations.
     *
     * @param node - The sentence node to visit
     * @param context - Extension context with pipeline state
     * @returns Modified node or void (or Promise for async operations)
     */
    sentence?: (
      node: GLOSTSentence,
      context?: ExtensionContext,
    ) => GLOSTSentence | void | Promise<GLOSTSentence | void>;

    /**
     * Visit paragraph nodes
     *
     * Called for each paragraph node in the document. Can return a modified node
     * or void to modify in place. Can be async for async operations.
     *
     * @param node - The paragraph node to visit
     * @param context - Extension context with pipeline state
     * @returns Modified node or void (or Promise for async operations)
     */
    paragraph?: (
      node: GLOSTParagraph,
      context?: ExtensionContext,
    ) => GLOSTParagraph | void | Promise<GLOSTParagraph | void>;
  };

  /**
   * Enhance metadata for word nodes
   *
   * This function is called for each word node and should return
   * a partial GLOSTExtras object that will be merged into the node's extras.
   * Can be async for async operations like dictionary lookups.
   *
   * @param node - The word node to enhance
   * @param context - Extension context with pipeline state
   * @returns Partial GLOSTExtras object to merge, or void if no enhancement (or Promise for async operations)
   *
   * @example
   * ```typescript
   * enhanceMetadata: (node, context) => {
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
  enhanceMetadata?: (
    node: GLOSTWord,
    context?: ExtensionContext,
  ) => Partial<GLOSTExtras> | void | Promise<Partial<GLOSTExtras> | void>;

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
   * Declares what this extension requires from its dependencies
   *
   * Used for validation - the processor will check that required fields
   * exist before running this extension. If validation fails, an
   * ExtensionDependencyError is thrown with a clear message.
   *
   * @example
   * ```typescript
   * requires: {
   *   extras: ["frequency", "difficulty"],  // Required fields on node.extras
   *   metadata: ["partOfSpeech"],            // Required fields on node.extras.metadata
   *   nodes: ["ClauseNode"],                 // Required node types in document
   * }
   * ```
   *
   * @since 0.0.2
   */
  requires?: {
    /** Required fields on node.extras (e.g., ["frequency", "difficulty"]) */
    extras?: string[];
    /** Required fields on node.extras.metadata (e.g., ["partOfSpeech"]) */
    metadata?: string[];
    /** Required node types in document (e.g., ["ClauseNode"]) */
    nodes?: string[];
  };

  /**
   * Declares what this extension provides
   *
   * Used for documentation and validation - helps other extensions
   * understand what fields will be available after this extension runs.
   *
   * @example
   * ```typescript
   * provides: {
   *   extras: ["readingScore"],
   *   metadata: ["hints"],
   *   nodes: ["ClauseNode"],
   * }
   * ```
   *
   * @since 0.0.2
   */
  provides?: {
    /** Fields this extension adds to node.extras */
    extras?: string[];
    /** Fields this extension adds to node.extras.metadata */
    metadata?: string[];
    /** Node types this extension creates */
    nodes?: string[];
  };

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
 * Processor options for controlling extension behavior
 *
 * @example
 * ```typescript
 * const result = processGLOSTWithExtensions(doc, extensions, {
 *   lenient: true,          // Warn and skip instead of throwing
 *   conflictStrategy: "warn" // Log conflicts but continue
 * });
 * ```
 *
 * @since 0.0.2
 */
export interface ProcessorOptions {
  /**
   * If true, warn and skip on dependency errors instead of throwing.
   * Default: false (strict mode - throws on errors)
   */
  lenient?: boolean;

  /**
   * How to handle metadata field conflicts when multiple extensions
   * write to the same field.
   *
   * - "error": Stop pipeline with clear error message (default, conservative)
   * - "warn": Log warning but continue with last-write-wins
   * - "lastWins": Silently use last-write-wins
   */
  conflictStrategy?: "error" | "warn" | "lastWins";
}

/**
 * Extension processing context
 *
 * Passed to extension functions to provide context about the processing state.
 * Extensions can use this to introspect what extensions have already run.
 *
 * @example
 * ```typescript
 * const context: ExtensionContext = {
 *   originalDocument: document,
 *   extensionIds: ["frequency", "difficulty"],
 *   appliedExtensions: ["frequency"],
 *   options: { lenient: true }
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
   * List of extensions that have been successfully applied so far
   *
   * Useful for checking if a dependency has run before this extension.
   *
   * @since 0.0.2
   */
  appliedExtensions: string[];

  /**
   * Current processing options
   *
   * Options passed to the processor that may affect extension behavior.
   */
  options?: ProcessorOptions;
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

