/**
 * Korean POS Provider - Korean morphological analyzer integration
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { POSProvider } from "glost-pos";
export interface KoreanPOSData {
    [word: string]: string;
}
export interface KoreanPOSProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<KoreanPOSData>;
    tagset?: "universal" | "sejong";
}
export declare class KoreanPOSProvider extends BaseDataProvider<KoreanPOSData> implements POSProvider {
    protected supportedLanguages: "ko"[];
    private dataLoader?;
    private tagset;
    constructor(options?: KoreanPOSProviderOptions);
    protected loadData(): Promise<KoreanPOSData>;
    getPOS(word: string, language: string): Promise<string | undefined>;
}
export declare function createKoreanPOSProvider(options?: KoreanPOSProviderOptions): KoreanPOSProvider;
export declare const koreanPOSProvider: KoreanPOSProvider;
//# sourceMappingURL=pos.d.ts.map