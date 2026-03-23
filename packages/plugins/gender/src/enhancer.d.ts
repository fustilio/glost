/**
 * Gender Enhancer Extension
 *
 * Formats and enhances existing gender data with display properties.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
/**
 * Gender enhancer extension options
 */
export interface GenderEnhancerOptions {
    /**
     * Whether to normalize gender values
     * @default true
     */
    normalize?: boolean;
}
/**
 * Create gender enhancer extension
 */
export declare function createGenderEnhancerExtension(options?: GenderEnhancerOptions): GLOSTExtension;
/**
 * Default gender enhancer extension
 */
export declare const GenderEnhancerExtension: GLOSTExtension;
//# sourceMappingURL=enhancer.d.ts.map