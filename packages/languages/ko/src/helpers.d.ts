/**
 * Korean Language Helper Functions
 *
 * Convenience functions for creating Korean GLOST nodes with romanization.
 */
import type { GLOSTWord } from 'glost';
/**
 * Options for creating a Korean word node
 */
export interface CreateKoreanWordOptions {
    /** Korean text (Hangul) */
    text: string;
    /** Romanization (RR: Revised Romanization) - optional */
    romanization?: string;
    /** Part of speech (default: "unknown") */
    partOfSpeech?: string;
}
/**
 * Create a Korean word node with optional romanization
 *
 * @example
 * ```typescript
 * // With romanization
 * const word = createKoreanWord({
 *   text: "안녕하세요",
 *   romanization: "annyeonghaseyo",
 *   partOfSpeech: "interjection"
 * });
 *
 * // Without romanization (to be added by extensions)
 * const word = createKoreanWord({ text: "안녕하세요" });
 * ```
 */
export declare function createKoreanWord(options: CreateKoreanWordOptions): GLOSTWord;
//# sourceMappingURL=helpers.d.ts.map