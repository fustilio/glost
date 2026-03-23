/**
 * Demo Thai Transcription Data
 *
 * Minimal vocabulary data for demonstrating Thai transcription.
 * This shows how to structure transcription data for use with glost-transcription.
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
 * In a real application, this would come from:
 * - A comprehensive Thai dictionary database
 * - An API service
 * - Dictionary files (JSON, SQLite, etc.)
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
//# sourceMappingURL=demo-data.d.ts.map