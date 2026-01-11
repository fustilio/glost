/**
 * Minimal Preset
 * 
 * Just the essentials: transcription and translation.
 * 
 * @packageDocumentation
 */

import type { Preset } from "glost-processor";

/**
 * Minimal Preset
 * 
 * Lightweight preset with just transcription and translation.
 * 
 * Includes:
 * - Transcription
 * - Translation
 * 
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { minimalPreset } from "glost-presets";
 * 
 * const processor = glost()
 *   .use(minimalPreset);
 * 
 * const result = await processor.process(document);
 * ```
 */
export const minimalPreset: Preset = {
  id: "minimal",
  name: "Minimal",
  description: "Just transcription and translation - the essentials",
  plugins: [
    ["transcription", { scheme: "auto" }],
    ["translation", { target: "en" }],
  ],
};

/**
 * Create a customized minimal preset
 * 
 * @param options - Customization options
 * @returns Customized preset
 */
export function createMinimalPreset(options?: {
  transcriptionScheme?: string;
  translationTarget?: string;
}): Preset {
  const {
    transcriptionScheme = "auto",
    translationTarget = "en",
  } = options || {};

  return {
    id: "minimal-custom",
    name: "Minimal (Custom)",
    description: "Customized minimal preset",
    plugins: [
      ["transcription", { scheme: transcriptionScheme }],
      ["translation", { target: translationTarget }],
    ],
  };
}
