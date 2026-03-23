/**
 * Language Learning Preset
 *
 * Complete language learning stack with transcription, translation,
 * frequency, difficulty, and POS tagging.
 *
 * @packageDocumentation
 */
import type { Preset } from "glost-processor";
/**
 * Language Learning Preset
 *
 * Full-featured preset for language learning applications.
 *
 * Includes:
 * - Transcription (with configurable scheme)
 * - Translation (with configurable target)
 * - Frequency data
 * - Difficulty levels
 * - Part-of-speech tagging
 *
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { languageLearningPreset } from "glost-presets";
 *
 * const processor = glost()
 *   .use(languageLearningPreset);
 *
 * const result = await processor.process(document);
 * ```
 */
export declare const languageLearningPreset: Preset;
/**
 * Create a customized language learning preset
 *
 * @param options - Customization options
 * @returns Customized preset
 *
 * @example
 * ```typescript
 * import { createLanguageLearningPreset } from "glost-presets";
 *
 * const preset = createLanguageLearningPreset({
 *   transcriptionScheme: "ipa",
 *   translationTarget: "es",
 *   includePos: false
 * });
 * ```
 */
export declare function createLanguageLearningPreset(options?: {
    transcriptionScheme?: string;
    translationTarget?: string;
    includeFrequency?: boolean;
    includeDifficulty?: boolean;
    includePos?: boolean;
}): Preset;
//# sourceMappingURL=language-learning.d.ts.map