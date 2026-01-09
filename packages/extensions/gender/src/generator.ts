/**
 * Gender Generator Extension
 * 
 * Generates grammatical gender data for words using a provider.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import { getWordText } from "glost";
import type { GenderProvider } from "./types.js";

import type { GlostLanguage } from "glost-common";

/**
 * Gender generator extension options
 */
export interface GenderGeneratorOptions {
  /**
   * Target language for gender lookup
   */
  targetLanguage: GlostLanguage;

  /**
   * Gender provider
   */
  provider?: GenderProvider;

  /**
   * Whether to skip words that already have gender data
   * @default true
   */
  skipExisting?: boolean;
}

/**
 * Create gender generator extension
 */
export function createGenderGeneratorExtension(
  options: GenderGeneratorOptions,
): GLOSTExtension {
  const { provider, skipExisting = true } = options;

  return {
    id: "gender-generator",
    name: "Gender Generator",
    description: "Generates grammatical gender data using a provider",

    provides: {
      metadata: ["gender"],
    },

    visit: {
      word: async (node: GLOSTWord) => {
        if (!provider) {
          console.warn(
            "[Gender Generator] No provider provided, skipping processing",
          );
          return;
        }

        if (skipExisting) {
          const existingGender =
            node.extras?.gender ||
            (node.extras?.metadata as any)?.gender;

          if (existingGender) {
            return;
          }
        }

        const wordText = getWordText(node);
        if (!wordText || wordText.trim() === "") {
          return;
        }

        const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");

        try {
          const gender = await provider.getGender(
            cleanWordText,
            options.targetLanguage,
          );

          if (gender) {
            if (!node.extras) {
              (node as any).extras = {};
            }
            (node.extras as any).gender = gender;
          }
        } catch (error) {
          console.debug(
            `[Gender Generator] Gender lookup failed for "${cleanWordText}":`,
            error,
          );
        }
      },
    },
    options: options as unknown as Record<string, unknown>,
  };
}
