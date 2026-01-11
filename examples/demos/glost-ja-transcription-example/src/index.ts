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

import { createTranscriptionExtension, type TranscriptionProvider } from "glost-transcription";
import { getJapaneseTranscriptions } from "./demo-data.js";

/**
 * Japanese transcription provider implementation
 */
const japaneseTranscriptionProvider: TranscriptionProvider = {
  async getTranscriptions(
    word: string,
    language: string
  ): Promise<Record<string, string> | undefined> {
    // Only process Japanese language
    if (!language.startsWith("ja")) {
      return undefined;
    }

    // Get transcriptions from demo data
    const transcriptions = getJapaneseTranscriptions(word);
    
    if (!transcriptions || Object.keys(transcriptions).length === 0) {
      return undefined;
    }

    return transcriptions;
  },
};

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
 * import { processGLOSTWithExtensionsAsync } from "glost-extensions";
 * 
 * const extension = createJapaneseTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createJapaneseTranscriptionExtension() {
  return createTranscriptionExtension({
    targetLanguage: "ja",
    provider: japaneseTranscriptionProvider,
  });
}
