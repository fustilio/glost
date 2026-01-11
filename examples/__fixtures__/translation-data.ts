/**
 * Shared Translation Data
 * 
 * Mock translation mappings for testing.
 * Maps words between languages.
 */

export interface TranslationMap {
  [word: string]: {
    en?: string;
    th?: string;
    ja?: string;
    ko?: string;
  };
}

/**
 * Thai to English translations
 */
export const thaiToEnglish: TranslationMap = {
  "สวัสดี": { en: "hello" },
  "ครับ": { en: "(polite particle for males)" },
  "ค่ะ": { en: "(polite particle for females)" },
  "ผม": { en: "I (male)" },
  "ชื่อ": { en: "name" },
  "คุณ": { en: "you" },
  "อะไร": { en: "what" },
  "ขอบคุณ": { en: "thank you" },
  "มาก": { en: "very / much" },
  "คน": { en: "person / people" },
  "ภาษา": { en: "language" },
  "ไทย": { en: "Thai" },
  "อาหาร": { en: "food" },
  "อร่อย": { en: "delicious" },
  "ชอบ": { en: "like" },
  "กิน": { en: "eat" },
};

/**
 * Japanese to English translations
 */
export const japaneseToEnglish: TranslationMap = {
  "こんにちは": { en: "hello" },
  "おはよう": { en: "good morning" },
  "ございます": { en: "(polite form)" },
  "私": { en: "I / me" },
  "の": { en: "(possessive particle)" },
  "名前": { en: "name" },
  "は": { en: "(topic particle)" },
  "です": { en: "is / am / are" },
  "元気": { en: "fine / healthy" },
  "か": { en: "(question particle)" },
  "ありがとう": { en: "thank you" },
  "すみません": { en: "excuse me / sorry" },
};

/**
 * Korean to English translations
 */
export const koreanToEnglish: TranslationMap = {
  "안녕하세요": { en: "hello" },
  "제": { en: "my (humble)" },
  "이름은": { en: "name (topic)" },
  "입니다": { en: "is (formal)" },
  "만나서": { en: "meeting" },
  "반갑습니다": { en: "glad (formal)" },
  "잘": { en: "well" },
  "지냈어요": { en: "have been (past)" },
  "네": { en: "yes" },
  "감사합니다": { en: "thank you (formal)" },
  "죄송합니다": { en: "sorry (formal)" },
};

/**
 * Get translation for a word
 */
export function getTranslation(
  word: string,
  fromLang: 'thai' | 'japanese' | 'korean',
  toLang: 'en' | 'th' | 'ja' | 'ko'
): string | undefined {
  let map: TranslationMap;
  
  switch (fromLang) {
    case 'thai':
      map = thaiToEnglish;
      break;
    case 'japanese':
      map = japaneseToEnglish;
      break;
    case 'korean':
      map = koreanToEnglish;
      break;
    default:
      return undefined;
  }
  
  return map[word]?.[toLang];
}

/**
 * Get all translations for a word
 */
export function getAllTranslations(
  word: string,
  fromLang: 'thai' | 'japanese' | 'korean'
): TranslationMap[string] | undefined {
  switch (fromLang) {
    case 'thai':
      return thaiToEnglish[word];
    case 'japanese':
      return japaneseToEnglish[word];
    case 'korean':
      return koreanToEnglish[word];
    default:
      return undefined;
  }
}
