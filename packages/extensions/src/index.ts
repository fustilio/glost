/**
 * glost-extensions
 * 
 * Framework-agnostic AST extensions for GLOST manipulation and enhancement.
 * 
 * This package provides a plugin architecture similar to remark, enabling
 * framework-agnostic AST transformations for GLOST documents.
 * 
 * @packageDocumentation
 * 
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions";
 * import { FrequencyExtension, DifficultyExtension } from "glost-extensions/extensions";
 * 
 * const result = processGLOSTWithExtensions(document, [
 *   FrequencyExtension,
 *   DifficultyExtension,
 * ]);
 * ```
 * 
 * @see {@link https://github.com/your-org/lalia-prism/tree/main/docs/polyglot-tools/services/mtst-extensions | Documentation}
 * 
 * @since 0.0.1
 */

// Export types
export type {
  GLOSTExtension,
  ExtensionContext,
  ExtensionResult,
  ProcessorOptions,
} from "./types";

// Export errors
export {
  ExtensionDependencyError,
  ExtensionConflictError,
  MissingNodeTypeError,
} from "./errors";

// Export utilities
export { deepMerge, findConflicts, type DeepMergeOptions } from "./utils";

// Export registry
export {
  extensionRegistry,
  registerExtension,
  registerExtensions,
  getExtension,
  getAllExtensions,
} from "./registry";

// Export processor
export {
  processGLOSTWithExtensions,
  processGLOSTWithExtensionsAsync,
  processGLOSTWithExtensionIds,
} from "./processor";

// Export built-in extensions
export * from "./extensions";
