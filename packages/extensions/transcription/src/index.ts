/**
 * Transcription Extension
 *
 * Augments word nodes with transcription data using dictionary lookup.
 * This extension can be composed with other extensions like translation.
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import { getWordText } from "glost";
import type { GlostLanguage } from "glost-common";

/**
 * Transcription extension options
 */
export interface TranscriptionExtensionOptions {
  /**
   * Target language for transcriptions
   *
   * The ISO-639-1 language code for which to look up transcriptions (e.g., "th", "fr", "ja").
   */
  targetLanguage: GlostLanguage;

  /**
   * Lookup function for transcriptions
   *
   * Function that looks up transcriptions for a given word and language.
   * Returns a record mapping transcription scheme names to transcription strings.
   * If not provided, the extension will skip processing.
   *
   * @param word - The word to look up
   * @param language - The ISO-639-1 language code
   * @returns Record of transcription scheme -> transcription string, or empty object if not found
   */
  lookupTranscription?: (
    word: string,
    language: GlostLanguage,
  ) => Promise<Record<string, string>>;
}

/**
 * Create transcription extension
 *
 * This extension augments word nodes with transcription data by looking up
 * transcriptions from the dictionary. It only populates transcriptions if
 * they don't already exist.
 *
 * @param options - Extension options
 * @returns GLOST extension for transcriptions
 *
 * @example
 * ```typescript
 * import { createTranscriptionExtension } from "glost-extensions-transcription";
 * import { processGLOSTWithExtensionsAsync } from "glost-extensions/processor";
 * import type { GlostLanguage } from "glost-common";
 *
 * // Provide your own lookup function (e.g., from a dictionary service)
 * async function lookupTranscription(word: string, lang: GlostLanguage): Promise<Record<string, string>> {
 *   // Your transcription lookup implementation
 *   return { "ipa": "transcription", "rtgs": "romanization" };
 * }
 *
 * const extension = createTranscriptionExtension({
 *   targetLanguage: "th",
 *   lookupTranscription
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createTranscriptionExtension(
  options: TranscriptionExtensionOptions,
): GLOSTExtension {
  const { lookupTranscription } = options;

  return {
    id: "transcription",
    name: "Transcription",
    description:
      "Augments word nodes with transcription data using dictionary lookup",
    visit: {
      word: async (node: GLOSTWord) => {
        // Skip if no lookup function provided
        if (!lookupTranscription) {
          console.warn(
            "[Transcription Extension] No lookupTranscription function provided, skipping processing",
          );
          return;
        }

        // Skip if transcription already exists
        if (node.transcription && Object.keys(node.transcription).length > 0) {
          return;
        }

        const wordText = getWordText(node);
        if (!wordText || wordText.trim() === "") {
          return;
        }

        // Clean word text (remove punctuation)
        const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");

        try {
          const transcriptions = await lookupTranscription(
            cleanWordText,
            options.targetLanguage,
          );

          if (transcriptions && Object.keys(transcriptions).length > 0) {
            // Convert to GLOST transcription format
            const glostTranscription: Record<
              string,
              { text: string; system: string }
            > = {};
            for (const [system, text] of Object.entries(transcriptions)) {
              glostTranscription[system] = {
                text,
                system,
              };
            }
            node.transcription = glostTranscription;
          }
        } catch (error) {
          // Silently fail - transcription lookup is optional
          console.debug(
            `[Transcription Extension] Transcription lookup failed for "${cleanWordText}":`,
            error,
          );
        }
      },
    },
    options: options as unknown as Record<string, unknown>,
  };
}

/**
 * Default transcription extension (requires options to be passed via processor options)
 *
 * This is a convenience export, but you should use `createTranscriptionExtension`
 * with explicit options for better type safety.
 */
export const TranscriptionExtension: GLOSTExtension = {
  id: "transcription",
  name: "Transcription",
  description:
    "Augments word nodes with transcription data using dictionary lookup",
};
