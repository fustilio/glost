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
export declare function createThaiTranslationExtension(nativeLanguage?: string): GLOSTExtension;
//# sourceMappingURL=translation.d.ts.map