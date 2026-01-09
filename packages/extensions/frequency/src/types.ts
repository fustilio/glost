/**
 * Types for frequency extension
 * 
 * @packageDocumentation
 */

import type { GlostLanguage } from "glost-common";

/**
 * Frequency level type
 * 
 * Represents the frequency of word usage in common language.
 * 
 * @example
 * ```typescript
 * const level: FrequencyLevel = "common";
 * ```
 */
export type FrequencyLevel = "rare" | "uncommon" | "common" | "very-common";

/**
 * Frequency metadata structure
 * 
 * Enhanced metadata structure for word frequency, including display
 * information and UI properties.
 * 
 * @example
 * ```typescript
 * const metadata: FrequencyMetadata = {
 *   level: "common",
 *   display: "Common",
 *   color: "blue",
 *   priority: 3
 * };
 * ```
 */
export interface FrequencyMetadata {
  /** Frequency level */
  level: FrequencyLevel;
  /** Human-readable display text */
  display: string;
  /** Color identifier for UI styling */
  color: string;
  /** Priority number for sorting (1-4) */
  priority: number;
}

/**
 * Frequency provider interface
 * 
 * Providers are responsible for determining the frequency level of a word
 * in a given language. Implementations can use corpus data, word lists,
 * or other language-specific resources.
 * 
 * @example
 * ```typescript
 * const provider: FrequencyProvider = {
 *   async getFrequency(word, language) {
 *     const entry = await dictionary.lookup(word, language);
 *     return entry?.frequency || "uncommon";
 *   }
 * };
 * ```
 */
export interface FrequencyProvider {
  /**
   * Get the frequency level for a word in a given language
   * 
   * @param word - The word to check
   * @param language - The ISO-639-1 language code
   * @returns The frequency level, or undefined if not found
   */
  getFrequency(
    word: string,
    language: GlostLanguage,
  ): Promise<FrequencyLevel | undefined>;
}
