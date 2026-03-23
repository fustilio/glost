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
import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader } from "glost-common";
import type { TranscriptionProvider } from "glost-transcription";
/**
 * Thai transcription data structure
 */
export interface ThaiTranscriptionData {
    [word: string]: {
        rtgs?: string;
        ipa?: string;
        paiboon?: string;
        [scheme: string]: string | undefined;
    };
}
/**
 * Options for Thai transcription provider
 */
export interface ThaiTranscriptionProviderOptions extends BaseProviderOptions {
    /**
     * Custom data loader for transcription data
     *
     * @example
     * ```typescript
     * import { createJsonLoader } from "glost-common";
     *
     * const provider = createThaiTranscriptionProvider({
     *   dataLoader: createJsonLoader({
     *     path: './data/thai-transcriptions.json'
     *   })
     * });
     * ```
     */
    dataLoader?: DataLoader<ThaiTranscriptionData>;
}
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
export declare class ThaiTranscriptionProvider extends BaseDataProvider<ThaiTranscriptionData> implements TranscriptionProvider {
    protected supportedLanguages: "th"[];
    private dataLoader?;
    constructor(options?: ThaiTranscriptionProviderOptions);
    /**
     * Load transcription data
     */
    protected loadData(): Promise<ThaiTranscriptionData>;
    /**
     * Get transcriptions for a Thai word
     *
     * @param word - Thai word to transcribe
     * @param language - Language code (must be 'th')
     * @returns Transcription schemes or undefined
     */
    getTranscriptions(word: string, language: string): Promise<Record<string, string> | undefined>;
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
export declare function createThaiTranscriptionProvider(options?: ThaiTranscriptionProviderOptions): ThaiTranscriptionProvider;
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
export declare const thaiTranscriptionProvider: ThaiTranscriptionProvider;
//# sourceMappingURL=transcription.d.ts.map