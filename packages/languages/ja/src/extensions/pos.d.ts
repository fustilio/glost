/**
 * Japanese POS Provider - MeCab/Universal Dependencies integration
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { POSProvider } from "glost-pos";
export interface JapanesePOSData {
    [word: string]: string;
}
export interface JapanesePOSProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<JapanesePOSData>;
    tagset?: "universal" | "mecab";
}
export declare class JapanesePOSProvider extends BaseDataProvider<JapanesePOSData> implements POSProvider {
    protected supportedLanguages: "ja"[];
    private dataLoader?;
    private tagset;
    constructor(options?: JapanesePOSProviderOptions);
    protected loadData(): Promise<JapanesePOSData>;
    getPOS(word: string, language: string): Promise<string | undefined>;
}
export declare function createJapanesePOSProvider(options?: JapanesePOSProviderOptions): JapanesePOSProvider;
export declare const japanesePOSProvider: JapanesePOSProvider;
//# sourceMappingURL=pos.d.ts.map