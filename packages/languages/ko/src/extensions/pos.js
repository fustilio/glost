/**
 * Korean POS Provider - Korean morphological analyzer integration
 */
import { BaseDataProvider } from "glost-common";
export class KoreanPOSProvider extends BaseDataProvider {
    supportedLanguages = ["ko"];
    dataLoader;
    tagset;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
        this.tagset = options.tagset || "universal";
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Korean POS.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded POS tags for ${Object.keys(data).length} Korean words (tagset: ${this.tagset})`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Korean POS data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getPOS(word, language) {
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
export function createKoreanPOSProvider(options = {}) {
    return new KoreanPOSProvider(options);
}
export const koreanPOSProvider = new KoreanPOSProvider();
//# sourceMappingURL=pos.js.map