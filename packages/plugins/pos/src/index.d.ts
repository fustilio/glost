/**
 * glost-pos
 *
 * Part-of-speech extension for GLOST - generates and formats POS data.
 *
 * This package provides both POS tagging (via providers) and
 * POS enhancement (display formatting). It follows the pattern of
 * separating data generation from data presentation.
 *
 * **Philosophy**: This package intentionally does NOT include heuristic
 * POS taggers. No data is better than inaccurate data. You must provide
 * a real POS tagger based on NLP models or validated dictionaries.
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * import {
 *   createPOSGeneratorExtension,
 *   createPOSEnhancerExtension
 * } from "glost-pos";
 * import { createThaiPOSProvider } from "glost-th/extensions";
 *
 * // Create provider from language package (with real NLP or dictionary)
 * const provider = createThaiPOSProvider({
 *   tagger: thaiNLPTagger  // MeCab, Lexitron, etc.
 * });
 *
 * // Create extensions
 * const generator = createPOSGeneratorExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * const enhancer = createPOSEnhancerExtension();
 *
 * // Process document
 * const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
 * ```
 */
export type { PartOfSpeechMetadata, POSTagInfo, POSProvider, } from "./types.js";
export { createPOSGeneratorExtension, type POSGeneratorOptions, } from "./generator.js";
export { createPOSEnhancerExtension, POSEnhancerExtension, type POSEnhancerOptions, } from "./enhancer.js";
import type { GlostLanguage } from "glost-common";
/**
 * Create a complete POS extension pipeline
 *
 * **Note**: You MUST provide a real provider. This package intentionally does NOT
 * include heuristic taggers because inaccurate POS data is worse than no data.
 *
 * Convenience function that creates both generator and enhancer extensions
 * configured to work together.
 *
 * @param options - Configuration options
 * @returns Array of [generator, enhancer] extensions
 *
 * @example
 * ```typescript
 * import { createPOSExtension } from "glost-pos";
 * import { createThaiPOSProvider } from "glost-th/extensions";
 *
 * const provider = createThaiPOSProvider(datasource);
 * const [generator, enhancer] = createPOSExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
 * ```
 */
export declare function createPOSExtension(options: {
    targetLanguage: GlostLanguage;
    provider?: any;
    skipExisting?: boolean;
    normalize?: boolean;
    customMappings?: Record<string, any>;
}): any[];
//# sourceMappingURL=index.d.ts.map