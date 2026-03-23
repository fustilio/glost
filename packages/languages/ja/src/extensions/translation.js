/**
 * Japanese Translation Provider - JMDict integration patterns
 */
import { BaseDataProvider } from "glost-common";
export class JapaneseTranslationProvider extends BaseDataProvider {
    supportedLanguages = ["ja"];
    dataLoader;
    targetLang;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
        this.targetLang = options.targetLanguage || "en";
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Japanese translation.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded translations for ${Object.keys(data).length} Japanese words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Japanese translation data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getTranslation(word, sourceLanguage, targetLanguage) {
        if (!sourceLanguage.startsWith("ja") || !targetLanguage.startsWith(this.targetLang))
            return undefined;
        if (!word || typeof word !== "string" || word.trim().length === 0)
            return undefined;
        return this.withErrorHandling(async () => {
            const data = await this.ensureLoaded();
            const result = data[word.trim()];
            if (result === undefined)
                return undefined;
            return Array.isArray(result) ? result[0] : result;
        });
    }
}
export function createJapaneseTranslationProvider(options = {}) {
    return new JapaneseTranslationProvider(options);
}
export const japaneseTranslationProvider = new JapaneseTranslationProvider();
//# sourceMappingURL=translation.js.map