/**
 * Japanese Translation Provider - JMDict integration patterns
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { TranslationProvider } from "glost-translation";
export interface JapaneseTranslationData {
    [word: string]: string | string[];
}
export interface JapaneseTranslationProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<JapaneseTranslationData>;
    targetLanguage?: string;
}
export declare class JapaneseTranslationProvider extends BaseDataProvider<JapaneseTranslationData> implements TranslationProvider {
    protected supportedLanguages: "ja"[];
    private dataLoader?;
    private targetLang;
    constructor(options?: JapaneseTranslationProviderOptions);
    protected loadData(): Promise<JapaneseTranslationData>;
    getTranslation(word: string, sourceLanguage: string, targetLanguage: string): Promise<string | undefined>;
}
export declare function createJapaneseTranslationProvider(options?: JapaneseTranslationProviderOptions): JapaneseTranslationProvider;
export declare const japaneseTranslationProvider: JapaneseTranslationProvider;
//# sourceMappingURL=translation.d.ts.map