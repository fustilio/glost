/**
 * Example Data Helpers
 *
 * Helper functions for loading and querying example vocabulary data.
 * Each function has a single responsibility (SRP).
 *
 * @packageDocumentation
 */
import type { GlostLanguage } from "glost-common";
import type { VocabularyDataset, VocabularyEntry } from "./types.js";
/**
 * Load vocabulary dataset for a language
 *
 * Single Responsibility: Load and return vocabulary data for ONE language
 *
 * @param language - ISO 639-1 language code
 * @returns Vocabulary dataset or undefined if not found
 *
 * @example
 * ```typescript
 * const thaiVocab = loadVocabulary("th");
 * console.log(thaiVocab.vocabulary.length); // Number of Thai words
 * ```
 */
export declare function loadVocabulary(language: GlostLanguage): VocabularyDataset | undefined;
/**
 * Get all available language codes
 *
 * Single Responsibility: Return list of available languages
 *
 * @returns Array of ISO 639-1 language codes
 *
 * @example
 * ```typescript
 * const langs = getAvailableLanguages();
 * // ["en", "th", "ja", "fr", "es"]
 * ```
 */
export declare function getAvailableLanguages(): GlostLanguage[];
/**
 * Find a word in vocabulary dataset
 *
 * Single Responsibility: Lookup ONE word in ONE language dataset
 *
 * @param word - The word to find
 * @param language - ISO 639-1 language code
 * @returns Vocabulary entry or undefined if not found
 *
 * @example
 * ```typescript
 * const entry = findWord("สวัสดี", "th");
 * console.log(entry?.translations.en); // "hello, hi, goodbye"
 * ```
 */
export declare function findWord(word: string, language: GlostLanguage): VocabularyEntry | undefined;
/**
 * Get translation for a word
 *
 * Single Responsibility: Get translation from source to target language
 *
 * @param word - The word to translate
 * @param sourceLanguage - Source language code
 * @param targetLanguage - Target language code
 * @returns Translation string or undefined if not found
 *
 * @example
 * ```typescript
 * const translation = getTranslation("hello", "en", "th");
 * // "สวัสดี"
 * ```
 */
export declare function getTranslation(word: string, sourceLanguage: GlostLanguage, targetLanguage: GlostLanguage): string | undefined;
/**
 * Get transcription for a word
 *
 * Single Responsibility: Get transcription in specific system
 *
 * @param word - The word to transcribe
 * @param language - Language code
 * @param system - Transcription system (e.g., "ipa", "rtgs", "paiboon", "romaji")
 * @returns Transcription string or undefined if not found
 *
 * @example
 * ```typescript
 * const ipa = getTranscription("สวัสดี", "th", "ipa");
 * // "sà.wàt.diː"
 *
 * const paiboon = getTranscription("สวัสดี", "th", "paiboon");
 * // "sà-wàt-dii"
 * ```
 */
export declare function getTranscription(word: string, language: GlostLanguage, system: string): string | undefined;
/**
 * Get all transcriptions for a word
 *
 * Single Responsibility: Get ALL transcription systems for ONE word
 *
 * @param word - The word to transcribe
 * @param language - Language code
 * @returns Record of transcription system to transcription string
 *
 * @example
 * ```typescript
 * const transcriptions = getAllTranscriptions("สวัสดี", "th");
 * // {
 * //   ipa: "sà.wàt.diː",
 * //   rtgs: "sawatdi",
 * //   paiboon: "sà-wàt-dii"
 * // }
 * ```
 */
export declare function getAllTranscriptions(word: string, language: GlostLanguage): Record<string, string> | undefined;
/**
 * Get all words with specific property value
 *
 * Single Responsibility: Filter words by ONE property
 *
 * @param language - Language code
 * @param property - Property name to filter by
 * @param value - Value to match
 * @returns Array of matching vocabulary entries
 *
 * @example
 * ```typescript
 * // Get all beginner words
 * const beginnerWords = getWordsByProperty("en", "difficulty", "beginner");
 *
 * // Get all verbs
 * const verbs = getWordsByProperty("th", "partOfSpeech", "verb");
 * ```
 */
export declare function getWordsByProperty(language: GlostLanguage, property: keyof VocabularyEntry, value: unknown): VocabularyEntry[];
/**
 * Get random word from vocabulary
 *
 * Single Responsibility: Return ONE random word
 *
 * @param language - Language code
 * @returns Random vocabulary entry or undefined
 *
 * @example
 * ```typescript
 * const randomWord = getRandomWord("ja");
 * console.log(randomWord?.word);
 * ```
 */
export declare function getRandomWord(language: GlostLanguage): VocabularyEntry | undefined;
/**
 * Count vocabulary entries
 *
 * Single Responsibility: Count words in ONE language
 *
 * @param language - Language code
 * @returns Number of vocabulary entries
 *
 * @example
 * ```typescript
 * const count = countVocabulary("th");
 * console.log(`Thai has ${count} example words`);
 * ```
 */
export declare function countVocabulary(language: GlostLanguage): number;
//# sourceMappingURL=helpers.d.ts.map