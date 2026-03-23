/**
 * Korean Transcription Extension Example
 *
 * Demonstrates how to combine:
 * - glost-ko: Korean language support
 * - glost-transcription: Transcription extension framework
 *
 * This is the X * Y pattern:
 * X = glost-ko (language-specific)
 * Y = glost-transcription (feature-specific)
 */
/**
 * Create Korean transcription extension
 *
 * This combines glost-ko + glost-transcription to provide
 * Korean-specific transcription functionality.
 *
 * @returns Configured transcription extension for Korean
 *
 * @example
 * ```typescript
 * import { createKoreanTranscriptionExtension } from "./korean-transcription.js";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createKoreanTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createKoreanTranscriptionExtension(): any;
//# sourceMappingURL=index.d.ts.map