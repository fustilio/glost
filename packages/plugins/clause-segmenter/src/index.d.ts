/**
 * glost-clause-segmenter
 *
 * Language-agnostic clause segmentation extension for GLOST.
 *
 * This package provides the core segmentation logic. Language-specific
 * implementations should be provided via the ClauseSegmenterProvider interface.
 *
 * Language-specific providers should be in:
 * - glost-en/segmenter (English)
 * - glost-th/segmenter (Thai)
 * - glost-ja/segmenter (Japanese)
 * etc.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { GlostLanguage } from "glost-common";
export type { ClauseType, GrammaticalMood, ClauseBoundary, SegmentationResult, ClauseSegmenterProvider, } from "./types.js";
import type { ClauseSegmenterProvider } from "./types.js";
/**
 * Clause segmenter extension options
 */
export interface ClauseSegmenterOptions {
    /**
     * Target language for segmentation
     */
    targetLanguage: GlostLanguage;
    /**
     * Provider for language-specific segmentation rules
     *
     * Should be implemented by language packages:
     * - import { englishSegmenterProvider } from "glost-en/segmenter"
     * - import { thaiSegmenterProvider } from "glost-th/segmenter"
     */
    provider: ClauseSegmenterProvider;
    /**
     * Whether to include markers/conjunctions in clause nodes
     * @default true
     */
    includeMarkers?: boolean;
}
/**
 * Create clause segmenter extension
 *
 * This extension transforms sentences into clause structures based on
 * language-specific markers provided by the segmenter provider.
 *
 * @param options - Extension options including provider
 * @returns GLOST extension for clause segmentation
 *
 * @example
 * ```typescript
 * import { createClauseSegmenterExtension } from "glost-clause-segmenter";
 * import { englishSegmenterProvider } from "glost-en/segmenter";
 *
 * const segmenter = createClauseSegmenterExtension({
 *   targetLanguage: "en",
 *   provider: englishSegmenterProvider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [segmenter]);
 * ```
 *
 * @example
 * ```typescript
 * // Thai example
 * import { createClauseSegmenterExtension } from "glost-clause-segmenter";
 * import { thaiSegmenterProvider } from "glost-th/segmenter";
 *
 * const segmenter = createClauseSegmenterExtension({
 *   targetLanguage: "th",
 *   provider: thaiSegmenterProvider
 * });
 * ```
 */
export declare function createClauseSegmenterExtension(options: ClauseSegmenterOptions): GLOSTExtension;
//# sourceMappingURL=index.d.ts.map