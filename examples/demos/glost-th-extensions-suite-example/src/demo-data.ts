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
export const DEMO_THAI_VOCABULARY: ThaiVocabularyEntry[] = [
  {
    word: "สวัสดี",
    transcriptions: {
      rtgs: "sawatdi",
      ipa: "sà.wàt.diː",
      "paiboon+": "sà-wàt-dii",
      aua: "sawatdi",
    },
    translation: {
      en: "hello, hi, goodbye",
    },
    partOfSpeech: "interjection",
  },
  {
    word: "ขอบคุณ",
    transcriptions: {
      rtgs: "khop khun",
      ipa: "kʰɔ̀ːp.kʰun",
      "paiboon+": "kòrp-kun",
      aua: "khop khun",
    },
    translation: {
      en: "thank you",
    },
    partOfSpeech: "verb",
  },
  {
    word: "ครับ",
    transcriptions: {
      rtgs: "khrap",
      ipa: "kʰráp",
      "paiboon+": "kráp",
      aua: "khrap",
    },
    translation: {
      en: "(polite particle for males)",
    },
    partOfSpeech: "particle",
  },
  {
    word: "ค่ะ",
    transcriptions: {
      rtgs: "kha",
      ipa: "kʰâ",
      "paiboon+": "kâ",
      aua: "kha",
    },
    translation: {
      en: "(polite particle for females)",
    },
    partOfSpeech: "particle",
  },
  {
    word: "ภาษา",
    transcriptions: {
      rtgs: "phasa",
      ipa: "pʰaː.sǎː",
      "paiboon+": "paa-săa",
      aua: "phasa",
    },
    translation: {
      en: "language",
    },
    partOfSpeech: "noun",
  },
  {
    word: "เรียน",
    transcriptions: {
      rtgs: "rian",
      ipa: "riːan",
      "paiboon+": "riian",
      aua: "rian",
    },
    translation: {
      en: "to study, to learn",
    },
    partOfSpeech: "verb",
  },
  {
    word: "เข้าใจ",
    transcriptions: {
      rtgs: "khao chai",
      ipa: "kʰâw.t͡ɕaj",
      "paiboon+": "kâo-jai",
      aua: "khao chai",
    },
    translation: {
      en: "to understand",
    },
    partOfSpeech: "verb",
  },
  {
    word: "พูด",
    transcriptions: {
      rtgs: "phut",
      ipa: "pʰûːt",
      "paiboon+": "pôot",
      aua: "phut",
    },
    translation: {
      en: "to speak, to talk",
    },
    partOfSpeech: "verb",
  },
  {
    word: "คำ",
    transcriptions: {
      rtgs: "kham",
      ipa: "kʰam",
      "paiboon+": "kam",
      aua: "kham",
    },
    translation: {
      en: "word",
    },
    partOfSpeech: "noun",
  },
  {
    word: "ไทย",
    transcriptions: {
      rtgs: "thai",
      ipa: "tʰaj",
      "paiboon+": "tai",
      aua: "thai",
    },
    translation: {
      en: "Thai, Thailand",
    },
    partOfSpeech: "noun",
  },
  {
    word: "ซูเปอร์มาร์เก็ต",
    transcriptions: {
      rtgs: "supermaket",
      ipa: "suː.pɤː.maː.kèt",
      "paiboon+": "soo-per-maa-gèt",
      aua: "supermaket",
    },
    translation: {
      en: "supermarket",
    },
    partOfSpeech: "noun",
  },
  {
    word: "ซู",
    transcriptions: {
      rtgs: "su",
      ipa: "suː",
      "paiboon+": "soo",
      aua: "su",
    },
    translation: {
      en: "super (prefix)",
    },
    partOfSpeech: "prefix",
  },
  {
    word: "เปอร์",
    transcriptions: {
      rtgs: "poe",
      ipa: "pɤː",
      "paiboon+": "per",
      aua: "poe",
    },
    translation: {
      en: "per (from English)",
    },
    partOfSpeech: "prefix",
  },
  {
    word: "มาร์เก็ต",
    transcriptions: {
      rtgs: "maket",
      ipa: "maː.kèt",
      "paiboon+": "maa-gèt",
      aua: "maket",
    },
    translation: {
      en: "market",
    },
    partOfSpeech: "noun",
  },
  {
    word: "ฉัน",
    transcriptions: {
      rtgs: "chan",
      ipa: "t͡ɕʰǎn",
      "paiboon+": "chăn",
      aua: "chan",
    },
    translation: {
      en: "I (informal, used by females)",
    },
    partOfSpeech: "pronoun",
  },
  {
    word: "ผม",
    transcriptions: {
      rtgs: "phom",
      ipa: "pʰǒm",
      "paiboon+": "pŏm",
      aua: "phom",
    },
    translation: {
      en: "I (used by males)",
    },
    partOfSpeech: "pronoun",
  },
];

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
export function findDemoThaiWord(word: string): ThaiVocabularyEntry | undefined {
  return DEMO_THAI_VOCABULARY.find((entry) => entry.word === word);
}

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
export function isWordInDemoVocabulary(word: string): boolean {
  return findDemoThaiWord(word) !== undefined;
}

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
export function getDemoThaiTranscriptions(
  word: string,
  schemes?: string[]
): Record<string, string> | undefined {
  const entry = findDemoThaiWord(word);
  if (!entry || !entry.transcriptions) {
    return undefined;
  }

  const result: Record<string, string> = {};

  // If schemes specified, only return those
  if (schemes && schemes.length > 0) {
    for (const scheme of schemes) {
      const transcription = entry.transcriptions[scheme as keyof typeof entry.transcriptions];
      if (transcription) {
        result[scheme] = transcription;
      }
    }
  } else {
    // Return all available transcriptions
    Object.assign(result, entry.transcriptions);
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

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
export function getDemoThaiTranslation(word: string): string | undefined {
  const entry = findDemoThaiWord(word);
  return entry?.translation?.en;
}
