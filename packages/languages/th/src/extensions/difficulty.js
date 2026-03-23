/**
 * Thai Difficulty Provider
 *
 * Provides difficulty level assessment for Thai words based on:
 * - CEFR levels (A1-C2)
 * - Frequency data
 * - Word length and complexity
 * - Educational level standards
 *
 * @packageDocumentation
 */
import { BaseDataProvider } from "glost-common";
/**
 * Thai difficulty provider class
 *
 * @example
 * ```typescript
 * import { createThaiDifficultyProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 *
 * const provider = createThaiDifficultyProvider({
 *   dataLoader: createJsonLoader({
 *     path: './thai-difficulty.json'
 *   }),
 *   debug: true
 * });
 *
 * // Use with extension
 * import { createDifficultyExtension } from "glost-difficulty";
 *
 * const extension = createDifficultyExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export class ThaiDifficultyProvider extends BaseDataProvider {
    supportedLanguages = ["th"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    /**
     * Load difficulty data
     */
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Thai difficulty. Provider will return undefined.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded difficulty data for ${Object.keys(data).length} Thai words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Thai difficulty data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    /**
     * Get difficulty level for a Thai word
     *
     * @param word - Thai word to assess
     * @param language - Language code (must be 'th')
     * @returns Difficulty level or undefined
     */
    async getDifficulty(word, language) {
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
 * Create Thai difficulty provider
 *
 * @param options - Provider options
 * @returns ThaiDifficultyProvider instance
 */
export function createThaiDifficultyProvider(options = {}) {
    return new ThaiDifficultyProvider(options);
}
/**
 * Default Thai difficulty provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiDifficultyProvider = new ThaiDifficultyProvider();
//# sourceMappingURL=difficulty.js.map