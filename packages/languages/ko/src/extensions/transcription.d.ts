/**
 * Korean Transcription Provider - Revised Romanization + IPA
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader } from "glost-common";
import type { TranscriptionProvider } from "glost-transcription";
export interface KoreanTranscriptionData {
    [word: string]: {
        rr?: string;
        ipa?: string;
        [scheme: string]: string | undefined;
    };
}
export interface KoreanTranscriptionProviderOptions extends BaseProviderOptions {
    dataLoader?: DataLoader<KoreanTranscriptionData>;
}
export declare class KoreanTranscriptionProvider extends BaseDataProvider<KoreanTranscriptionData> implements TranscriptionProvider {
    protected supportedLanguages: "ko"[];
    private dataLoader?;
    constructor(options?: KoreanTranscriptionProviderOptions);
    protected loadData(): Promise<KoreanTranscriptionData>;
    getTranscriptions(word: string, language: string): Promise<Record<string, string> | undefined>;
}
export declare function createKoreanTranscriptionProvider(options?: KoreanTranscriptionProviderOptions): KoreanTranscriptionProvider;
export declare const koreanTranscriptionProvider: KoreanTranscriptionProvider;
//# sourceMappingURL=transcription.d.ts.map