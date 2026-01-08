/**
 * Part of Speech Extension
 * 
 * Processes and enhances part-of-speech metadata.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "../types";
import type { GLOSTWord } from "glost";

/**
 * Part of speech metadata structure
 * 
 * @since 0.0.1
 */
export interface PartOfSpeechMetadata {
  tag: string;
  display: string;
  category: string;
  abbreviation: string;
}

/**
 * Common POS categories
 */
const POS_CATEGORIES: Record<string, { category: string; abbreviation: string }> = {
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
};

/**
 * Normalize part of speech tag
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
function getPOSInfo(tag: string): { category: string; abbreviation: string } {
  const normalized = normalizePOSTag(tag);

  // Check exact match
  if (POS_CATEGORIES[normalized]) {
    return POS_CATEGORIES[normalized]!;
  }

  // Check partial matches
  for (const [key, value] of Object.entries(POS_CATEGORIES)) {
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
 * Part of speech extension options
 * 
 * @since 0.0.1
 */
export interface PartOfSpeechExtensionOptions {
  /**
   * Whether to normalize POS tags
   * @default true
   */
  normalize?: boolean;

  /**
   * Custom POS mappings
   */
  customMappings?: Record<string, { category: string; abbreviation: string }>;
}

/**
 * Create part of speech extension
 * 
 * @param options - Extension configuration options
 * @returns Configured part of speech extension
 * 
 * @since 0.0.1
 */
export function createPartOfSpeechExtension(
  options: PartOfSpeechExtensionOptions = {},
): GLOSTExtension {
  const { normalize = true, customMappings } = options;

  return {
    id: "part-of-speech",
    name: "Part of Speech",
    description: "Processes and enhances part-of-speech metadata",

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

      // Check custom mappings first
      if (customMappings && customMappings[posStr]) {
        const mapping = customMappings[posStr]!;
        return {
          partOfSpeech: {
            tag: normalize ? normalizePOSTag(posStr) : posStr,
            display: mapping.category,
            category: mapping.category,
            abbreviation: mapping.abbreviation,
          },
        };
      }

      // Get POS info
      const posInfo = getPOSInfo(posStr);

      return {
        partOfSpeech: {
          tag: normalize ? normalizePOSTag(posStr) : posStr,
          display: posInfo.category,
          category: posInfo.category,
          abbreviation: posInfo.abbreviation,
        },
      };
    },
  };
}

/**
 * Default part of speech extension
 * 
 * @since 0.0.1
 */
export const PartOfSpeechExtension = createPartOfSpeechExtension();

