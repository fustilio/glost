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
import { getWordText } from "glost";
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
export function createTranslationExtension(options) {
    const { from, to, provider } = options;
    if (!provider) {
        throw new Error("[Translation] Provider is required. " +
            "Import from language package: " +
            "import { thaiTranslationProvider } from 'glost-th/extensions'");
    }
    return {
        id: "translation",
        name: "Translation",
        description: "Augments word nodes with translation data via provider",
        visit: {
            word: async (node) => {
                // Check if translation already exists
                const existingTranslation = node.shortDefinition ||
                    node.metadata?.meaning ||
                    node.extras?.translations?.[to] ||
                    "";
                if (existingTranslation &&
                    existingTranslation.trim() !== "" &&
                    existingTranslation !== getWordText(node)) {
                    return;
                }
                const wordText = getWordText(node);
                if (!wordText || wordText.trim() === "") {
                    return;
                }
                // Clean word text (remove punctuation)
                const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");
                try {
                    const translation = await provider.getTranslation(cleanWordText, from, to);
                    if (translation) {
                        // Store translation in extras.translations (i18n-friendly format)
                        if (!node.extras) {
                            node.extras = {};
                        }
                        if (!node.extras.translations) {
                            node.extras.translations = {};
                        }
                        node.extras.translations[to] = translation;
                        // Ensure metadata exists with partOfSpeech for future use
                        if (!node.metadata) {
                            node.metadata = { partOfSpeech: "unknown" };
                        }
                    }
                }
                catch (error) {
                    // Silently fail - translation lookup is optional
                    console.debug(`[Translation] Lookup failed for "${cleanWordText}":`, error);
                }
            },
        },
        options: options,
    };
}
//# sourceMappingURL=index.js.map