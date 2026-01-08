/**
 * Standard GLOST metadata schema
 * 
 * This schema has been validated in production implementations across
 * multiple languages and provides consistent structure for word metadata.
 */

import type { CEFRLevel } from "./languages/data/proficiency";
import { CEFR_LEVELS } from "./languages/data/proficiency";

// Re-export for convenience
export type { CEFRLevel } from "./languages/data/proficiency";

/**
 * Word frequency classification based on corpus analysis or word lists
 */
export type FrequencyLevel = "very-common" | "common" | "uncommon" | "rare";

/**
 * Pedagogical difficulty level for language learners
 */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

/**
 * Grammatical gender (not biological gender)
 */
export type GrammaticalGender = "masculine" | "feminine" | "neutral" | "common";

/**
 * Standard GLOST metadata structure
 * 
 * All fields are optional to allow gradual adoption.
 * 
 * @example
 * ```typescript
 * const metadata: StandardGLOSTMetadata = {
 *   frequency: "very-common",
 *   difficulty: "beginner",
 *   cefr: "A1",
 *   partOfSpeech: "noun",
 *   culturalNotes: "Standard greeting used any time of day"
 * };
 * ```
 */
export interface StandardGLOSTMetadata {
  /**
   * Word frequency classification
   * - very-common: Top 500-1000 words, essential vocabulary
   * - common: Top 1000-5000 words, frequently encountered
   * - uncommon: Top 5000-20000 words, less frequent
   * - rare: Beyond top 20000, specialized vocabulary
   */
  frequency?: FrequencyLevel;
  
  /**
   * Learning difficulty level
   * - beginner: A1-A2 level, basic vocabulary
   * - intermediate: B1-B2 level, everyday communication
   * - advanced: C1-C2 level, sophisticated usage
   */
  difficulty?: DifficultyLevel;
  
  /**
   * CEFR proficiency level (if available)
   */
  cefr?: CEFRLevel;
  
  /**
   * Part of speech (recommend Universal Dependencies tags)
   * 
   * Common values: noun, verb, adj, adv, pron, det, adp, conj, part, intj, num
   */
  partOfSpeech?: string;
  
  /**
   * Cultural context and pragmatic information
   */
  culturalNotes?: string;
  
  /**
   * General usage guidance, collocations, common patterns
   */
  usageNotes?: string;
  
  /**
   * Grammatical gender (for applicable languages)
   */
  gender?: GrammaticalGender;
  
  /**
   * Curriculum organization metadata
   */
  lesson?: number;
  unit?: string;
  topic?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate frequency level
 */
export function isValidFrequency(value: unknown): value is FrequencyLevel {
  return typeof value === 'string' && 
    ['very-common', 'common', 'uncommon', 'rare'].includes(value);
}

/**
 * Validate difficulty level
 */
export function isValidDifficulty(value: unknown): value is DifficultyLevel {
  return typeof value === 'string' && 
    ['beginner', 'intermediate', 'advanced'].includes(value);
}

/**
 * Validate CEFR level
 */
export function isValidCEFR(value: unknown): value is CEFRLevel {
  return typeof value === 'string' && 
    (CEFR_LEVELS as readonly string[]).includes(value);
}

/**
 * Validate grammatical gender
 */
export function isValidGender(value: unknown): value is GrammaticalGender {
  return typeof value === 'string' && 
    ['masculine', 'feminine', 'neutral', 'common'].includes(value);
}

/**
 * Validate standard GLOST metadata
 * 
 * @param metadata - Metadata object to validate
 * @returns Validation result with errors if any
 * 
 * @example
 * ```typescript
 * const result = validateStandardMetadata({
 *   frequency: "very-common",
 *   difficulty: "beginner"
 * });
 * 
 * if (result.valid) {
 *   // Use metadata
 * } else {
 *   console.error(result.errors);
 * }
 * ```
 */
export function validateStandardMetadata(
  metadata: unknown
): ValidationResult {
  const errors: string[] = [];
  
  if (!metadata || typeof metadata !== 'object') {
    return { valid: false, errors: ['Metadata must be an object'] };
  }
  
  const meta = metadata as Record<string, unknown>;
  
  // Validate frequency
  if (meta.frequency !== undefined && !isValidFrequency(meta.frequency)) {
    errors.push(
      `Invalid frequency: "${meta.frequency}". Must be one of: very-common, common, uncommon, rare`
    );
  }
  
  // Validate difficulty
  if (meta.difficulty !== undefined && !isValidDifficulty(meta.difficulty)) {
    errors.push(
      `Invalid difficulty: "${meta.difficulty}". Must be one of: beginner, intermediate, advanced`
    );
  }
  
  // Validate CEFR
  if (meta.cefr !== undefined && !isValidCEFR(meta.cefr)) {
    errors.push(
      `Invalid CEFR level: "${meta.cefr}". Must be one of: A1, A2, B1, B2, C1, C2`
    );
  }
  
  // Validate gender
  if (meta.gender !== undefined && !isValidGender(meta.gender)) {
    errors.push(
      `Invalid gender: "${meta.gender}". Must be one of: masculine, feminine, neutral, common`
    );
  }
  
  // Validate partOfSpeech is string if present
  if (meta.partOfSpeech !== undefined && typeof meta.partOfSpeech !== 'string') {
    errors.push('partOfSpeech must be a string');
  }
  
  // Validate notes are strings if present
  if (meta.culturalNotes !== undefined && typeof meta.culturalNotes !== 'string') {
    errors.push('culturalNotes must be a string');
  }
  
  if (meta.usageNotes !== undefined && typeof meta.usageNotes !== 'string') {
    errors.push('usageNotes must be a string');
  }
  
  // Validate curriculum fields
  if (meta.lesson !== undefined && typeof meta.lesson !== 'number') {
    errors.push('lesson must be a number');
  }
  
  if (meta.unit !== undefined && typeof meta.unit !== 'string') {
    errors.push('unit must be a string');
  }
  
  if (meta.topic !== undefined && typeof meta.topic !== 'string') {
    errors.push('topic must be a string');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Type guard for standard metadata
 */
export function isStandardMetadata(value: unknown): value is StandardGLOSTMetadata {
  return validateStandardMetadata(value).valid;
}

/**
 * Get default metadata with common fields
 */
export function getDefaultMetadata(): StandardGLOSTMetadata {
  return {
    frequency: 'common',
    difficulty: 'intermediate'
  };
}

/**
 * Merge metadata objects, with later objects taking precedence
 */
export function mergeMetadata(
  ...metadatas: Partial<StandardGLOSTMetadata>[]
): StandardGLOSTMetadata {
  return Object.assign({}, ...metadatas);
}
