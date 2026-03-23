/**
 * Korean Frequency Provider
 */
import { BaseDataProvider } from "glost-common";
export class KoreanFrequencyProvider extends BaseDataProvider {
    supportedLanguages = ["ko"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Korean frequency.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded frequency data for ${Object.keys(data).length} Korean words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Korean frequency data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getFrequency(word, language) {
        if (language !== "ko")
            return undefined;
        if (!word || typeof word !== "string" || word.trim().length === 0)
            return undefined;
        return this.withErrorHandling(async () => {
            const data = await this.ensureLoaded();
            return data[word.trim()];
        });
    }
}
export function createKoreanFrequencyProvider(options = {}) {
    return new KoreanFrequencyProvider(options);
}
export const koreanFrequencyProvider = new KoreanFrequencyProvider();
//# sourceMappingURL=frequency.js.map