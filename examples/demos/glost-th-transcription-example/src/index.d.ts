/**
 * Thai Transcription Extension Example
 *
 * Demonstrates how to combine:
 * - glost-th: Thai language constants and utilities
 * - glost-transcription: Transcription extension framework
 *
 * This is the X * Y pattern:
 * X = glost-th (language-specific)
 * Y = glost-transcription (feature-specific)
 */
import { THAI_TRANSCRIPTION_SCHEMES, isValidThaiTranscriptionScheme } from "glost-th/constants";
/**
 * Create Thai transcription extension
 *
 * This combines glost-th + glost-transcription to provide
 * Thai-specific transcription functionality.
 *
 * @returns Configured transcription extension for Thai
 *
 * @example
 * ```typescript
 * import { createThaiTranscriptionExtension } from "./thai-transcription.js";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createThaiTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createThaiTranscriptionExtension(): any;
export { THAI_TRANSCRIPTION_SCHEMES, isValidThaiTranscriptionScheme };
//# sourceMappingURL=index.d.ts.map