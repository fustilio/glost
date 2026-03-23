/**
 * Japanese Transcription Extension Example
 *
 * Demonstrates how to combine:
 * - glost-ja: Japanese language support
 * - glost-transcription: Transcription extension framework
 *
 * This is the X * Y pattern:
 * X = glost-ja (language-specific)
 * Y = glost-transcription (feature-specific)
 */
/**
 * Create Japanese transcription extension
 *
 * This combines glost-ja + glost-transcription to provide
 * Japanese-specific transcription functionality.
 *
 * @returns Configured transcription extension for Japanese
 *
 * @example
 * ```typescript
 * import { createJapaneseTranscriptionExtension } from "./japanese-transcription.js";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createJapaneseTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createJapaneseTranscriptionExtension(): any;
//# sourceMappingURL=index.d.ts.map