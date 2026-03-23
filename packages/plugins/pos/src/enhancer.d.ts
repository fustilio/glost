/**
 * POS Enhancer Extension
 *
 * Formats and enhances existing POS data with display properties.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { POSTagInfo } from "./types.js";
/**
 * POS enhancer extension options
 */
export interface POSEnhancerOptions {
    /**
     * Whether to normalize POS tags
     * @default true
     */
    normalize?: boolean;
    /**
     * Custom POS mappings (tag → POSTagInfo)
     * Useful for language-specific tagsets
     */
    customMappings?: Record<string, POSTagInfo>;
}
/**
 * Create POS enhancer extension
 *
 * This extension processes existing POS metadata and enhances it
 * with display information (categories, abbreviations).
 * It should run after the POS generator extension.
 *
 * @param options - Extension configuration options
 * @returns Configured POS enhancer extension
 *
 * @example
 * ```typescript
 * import { createPOSEnhancerExtension } from "glost-pos";
 *
 * const enhancer = createPOSEnhancerExtension({
 *   normalize: true,
 *   customMappings: {
 *     "n": { category: "Noun", abbreviation: "N" }
 *   }
 * });
 *
 * const result = processGLOSTWithExtensions(document, [enhancer]);
 * ```
 */
export declare function createPOSEnhancerExtension(options?: POSEnhancerOptions): GLOSTExtension;
/**
 * Default POS enhancer extension
 *
 * Pre-configured POS enhancer with default options.
 */
export declare const POSEnhancerExtension: GLOSTExtension;
//# sourceMappingURL=enhancer.d.ts.map