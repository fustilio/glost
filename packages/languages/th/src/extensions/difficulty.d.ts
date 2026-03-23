/**
 * Thai Difficulty Provider
 *
 * Provides difficulty level assessment for Thai words based on:
 * - CEFR levels (A1-C2)
 * - Frequency data
 * - Word length and complexity
 * - Educational level standards
 *
 * @packageDocumentation
 */
import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader } from "glost-common";
import type { DifficultyProvider, DifficultyLevel } from "glost-difficulty";
/**
 * Thai difficulty data structure
 */
export interface ThaiDifficultyData {
    [word: string]: DifficultyLevel | string;
}
/**
 * Thai difficulty provider options
 */
export interface ThaiDifficultyProviderOptions extends BaseProviderOptions {
    /**
     * Custom data loader for difficulty data
     *
     * Can include:
     * - CEFR-mapped Thai vocabulary lists
     * - Educational grade-level word lists
     * - Custom difficulty assessments
     *
     * @example
     * ```typescript
     * import { createJsonLoader } from "glost-common";
     *
     * const provider = createThaiDifficultyProvider({
     *   dataLoader: createJsonLoader({
     *     path: './data/thai-difficulty.json'
     *   })
     * });
     * ```
     */
    dataLoader?: DataLoader<ThaiDifficultyData>;
}
/**
 * Thai difficulty provider class
 *
 * @example
 * ```typescript
 * import { createThaiDifficultyProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 *
 * const provider = createThaiDifficultyProvider({
 *   dataLoader: createJsonLoader({
 *     path: './thai-difficulty.json'
 *   }),
 *   debug: true
 * });
 *
 * // Use with extension
 * import { createDifficultyExtension } from "glost-difficulty";
 *
 * const extension = createDifficultyExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export declare class ThaiDifficultyProvider extends BaseDataProvider<ThaiDifficultyData> implements DifficultyProvider {
    protected supportedLanguages: "th"[];
    private dataLoader?;
    constructor(options?: ThaiDifficultyProviderOptions);
    /**
     * Load difficulty data
     */
    protected loadData(): Promise<ThaiDifficultyData>;
    /**
     * Get difficulty level for a Thai word
     *
     * @param word - Thai word to assess
     * @param language - Language code (must be 'th')
     * @returns Difficulty level or undefined
     */
    getDifficulty(word: string, language: string): Promise<DifficultyLevel | string | undefined>;
}
/**
 * Create Thai difficulty provider
 *
 * @param options - Provider options
 * @returns ThaiDifficultyProvider instance
 */
export declare function createThaiDifficultyProvider(options?: ThaiDifficultyProviderOptions): ThaiDifficultyProvider;
/**
 * Default Thai difficulty provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export declare const thaiDifficultyProvider: ThaiDifficultyProvider;
//# sourceMappingURL=difficulty.d.ts.map