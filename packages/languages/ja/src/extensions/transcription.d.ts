/**
 * Japanese Transcription Provider - Romaji and IPA
 * See packages/extensions/templates/PROVIDER_TEMPLATE.md for usage guide
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { TranscriptionProvider } from "glost-transcription";
export interface JapaneseTranscriptionData {
    [word: string]: {
        romaji?: string;
        hepburn?: string;
        kunrei?: string;
        ipa?: string;
        [scheme: string]: string | undefined;
    };
}
export interface JapaneseTranscriptionProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<JapaneseTranscriptionData>;
}
export declare class JapaneseTranscriptionProvider extends BaseDataProvider<JapaneseTranscriptionData> implements TranscriptionProvider {
    protected supportedLanguages: "ja"[];
    private dataLoader?;
    constructor(options?: JapaneseTranscriptionProviderOptions);
    protected loadData(): Promise<JapaneseTranscriptionData>;
    getTranscriptions(word: string, language: string): Promise<Record<string, string> | undefined>;
}
export declare function createJapaneseTranscriptionProvider(options?: JapaneseTranscriptionProviderOptions): JapaneseTranscriptionProvider;
export declare const japaneseTranscriptionProvider: JapaneseTranscriptionProvider;
//# sourceMappingURL=transcription.d.ts.map