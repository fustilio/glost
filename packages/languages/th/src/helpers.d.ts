/**
 * Thai Language Helper Functions
 *
 * Convenience functions for creating Thai GLOST nodes with RTGS transcription.
 */
import type { GLOSTWord } from 'glost';
/**
 * Options for creating a Thai word node
 */
export interface CreateThaiWordOptions {
    /** Thai text */
    text: string;
    /** RTGS romanization (optional) */
    rtgs?: string;
    /** Part of speech (default: "unknown") */
    partOfSpeech?: string;
    /** Tone number */
    tone?: number;
    /** Syllable breakdown */
    syllables?: string[];
}
/**
 * Create a Thai word node with optional RTGS transcription
 *
 * @example
 * ```typescript
 * // With transcription
 * const word = createThaiWord({
 *   text: "สวัสดี",
 *   rtgs: "sawatdi",
 *   partOfSpeech: "interjection",
 *   tone: 2,
 *   syllables: ["sa", "wat", "di"]
 * });
 *
 * // Without transcription (to be added by extensions)
 * const word = createThaiWord({ text: "สวัสดี" });
 * ```
 */
export declare function createThaiWord(options: CreateThaiWordOptions): GLOSTWord;
//# sourceMappingURL=helpers.d.ts.map