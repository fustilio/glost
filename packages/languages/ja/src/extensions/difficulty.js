/**
 * Japanese Difficulty Provider - JLPT level mapping
 */
import { BaseDataProvider } from "glost-common";
export class JapaneseDifficultyProvider extends BaseDataProvider {
    supportedLanguages = ["ja"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Japanese difficulty.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded difficulty data for ${Object.keys(data).length} Japanese words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Japanese difficulty data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getDifficulty(word, language) {
        if (!language.startsWith("ja"))
            return undefined;
        if (!word || typeof word !== "string" || word.trim().length === 0)
            return undefined;
        return this.withErrorHandling(async () => {
            const data = await this.ensureLoaded();
            return data[word.trim()];
        });
    }
}
export function createJapaneseDifficultyProvider(options = {}) {
    return new JapaneseDifficultyProvider(options);
}
export const japaneseDifficultyProvider = new JapaneseDifficultyProvider();
//# sourceMappingURL=difficulty.js.map