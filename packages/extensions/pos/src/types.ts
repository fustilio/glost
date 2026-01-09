/**
 * Types for part-of-speech extension
 * 
 * @packageDocumentation
 */

import type { GlostLanguage } from "glost-common";

/**
 * Part of speech metadata structure
 */
export interface PartOfSpeechMetadata {
  tag: string;
  display: string;
  category: string;
  abbreviation: string;
}

/**
 * POS tag information
 */
export interface POSTagInfo {
  /** Full category name (e.g., "Noun", "Verb") */
  category: string;
  /** Short abbreviation (e.g., "N", "V") */
  abbreviation: string;
  /** Optional description */
  description?: string;
}

/**
 * POS tagger provider interface
 * 
 * Providers are responsible for tagging words with part-of-speech information.
 * Implementations can use NLP models, dictionaries, or rule-based systems.
 * 
 * @example
 * ```typescript
 * const provider: POSProvider = {
 *   async getPOS(word, language) {
 *     const result = await nlpModel.tag(word, language);
 *     return result.pos;
 *   }
 * };
 * ```
 */
export interface POSProvider {
  /**
   * Get the part-of-speech tag for a word
   * 
   * @param word - The word to tag
   * @param language - The ISO-639-1 language code
   * @returns The POS tag, or undefined if not found
   */
  getPOS(
    word: string,
    language: GlostLanguage,
  ): Promise<string | undefined>;
}
