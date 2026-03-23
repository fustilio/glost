/**
 * Demo Japanese Transcription Data
 *
 * Minimal vocabulary data for demonstrating Japanese transcription.
 */
export interface JapaneseTranscriptionEntry {
    word: string;
    transcriptions: {
        romaji?: string;
        hiragana?: string;
        katakana?: string;
        hepburn?: string;
    };
}
/**
 * Demo Japanese vocabulary with transcriptions
 */
export declare const DEMO_TRANSCRIPTIONS: JapaneseTranscriptionEntry[];
/**
 * Get transcriptions for a Japanese word
 */
export declare function getJapaneseTranscriptions(word: string, schemes?: string[]): Record<string, string> | undefined;
//# sourceMappingURL=demo-data.d.ts.map