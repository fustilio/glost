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
 * import { ReadingScoreExtension, LearnerHintsExtension } from "glost-extensions/extensions";
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
export type { GLOSTExtension, ExtensionContext, ExtensionResult, ProcessorOptions, } from "./types.js";
export { ExtensionDependencyError, ExtensionConflictError, MissingNodeTypeError, } from "./errors.js";
export { deepMerge, findConflicts, type DeepMergeOptions } from "./utils/index.js";
export { extensionRegistry, registerExtension, registerExtensions, getExtension, getAllExtensions, } from "./registry.js";
export { processGLOSTWithExtensions, processGLOSTWithExtensionsAsync, processGLOSTWithExtensionIds, processGLOST, processGLOSTWithMeta, processGLOSTChunkAsync, } from "./processor.js";
export * from "./extensions/index.js";
//# sourceMappingURL=index.d.ts.map