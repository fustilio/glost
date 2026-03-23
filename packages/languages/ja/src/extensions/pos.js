/**
 * Japanese POS Provider - MeCab/Universal Dependencies integration
 */
import { BaseDataProvider } from "glost-common";
export class JapanesePOSProvider extends BaseDataProvider {
    supportedLanguages = ["ja"];
    dataLoader;
    tagset;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
        this.tagset = options.tagset || "universal";
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Japanese POS.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded POS tags for ${Object.keys(data).length} Japanese words (tagset: ${this.tagset})`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Japanese POS data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getPOS(word, language) {
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
export function createJapanesePOSProvider(options = {}) {
    return new JapanesePOSProvider(options);
}
export const japanesePOSProvider = new JapanesePOSProvider();
//# sourceMappingURL=pos.js.map