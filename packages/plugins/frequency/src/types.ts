/**
 * Frequency Extension Types
 * 
 * @packageDocumentation
 */

/**
 * Frequency category
 */
export type FrequencyCategory = "very-common" | "common" | "uncommon" | "rare";

/**
 * Frequency level (same as FrequencyCategory)
 */
export type FrequencyLevel = FrequencyCategory;

/**
 * Frequency data structure
 */
export interface FrequencyData {
  /** Frequency rank (1 = most common) */
  rank: number;
  /** Frequency category */
  category: FrequencyCategory;
  /** Percentile (0-1, where 1 = most common) */
  percentile?: number;
  /** Frequency per million words */
  perMillion?: number;
}

/**
 * Frequency metadata with display properties
 */
export interface FrequencyMetadata {
  /** Frequency level */
  level: FrequencyLevel;
  /** Human-readable display label */
  display?: string;
  /** Color code for UI display */
  color?: string;
  /** Priority for sorting (higher = more common) */
  priority?: number;
}

/**
 * Provider interface for frequency data
 */
export interface FrequencyProvider {
  /**
   * Get frequency data for a word
   * 
   * @param word - The word to look up
   * @param language - Language code
   * @returns Frequency level or undefined if not available
   */
  getFrequency(word: string, language: string): Promise<FrequencyLevel | undefined>;
}

/**
 * Augment GLOSTExtras with frequency field
 */
declare module "glost" {
  interface GLOSTExtras {
    frequency?: FrequencyMetadata;
  }
}
