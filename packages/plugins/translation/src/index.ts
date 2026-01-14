/**
 * glost-translation
 *
 * Language-agnostic translation extension for GLOST.
 *
 * This package provides the core translation logic. Language-specific
 * implementations should be provided via the TranslationProvider interface.
 *
 * Language-specific providers should be in:
 * - glost-th/extensions (Thai-English translations)
 * - glost-ja/extensions (Japanese-English translations)
 * - glost-zh/extensions (Chinese-English translations)
 * etc.
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-plugins";
import type { GLOSTWord } from "glost";
import { getWordText } from "glost";
import type { GlostLanguage } from "glost-common";

/**
 * Provider interface for translation data
 *
 * Language-specific implementations should be provided by language packages
 * (e.g., glost-th/extensions, glost-ja/extensions)
 */
export interface TranslationProvider {
  /**
   * Get translation for a word
   *
   * @param word - The word to translate
   * @param from - Source language code (language to translate from)
   * @param to - Target language code (language to translate to, usually "en")
   * @returns Translation string if available, undefined otherwise
   *
   * @example
   * ```typescript
   * // Thai-English example
   * getTranslation("สวัสดี", "th", "en")
   * // Returns: "hello"
   *
   * // Japanese-English example
   * getTranslation("こんにちは", "ja", "en")
   * // Returns: "hello"
   * ```
   */
  getTranslation(
    word: string,
    from: GlostLanguage,
    to: GlostLanguage
  ): Promise<string | undefined>;
}

/**
 * Translation extension options
 */
export interface TranslationExtensionOptions {
  /**
   * Source language (the language of the content to translate from)
   */
  from: GlostLanguage;

  /**
   * Target language (the language to translate to, usually "en")
   */
  to: GlostLanguage;

  /**
   * Provider for language-specific translation data
   *
   * Should be implemented by language packages:
   * - import { thaiTranslationProvider } from "glost-th/extensions"
   * - import { japaneseTranslationProvider } from "glost-ja/extensions"
   */
  provider: TranslationProvider;
}


/**
 * Create translation extension
 *
 * This extension augments word nodes with translation data using a provider.
 * It only populates translations if they don't already exist.
 *
 * @param options - Extension options including provider
 * @returns GLOST extension for translations
 *
 * @example
 * ```typescript
 * import { createTranslationExtension } from "glost-translation";
 * import { thaiTranslationProvider } from "glost-th/extensions";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createTranslationExtension({
 *   from: "th",
 *   to: "en",
 *   provider: thaiTranslationProvider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 *
 * @example
 * ```typescript
 * // Japanese-English translation
 * import { createTranslationExtension } from "glost-translation";
 * import { japaneseTranslationProvider } from "glost-ja/extensions";
 *
 * const extension = createTranslationExtension({
 *   from: "ja",
 *   to: "en",
 *   provider: japaneseTranslationProvider
 * });
 * ```
 */
export function createTranslationExtension(
  options: TranslationExtensionOptions,
): GLOSTExtension {
  const { from, to, provider } = options;

  if (!provider) {
    throw new Error(
      "[Translation] Provider is required. " +
      "Import from language package: " +
      "import { thaiTranslationProvider } from 'glost-th/extensions'"
    );
  }

  return {
    id: "translation",
    name: "Translation",
    description:
      "Augments word nodes with translation data via provider",
    visit: {
      word: async (node: GLOSTWord) => {
        // Check if translation already exists
        const existingTranslation =
          node.shortDefinition ||
          node.metadata?.meaning ||
          (node.extras as any)?.translations?.[to] ||
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
          const translation = await provider.getTranslation(
            cleanWordText,
            from,
            to
          );

          if (translation) {
            // Store translation in extras.translations (i18n-friendly format)
            if (!node.extras) {
              (node as any).extras = {};
            }
            if (!(node.extras as any).translations) {
              (node.extras as any).translations = {};
            }
            (node.extras as any).translations[to] = translation;

            // Ensure metadata exists with partOfSpeech for future use
            if (!node.metadata) {
              node.metadata = { partOfSpeech: "unknown" };
            }
          }
        } catch (error) {
          // Silently fail - translation lookup is optional
          console.debug(
            `[Translation] Lookup failed for "${cleanWordText}":`,
            error,
          );
        }
      },
    },
    options: options as unknown as Record<string, unknown>,
  };
}
