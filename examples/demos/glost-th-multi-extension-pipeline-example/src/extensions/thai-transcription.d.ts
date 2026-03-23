/**
 * Thai Transcription Extension
 *
 * Combines glost-transcription framework with Thai transcription data.
 * This demonstrates the X * Y pattern: glost-th + glost-transcription.
 */
import { type TranscriptionProvider } from "glost-transcription";
/**
 * Thai transcription provider implementation
 *
 * Provides transcriptions in multiple schemes: RTGS, IPA, Paiboon+, AUA
 */
export declare const thaiTranscriptionProvider: TranscriptionProvider;
/**
 * Create Thai transcription extension
 *
 * Pre-configured extension for Thai transcriptions.
 * Supports RTGS, IPA, Paiboon+, and AUA schemes.
 *
 * @returns Thai transcription extension
 *
 * @example
 * ```typescript
 * import { createThaiTranscriptionExtension } from "./extensions/thai-transcription";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createThaiTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createThaiTranscriptionExtension(): any;
//# sourceMappingURL=thai-transcription.d.ts.map