/**
 * Korean Difficulty Provider - TOPIK level mapping
 */
import { BaseDataProvider } from "glost-common";
export class KoreanDifficultyProvider extends BaseDataProvider {
    supportedLanguages = ["ko"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Korean difficulty.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded difficulty data for ${Object.keys(data).length} Korean words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Korean difficulty data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getDifficulty(word, language) {
        if (!language.startsWith("ko"))
            return undefined;
        if (!word || typeof word !== "string" || word.trim().length === 0)
            return undefined;
        return this.withErrorHandling(async () => {
            const data = await this.ensureLoaded();
            return data[word.trim()];
        });
    }
}
export function createKoreanDifficultyProvider(options = {}) {
    return new KoreanDifficultyProvider(options);
}
export const koreanDifficultyProvider = new KoreanDifficultyProvider();
//# sourceMappingURL=difficulty.js.map