/**
 * Thai-specific Transformer Extensions
 *
 * Pre-configured transformer extensions optimized for Thai language learning.
 * Leverages the base extensions from glost-plugins with Thai-specific
 * configurations.
 *
 * @packageDocumentation
 */
import { createGenderTransformerExtension, createNegationTransformerExtension, } from "glost-plugins";
import { createClauseSegmenterExtension } from "glost-clause-segmenter";
import { thaiSegmenterProvider } from "glost-th/segmenter";
import { createThaiSyllableSegmenterExtension, } from "./syllable-segmenter";
/**
 * Create Thai syllable segmenter optimized for learning
 *
 * Pre-configured to include full phonological structure and
 * character-level breakdown for language learners.
 *
 * @param options - Configuration options
 * @returns Configured Thai syllable segmenter
 *
 * @example
 * ```typescript
 * import { createThaiSyllableSegmenter } from "glost-plugins-thai";
 *
 * const extension = createThaiSyllableSegmenter();
 *
 * // Word("สวัสดี") transforms to:
 * // Word: [
 * //   Syllable("ส-ะ"),   // with tone, characters
 * //   Syllable("ว-ั-ส"), // with tone, characters
 * //   Syllable("ด-ี")    // with tone, characters
 * // ]
 * ```
 */
export function createThaiSyllableSegmenter(options = {}) {
    const { detailedBreakdown = true, ...rest } = options;
    return createThaiSyllableSegmenterExtension({
        segmentAllThai: true,
        includeCharacters: detailedBreakdown,
        computeTones: true,
        ...rest,
    });
}
/**
 * Pre-configured Thai syllable segmenter for learning
 */
export const ThaiSyllableSegmenter = createThaiSyllableSegmenter();
/**
 * Create Thai gender transformer for polite particles
 *
 * Handles Thai gender-specific particles like ครับ/ค่ะ/คะ
 * and pronouns like ผม/ดิฉัน.
 *
 * @param options - Configuration options
 * @returns Configured Thai gender transformer
 *
 * @example
 * ```typescript
 * import { createThaiGenderTransformer } from "glost-plugins-thai";
 *
 * // For male speaker
 * const maleExt = createThaiGenderTransformer({ perspective: "male" });
 *
 * // "ราคาเท่าไหร่{ครับ|คะ}" → "ราคาเท่าไหร่ครับ"
 *
 * // For toggling in UI
 * const toggleExt = createThaiGenderTransformer({ perspective: "both" });
 * ```
 */
export function createThaiGenderTransformer(options = {}) {
    const { perspective = "both", ...rest } = options;
    return createGenderTransformerExtension({
        targetGender: perspective,
        displayFormat: perspective === "both" ? "inline-toggle" : "replace",
        processSentences: true,
        ...rest,
    });
}
/**
 * Pre-configured Thai gender transformer (toggle mode)
 */
export const ThaiGenderTransformer = createThaiGenderTransformer();
// ============================================================================
// Thai Clause Segmenter (pre-configured)
// ============================================================================
/**
 * Create Thai clause segmenter
 *
 * **Note**: Clause segmenter is currently disabled due to API changes.
 * The createClauseSegmenterExtension function has moved to the glost-clause-segmenter
 * package and requires a provider-based API that needs to be implemented.
 *
 * Segments Thai sentences into clauses using Thai-specific
 * subordinating conjunctions and particles.
 *
 * @param options - Configuration options
 * @returns Configured Thai clause segmenter
 *
 * @example
 * ```typescript
 * import { createThaiClauseSegmenter } from "glost-plugins-thai";
 *
 * const extension = createThaiClauseSegmenter();
 *
 * // "ผมคิดว่าคุณถูก" segments into:
 * // Clause(main): ["ผม", "คิด"]
 * // Clause(subordinate): ["ว่า", "คุณ", "ถูก"]
 * ```
 */
/**
 * Create Thai clause segmenter extension
 *
 * Uses the Thai segmenter provider to segment sentences into clauses.
 *
 * @param options - Options for clause segmentation
 * @returns GLOST extension for Thai clause segmentation
 *
 * @example
 * ```typescript
 * import { createThaiClauseSegmenter } from "glost-plugins-thai";
 *
 * const segmenter = createThaiClauseSegmenter({
 *   includeMarkers: true
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [segmenter]);
 * ```
 */
export function createThaiClauseSegmenter(options = {}) {
    return createClauseSegmenterExtension({
        targetLanguage: "th",
        provider: thaiSegmenterProvider,
        includeMarkers: options.includeMarkers ?? true,
    });
}
/**
 * Pre-configured Thai clause segmenter
 *
 * Uses default settings with markers included.
 */
export const ThaiClauseSegmenter = createThaiClauseSegmenter({
    includeMarkers: true,
});
/**
 * Create Thai negation transformer
 *
 * Adds Thai negation words (ไม่, ไม่เคย, ไม่ได้) to clauses.
 * Requires ThaiClauseSegmenter to run first for clause-level negation.
 *
 * @param options - Configuration options
 * @returns Configured Thai negation transformer
 *
 * @example
 * ```typescript
 * import {
 *   createThaiClauseSegmenter,
 *   createThaiNegationTransformer
 * } from "glost-plugins-thai";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   createThaiClauseSegmenter(),
 *   createThaiNegationTransformer(),
 * ]);
 *
 * // "ผมชอบกาแฟ" → "ผมไม่ชอบกาแฟ"
 * ```
 */
export function createThaiNegationTransformer(options = {}) {
    const { style = "simple", ...rest } = options;
    return createNegationTransformerExtension({
        language: "th-TH",
        negationType: style === "emphatic" ? "emphatic" : "standard",
        mainClausesOnly: true,
        ...rest,
    });
}
/**
 * Pre-configured Thai negation transformer
 */
export const ThaiNegationTransformer = createThaiNegationTransformer();
//# sourceMappingURL=transformers.js.map