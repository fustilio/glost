/**
 * Thai Frequency Provider
 *
 * Provides word frequency data for Thai language based on corpus analysis.
 *
 * @packageDocumentation
 */
import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader, GlostLanguage } from "glost-common";
import type { FrequencyProvider, FrequencyLevel } from "glost-frequency";
/**
 * Thai frequency data structure
 */
export interface ThaiFrequencyData {
    [word: string]: FrequencyLevel;
}
/**
 * Thai frequency provider options
 */
export interface ThaiFrequencyProviderOptions extends BaseProviderOptions {
    /**
     * Custom data loader for frequency data
     *
     * Load from:
     * - Thai National Corpus frequency data
     * - Dictionary-based frequency rankings
     * - Custom Thai language resources
     *
     * @example
     * ```typescript
     * import { createJsonLoader } from "glost-common";
     *
     * const provider = createThaiFrequencyProvider({
     *   dataLoader: createJsonLoader({
     *     path: './data/thai-frequency.json'
     *   })
     * });
     * ```
     */
    dataLoader?: DataLoader<ThaiFrequencyData>;
}
/**
 * Thai frequency provider class
 *
 * Provides lazy-loaded frequency data with proper error handling.
 *
 * @example
 * ```typescript
 * import { createThaiFrequencyProvider } from "glost-th/extensions";
 * import { createJsonLoader, createCachedLoader } from "glost-common";
 *
 * // With caching
 * const provider = createThaiFrequencyProvider({
 *   dataLoader: createCachedLoader({
 *     loader: createJsonLoader({
 *       path: './thai-frequency.json'
 *     }),
 *     ttl: 3600000, // 1 hour
 *     storageKey: 'thai-frequency-cache'
 *   }),
 *   debug: true
 * });
 *
 * // Use with extension
 * import { createFrequencyExtension } from "glost-frequency";
 *
 * const extension = createFrequencyExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export declare class ThaiFrequencyProvider extends BaseDataProvider<ThaiFrequencyData> implements FrequencyProvider {
    protected supportedLanguages: "th"[];
    private dataLoader?;
    constructor(options?: ThaiFrequencyProviderOptions);
    /**
     * Load frequency data
     */
    protected loadData(): Promise<ThaiFrequencyData>;
    /**
     * Get frequency level for a Thai word
     *
     * @param word - Thai word to check
     * @param language - Language code (must be 'th')
     * @returns Frequency level or undefined
     */
    getFrequency(word: string, language: GlostLanguage): Promise<FrequencyLevel | undefined>;
}
/**
 * Create Thai frequency provider
 *
 * @param options - Provider options
 * @returns ThaiFrequencyProvider instance
 */
export declare function createThaiFrequencyProvider(options?: ThaiFrequencyProviderOptions): ThaiFrequencyProvider;
/**
 * Default Thai frequency provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export declare const thaiFrequencyProvider: ThaiFrequencyProvider;
//# sourceMappingURL=frequency.d.ts.map