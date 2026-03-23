/**
 * Demo Korean Transcription Data
 *
 * Minimal vocabulary data for demonstrating Korean transcription.
 */
export interface KoreanTranscriptionEntry {
    word: string;
    transcriptions: {
        rr?: string;
        mr?: string;
        yale?: string;
        hangul?: string;
    };
}
/**
 * Demo Korean vocabulary with transcriptions
 */
export declare const DEMO_TRANSCRIPTIONS: KoreanTranscriptionEntry[];
/**
 * Get transcriptions for a Korean word
 */
export declare function getKoreanTranscriptions(word: string, schemes?: string[]): Record<string, string> | undefined;
//# sourceMappingURL=demo-data.d.ts.map