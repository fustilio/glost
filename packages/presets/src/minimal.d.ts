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
export declare const minimalPreset: Preset;
/**
 * Create a customized minimal preset
 *
 * @param options - Customization options
 * @returns Customized preset
 */
export declare function createMinimalPreset(options?: {
    transcriptionScheme?: string;
    translationTarget?: string;
}): Preset;
//# sourceMappingURL=minimal.d.ts.map