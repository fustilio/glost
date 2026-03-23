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
export declare const DEMO_TRANSLATIONS: ThaiTranslationEntry[];
/**
 * Get translation for a Thai word
 *
 * @param word - Thai word to translate
 * @param targetLang - Target language (default: "en")
 * @returns Translation string or undefined if not found
 */
export declare function getThaiTranslation(word: string, targetLang?: string): string | undefined;
/**
 * Get full translation entry including metadata
 *
 * @param word - Thai word to look up
 * @returns Translation entry or undefined if not found
 */
export declare function getThaiTranslationEntry(word: string): ThaiTranslationEntry | undefined;
//# sourceMappingURL=translation-data.d.ts.map