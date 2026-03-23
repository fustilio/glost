import type { GLOSTWord } from '../types.js';
declare const thaiWordsWithExtras: GLOSTWord[];
declare const japaneseWordsWithExtras: GLOSTWord[];
declare const thaiSentenceWithExtras: import("glost-core").GLOSTSentence;
declare const japaneseSentenceWithExtras: import("glost-core").GLOSTSentence;
declare const thaiParagraphWithExtras: import("glost-core").GLOSTParagraph;
declare const japaneseParagraphWithExtras: import("glost-core").GLOSTParagraph;
export declare const thaiDocumentWithExtras: import("glost-core").GLOSTRoot;
export declare const japaneseDocumentWithExtras: import("glost-core").GLOSTRoot;
/**
 * Get quick translation for a word in a specific language
 */
export declare function getQuickTranslation(word: GLOSTWord, targetLang: string): string | undefined;
/**
 * Get all available translations for a word
 */
export declare function getAllTranslations(word: GLOSTWord): Record<string, string>;
/**
 * Get difficulty level for a word
 */
export declare function getDifficulty(word: GLOSTWord): string | undefined;
/**
 * Get cultural notes for a word
 */
export declare function getCulturalNotes(word: GLOSTWord): string | undefined;
/**
 * Get related words for a word
 */
export declare function getRelatedWords(word: GLOSTWord): string[];
/**
 * Get example sentences for a word
 */
export declare function getExamples(word: GLOSTWord): string[];
export { thaiWordsWithExtras, japaneseWordsWithExtras, thaiSentenceWithExtras, japaneseSentenceWithExtras, thaiParagraphWithExtras, japaneseParagraphWithExtras };
//# sourceMappingURL=mock-data.d.ts.map