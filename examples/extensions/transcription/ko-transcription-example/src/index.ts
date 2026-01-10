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

import { createTranscriptionExtension, type TranscriptionProvider } from "glost-transcription";
import { getKoreanTranscriptions } from "./demo-data.js";

/**
 * Korean transcription provider implementation
 */
const koreanTranscriptionProvider: TranscriptionProvider = {
  async getTranscriptions(
    word: string,
    language: string
  ): Promise<Record<string, string> | undefined> {
    // Only process Korean language
    if (!language.startsWith("ko")) {
      return undefined;
    }

    // Get transcriptions from demo data
    const transcriptions = getKoreanTranscriptions(word);
    
    if (!transcriptions || Object.keys(transcriptions).length === 0) {
      return undefined;
    }

    return transcriptions;
  },
};

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
 * import { processGLOSTWithExtensionsAsync } from "glost-extensions";
 * 
 * const extension = createKoreanTranscriptionExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createKoreanTranscriptionExtension() {
  return createTranscriptionExtension({
    targetLanguage: "ko",
    provider: koreanTranscriptionProvider,
  });
}
