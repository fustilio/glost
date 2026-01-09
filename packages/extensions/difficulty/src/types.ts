/**
 * Difficulty Extension Types
 * 
 * @packageDocumentation
 */

/**
 * Numeric difficulty level (1-5)
 */
export type DifficultyLevelNumeric = 1 | 2 | 3 | 4 | 5;

/**
 * Descriptive difficulty level
 */
export type DifficultyLevelDescriptive = "beginner" | "intermediate" | "advanced";

/**
 * Combined difficulty level type (supports both numeric and descriptive)
 */
export type DifficultyLevel = DifficultyLevelNumeric | DifficultyLevelDescriptive;

/**
 * Difficulty metadata structure
 */
export interface DifficultyMetadata {
  /** Difficulty level */
  level: DifficultyLevel | string;
  /** Human-readable display label */
  display?: string;
  /** Color code for UI display */
  color?: string;
  /** Priority for sorting (lower = easier) */
  priority?: number;
  /** Numerical difficulty score */
  score?: number;
  /** Factors contributing to difficulty */
  factors?: string[];
  /** CEFR level (for European languages) */
  cefr?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  /** JLPT level (for Japanese) */
  jlpt?: "N5" | "N4" | "N3" | "N2" | "N1";
  /** HSK level (for Chinese) */
  hsk?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Difficulty data structure (alias for backward compatibility)
 */
export type DifficultyData = DifficultyMetadata;

/**
 * Provider interface for difficulty data
 */
export interface DifficultyProvider {
  /**
   * Get difficulty level for a word
   * 
   * @param word - The word to analyze
   * @param language - Language code
   * @returns Difficulty level or undefined if not available
   */
  getDifficulty(word: string, language: string): Promise<DifficultyLevel | string | undefined>;
}

/**
 * Augment GLOSTExtras with difficulty field
 */
declare module "glost" {
  interface GLOSTExtras {
    difficulty?: DifficultyData;
  }
}
