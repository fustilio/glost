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
export const vocabularyBuilderPreset: Preset = {
  id: "vocabulary-builder",
  name: "Vocabulary Builder",
  description: "Word frequency and difficulty for vocabulary prioritization",
  plugins: [
    "frequency",
    "difficulty",
    ["translation", { target: "en" }],
  ],
};

/**
 * Create a customized vocabulary builder preset
 * 
 * @param options - Customization options
 * @returns Customized preset
 */
export function createVocabularyBuilderPreset(options?: {
  translationTarget?: string;
  includeTranslation?: boolean;
}): Preset {
  const {
    translationTarget = "en",
    includeTranslation = true,
  } = options || {};

  const plugins: Preset["plugins"] = [
    "frequency",
    "difficulty",
  ];

  if (includeTranslation) {
    plugins.push(["translation", { target: translationTarget }]);
  }

  return {
    id: "vocabulary-builder-custom",
    name: "Vocabulary Builder (Custom)",
    description: "Customized vocabulary builder preset",
    plugins,
  };
}
