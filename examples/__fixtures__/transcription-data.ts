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
export const thaiTranscriptions: TranscriptionMap = {
  "สวัสดี": { rtgs: "sawatdi", ipa: "sàwàtdiː", syllables: ["สะ", "หวัด", "ดี"] },
  "ครับ": { rtgs: "khrap", ipa: "kʰráp", syllables: ["ครับ"] },
  "ค่ะ": { rtgs: "kha", ipa: "kʰâ", syllables: ["ค่ะ"] },
  "ผม": { rtgs: "phom", ipa: "pʰǒm", syllables: ["ผม"] },
  "ชื่อ": { rtgs: "chue", ipa: "tɕʰɯ̂ː", syllables: ["ชื่อ"] },
  "คุณ": { rtgs: "khun", ipa: "kʰun", syllables: ["คุณ"] },
  "อะไร": { rtgs: "arai", ipa: "àraj", syllables: ["อะ", "ไร"] },
  "ขอบคุณ": { rtgs: "khop khun", ipa: "kʰɔ̀ːp kʰun", syllables: ["ขอบ", "คุณ"] },
  "มาก": { rtgs: "mak", ipa: "mâːk", syllables: ["มาก"] },
  "คน": { rtgs: "khon", ipa: "kʰon", syllables: ["คน"] },
  "ภาษา": { rtgs: "phasa", ipa: "pʰaːsǎː", syllables: ["ภา", "ษา"] },
  "ไทย": { rtgs: "thai", ipa: "tʰaj", syllables: ["ไทย"] },
};

/**
 * Japanese transcriptions (Romaji)
 */
export const japaneseTranscriptions: TranscriptionMap = {
  "こんにちは": { romaji: "konnichiwa" },
  "おはよう": { romaji: "ohayou" },
  "ございます": { romaji: "gozaimasu" },
  "私": { romaji: "watashi" },
  "の": { romaji: "no" },
  "名前": { romaji: "namae" },
  "は": { romaji: "wa" },
  "です": { romaji: "desu" },
  "元気": { romaji: "genki" },
  "か": { romaji: "ka" },
  "ありがとう": { romaji: "arigatou" },
  "すみません": { romaji: "sumimasen" },
};

/**
 * Korean transcriptions (Revised Romanization)
 */
export const koreanTranscriptions: TranscriptionMap = {
  "안녕하세요": { romanization: "annyeonghaseyo" },
  "제": { romanization: "je" },
  "이름은": { romanization: "ireumeun" },
  "입니다": { romanization: "imnida" },
  "만나서": { romanization: "mannaseo" },
  "반갑습니다": { romanization: "bangapseumnida" },
  "잘": { romanization: "jal" },
  "지냈어요": { romanization: "jinaesseoyo" },
  "네": { romanization: "ne" },
  "감사합니다": { romanization: "gamsahamnida" },
  "죄송합니다": { romanization: "joesonghamnida" },
};

/**
 * Get transcription for a word
 */
export function getTranscription(
  word: string,
  language: 'thai' | 'japanese' | 'korean'
): TranscriptionMap[string] | undefined {
  switch (language) {
    case 'thai':
      return thaiTranscriptions[word];
    case 'japanese':
      return japaneseTranscriptions[word];
    case 'korean':
      return koreanTranscriptions[word];
    default:
      return undefined;
  }
}
