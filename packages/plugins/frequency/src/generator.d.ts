/**
 * Frequency Generator Extension
 *
 * Generates frequency data for words using a provider.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { FrequencyProvider } from "./types.js";
import type { GlostLanguage } from "glost-common";
/**
 * Frequency generator extension options
 */
export interface FrequencyGeneratorOptions {
    /**
     * Target language for frequency lookup
     *
     * The ISO-639-1 language code for which to look up word frequencies.
     */
    targetLanguage: GlostLanguage;
    /**
     * Frequency provider
     *
     * Provider that looks up frequency levels for words.
     * If not provided, the extension will skip processing.
     */
    provider?: FrequencyProvider;
    /**
     * Whether to skip words that already have frequency data
     * @default true
     */
    skipExisting?: boolean;
}
/**
 * Create frequency generator extension
 *
 * This extension augments word nodes with frequency data by looking up
 * frequencies from the provider. It populates the raw frequency level
 * that can then be enhanced by the FrequencyEnhancerExtension.
 *
 * @param options - Extension options
 * @returns GLOST extension for frequency generation
 *
 * @example
 * ```typescript
 * import { createFrequencyGeneratorExtension } from "glost-frequency";
 * import { createThaiFrequencyProvider } from "glost-th/extensions";
 *
 * const provider = createThaiFrequencyProvider(datasource);
 * const extension = createFrequencyGeneratorExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createFrequencyGeneratorExtension(options: FrequencyGeneratorOptions): GLOSTExtension;
//# sourceMappingURL=generator.d.ts.map