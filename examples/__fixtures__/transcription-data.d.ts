/**
 * Shared Transcription Data
 *
 * Mock transcription mappings for testing.
 * Maps words to their phonetic representations.
 */
export interface TranscriptionMap {
    [word: string]: {
        ipa?: string;
        rtgs?: string;
        romaji?: string;
        romanization?: string;
        syllables?: string[];
    };
}
/**
 * Thai transcriptions (RTGS and IPA)
 */
export declare const thaiTranscriptions: TranscriptionMap;
/**
 * Japanese transcriptions (Romaji)
 */
export declare const japaneseTranscriptions: TranscriptionMap;
/**
 * Korean transcriptions (Revised Romanization)
 */
export declare const koreanTranscriptions: TranscriptionMap;
/**
 * Get transcription for a word
 */
export declare function getTranscription(word: string, language: 'thai' | 'japanese' | 'korean'): TranscriptionMap[string] | undefined;
//# sourceMappingURL=transcription-data.d.ts.map