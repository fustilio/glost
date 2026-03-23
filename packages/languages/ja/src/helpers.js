/**
 * Japanese Language Helper Functions
 *
 * Convenience functions for creating Japanese GLOST nodes with romaji and furigana.
 */
import { createGLOSTWordNode } from 'glost';
/**
 * Create a Japanese word node with optional romaji transcription
 *
 * @example
 * ```typescript
 * // With transcription
 * const word = createJapaneseWord({
 *   text: "こんにちは",
 *   romaji: "konnichiwa",
 *   partOfSpeech: "interjection",
 *   furigana: "こんにちは"
 * });
 *
 * // Without transcription (to be added by extensions)
 * const word = createJapaneseWord({ text: "こんにちは" });
 * ```
 */
export function createJapaneseWord(options) {
    const { text, romaji, partOfSpeech = "unknown", furigana } = options;
    // Only create transcription if romaji or furigana is provided
    const transcription = (romaji || furigana) ? {
        ...(romaji && {
            romaji: {
                text: romaji,
                syllables: [text],
            },
        }),
        ...(furigana && {
            furigana: {
                text: furigana,
                syllables: [text],
            },
        }),
    } : undefined;
    const metadata = {
        partOfSpeech,
    };
    return createGLOSTWordNode({
        value: text,
        transcription,
        metadata,
        lang: "ja",
        script: "hiragana",
    });
}
//# sourceMappingURL=helpers.js.map