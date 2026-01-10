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

import { createTranscriptionExtension, type TranscriptionProvider } from "glost-transcription";
import { THAI_TRANSCRIPTION_SCHEMES, isValidThaiTranscriptionScheme } from "glost-th/constants";
import { getThaiTranscriptions } from "./demo-data.js";

/**
 * Thai transcription provider implementation
 * 
 * This adapter:
 * 1. Uses glost-th constants for scheme validation
 * 2. Wraps demo data to match TranscriptionProvider interface
 * 3. Returns transcriptions in multiple schemes
 */
const thaiTranscriptionProvider: TranscriptionProvider = {
  async getTranscriptions(
    word: string,
    language: string
  ): Promise<Record<string, string> | undefined> {
    // Only process Thai language
    if (!language.startsWith("th")) {
      return undefined;
    }

    // Get transcriptions from demo data
    const transcriptions = getThaiTranscriptions(word);
    
    if (!transcriptions || Object.keys(transcriptions).length === 0) {
      return undefined;
    }

    return transcriptions;
  },
};

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
 * import { processGLOSTWithExtensionsAsync } from "glost-extensions";
 * 
 * const extension = createThaiTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createThaiTranscriptionExtension() {
  return createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProvider,
  });
}

// Export constants for convenience
export { THAI_TRANSCRIPTION_SCHEMES, isValidThaiTranscriptionScheme };
