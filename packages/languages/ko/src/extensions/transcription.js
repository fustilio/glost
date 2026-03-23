/**
 * Korean Transcription Provider - Revised Romanization + IPA
 */
import { BaseDataProvider } from "glost-common";
export class KoreanTranscriptionProvider extends BaseDataProvider {
    supportedLanguages = ["ko"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Korean transcription.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded transcriptions for ${Object.keys(data).length} Korean words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Korean transcription data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    async getTranscriptions(word, language) {
        if (!language.startsWith("ko"))
            return undefined;
        if (!word || typeof word !== "string" || word.trim().length === 0)
            return undefined;
        return this.withErrorHandling(async () => {
            const data = await this.ensureLoaded();
            const result = data[word.trim()];
            if (!result)
                return undefined;
            // Filter out undefined values to match Record<string, string>
            const filtered = {};
            for (const [key, value] of Object.entries(result)) {
                if (value !== undefined) {
                    filtered[key] = value;
                }
            }
            return Object.keys(filtered).length > 0 ? filtered : undefined;
        });
    }
}
export function createKoreanTranscriptionProvider(options = {}) {
    return new KoreanTranscriptionProvider(options);
}
export const koreanTranscriptionProvider = new KoreanTranscriptionProvider();
//# sourceMappingURL=transcription.js.map