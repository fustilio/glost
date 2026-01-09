/**
 * Types for difficulty extension
 * 
 * @packageDocumentation
 */

import type { GlostLanguage } from "glost-common";

/**
 * Difficulty level type
 * 
 * Represents the learning difficulty level of a word.
 */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

/**
 * Difficulty metadata structure
 * 
 * Enhanced metadata structure for word difficulty, including display
 * information and UI properties.
 */
export interface DifficultyMetadata {
  level: DifficultyLevel;
  display: string;
  color: string;
  priority: number;
}

/**
 * Difficulty provider interface
 * 
 * Providers are responsible for determining the difficulty level of a word
 * for language learners. Implementations can use CEFR levels, JLPT levels,
 * word frequency, or other metrics.
 * 
 * @example
 * ```typescript
 * const provider: DifficultyProvider = {
 *   async getDifficulty(word, language) {
 *     const entry = await wordList.lookup(word, language);
 *     return entry?.difficulty || "intermediate";
 *   }
 * };
 * ```
 */
export interface DifficultyProvider {
  /**
   * Get the difficulty level for a word
   * 
   * @param word - The word to check
   * @param language - The ISO-639-1 language code
   * @returns The difficulty level, or undefined if not found
   */
  getDifficulty(
    word: string,
    language: GlostLanguage,
  ): Promise<DifficultyLevel | undefined>;
}
