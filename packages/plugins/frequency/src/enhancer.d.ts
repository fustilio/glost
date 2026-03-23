/**
 * Frequency Enhancer Extension
 *
 * Formats and enhances existing frequency data with display properties.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { FrequencyLevel } from "./types.js";
/**
 * Frequency enhancer extension options
 */
export interface FrequencyEnhancerOptions {
    /**
     * Whether to normalize frequency values
     * @default true
     */
    normalize?: boolean;
    /**
     * Custom frequency mapping (word → frequency level)
     * Takes precedence over metadata-based frequency detection.
     */
    customMapping?: Record<string, FrequencyLevel>;
}
/**
 * Create frequency enhancer extension
 *
 * This extension processes existing frequency metadata and enhances it
 * with display information and UI properties (colors, labels, priorities).
 * It should run after the frequency generator extension.
 *
 * @param options - Extension configuration options
 * @returns Configured frequency enhancer extension
 *
 * @example
 * ```typescript
 * import { createFrequencyEnhancerExtension } from "glost-frequency";
 *
 * const enhancer = createFrequencyEnhancerExtension({
 *   normalize: true,
 *   customMapping: { "hello": "very-common" }
 * });
 *
 * const result = processGLOSTWithExtensions(document, [enhancer]);
 * ```
 */
export declare function createFrequencyEnhancerExtension(options?: FrequencyEnhancerOptions): GLOSTExtension;
/**
 * Default frequency enhancer extension
 *
 * Pre-configured frequency enhancer with default options.
 */
export declare const FrequencyEnhancerExtension: GLOSTExtension;
//# sourceMappingURL=enhancer.d.ts.map