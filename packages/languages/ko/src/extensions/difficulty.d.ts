/**
 * Korean Difficulty Provider - TOPIK level mapping
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { DifficultyProvider, DifficultyLevel } from "glost-difficulty";
export interface KoreanDifficultyData {
    [word: string]: DifficultyLevel | string;
}
export interface KoreanDifficultyProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<KoreanDifficultyData>;
}
export declare class KoreanDifficultyProvider extends BaseDataProvider<KoreanDifficultyData> implements DifficultyProvider {
    protected supportedLanguages: "ko"[];
    private dataLoader?;
    constructor(options?: KoreanDifficultyProviderOptions);
    protected loadData(): Promise<KoreanDifficultyData>;
    getDifficulty(word: string, language: string): Promise<DifficultyLevel | string | undefined>;
}
export declare function createKoreanDifficultyProvider(options?: KoreanDifficultyProviderOptions): KoreanDifficultyProvider;
export declare const koreanDifficultyProvider: KoreanDifficultyProvider;
//# sourceMappingURL=difficulty.d.ts.map