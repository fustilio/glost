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
export declare const thaiToEnglish: TranslationMap;
/**
 * Japanese to English translations
 */
export declare const japaneseToEnglish: TranslationMap;
/**
 * Korean to English translations
 */
export declare const koreanToEnglish: TranslationMap;
/**
 * Get translation for a word
 */
export declare function getTranslation(word: string, fromLang: 'thai' | 'japanese' | 'korean', toLang: 'en' | 'th' | 'ja' | 'ko'): string | undefined;
/**
 * Get all translations for a word
 */
export declare function getAllTranslations(word: string, fromLang: 'thai' | 'japanese' | 'korean'): TranslationMap[string] | undefined;
//# sourceMappingURL=translation-data.d.ts.map