/**
 * glost-plugins
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
 * import { processGLOSTWithExtensions } from "glost-plugins";
 * import { ReadingScoreExtension, LearnerHintsExtension } from "glost-plugins/extensions";
 * 
 * const result = processGLOSTWithExtensions(document, [
 *   ReadingScoreExtension,
 *   LearnerHintsExtension,
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
} from "./types.js";

// Export errors
export {
  ExtensionDependencyError,
  ExtensionConflictError,
  MissingNodeTypeError,
} from "./errors.js";

// Export utilities
export { deepMerge, findConflicts, type DeepMergeOptions } from "./utils/index.js";

// Export registry
export {
  extensionRegistry,
  registerExtension,
  registerExtensions,
  getExtension,
  getAllExtensions,
} from "./registry.js";

// Export processor
export {
  processGLOSTWithExtensions,
  processGLOSTWithExtensionsAsync,
  processGLOSTWithExtensionIds,
  processGLOST,
  processGLOSTWithMeta,
} from "./processor.js";

// Export built-in extensions
export * from "./extensions/index.js";
