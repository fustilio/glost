/**
 * Thai transcription provider for glost-transcription extension
 * 
 * @packageDocumentation
 */

import type { TranscriptionProvider } from "glost-transcription";

/**
 * Thai transcription provider (skeleton)
 * 
 * This is a skeleton implementation. Real implementation should:
 * - Connect to Thai dictionary/corpus with transcription data
 * - Support RTGS, IPA, Paiboon, etc.
 * - Handle Thai-specific cases
 * 
 * @example
 * ```typescript
 * import { createTranscriptionExtension } from "glost-transcription";
 * import { thaiTranscriptionProvider } from "glost-th/extensions";
 * 
 * const ext = createTranscriptionExtension({
 *   targetLanguage: "th",
 *   provider: thaiTranscriptionProvider
 * });
 * ```
 */
export const thaiTranscriptionProvider: TranscriptionProvider = {
  async getTranscriptions(word: string, language: string) {
    if (!language.startsWith("th")) {
      return undefined;
    }
    
    // TODO: Implement with real Thai dictionary/transcription service
    // This is a skeleton - needs actual implementation
    
    // Example return format:
    // return {
    //   rtgs: "sawatdii",
    //   ipa: "sàwàtdii",
    //   paiboon: "sà-wàt-dii"
    // };
    
    console.warn("[Thai Transcription] Provider not fully implemented");
    return undefined;
  }
};
