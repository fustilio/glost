/**
 * Demo Thai Transcription Data
 *
 * Sample Thai vocabulary with multiple transcription schemes.
 * This demonstrates how to structure transcription data.
 */
export interface ThaiTranscriptionEntry {
    word: string;
    transcriptions: {
        rtgs?: string;
        ipa?: string;
        "paiboon+"?: string;
        aua?: string;
    };
}
/**
 * Demo Thai vocabulary with transcriptions
 *
 * Includes a comprehensive set of common Thai words for testing
 * pipeline composition and performance.
 */
export declare const DEMO_TRANSCRIPTIONS: ThaiTranscriptionEntry[];
/**
 * Get transcriptions for a Thai word
 *
 * @param word - Thai word to look up
 * @param schemes - Optional array of specific schemes to return
 * @returns Transcriptions object or undefined if not found
 */
export declare function getThaiTranscriptions(word: string, schemes?: string[]): Record<string, string> | undefined;
//# sourceMappingURL=transcription-data.d.ts.map