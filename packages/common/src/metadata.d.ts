/**
 * Standard GLOST metadata schema
 *
 * This schema has been validated in production implementations across
 * multiple languages and provides consistent structure for word metadata.
 */
import type { CEFRLevel } from "./languages/data/proficiency.js";
export type { CEFRLevel } from "./languages/data/proficiency.js";
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
export declare function isValidFrequency(value: unknown): value is FrequencyLevel;
/**
 * Validate difficulty level
 */
export declare function isValidDifficulty(value: unknown): value is DifficultyLevel;
/**
 * Validate CEFR level
 */
export declare function isValidCEFR(value: unknown): value is CEFRLevel;
/**
 * Validate grammatical gender
 */
export declare function isValidGender(value: unknown): value is GrammaticalGender;
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
export declare function validateStandardMetadata(metadata: unknown): ValidationResult;
/**
 * Type guard for standard metadata
 */
export declare function isStandardMetadata(value: unknown): value is StandardGLOSTMetadata;
/**
 * Get default metadata with common fields
 */
export declare function getDefaultMetadata(): StandardGLOSTMetadata;
/**
 * Merge metadata objects, with later objects taking precedence
 */
export declare function mergeMetadata(...metadatas: Partial<StandardGLOSTMetadata>[]): StandardGLOSTMetadata;
//# sourceMappingURL=metadata.d.ts.map