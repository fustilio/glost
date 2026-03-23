/**
 * Japanese Frequency Provider
 *
 * Provides word frequency data for Japanese based on corpus analysis (e.g., BCCWJ).
 *
 * @packageDocumentation
 */
import { BaseDataProvider } from "glost-common";
/**
 * Japanese frequency provider class
 */
export class JapaneseFrequencyProvider extends BaseDataProvider {
    supportedLanguages = ["ja"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Japanese frequency. Provider will return undefined.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded frequency data for ${Object.keys(data).length} Japanese words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Japanese frequency data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getFrequency(word, language) {
        if (language !== "ja") {
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
export function createJapaneseFrequencyProvider(options = {}) {
    return new JapaneseFrequencyProvider(options);
}
export const japaneseFrequencyProvider = new JapaneseFrequencyProvider();
//# sourceMappingURL=frequency.js.map