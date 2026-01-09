/**
 * Part of Speech Extension Types
 * 
 * @packageDocumentation
 */

/**
 * Part of speech tags (Universal Dependencies standard)
 */
export type UniversalPOSTag =
  | "ADJ"   // Adjective
  | "ADP"   // Adposition
  | "ADV"   // Adverb
  | "AUX"   // Auxiliary
  | "CCONJ" // Coordinating conjunction
  | "DET"   // Determiner
  | "INTJ"  // Interjection
  | "NOUN"  // Noun
  | "NUM"   // Numeral
  | "PART"  // Particle
  | "PRON"  // Pronoun
  | "PROPN" // Proper noun
  | "PUNCT" // Punctuation
  | "SCONJ" // Subordinating conjunction
  | "SYM"   // Symbol
  | "VERB"  // Verb
  | "X";    // Other

/**
 * Part of speech data structure
 */
export interface POSData {
  /** Part of speech tag */
  tag: UniversalPOSTag | string;
  /** Tag system used (e.g., "universal", "penn", "custom") */
  system?: string;
  /** Confidence score (0-1) */
  confidence?: number;
  /** Additional morphological features */
  features?: Record<string, string>;
}

/**
 * Part of speech tag information (for display)
 */
export interface POSTagInfo {
  /** Full category name (e.g., "Noun", "Verb") */
  category: string;
  /** Abbreviated form (e.g., "N", "V") */
  abbreviation: string;
}

/**
 * Part of speech metadata with display properties
 */
export interface PartOfSpeechMetadata {
  /** Part of speech tag */
  tag: UniversalPOSTag | string;
  /** Human-readable display label */
  display?: string;
  /** Category name (e.g., "Noun", "Verb") */
  category?: string;
  /** Abbreviated form (e.g., "N", "V") */
  abbreviation?: string;
  /** Tag system used (e.g., "universal", "penn", "custom") */
  system?: string;
  /** Confidence score (0-1) */
  confidence?: number;
  /** Additional morphological features */
  features?: Record<string, string>;
}

/**
 * Provider interface for part of speech data
 */
export interface POSProvider {
  /**
   * Get POS tag for a word
   * 
   * @param word - The word to analyze
   * @param language - Language code
   * @returns POS tag (string) or undefined if not available
   */
  getPOS(word: string, language: string): Promise<string | undefined>;
}

/**
 * Augment GLOSTExtras with part of speech field
 */
declare module "glost" {
  interface GLOSTExtras {
    /** Part of speech information */
    partOfSpeech?: POSData;
    /** Alias for backward compatibility */
    pos?: POSData;
  }
}
