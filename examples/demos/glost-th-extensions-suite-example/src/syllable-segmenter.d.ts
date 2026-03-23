/**
 * Thai Syllable Segmenter Extension
 *
 * Transforms Thai words into syllable nodes with simplified phonological structure.
 * This is a demo implementation using Intl.Segmenter for basic segmentation.
 *
 * Real implementations would use sophisticated DFA-based segmentation with
 * detailed phonological analysis (e.g., @fustilio/th-syllables).
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
/**
 * Thai Syllable Segmenter options
 */
export interface ThaiSyllableSegmenterOptions {
    /**
     * Whether to segment all Thai words or only words with specific language tags
     * @default true
     */
    segmentAllThai?: boolean;
    /**
     * Whether to include detailed character-level breakdown
     * @default true
     */
    includeCharacters?: boolean;
    /**
     * Whether to compute tone numbers from syllable structure
     * @default true
     */
    computeTones?: boolean;
}
/**
 * Create Thai Syllable Segmenter extension
 *
 * Creates a transformer extension that segments Thai words into syllables
 * with simplified phonological structure. This is a demo implementation
 * using Intl.Segmenter for basic segmentation.
 *
 * Real implementations would use sophisticated DFA-based segmentation
 * (e.g., @fustilio/th-syllables) for accurate syllable boundaries and
 * detailed phonological analysis.
 *
 * @param options - Extension configuration options
 * @returns Configured Thai syllable segmenter extension
 *
 * @example
 * ```typescript
 * import { createThaiSyllableSegmenterExtension } from "glost-plugins-thai";
 *
 * const extension = createThaiSyllableSegmenterExtension({
 *   segmentAllThai: true,
 *   includeCharacters: true,
 *   computeTones: true,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [extension]);
 *
 * // Result:
 * // Word("สวัสดี") becomes segmented into syllables with tone information
 * ```
 *
 * @see {@link ThaiSyllableSegmenterExtension} - Default extension
 *
 * @since 0.0.1
 */
export declare function createThaiSyllableSegmenterExtension(options?: ThaiSyllableSegmenterOptions): GLOSTExtension;
/**
 * Default Thai Syllable Segmenter extension
 *
 * Pre-configured syllable segmenter with default options.
 * Use this for standard Thai syllable segmentation, or create a custom
 * extension with `createThaiSyllableSegmenterExtension()` for advanced use cases.
 *
 * @example
 * ```typescript
 * import { ThaiSyllableSegmenterExtension } from "glost-plugins-thai";
 * import { processGLOSTWithExtensions } from "glost-plugins";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   ThaiSyllableSegmenterExtension,
 * ]);
 *
 * // All Thai words in the document will be segmented into syllables
 * ```
 *
 * @see {@link createThaiSyllableSegmenterExtension} - Create custom extension
 *
 * @since 0.0.1
 */
export declare const ThaiSyllableSegmenterExtension: GLOSTExtension;
//# sourceMappingURL=syllable-segmenter.d.ts.map