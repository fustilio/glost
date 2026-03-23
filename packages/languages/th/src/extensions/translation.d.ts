/**
 * Thai translation provider for glost-translation extension
 *
 * Provides Thai-to-English translations from dictionary sources.
 *
 * @packageDocumentation
 */
import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader } from "glost-common";
import type { TranslationProvider } from "glost-translation";
/**
 * Thai translation data structure
 */
export interface ThaiTranslationData {
    [word: string]: string | string[];
}
/**
 * Options for Thai translation provider
 */
export interface ThaiTranslationProviderOptions extends BaseProviderOptions {
    /**
     * Custom data loader for translation data
     */
    dataLoader?: DataLoader<ThaiTranslationData>;
    /**
     * Target language for translations (default: 'en')
     */
    targetLanguage?: string;
}
/**
 * Thai translation provider class
 *
 * @example
 * ```typescript
 * import { createThaiTranslationProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 *
 * const provider = createThaiTranslationProvider({
 *   dataLoader: createJsonLoader({
 *     path: './data/thai-english-dictionary.json'
 *   }),
 *   targetLanguage: 'en'
 * });
 * ```
 */
export declare class ThaiTranslationProvider extends BaseDataProvider<ThaiTranslationData> implements TranslationProvider {
    protected supportedLanguages: "th"[];
    private dataLoader?;
    private targetLang;
    constructor(options?: ThaiTranslationProviderOptions);
    /**
     * Load translation data
     */
    protected loadData(): Promise<ThaiTranslationData>;
    /**
     * Get translation for a Thai word
     *
     * @param word - Thai word to translate
     * @param sourceLanguage - Source language (must be 'th')
     * @param targetLanguage - Target language (default: 'en')
     * @returns Translation string or undefined
     */
    getTranslation(word: string, sourceLanguage: string, targetLanguage: string): Promise<string | undefined>;
}
/**
 * Create Thai translation provider
 *
 * @param options - Provider options
 * @returns ThaiTranslationProvider instance
 */
export declare function createThaiTranslationProvider(options?: ThaiTranslationProviderOptions): ThaiTranslationProvider;
/**
 * Default Thai translation provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export declare const thaiTranslationProvider: ThaiTranslationProvider;
//# sourceMappingURL=translation.d.ts.map