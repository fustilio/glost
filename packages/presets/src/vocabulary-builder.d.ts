/**
 * Vocabulary Builder Preset
 *
 * Focus on word frequency and difficulty for vocabulary learning.
 *
 * @packageDocumentation
 */
import type { Preset } from "glost-processor";
/**
 * Vocabulary Builder Preset
 *
 * Optimized for vocabulary learning and word prioritization.
 *
 * Includes:
 * - Frequency data
 * - Difficulty levels
 * - Translation
 *
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { vocabularyBuilderPreset } from "glost-presets";
 *
 * const processor = glost()
 *   .use(vocabularyBuilderPreset);
 *
 * const result = await processor.process(document);
 * ```
 */
export declare const vocabularyBuilderPreset: Preset;
/**
 * Create a customized vocabulary builder preset
 *
 * @param options - Customization options
 * @returns Customized preset
 */
export declare function createVocabularyBuilderPreset(options?: {
    translationTarget?: string;
    includeTranslation?: boolean;
}): Preset;
//# sourceMappingURL=vocabulary-builder.d.ts.map