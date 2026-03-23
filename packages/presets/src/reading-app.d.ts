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
export declare const readingAppPreset: Preset;
/**
 * Create a customized reading app preset
 *
 * @param options - Customization options
 * @returns Customized preset
 */
export declare function createReadingAppPreset(options?: {
    transcriptionScheme?: string;
    translationTarget?: string;
    includeClauseSegmenter?: boolean;
}): Preset;
//# sourceMappingURL=reading-app.d.ts.map