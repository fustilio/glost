/**
 * Demo Thai Vocabulary Data
 *
 * Limited vocabulary data for demonstration and testing purposes.
 * Real applications should use comprehensive dictionary data.
 *
 * This is provided as part of glost-th to make it easy for examples
 * and tests to have consistent demo data.
 *
 * @packageDocumentation
 */
/**
 * Vocabulary entry with transcriptions and translations
 */
export interface ThaiVocabularyEntry {
    word: string;
    transcriptions: {
        rtgs?: string;
        ipa?: string;
        "paiboon+"?: string;
        aua?: string;
    };
    translation?: {
        en?: string;
    };
    partOfSpeech?: string;
}
/**
 * Demo vocabulary data - limited set of common Thai words
 *
 * This is a simplified dataset for demonstration and testing.
 * Production applications should use comprehensive dictionaries.
 */
export declare const DEMO_THAI_VOCABULARY: ThaiVocabularyEntry[];
/**
 * Find a word in the demo vocabulary
 *
 * @param word - The word to find
 * @returns Vocabulary entry or undefined if not found
 *
 * @example
 * ```typescript
 * import { findDemoThaiWord } from 'glost-th/demo-data';
 *
 * const entry = findDemoThaiWord("สวัสดี");
 * console.log(entry?.translation.en); // "hello, hi, goodbye"
 * ```
 */
export declare function findDemoThaiWord(word: string): ThaiVocabularyEntry | undefined;
/**
 * Check if a word exists in the demo vocabulary
 *
 * @param word - The word to check
 * @returns true if the word exists
 *
 * @example
 * ```typescript
 * import { isWordInDemoVocabulary } from 'glost-th/demo-data';
 *
 * if (isWordInDemoVocabulary("สวัสดี")) {
 *   console.log("Word found in demo data");
 * }
 * ```
 */
export declare function isWordInDemoVocabulary(word: string): boolean;
/**
 * Get transcriptions for a Thai word from demo data
 *
 * @param word - The Thai word
 * @param schemes - Optional array of transcription schemes to return
 * @returns Record of transcription schemes to their values, or undefined if not found
 *
 * @example
 * ```typescript
 * import { getDemoThaiTranscriptions } from 'glost-th/demo-data';
 *
 * const trans = getDemoThaiTranscriptions("สวัสดี");
 * console.log(trans?.rtgs); // "sawatdi"
 * console.log(trans?.ipa); // "sà.wàt.diː"
 * ```
 */
export declare function getDemoThaiTranscriptions(word: string, schemes?: string[]): Record<string, string> | undefined;
/**
 * Get English translation for a Thai word from demo data
 *
 * @param word - The Thai word
 * @returns English translation or undefined if not found
 *
 * @example
 * ```typescript
 * import { getDemoThaiTranslation } from 'glost-th/demo-data';
 *
 * const translation = getDemoThaiTranslation("สวัสดี");
 * console.log(translation); // "hello, hi, goodbye"
 * ```
 */
export declare function getDemoThaiTranslation(word: string): string | undefined;
//# sourceMappingURL=demo-data.d.ts.map