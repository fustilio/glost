/**
 * Japanese Frequency Provider
 *
 * Provides word frequency data for Japanese based on corpus analysis (e.g., BCCWJ).
 *
 * @packageDocumentation
 */
import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader, GlostLanguage } from "glost-common";
import type { FrequencyProvider, FrequencyLevel } from "glost-frequency";
/**
 * Japanese frequency data structure
 */
export interface JapaneseFrequencyData {
    [word: string]: FrequencyLevel;
}
/**
 * Japanese frequency provider options
 */
export interface JapaneseFrequencyProviderOptions extends BaseProviderOptions {
    /**
     * Custom data loader for frequency data
     *
     * Recommended sources:
     * - BCCWJ (Balanced Corpus of Contemporary Written Japanese)
     * - JMDict frequency rankings
     * - Other Japanese language resources
     */
    dataLoader?: DataLoader<JapaneseFrequencyData>;
}
/**
 * Japanese frequency provider class
 */
export declare class JapaneseFrequencyProvider extends BaseDataProvider<JapaneseFrequencyData> implements FrequencyProvider {
    protected supportedLanguages: "ja"[];
    private dataLoader?;
    constructor(options?: JapaneseFrequencyProviderOptions);
    protected loadData(): Promise<JapaneseFrequencyData>;
    getFrequency(word: string, language: GlostLanguage): Promise<FrequencyLevel | undefined>;
}
export declare function createJapaneseFrequencyProvider(options?: JapaneseFrequencyProviderOptions): JapaneseFrequencyProvider;
export declare const japaneseFrequencyProvider: JapaneseFrequencyProvider;
//# sourceMappingURL=frequency.d.ts.map