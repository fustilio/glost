/**
 * Thai-specific Transformer Extensions
 *
 * Pre-configured transformer extensions optimized for Thai language learning.
 * Leverages the base extensions from glost-plugins with Thai-specific
 * configurations.
 *
 * @packageDocumentation
 */
import { type GenderTransformerOptions, type NegationTransformerOptions, type GLOSTExtension } from "glost-plugins";
import { type ClauseSegmenterOptions } from "glost-clause-segmenter";
import { type ThaiSyllableSegmenterOptions } from "./syllable-segmenter";
/**
 * Options for Thai syllable segmentation
 */
export interface ThaiSyllableOptions extends Partial<ThaiSyllableSegmenterOptions> {
    /**
     * Whether to include detailed character breakdown
     * @default true for learning mode, false for compact mode
     */
    detailedBreakdown?: boolean;
}
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
export declare function createThaiSyllableSegmenter(options?: ThaiSyllableOptions): GLOSTExtension;
/**
 * Pre-configured Thai syllable segmenter for learning
 */
export declare const ThaiSyllableSegmenter: GLOSTExtension;
/**
 * Options for Thai gender transformation
 */
export interface ThaiGenderOptions extends Partial<GenderTransformerOptions> {
    /**
     * Which gender perspective to use
     * @default "both" for showing toggle UI
     */
    perspective?: "male" | "female" | "both";
}
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
export declare function createThaiGenderTransformer(options?: ThaiGenderOptions): GLOSTExtension;
/**
 * Pre-configured Thai gender transformer (toggle mode)
 */
export declare const ThaiGenderTransformer: GLOSTExtension;
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
export declare function createThaiClauseSegmenter(options?: Partial<ClauseSegmenterOptions>): GLOSTExtension;
/**
 * Pre-configured Thai clause segmenter
 *
 * Uses default settings with markers included.
 */
export declare const ThaiClauseSegmenter: GLOSTExtension;
/**
 * Options for Thai negation
 */
export interface ThaiNegationOptions extends Partial<NegationTransformerOptions> {
    /**
     * Style of negation
     * - "simple": ไม่ (not)
     * - "emphatic": ไม่เคย (never)
     * - "past": ไม่ได้ (didn't)
     * @default "simple"
     */
    style?: "simple" | "emphatic" | "past";
}
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
export declare function createThaiNegationTransformer(options?: ThaiNegationOptions): GLOSTExtension;
/**
 * Pre-configured Thai negation transformer
 */
export declare const ThaiNegationTransformer: GLOSTExtension;
//# sourceMappingURL=transformers.d.ts.map