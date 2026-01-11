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
export const languageLearningPreset: Preset = {
  id: "language-learning",
  name: "Language Learning",
  description: "Complete language learning stack with transcription, translation, frequency, difficulty, and POS",
  plugins: [
    ["transcription", { scheme: "auto" }],
    ["translation", { target: "en" }],
    "frequency",
    "difficulty",
    "pos",
  ],
};

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
export function createLanguageLearningPreset(options?: {
  transcriptionScheme?: string;
  translationTarget?: string;
  includeFrequency?: boolean;
  includeDifficulty?: boolean;
  includePos?: boolean;
}): Preset {
  const {
    transcriptionScheme = "auto",
    translationTarget = "en",
    includeFrequency = true,
    includeDifficulty = true,
    includePos = true,
  } = options || {};

  const plugins: Preset["plugins"] = [
    ["transcription", { scheme: transcriptionScheme }],
    ["translation", { target: translationTarget }],
  ];

  if (includeFrequency) {
    plugins.push("frequency");
  }

  if (includeDifficulty) {
    plugins.push("difficulty");
  }

  if (includePos) {
    plugins.push("pos");
  }

  return {
    id: "language-learning-custom",
    name: "Language Learning (Custom)",
    description: "Customized language learning preset",
    plugins,
  };
}
