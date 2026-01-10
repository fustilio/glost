/**
 * Demo Thai Translation Data
 * 
 * Sample Thai-English translations for testing the translation extension.
 */

export interface ThaiTranslationEntry {
  word: string;
  translation: string;
  partOfSpeech?: string;
  notes?: string;
}

/**
 * Demo Thai-English translation data
 * 
 * In a real application, this would come from:
 * - Dictionary API (Lexitron, LEXiTRON, etc.)
 * - Database of Thai-English pairs
 * - Machine translation service
 */
export const DEMO_TRANSLATIONS: ThaiTranslationEntry[] = [
  {
    word: "สวัสดี",
    translation: "hello",
    partOfSpeech: "interjection",
    notes: "General greeting used at any time",
  },
  {
    word: "ขอบคุณ",
    translation: "thank you",
    partOfSpeech: "phrase",
    notes: "Polite expression of gratitude",
  },
  {
    word: "ภาษา",
    translation: "language",
    partOfSpeech: "noun",
  },
  {
    word: "ไทย",
    translation: "Thai",
    partOfSpeech: "adjective",
    notes: "Can also be used as a noun (Thailand, Thai people)",
  },
  {
    word: "เรียน",
    translation: "study, learn",
    partOfSpeech: "verb",
  },
  {
    word: "คน",
    translation: "person, people",
    partOfSpeech: "noun",
  },
  {
    word: "ดี",
    translation: "good",
    partOfSpeech: "adjective",
  },
  {
    word: "ใหม่",
    translation: "new",
    partOfSpeech: "adjective",
  },
  {
    word: "เก่า",
    translation: "old",
    partOfSpeech: "adjective",
  },
  {
    word: "บ้าน",
    translation: "house, home",
    partOfSpeech: "noun",
  },
];

/**
 * Get translation for a Thai word
 * 
 * @param word - Thai word to translate
 * @param targetLang - Target language (default: "en")
 * @returns Translation string or undefined if not found
 */
export function getThaiTranslation(
  word: string,
  targetLang: string = "en"
): string | undefined {
  // Currently only supports Thai -> English
  if (targetLang !== "en") {
    return undefined;
  }

  const entry = DEMO_TRANSLATIONS.find((e) => e.word === word);
  return entry?.translation;
}

/**
 * Get full translation entry including metadata
 * 
 * @param word - Thai word to look up
 * @returns Translation entry or undefined if not found
 */
export function getThaiTranslationEntry(
  word: string
): ThaiTranslationEntry | undefined {
  return DEMO_TRANSLATIONS.find((e) => e.word === word);
}
