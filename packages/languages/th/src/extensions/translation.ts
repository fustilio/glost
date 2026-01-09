/**
 * Thai translation provider for glost-translation extension
 * 
 * @packageDocumentation
 */

import type { TranslationProvider } from "glost-translation";

/**
 * Thai translation provider (skeleton)
 * 
 * This is a skeleton implementation. Real implementation should:
 * - Connect to Thai-English dictionary
 * - Handle Thai-specific translations
 * - Support multiple meanings/contexts
 * 
 * @example
 * ```typescript
 * import { createTranslationExtension } from "glost-translation";
 * import { thaiTranslationProvider } from "glost-th/extensions";
 * 
 * const ext = createTranslationExtension({
 *   sourceLanguage: "th",
 *   targetLanguage: "en",
 *   provider: thaiTranslationProvider
 * });
 * ```
 */
export const thaiTranslationProvider: TranslationProvider = {
  async getTranslation(
    word: string,
    sourceLanguage: string,
    targetLanguage: string
  ) {
    if (!sourceLanguage.startsWith("th") || !targetLanguage.startsWith("en")) {
      return undefined;
    }
    
    // TODO: Implement with real Thai-English dictionary
    // This is a skeleton - needs actual implementation
    
    // Example: 
    // if (word === "สวัสดี") return "hello";
    // if (word === "ขอบคุณ") return "thank you";
    
    console.warn("[Thai Translation] Provider not fully implemented");
    return undefined;
  }
};
