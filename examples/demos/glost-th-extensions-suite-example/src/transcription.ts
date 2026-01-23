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

import {
  createTranscriptionExtension,
  type TranscriptionProvider,
} from "glost-transcription";
import { getDemoThaiTranscriptions } from "./demo-data.js";

/**
 * Adapter that wraps demo transcription provider to match
 * the glost-transcription TranscriptionProvider interface.
 *
 * Demo provider interface:
 *   getTranscriptions(text: string, schemes?: string[]): Record<string, string>
 *
 * glost-transcription interface:
 *   getTranscriptions(word: string, language: string): Promise<Record<string, string> | undefined>
 */
const thaiTranscriptionProviderAdapter: TranscriptionProvider = {
  async getTranscriptions(
    word: string,
    language: string
  ): Promise<Record<string, string> | undefined> {
    // Only process Thai language
    if (!language.startsWith("th")) {
      return undefined;
    }

    // Normalize word (trim whitespace) before lookup
    const normalizedWord = word.trim();
    if (!normalizedWord) {
      return undefined;
    }

    // Use demo Thai transcription provider from glost-th
    // In a real implementation, this would use comprehensive dictionary data
    const transcriptions = getDemoThaiTranscriptions(normalizedWord);

    // Debug logging
    if (!transcriptions || Object.keys(transcriptions).length === 0) {
      console.log(`[Transcription] No transcription found for: "${normalizedWord}"`);
      return undefined;
    }

    console.log(`[Transcription] Found transcription for: "${normalizedWord}" -> ${transcriptions.rtgs || 'N/A'}`);
    return transcriptions;
  },
};

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
export function createThaiTranscriptionExtension() {
  return createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProviderAdapter,
  });
}
