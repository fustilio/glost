/**
 * Thai Translation Extension
 *
 * Language-specific extension for augmenting GLOST word nodes with Thai translations.
 * Uses demo vocabulary data for demonstration purposes.
 *
 * This is an example implementation demonstrating how to create translation extensions.
 * Real implementations would use comprehensive dictionary data.
 *
 * @packageDocumentation
 */

import { getDemoThaiTranslation } from "./demo-data.js";
import {
  createTranslationExtension,
  type TranslationProvider,
} from "glost-translation";
import type { GlostLanguage } from "glost-common";

/**
 * Adapter that provides Thai-English translation using demo vocabulary data,
 * matching the glost-translation TranslationProvider interface.
 */
const thaiTranslationProviderAdapter: TranslationProvider = {
  async getTranslation(
    word: string,
    sourceLanguage: GlostLanguage,
    targetLanguage: GlostLanguage,
  ): Promise<string | undefined> {
    // Only process Thai source language
    if (!sourceLanguage.startsWith("th")) {
      return undefined;
    }

    // Only provide English translations for now
    if (!targetLanguage.startsWith("en")) {
      return undefined;
    }

    // Use demo vocabulary lookup from glost-th
    // In a real implementation, this would use comprehensive dictionary data
    return getDemoThaiTranslation(word);
  },
};

/**
 * Create Thai translation extension
 *
 * This extension augments word nodes with Thai-to-English translation data
 * using demo vocabulary data. This is an example implementation.
 *
 * @param nativeLanguage - Native language for translations (default: "en")
 * @returns GLOST extension for Thai translations
 *
 * @example
 * ```typescript
 * import { createThaiTranslationExtension } from "glost-plugins-thai";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createThaiTranslationExtension("en-US");
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createThaiTranslationExtension(
  nativeLanguage?: string,
) {
  // Map to short language code for glost-common
  const targetLang = (nativeLanguage?.startsWith("en") ? "en" : nativeLanguage || "en") as GlostLanguage;

  return createTranslationExtension({
    from: "th",
    to: targetLang,
    provider: thaiTranslationProviderAdapter,
  });
}
