/**
 * Thai Transcription Extension
 * 
 * Combines glost-transcription framework with Thai transcription data.
 * This demonstrates the X * Y pattern: glost-th + glost-transcription.
 */

import {
  createTranscriptionExtension,
  type TranscriptionProvider,
} from "glost-transcription";
import { getThaiTranscriptions } from "../demo-data/transcription-data.js";

/**
 * Thai transcription provider implementation
 * 
 * Provides transcriptions in multiple schemes: RTGS, IPA, Paiboon+, AUA
 */
export const thaiTranscriptionProvider: TranscriptionProvider = {
  async getTranscriptions(
    word: string,
    language: string
  ): Promise<Record<string, string> | undefined> {
    // Only handle Thai words
    if (language !== "th" && language !== "th-TH") {
      return undefined;
    }

    // Look up transcriptions from demo data
    return getThaiTranscriptions(word);
  },
};

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
export function createThaiTranscriptionExtension() {
  return createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProvider,
  });
}
