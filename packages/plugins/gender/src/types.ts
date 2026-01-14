/**
 * Types for gender extension
 * 
 * @packageDocumentation
 */

import type { GlostLanguage } from "glost-common";

/**
 * Gender type
 */
export type GenderType = "male" | "female" | "neuter" | "masculine" | "feminine";

/**
 * Gender metadata structure
 */
export interface GenderMetadata {
  type: GenderType;
  display: string;
  color: string;
  abbreviation: string;
}

/**
 * Gender provider interface
 * 
 * Providers are responsible for determining the grammatical gender of a word.
 * This is language-specific (e.g., French, Spanish, German have grammatical gender;
 * English, Thai, Japanese do not).
 */
export interface GenderProvider {
  /**
   * Get the grammatical gender for a word
   * 
   * @param word - The word to check
   * @param language - The ISO-639-1 language code
   * @returns The gender type, or undefined if not found/applicable
   */
  getGender(
    word: string,
    language: GlostLanguage,
  ): Promise<GenderType | undefined>;
}
