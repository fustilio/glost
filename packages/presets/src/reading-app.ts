/**
 * Reading App Preset
 * 
 * Interactive reading features including transcription, translation,
 * and clause segmentation.
 * 
 * @packageDocumentation
 */

import type { Preset } from "glost-processor";

/**
 * Reading App Preset
 * 
 * Optimized for interactive reading applications.
 * 
 * Includes:
 * - Transcription
 * - Translation
 * - Clause segmentation
 * 
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { readingAppPreset } from "glost-presets";
 * 
 * const processor = glost()
 *   .use(readingAppPreset);
 * 
 * const result = await processor.process(document);
 * ```
 */
export const readingAppPreset: Preset = {
  id: "reading-app",
  name: "Reading App",
  description: "Interactive reading features with transcription, translation, and clause segmentation",
  plugins: [
    ["transcription", { scheme: "auto" }],
    ["translation", { target: "en" }],
    "clause-segmenter",
  ],
};

/**
 * Create a customized reading app preset
 * 
 * @param options - Customization options
 * @returns Customized preset
 */
export function createReadingAppPreset(options?: {
  transcriptionScheme?: string;
  translationTarget?: string;
  includeClauseSegmenter?: boolean;
}): Preset {
  const {
    transcriptionScheme = "auto",
    translationTarget = "en",
    includeClauseSegmenter = true,
  } = options || {};

  const plugins: Preset["plugins"] = [
    ["transcription", { scheme: transcriptionScheme }],
    ["translation", { target: translationTarget }],
  ];

  if (includeClauseSegmenter) {
    plugins.push("clause-segmenter");
  }

  return {
    id: "reading-app-custom",
    name: "Reading App (Custom)",
    description: "Customized reading app preset",
    plugins,
  };
}
