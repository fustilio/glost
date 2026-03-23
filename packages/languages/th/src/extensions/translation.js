/**
 * Thai translation provider for glost-translation extension
 *
 * Provides Thai-to-English translations from dictionary sources.
 *
 * @packageDocumentation
 */
import { BaseDataProvider } from "glost-common";
/**
 * Thai translation provider class
 *
 * @example
 * ```typescript
 * import { createThaiTranslationProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 *
 * const provider = createThaiTranslationProvider({
 *   dataLoader: createJsonLoader({
 *     path: './data/thai-english-dictionary.json'
 *   }),
 *   targetLanguage: 'en'
 * });
 * ```
 */
export class ThaiTranslationProvider extends BaseDataProvider {
    supportedLanguages = ["th"];
    dataLoader;
    targetLang;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
        this.targetLang = options.targetLanguage || "en";
    }
    /**
     * Load translation data
     */
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Thai translation. Provider will return undefined.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded translations for ${Object.keys(data).length} Thai words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Thai translation data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    /**
     * Get translation for a Thai word
     *
     * @param word - Thai word to translate
     * @param sourceLanguage - Source language (must be 'th')
     * @param targetLanguage - Target language (default: 'en')
     * @returns Translation string or undefined
     */
    async getTranslation(word, sourceLanguage, targetLanguage) {
        if (!sourceLanguage.startsWith("th")) {
            return undefined;
        }
        if (!targetLanguage.startsWith(this.targetLang)) {
            return undefined;
        }
        if (!word || typeof word !== "string" || word.trim().length === 0) {
            return undefined;
        }
        return this.withErrorHandling(async () => {
            const data = await this.ensureLoaded();
            const result = data[word.trim()];
            if (result === undefined) {
                return undefined;
            }
            // Return first translation if array
            if (Array.isArray(result)) {
                return result[0];
            }
            return result;
        });
    }
}
/**
 * Create Thai translation provider
 *
 * @param options - Provider options
 * @returns ThaiTranslationProvider instance
 */
export function createThaiTranslationProvider(options = {}) {
    return new ThaiTranslationProvider(options);
}
/**
 * Default Thai translation provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiTranslationProvider = new ThaiTranslationProvider();
//# sourceMappingURL=translation.js.map