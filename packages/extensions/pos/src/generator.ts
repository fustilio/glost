/**
 * POS Generator Extension
 * 
 * Generates part-of-speech tags for words using a provider.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import { getWordText } from "glost";
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
export function createPOSGeneratorExtension(
  options: POSGeneratorOptions,
): GLOSTExtension {
  const { provider, skipExisting = true } = options;

  return {
    id: "pos-generator",
    name: "POS Generator",
    description: "Generates part-of-speech tags using a provider",

    provides: {
      metadata: ["partOfSpeech"],
    },

    visit: {
      word: async (node: GLOSTWord) => {
        // Skip if no provider
        if (!provider) {
          console.warn(
            "[POS Generator] No provider provided, skipping processing",
          );
          return;
        }

        // Skip if POS already exists
        if (skipExisting) {
          const existingPOS =
            node.metadata?.partOfSpeech ||
            node.extras?.metadata?.partOfSpeech;

          if (existingPOS) {
            return;
          }
        }

        const wordText = getWordText(node);
        if (!wordText || wordText.trim() === "") {
          return;
        }

        // Clean word text (remove punctuation)
        const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");

        try {
          const pos = await provider.getPOS(
            cleanWordText,
            options.targetLanguage,
          );

          if (pos) {
            // Store raw POS tag in metadata
            if (!node.metadata) {
              node.metadata = { partOfSpeech: pos };
            } else {
              node.metadata.partOfSpeech = pos;
            }
          }
        } catch (error) {
          // Silently fail - POS tagging is optional
          console.debug(
            `[POS Generator] POS tagging failed for "${cleanWordText}":`,
            error,
          );
        }
      },
    },
    options: options as unknown as Record<string, unknown>,
  };
}
