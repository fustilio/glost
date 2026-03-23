/**
 * Japanese Difficulty Provider - JLPT level mapping
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { DifficultyProvider, DifficultyLevel } from "glost-difficulty";
export interface JapaneseDifficultyData {
    [word: string]: DifficultyLevel | string;
}
export interface JapaneseDifficultyProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<JapaneseDifficultyData>;
}
export declare class JapaneseDifficultyProvider extends BaseDataProvider<JapaneseDifficultyData> implements DifficultyProvider {
    protected supportedLanguages: "ja"[];
    private dataLoader?;
    constructor(options?: JapaneseDifficultyProviderOptions);
    protected loadData(): Promise<JapaneseDifficultyData>;
    getDifficulty(word: string, language: string): Promise<DifficultyLevel | string | undefined>;
}
export declare function createJapaneseDifficultyProvider(options?: JapaneseDifficultyProviderOptions): JapaneseDifficultyProvider;
export declare const japaneseDifficultyProvider: JapaneseDifficultyProvider;
//# sourceMappingURL=difficulty.d.ts.map