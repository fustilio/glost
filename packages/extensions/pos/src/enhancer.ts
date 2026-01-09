/**
 * POS Enhancer Extension
 * 
 * Formats and enhances existing POS data with display properties.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import type { PartOfSpeechMetadata, POSTagInfo } from "./types.js";

/**
 * Universal POS categories (based on Universal Dependencies)
 * 
 * These categories cover most languages and can be mapped to
 * language-specific tagsets.
 */
const UNIVERSAL_POS_CATEGORIES: Record<string, POSTagInfo> = {
  noun: { category: "Noun", abbreviation: "N" },
  verb: { category: "Verb", abbreviation: "V" },
  adjective: { category: "Adjective", abbreviation: "Adj" },
  adverb: { category: "Adverb", abbreviation: "Adv" },
  pronoun: { category: "Pronoun", abbreviation: "Pron" },
  preposition: { category: "Preposition", abbreviation: "Prep" },
  conjunction: { category: "Conjunction", abbreviation: "Conj" },
  interjection: { category: "Interjection", abbreviation: "Interj" },
  article: { category: "Article", abbreviation: "Art" },
  determiner: { category: "Determiner", abbreviation: "Det" },
  particle: { category: "Particle", abbreviation: "Part" },
  numeral: { category: "Numeral", abbreviation: "Num" },
  auxiliary: { category: "Auxiliary", abbreviation: "Aux" },
  punctuation: { category: "Punctuation", abbreviation: "Punc" },
};

/**
 * Normalize POS tag
 * 
 * @internal
 */
function normalizePOSTag(tag: string): string {
  return tag.toLowerCase().trim();
}

/**
 * Get POS category and abbreviation
 * 
 * @internal
 */
function getPOSInfo(tag: string, customMappings?: Record<string, POSTagInfo>): POSTagInfo {
  const normalized = normalizePOSTag(tag);

  // Check custom mappings first
  if (customMappings && customMappings[normalized]) {
    return customMappings[normalized]!;
  }

  // Check exact match in universal categories
  if (UNIVERSAL_POS_CATEGORIES[normalized]) {
    return UNIVERSAL_POS_CATEGORIES[normalized]!;
  }

  // Check partial matches
  for (const [key, value] of Object.entries(UNIVERSAL_POS_CATEGORIES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }

  // Default: use capitalized tag
  return {
    category: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
    abbreviation: tag.substring(0, 3).toUpperCase(),
  };
}

/**
 * POS enhancer extension options
 */
export interface POSEnhancerOptions {
  /**
   * Whether to normalize POS tags
   * @default true
   */
  normalize?: boolean;

  /**
   * Custom POS mappings (tag → POSTagInfo)
   * Useful for language-specific tagsets
   */
  customMappings?: Record<string, POSTagInfo>;
}

/**
 * Create POS enhancer extension
 * 
 * This extension processes existing POS metadata and enhances it
 * with display information (categories, abbreviations).
 * It should run after the POS generator extension.
 * 
 * @param options - Extension configuration options
 * @returns Configured POS enhancer extension
 * 
 * @example
 * ```typescript
 * import { createPOSEnhancerExtension } from "glost-pos";
 * 
 * const enhancer = createPOSEnhancerExtension({
 *   normalize: true,
 *   customMappings: {
 *     "n": { category: "Noun", abbreviation: "N" }
 *   }
 * });
 * 
 * const result = processGLOSTWithExtensions(document, [enhancer]);
 * ```
 */
export function createPOSEnhancerExtension(
  options: POSEnhancerOptions = {},
): GLOSTExtension {
  const { normalize = true, customMappings } = options;

  return {
    id: "pos-enhancer",
    name: "POS Enhancer",
    description: "Enhances part-of-speech metadata with display properties",

    dependencies: ["pos-generator"],

    provides: {
      extras: ["partOfSpeech"],
    },

    enhanceMetadata: (node: GLOSTWord) => {
      // Get POS from various possible locations
      const pos =
        node.metadata?.partOfSpeech ||
        node.extras?.metadata?.partOfSpeech ||
        node.extras?.partOfSpeech;

      if (!pos) {
        return;
      }

      const posStr = String(pos);

      // Get POS info
      const posInfo = getPOSInfo(posStr, customMappings);

      const metadata: PartOfSpeechMetadata = {
        tag: normalize ? normalizePOSTag(posStr) : posStr,
        display: posInfo.category,
        category: posInfo.category,
        abbreviation: posInfo.abbreviation,
      };

      return {
        partOfSpeech: metadata,
      };
    },
  };
}

/**
 * Default POS enhancer extension
 * 
 * Pre-configured POS enhancer with default options.
 */
export const POSEnhancerExtension = createPOSEnhancerExtension();
