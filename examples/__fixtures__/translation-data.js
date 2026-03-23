"use strict";
/**
 * Shared Translation Data
 *
 * Mock translation mappings for testing.
 * Maps words between languages.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.koreanToEnglish = exports.japaneseToEnglish = exports.thaiToEnglish = void 0;
exports.getTranslation = getTranslation;
exports.getAllTranslations = getAllTranslations;
/**
 * Thai to English translations
 */
exports.thaiToEnglish = {
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
exports.japaneseToEnglish = {
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
exports.koreanToEnglish = {
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
function getTranslation(word, fromLang, toLang) {
    let map;
    switch (fromLang) {
        case 'thai':
            map = exports.thaiToEnglish;
            break;
        case 'japanese':
            map = exports.japaneseToEnglish;
            break;
        case 'korean':
            map = exports.koreanToEnglish;
            break;
        default:
            return undefined;
    }
    return map[word]?.[toLang];
}
/**
 * Get all translations for a word
 */
function getAllTranslations(word, fromLang) {
    switch (fromLang) {
        case 'thai':
            return exports.thaiToEnglish[word];
        case 'japanese':
            return exports.japaneseToEnglish[word];
        case 'korean':
            return exports.koreanToEnglish[word];
        default:
            return undefined;
    }
}
//# sourceMappingURL=translation-data.js.map