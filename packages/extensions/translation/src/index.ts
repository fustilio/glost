/**
 * Translation Extension
 *
 * Augments word nodes with translation data using dictionary lookup.
 * This extension can be composed with other extensions like transcription.
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "@glost/extensions";
import type { GLOSTWord } from "@glost/core";
import { getWordText } from "@glost/core";
import type { GlostLanguage } from "@glost/common";

/**
 * Translation extension options
 */
export interface TranslationExtensionOptions {
  /**
   * Target language for translations
   *
   * The ISO-639-1 language code for which to look up translations (e.g., "th", "fr", "ja").
   */
  targetLanguage: GlostLanguage;

  /**
   * Native language (default: "en")
   *
   * The ISO-639-1 language code for native/fallback translations.
   */
  nativeLanguage?: GlostLanguage;

  /**
   * Lookup function for translations
   *
   * Function that looks up translations/definitions for a given word and language.
   * Returns the translation string if found, undefined otherwise.
   * If not provided, the extension will skip processing.
   *
   * @param word - The word to look up
   * @param language - The ISO-639-1 language code
   * @returns Translation string if found, undefined otherwise
   */
  lookupTranslation?: (
    word: string,
    language: GlostLanguage,
  ) => Promise<string | undefined>;
}

/**
 * Create translation extension
 *
 * This extension augments word nodes with translation data by looking up
 * translations from the dictionary. It only populates translations if
 * they don't already exist.
 *
 * @param options - Extension options
 * @returns GLOST extension for translations
 *
 * @example
 * ```typescript
 * import { createTranslationExtension } from "@glost/extensions-translation";
 * import { processGLOSTWithExtensionsAsync } from "@glost/extensions/processor";
 * import type { GlostLanguage } from "@glost/common";
 *
 * // Provide your own lookup function (e.g., from a dictionary service)
 * async function lookupTranslation(word: string, lang: GlostLanguage): Promise<string | undefined> {
 *   // Your translation lookup implementation
 *   return "translation";
 * }
 *
 * const extension = createTranslationExtension({
 *   targetLanguage: "th",
 *   nativeLanguage: "en",
 *   lookupTranslation
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createTranslationExtension(
  options: TranslationExtensionOptions,
): GLOSTExtension {
  const nativeLanguage = options.nativeLanguage || "en";
  const { lookupTranslation } = options;

  return {
    id: "translation",
    name: "Translation",
    description:
      "Augments word nodes with translation data using dictionary lookup",
    visit: {
      word: async (node: GLOSTWord) => {
        // Skip if no lookup function provided
        if (!lookupTranslation) {
          console.warn(
            "[Translation Extension] No lookupTranslation function provided, skipping processing",
          );
          return;
        }

        // Check if translation already exists
        const existingTranslation =
          node.shortDefinition ||
          node.metadata?.meaning ||
          (node.extras as any)?.translations?.[nativeLanguage] ||
          "";

        if (
          existingTranslation &&
          existingTranslation.trim() !== "" &&
          existingTranslation !== getWordText(node)
        ) {
          return;
        }

        const wordText = getWordText(node);
        if (!wordText || wordText.trim() === "") {
          return;
        }

        // Clean word text (remove punctuation)
        const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");

        try {
          const translation = await lookupTranslation(
            cleanWordText,
            options.targetLanguage,
          );

          if (translation) {
            // Store translation in extras.translations (i18n-friendly format)
            if (!node.extras) {
              (node as any).extras = {};
            }
            if (!(node.extras as any).translations) {
              (node.extras as any).translations = {};
            }
            (node.extras as any).translations[nativeLanguage] = translation;

            // Ensure metadata exists with partOfSpeech for future use
            if (!node.metadata) {
              node.metadata = { partOfSpeech: "unknown" };
            }
          }
        } catch (error) {
          // Silently fail - translation lookup is optional
          console.debug(
            `[Translation Extension] Translation lookup failed for "${cleanWordText}":`,
            error,
          );
        }
      },
    },
    options: options as unknown as Record<string, unknown>,
  };
}

/**
 * Default translation extension (requires options to be passed via processor options)
 *
 * This is a convenience export, but you should use `createTranslationExtension`
 * with explicit options for better type safety.
 */
export const TranslationExtension: GLOSTExtension = {
  id: "translation",
  name: "Translation",
  description:
    "Augments word nodes with translation data using dictionary lookup",
};
