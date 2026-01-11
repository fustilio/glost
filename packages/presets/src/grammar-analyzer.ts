/**
 * Grammar Analyzer Preset
 * 
 * Focus on grammatical analysis with POS tagging and clause segmentation.
 * 
 * @packageDocumentation
 */

import type { Preset } from "glost-processor";

/**
 * Grammar Analyzer Preset
 * 
 * Optimized for grammatical analysis and teaching.
 * 
 * Includes:
 * - Part-of-speech tagging
 * - Clause segmentation
 * - Gender (for applicable languages)
 * 
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { grammarAnalyzerPreset } from "glost-presets";
 * 
 * const processor = glost()
 *   .use(grammarAnalyzerPreset);
 * 
 * const result = await processor.process(document);
 * ```
 */
export const grammarAnalyzerPreset: Preset = {
  id: "grammar-analyzer",
  name: "Grammar Analyzer",
  description: "POS tagging and clause segmentation for grammar analysis",
  plugins: [
    "pos",
    "clause-segmenter",
    "gender",
  ],
};

/**
 * Create a customized grammar analyzer preset
 * 
 * @param options - Customization options
 * @returns Customized preset
 */
export function createGrammarAnalyzerPreset(options?: {
  includeGender?: boolean;
}): Preset {
  const {
    includeGender = true,
  } = options || {};

  const plugins: Preset["plugins"] = [
    "pos",
    "clause-segmenter",
  ];

  if (includeGender) {
    plugins.push("gender");
  }

  return {
    id: "grammar-analyzer-custom",
    name: "Grammar Analyzer (Custom)",
    description: "Customized grammar analyzer preset",
    plugins,
  };
}
