/**
 * Difficulty Generator Extension
 *
 * Generates difficulty levels for words using a provider.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { DifficultyProvider } from "./types.js";
import type { GlostLanguage } from "glost-common";
/**
 * Difficulty generator extension options
 */
export interface DifficultyGeneratorOptions {
    /**
     * Target language for difficulty assessment
     */
    targetLanguage: GlostLanguage;
    /**
     * Difficulty provider
     *
     * Provider that determines difficulty levels for words.
     * If not provided, the extension will skip processing.
     */
    provider?: DifficultyProvider;
    /**
     * Whether to skip words that already have difficulty data
     * @default true
     */
    skipExisting?: boolean;
}
/**
 * Create difficulty generator extension
 *
 * This extension augments word nodes with difficulty data by using a provider
 * to assess word difficulty. It populates the raw difficulty level that can
 * then be enhanced by the DifficultyEnhancerExtension.
 *
 * @param options - Extension options
 * @returns GLOST extension for difficulty generation
 *
 * @example
 * ```typescript
 * import { createDifficultyGeneratorExtension } from "glost-difficulty";
 * import { createThaiDifficultyProvider } from "glost-th/extensions";
 *
 * const provider = createThaiDifficultyProvider(wordLists);
 * const extension = createDifficultyGeneratorExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createDifficultyGeneratorExtension(options: DifficultyGeneratorOptions): GLOSTExtension;
//# sourceMappingURL=generator.d.ts.map