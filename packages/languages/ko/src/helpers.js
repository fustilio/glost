/**
 * Korean Language Helper Functions
 *
 * Convenience functions for creating Korean GLOST nodes with romanization.
 */
import { createGLOSTWordNode } from 'glost';
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
export function createKoreanWord(options) {
    const { text, romanization, partOfSpeech = "unknown" } = options;
    // Only create transcription if romanization is provided
    const transcription = romanization ? {
        romanization: {
            text: romanization,
            syllables: [text],
        },
    } : undefined;
    const metadata = {
        partOfSpeech,
    };
    return createGLOSTWordNode({
        value: text,
        transcription,
        metadata,
        lang: "ko",
        script: "hangul",
    });
}
//# sourceMappingURL=helpers.js.map