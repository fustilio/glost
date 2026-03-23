/**
 * Thai transcription provider for glost-transcription extension
 *
 * Provides phonetic transcription for Thai text using multiple schemes:
 * - RTGS (Royal Thai General System)
 * - IPA (International Phonetic Alphabet)
 * - Paiboon+ romanization
 *
 * @packageDocumentation
 */
import { BaseDataProvider } from "glost-common";
/**
 * Thai transcription provider class
 *
 * Provides lazy-loaded transcription data with proper error handling.
 *
 * @example
 * ```typescript
 * import { createThaiTranscriptionProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 *
 * const provider = createThaiTranscriptionProvider({
 *   dataLoader: createJsonLoader({
 *     path: './thai-transcriptions.json'
 *   }),
 *   debug: true
 * });
 *
 * // Use with extension
 * import { createTranscriptionExtension } from "glost-transcription";
 *
 * const extension = createTranscriptionExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export class ThaiTranscriptionProvider extends BaseDataProvider {
    supportedLanguages = ["th"];
    dataLoader;
    constructor(options = {}) {
        super(options);
        this.dataLoader = options.dataLoader;
    }
    /**
     * Load transcription data
     */
    async loadData() {
        if (!this.dataLoader) {
            this.log("No data loader provided for Thai transcription. Provider will return undefined.", "warn");
            return {};
        }
        try {
            const data = await this.dataLoader.load();
            this.log(`Loaded transcriptions for ${Object.keys(data).length} Thai words`, "info");
            return data;
        }
        catch (error) {
            this.log(`Failed to load Thai transcription data: ${error instanceof Error ? error.message : String(error)}`, "error");
            return {};
        }
    }
    /**
     * Get transcriptions for a Thai word
     *
     * @param word - Thai word to transcribe
     * @param language - Language code (must be 'th')
     * @returns Transcription schemes or undefined
     */
    async getTranscriptions(word, language) {
        if (!language.startsWith("th")) {
            return undefined;
        }
        if (!word || typeof word !== "string" || word.trim().length === 0) {
            return undefined;
        }
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
/**
 * Create Thai transcription provider
 *
 * @param options - Provider options
 * @returns ThaiTranscriptionProvider instance
 *
 * @example
 * ```typescript
 * // With JSON file
 * const provider = createThaiTranscriptionProvider({
 *   dataLoader: createJsonLoader({ path: './data.json' })
 * });
 *
 * // With API
 * const provider = createThaiTranscriptionProvider({
 *   dataLoader: createApiLoader({
 *     url: 'https://api.example.com/thai/transcriptions'
 *   })
 * });
 * ```
 */
export function createThaiTranscriptionProvider(options = {}) {
    return new ThaiTranscriptionProvider(options);
}
/**
 * Default Thai transcription provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 * Create your own instance with a data loader for actual transcription data.
 *
 * @example
 * ```typescript
 * import { createTranscriptionExtension } from "glost-transcription";
 * import { thaiTranscriptionProvider } from "glost-th/extensions";
 *
 * // This will work but return no data
 * const ext = createTranscriptionExtension({
 *   targetLanguage: "th",
 *   provider: thaiTranscriptionProvider
 * });
 * ```
 */
export const thaiTranscriptionProvider = new ThaiTranscriptionProvider();
//# sourceMappingURL=transcription.js.map