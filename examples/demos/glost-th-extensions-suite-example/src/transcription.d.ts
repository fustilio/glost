/**
 * Thai Transcription Extension
 *
 * Language-specific extension for augmenting GLOST word nodes with Thai transcriptions.
 * Uses demo transcription data wrapped to match the glost-transcription interface.
 *
 * This is an example implementation demonstrating how to create transcription extensions.
 * Real implementations would use comprehensive dictionary data.
 *
 * @packageDocumentation
 */
/**
 * Create Thai transcription extension
 *
 * This extension augments word nodes with Thai transcription data using
 * demo vocabulary data. This is an example implementation.
 *
 * @returns GLOST extension for Thai transcriptions
 *
 * @example
 * ```typescript
 * import { createThaiTranscriptionExtension } from "glost-plugins-thai";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createThaiTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createThaiTranscriptionExtension(): any;
//# sourceMappingURL=transcription.d.ts.map