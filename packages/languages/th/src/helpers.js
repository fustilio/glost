/**
 * Thai Language Helper Functions
 *
 * Convenience functions for creating Thai GLOST nodes with RTGS transcription.
 */
import { createGLOSTWordNode } from 'glost';
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
export function createThaiWord(options) {
    const { text, rtgs, partOfSpeech = "unknown", tone, syllables } = options;
    // Only create transcription if rtgs is provided
    const transcription = rtgs ? {
        rtgs: {
            text: rtgs,
            tone,
            syllables: syllables || [text],
        },
    } : undefined;
    const metadata = {
        partOfSpeech,
    };
    return createGLOSTWordNode({
        value: text,
        transcription,
        metadata,
        lang: "th",
        script: "thai",
    });
}
//# sourceMappingURL=helpers.js.map