/**
 * glost-transcription
 *
 * Language-agnostic transcription extension for GLOST.
 *
 * This package provides the core transcription logic. Language-specific
 * implementations should be provided via the TranscriptionProvider interface.
 *
 * Language-specific providers should be in:
 * - glost-th/extensions (Thai RTGS, IPA)
 * - glost-ja/extensions (Japanese romaji, kana)
 * - glost-zh/extensions (Chinese pinyin)
 * etc.
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-plugins";
import type { GLOSTWord } from "glost";
import { getWordText } from "glost";

/**
 * Provider interface for transcription data
 *
 * Language-specific implementations should be provided by language packages
 * (e.g., glost-th/extensions, glost-ja/extensions)
 */
export interface TranscriptionProvider {
  /**
   * Get transcriptions for a word
   *
   * @param word - The word to transcribe
   * @param language - Language code
   * @returns Record of scheme name -> transcription string, or undefined if not available
   *
   * @example
   * ```typescript
   * // Thai example
   * getTranscriptions("สวัสดี", "th")
   * // Returns: { rtgs: "sawatdi", ipa: "sàwàtdii" }
   *
   * // Japanese example
   * getTranscriptions("こんにちは", "ja")
   * // Returns: { romaji: "konnichiwa", hiragana: "こんにちは" }
   * ```
   */
  getTranscriptions(
    word: string,
    language: string
  ): Promise<Record<string, string> | undefined>;
}

import type { GlostLanguage } from "glost-common";

/**
 * Transcription extension options
 */
export interface TranscriptionExtensionOptions {
  /**
   * Target language for transcriptions
   */
  targetLanguage: GlostLanguage;

  /**
   * Provider for language-specific transcription data
   *
   * Should be implemented by language packages:
   * - import { thaiTranscriptionProvider } from "glost-th/extensions"
   * - import { japaneseTranscriptionProvider } from "glost-ja/extensions"
   */
  provider: TranscriptionProvider;
}


/**
 * Create transcription extension
 *
 * This extension augments word nodes with transcription data using a provider.
 * It only populates transcriptions if they don't already exist.
 *
 * @param options - Extension options including provider
 * @returns GLOST extension for transcriptions
 *
 * @example
 * ```typescript
 * import { createTranscriptionExtension } from "glost-transcription";
 * import { thaiTranscriptionProvider } from "glost-th/extensions";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createTranscriptionExtension({
 *   targetLanguage: "th",
 *   provider: thaiTranscriptionProvider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 *
 * @example
 * ```typescript
 * // Japanese example
 * import { createTranscriptionExtension } from "glost-transcription";
 * import { japaneseTranscriptionProvider } from "glost-ja/extensions";
 *
 * const extension = createTranscriptionExtension({
 *   targetLanguage: "ja",
 *   provider: japaneseTranscriptionProvider
 * });
 * ```
 */
export function createTranscriptionExtension(
  options: TranscriptionExtensionOptions,
): GLOSTExtension {
  const { targetLanguage, provider } = options;

  if (!provider) {
    throw new Error(
      "[Transcription] Provider is required. " +
      "Import from language package: " +
      "import { thaiTranscriptionProvider } from 'glost-th/extensions'"
    );
  }

  return {
    id: "transcription",
    name: "Transcription",
    description:
      "Augments word nodes with transcription data via provider",
    visit: {
      word: async (node: GLOSTWord) => {
        // Skip if transcription already exists
        if (node.transcription && Object.keys(node.transcription).length > 0) {
          console.log(`[Transcription Extension] Skipping "${getWordText(node)}" - already has transcription`);
          return;
        }

        const wordText = getWordText(node);
        if (!wordText || wordText.trim() === "") {
          return;
        }

        // Clean word text (remove punctuation)
        const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");

        // Get language from node or use target language
        const nodeLanguage = node.lang || targetLanguage;
        console.log(`[Transcription Extension] Looking up transcription for: "${cleanWordText}" (lang: ${nodeLanguage}, target: ${targetLanguage})`);

        try {
          const transcriptions = await provider.getTranscriptions(
            cleanWordText,
            nodeLanguage
          );

          if (transcriptions && Object.keys(transcriptions).length > 0) {
            // Convert to GLOST transcription format
            // Note: system is the key, not stored in the value (v0.4.0+)
            const glostTranscription: Record<
              string,
              { text: string }
            > = {};
            for (const [system, text] of Object.entries(transcriptions)) {
              glostTranscription[system] = {
                text,
              };
            }
            node.transcription = glostTranscription;
            console.log(`[Transcription Extension] ✓ Added transcription for "${cleanWordText}"`);
          } else {
            console.log(`[Transcription Extension] ✗ No transcription found for "${cleanWordText}"`);
          }
        } catch (error) {
          // Silently fail - transcription lookup is optional
          console.debug(
            `[Transcription] Lookup failed for "${cleanWordText}":`,
            error,
          );
        }
      },
    },
    options: options as unknown as Record<string, unknown>,
  };
}
