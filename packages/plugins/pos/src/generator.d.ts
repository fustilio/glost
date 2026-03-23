/**
 * POS Generator Extension
 *
 * Generates part-of-speech tags for words using a provider.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { POSProvider } from "./types.js";
import type { GlostLanguage } from "glost-common";
/**
 * POS generator extension options
 */
export interface POSGeneratorOptions {
    /**
     * Target language for POS tagging
     */
    targetLanguage: GlostLanguage;
    /**
     * POS tagger provider
     *
     * Provider that tags words with part-of-speech information.
     * If not provided, the extension will skip processing.
     */
    provider?: POSProvider;
    /**
     * Whether to skip words that already have POS data
     * @default true
     */
    skipExisting?: boolean;
}
/**
 * Create POS generator extension
 *
 * This extension augments word nodes with POS data by using a provider
 * to tag words. It populates the raw POS tag that can then be enhanced
 * by the POSEnhancerExtension.
 *
 * @param options - Extension options
 * @returns GLOST extension for POS generation
 *
 * @example
 * ```typescript
 * import { createPOSGeneratorExtension } from "glost-pos";
 * import { createThaiPOSProvider } from "glost-th/extensions";
 *
 * const provider = createThaiPOSProvider(datasource);
 * const extension = createPOSGeneratorExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export declare function createPOSGeneratorExtension(options: POSGeneratorOptions): GLOSTExtension;
//# sourceMappingURL=generator.d.ts.map