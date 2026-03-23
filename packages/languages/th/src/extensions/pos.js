/**
 * Thai Part-of-Speech Provider
 *
 * Provides POS tagging for Thai words using:
 * - ORCHID corpus tagset
 * - Universal Dependencies (UD) tags
 * - Custom Thai linguistic categories
 *
 * @packageDocumentation
 */
import { BaseDataProvider } from "glost-common";
/**
 * Thai POS provider class
 *
 * @example
 * ```typescript
 * import { createThaiPOSProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 *
 * const provider = createThaiPOSProvider({
 *   dataLoader: createJsonLoader({
 *     path: './thai-pos.json'
 *   }),
 *   tagset: 'universal',
 *   debug: true
 * });
 *
 * // Use with extension
 * import { createPOSExtension } from "glost-pos";
 *
 * const extension = createPOSExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export class ThaiPOSProvider extends BaseDataProvider {
    supportedLanguages = ["th"];
    dataLoader;
    tagset;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
        this.tagset = options.tagset || "universal";
    }
    /**
     * Load POS data
     */
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Thai POS. Provider will return undefined.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded POS tags for ${Object.keys(data).length} Thai words (tagset: ${this.tagset})`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Thai POS data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    /**
     * Get POS tag for a Thai word
     *
     * @param word - Thai word to tag
     * @param language - Language code (must be 'th')
     * @returns POS tag or undefined
     */
    async getPOS(word, language) {
        if (!language.startsWith("th")) {
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
 * Create Thai POS provider
 *
 * @param options - Provider options
 * @returns ThaiPOSProvider instance
 */
export function createThaiPOSProvider(options = {}) {
    return new ThaiPOSProvider(options);
}
/**
 * Default Thai POS provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiPOSProvider = new ThaiPOSProvider();
//# sourceMappingURL=pos.js.map