/**
 * Reading Score Extension
 *
 * Calculates a composite reading score based on frequency and difficulty.
 * Demonstrates extension stacking with proper dependency validation.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "../types.js";
/**
 * Reading score metadata structure
 *
 * @since 0.0.2
 */
export interface ReadingScoreMetadata {
    /** Composite reading score (1-4 scale, lower is easier) */
    score: number;
    /** Human-readable difficulty label */
    label: "easy" | "moderate" | "challenging" | "difficult";
    /** Color identifier for UI styling */
    color: string;
}
/**
 * Options for the Reading Score extension
 *
 * @since 0.0.2
 */
export interface ReadingScoreOptions {
    /**
     * Weight for frequency in the composite score (0-1)
     * Default: 0.4
     */
    frequencyWeight?: number;
    /**
     * Weight for difficulty in the composite score (0-1)
     * Default: 0.6
     */
    difficultyWeight?: number;
}
/**
 * Create a Reading Score extension
 *
 * This extension calculates a composite reading difficulty score
 * based on word frequency and difficulty level. It demonstrates
 * how extensions can build upon other extensions.
 *
 * **REQUIRES**: frequency and difficulty extensions to run first.
 *
 * @param options - Configuration options
 * @returns A configured GLOSTExtension
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import { createReadingScoreExtension } from "glost-extensions/extensions/reading-score";
 * import { createFrequencyExtension } from "glost-frequency";
 * import { createDifficultyExtension } from "glost-difficulty";
 *
 * // These extensions are now in separate packages
 * const [freqGen, freqEnh] = createFrequencyExtension({ targetLanguage: "en", provider });
 * const [diffGen, diffEnh] = createDifficultyExtension({ targetLanguage: "en", provider });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   freqGen, freqEnh,
 *   diffGen, diffEnh,
 *   createReadingScoreExtension({ frequencyWeight: 0.3, difficultyWeight: 0.7 }),
 * ]);
 *
 * // Access reading score on words
 * const word = result.document.children[0].children[0].children[0];
 * console.log(word.extras?.readingScore);
 * // { score: 2.1, label: "moderate", color: "blue" }
 * ```
 *
 * @since 0.0.2
 */
export declare function createReadingScoreExtension(options?: ReadingScoreOptions): GLOSTExtension;
/**
 * Pre-configured Reading Score extension with default options
 *
 * Uses default weights: 40% frequency, 60% difficulty.
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import { ReadingScoreExtension } from "glost-extensions/extensions";
 * import { createFrequencyExtension } from "glost-frequency";
 * import { createDifficultyExtension } from "glost-difficulty";
 *
 * // These extensions are now in separate packages
 * const [freqGen, freqEnh] = createFrequencyExtension({ targetLanguage: "en", provider });
 * const [diffGen, diffEnh] = createDifficultyExtension({ targetLanguage: "en", provider });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   freqGen, freqEnh,
 *   diffGen, diffEnh,
 *   ReadingScoreExtension,
 * ]);
 * ```
 *
 * @since 0.0.2
 */
export declare const ReadingScoreExtension: GLOSTExtension;
//# sourceMappingURL=reading-score.d.ts.map