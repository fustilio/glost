/**
 * Thai Frequency Provider
 *
 * Provides word frequency data for Thai language based on corpus analysis.
 *
 * @packageDocumentation
 */
import { BaseDataProvider } from "glost-common";
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
export class ThaiFrequencyProvider extends BaseDataProvider {
    supportedLanguages = ["th"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    /**
     * Load frequency data
     */
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Thai frequency. Provider will return undefined.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded frequency data for ${Object.keys(data).length} Thai words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Thai frequency data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    /**
     * Get frequency level for a Thai word
     *
     * @param word - Thai word to check
     * @param language - Language code (must be 'th')
     * @returns Frequency level or undefined
     */
    async getFrequency(word, language) {
        if (language !== "th") {
            return undefined;
        }
        if (!word || typeof word !== "string" || word.trim().length === 0) {
            return undefined;
        }
        return this.withErrorHandling(async () => {
            const data = await this.ensureLoaded();
            return data[word.trim()];
        });
    }
}
/**
 * Create Thai frequency provider
 *
 * @param options - Provider options
 * @returns ThaiFrequencyProvider instance
 */
export function createThaiFrequencyProvider(options = {}) {
    return new ThaiFrequencyProvider(options);
}
/**
 * Default Thai frequency provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiFrequencyProvider = new ThaiFrequencyProvider();
//# sourceMappingURL=frequency.js.map