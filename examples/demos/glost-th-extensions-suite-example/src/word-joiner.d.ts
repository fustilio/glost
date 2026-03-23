/**
 * Thai Word Joiner Extension
 *
 * Transforms Thai word chunks (from Intl.Segmenter) into composite words
 * by checking if combined forms exist in the dictionary.
 *
 * Example: ซู + เปอร์ + มาร์เก็ต → ซูปอร์มาร์เก็ต
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
/**
 * Options for Thai word joiner extension
 */
export interface ThaiWordJoinerOptions {
    /**
     * Maximum number of consecutive words to try combining
     * @default 4
     */
    maxCombinationLength?: number;
    /**
     * Minimum number of words to combine (must be at least 2)
     * @default 2
     */
    minCombinationLength?: number;
    /**
     * Whether to process all Thai words or only words with specific language tags
     * @default true
     */
    processAllThai?: boolean;
}
/**
 * Create Thai Word Joiner extension
 *
 * Creates a transformer extension that combines consecutive Thai word chunks
 * into composite words by checking if the combined form exists in the dictionary.
 *
 * @param options - Extension configuration options
 * @returns Configured Thai word joiner extension
 *
 * @example
 * ```typescript
 * import { createThaiWordJoinerExtension } from "glost-plugins-thai";
 *
 * const extension = createThaiWordJoinerExtension({
 *   maxCombinationLength: 4,
 *   minCombinationLength: 2,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [extension]);
 *
 * // Result:
 * // Words: ["ซู", "เปอร์", "มาร์เก็ต"] becomes:
 * // Word("ซูปอร์มาร์เก็ต", level: "compound")
 * ```
 */
export declare function createThaiWordJoinerExtension(options?: ThaiWordJoinerOptions): GLOSTExtension;
/**
 * Default Thai Word Joiner extension
 *
 * Pre-configured word joiner with default options.
 */
export declare const ThaiWordJoinerExtension: GLOSTExtension;
//# sourceMappingURL=word-joiner.d.ts.map