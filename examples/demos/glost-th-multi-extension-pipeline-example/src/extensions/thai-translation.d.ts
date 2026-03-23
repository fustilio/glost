/**
 * Thai Translation Extension
 *
 * Combines glost-translation framework with Thai-English translation data.
 * This demonstrates the X * Y pattern: glost-th + glost-translation.
 */
import { type TranslationProvider } from "glost-translation";
/**
 * Thai translation provider implementation
 *
 * Provides Thai → English translations
 */
export declare const thaiTranslationProvider: TranslationProvider;
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
export declare function createThaiTranslationExtension(): GLOSTExtension;
//# sourceMappingURL=thai-translation.d.ts.map