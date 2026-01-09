/**
 * Example Data Helpers
 *
 * Helper functions for loading and querying example vocabulary data.
 * Each function has a single responsibility (SRP).
 *
 * @packageDocumentation
 */

import type { GlostLanguage } from "glost-common";
import type { VocabularyDataset, VocabularyEntry } from "./types";

// Import JSON data
import englishData from "./vocabulary/english.json";
import thaiData from "./vocabulary/thai.json";
import japaneseData from "./vocabulary/japanese.json";
import frenchData from "./vocabulary/french.json";
import spanishData from "./vocabulary/spanish.json";

/**
 * Vocabulary data cache
 * Single source of truth for all vocabulary data
 */
const VOCABULARY_DATA: Record<string, VocabularyDataset> = {
  en: englishData as VocabularyDataset,
  th: thaiData as VocabularyDataset,
  ja: japaneseData as VocabularyDataset,
  fr: frenchData as VocabularyDataset,
  es: spanishData as VocabularyDataset,
};

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
export function loadVocabulary(
  language: GlostLanguage,
): VocabularyDataset | undefined {
  return VOCABULARY_DATA[language];
}

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
export function getAvailableLanguages(): GlostLanguage[] {
  return Object.keys(VOCABULARY_DATA) as GlostLanguage[];
}

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
export function findWord(
  word: string,
  language: GlostLanguage,
): VocabularyEntry | undefined {
  const dataset = loadVocabulary(language);
  if (!dataset) return undefined;

  return dataset.vocabulary.find((entry) => entry.word === word);
}

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
export function getTranslation(
  word: string,
  sourceLanguage: GlostLanguage,
  targetLanguage: GlostLanguage,
): string | undefined {
  const entry = findWord(word, sourceLanguage);
  if (!entry) return undefined;

  return entry.translations[targetLanguage];
}

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
export function getTranscription(
  word: string,
  language: GlostLanguage,
  system: string,
): string | undefined {
  const entry = findWord(word, language);
  if (!entry) return undefined;

  return entry.transcription[system];
}

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
export function getAllTranscriptions(
  word: string,
  language: GlostLanguage,
): Record<string, string> | undefined {
  const entry = findWord(word, language);
  if (!entry) return undefined;

  return entry.transcription;
}

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
export function getWordsByProperty(
  language: GlostLanguage,
  property: keyof VocabularyEntry,
  value: unknown,
): VocabularyEntry[] {
  const dataset = loadVocabulary(language);
  if (!dataset) return [];

  return dataset.vocabulary.filter((entry) => entry[property] === value);
}

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
export function getRandomWord(
  language: GlostLanguage,
): VocabularyEntry | undefined {
  const dataset = loadVocabulary(language);
  if (!dataset || dataset.vocabulary.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * dataset.vocabulary.length);
  return dataset.vocabulary[randomIndex];
}

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
export function countVocabulary(language: GlostLanguage): number {
  const dataset = loadVocabulary(language);
  return dataset?.vocabulary.length ?? 0;
}
