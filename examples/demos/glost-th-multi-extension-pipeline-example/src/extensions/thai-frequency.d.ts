/**
 * Thai Frequency Extension
 *
 * Combines glost-frequency framework with Thai frequency data.
 * This demonstrates the X * Y pattern: glost-th + glost-frequency.
 */
import { type FrequencyProvider } from "glost-frequency";
/**
 * Thai frequency provider implementation
 *
 * Provides frequency levels based on corpus data:
 * - very-common: top 1000 words
 * - common: top 5000 words
 * - uncommon: top 20000 words
 * - rare: beyond 20000
 */
export declare const thaiFrequencyProvider: FrequencyProvider;
/**
 * Create Thai frequency extension
 *
 * Pre-configured extension for Thai word frequency analysis.
 * Returns both generator and enhancer extensions as a tuple.
 *
 * @returns Tuple of [generator, enhancer] extensions
 *
 * @example
 * ```typescript
 * import { createThaiFrequencyExtension } from "./extensions/thai-frequency";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const [generator, enhancer] = createThaiFrequencyExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [generator, enhancer]);
 * ```
 */
export declare function createThaiFrequencyExtension(): any;
//# sourceMappingURL=thai-frequency.d.ts.map