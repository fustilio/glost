/**
 * Standard GLOST metadata schema
 *
 * This schema has been validated in production implementations across
 * multiple languages and provides consistent structure for word metadata.
 */
import { CEFR_LEVELS } from "./languages/data/proficiency.js";
/**
 * Validate frequency level
 */
export function isValidFrequency(value) {
    return typeof value === 'string' &&
        ['very-common', 'common', 'uncommon', 'rare'].includes(value);
}
/**
 * Validate difficulty level
 */
export function isValidDifficulty(value) {
    return typeof value === 'string' &&
        ['beginner', 'intermediate', 'advanced'].includes(value);
}
/**
 * Validate CEFR level
 */
export function isValidCEFR(value) {
    return typeof value === 'string' &&
        CEFR_LEVELS.includes(value);
}
/**
 * Validate grammatical gender
 */
export function isValidGender(value) {
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
export function validateStandardMetadata(metadata) {
    const errors = [];
    if (!metadata || typeof metadata !== 'object') {
        return { valid: false, errors: ['Metadata must be an object'] };
    }
    const meta = metadata;
    // Validate frequency
    if (meta.frequency !== undefined && !isValidFrequency(meta.frequency)) {
        errors.push(`Invalid frequency: "${meta.frequency}". Must be one of: very-common, common, uncommon, rare`);
    }
    // Validate difficulty
    if (meta.difficulty !== undefined && !isValidDifficulty(meta.difficulty)) {
        errors.push(`Invalid difficulty: "${meta.difficulty}". Must be one of: beginner, intermediate, advanced`);
    }
    // Validate CEFR
    if (meta.cefr !== undefined && !isValidCEFR(meta.cefr)) {
        errors.push(`Invalid CEFR level: "${meta.cefr}". Must be one of: A1, A2, B1, B2, C1, C2`);
    }
    // Validate gender
    if (meta.gender !== undefined && !isValidGender(meta.gender)) {
        errors.push(`Invalid gender: "${meta.gender}". Must be one of: masculine, feminine, neutral, common`);
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
export function isStandardMetadata(value) {
    return validateStandardMetadata(value).valid;
}
/**
 * Get default metadata with common fields
 */
export function getDefaultMetadata() {
    return {
        frequency: 'common',
        difficulty: 'intermediate'
    };
}
/**
 * Merge metadata objects, with later objects taking precedence
 */
export function mergeMetadata(...metadatas) {
    return Object.assign({}, ...metadatas);
}
//# sourceMappingURL=metadata.js.map