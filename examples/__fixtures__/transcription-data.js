"use strict";
/**
 * Shared Transcription Data
 *
 * Mock transcription mappings for testing.
 * Maps words to their phonetic representations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.koreanTranscriptions = exports.japaneseTranscriptions = exports.thaiTranscriptions = void 0;
exports.getTranscription = getTranscription;
/**
 * Thai transcriptions (RTGS and IPA)
 */
exports.thaiTranscriptions = {
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
exports.japaneseTranscriptions = {
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
exports.koreanTranscriptions = {
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
function getTranscription(word, language) {
    switch (language) {
        case 'thai':
            return exports.thaiTranscriptions[word];
        case 'japanese':
            return exports.japaneseTranscriptions[word];
        case 'korean':
            return exports.koreanTranscriptions[word];
        default:
            return undefined;
    }
}
//# sourceMappingURL=transcription-data.js.map