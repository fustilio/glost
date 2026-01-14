/**
 * Thai Translation Extension
 * 
 * Combines glost-translation framework with Thai-English translation data.
 * This demonstrates the X * Y pattern: glost-th + glost-translation.
 */

import {
  createTranslationExtension,
  type TranslationProvider,
} from "glost-translation";
import type { GlostLanguage } from "glost-common";
import { getThaiTranslation } from "../demo-data/translation-data.js";

/**
 * Thai translation provider implementation
 * 
 * Provides Thai → English translations
 */
export const thaiTranslationProvider: TranslationProvider = {
  async getTranslation(
    word: string,
    from: GlostLanguage,
    to: GlostLanguage
  ): Promise<string | undefined> {
    // Only handle Thai → English
    if ((from !== "th" && from !== "th-TH") || to !== "en") {
      return undefined;
    }

    // Look up translation from demo data
    return getThaiTranslation(word, to);
  },
};

/**
 * Create Thai translation extension
 * 
 * Pre-configured extension for Thai → English translation.
 * 
 * @returns Thai translation extension
 * 
 * @example
 * ```typescript
 * import { createThaiTranslationExtension } from "./extensions/thai-translation";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 * 
 * const extension = createThaiTranslationExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createThaiTranslationExtension() {
  return createTranslationExtension({
    from: "th",
    to: "en",
    provider: thaiTranslationProvider,
  });
}
