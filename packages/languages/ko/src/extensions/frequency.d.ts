/**
 * Korean Frequency Provider
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { FrequencyProvider, FrequencyLevel } from "glost-frequency";
export interface KoreanFrequencyData {
    [word: string]: FrequencyLevel;
}
export interface KoreanFrequencyProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<KoreanFrequencyData>;
}
export declare class KoreanFrequencyProvider extends BaseDataProvider<KoreanFrequencyData> implements FrequencyProvider {
    protected supportedLanguages: "ko"[];
    private dataLoader?;
    constructor(options?: KoreanFrequencyProviderOptions);
    protected loadData(): Promise<KoreanFrequencyData>;
    getFrequency(word: string, language: GlostLanguage): Promise<FrequencyLevel | undefined>;
}
export declare function createKoreanFrequencyProvider(options?: KoreanFrequencyProviderOptions): KoreanFrequencyProvider;
export declare const koreanFrequencyProvider: KoreanFrequencyProvider;
//# sourceMappingURL=frequency.d.ts.map