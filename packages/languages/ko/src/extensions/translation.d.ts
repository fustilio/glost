/**
 * Korean Translation Provider
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { TranslationProvider } from "glost-translation";
export interface KoreanTranslationData {
    [word: string]: string | string[];
}
export interface KoreanTranslationProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<KoreanTranslationData>;
    targetLanguage?: string;
}
export declare class KoreanTranslationProvider extends BaseDataProvider<KoreanTranslationData> implements TranslationProvider {
    protected supportedLanguages: "ko"[];
    private dataLoader?;
    private targetLang;
    constructor(options?: KoreanTranslationProviderOptions);
    protected loadData(): Promise<KoreanTranslationData>;
    getTranslation(word: string, sourceLanguage: string, targetLanguage: string): Promise<string | undefined>;
}
export declare function createKoreanTranslationProvider(options?: KoreanTranslationProviderOptions): KoreanTranslationProvider;
export declare const koreanTranslationProvider: KoreanTranslationProvider;
//# sourceMappingURL=translation.d.ts.map