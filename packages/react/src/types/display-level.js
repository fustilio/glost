/**
 * Default level configurations following the 5-level progressive pattern
 */
export const DEFAULT_LEVEL_CONFIGS = {
    1: {
        text: true,
        transcription: false,
        shortDefinition: false,
        partOfSpeech: false,
        difficulty: false,
    },
    2: {
        text: true,
        transcription: true,
        shortDefinition: false,
        partOfSpeech: false,
        difficulty: false,
    },
    3: {
        text: true,
        transcription: true,
        shortDefinition: true,
        partOfSpeech: false,
        difficulty: false,
    },
    4: {
        text: true,
        transcription: true,
        shortDefinition: true,
        partOfSpeech: true,
        difficulty: false,
    },
    5: {
        text: true,
        transcription: true,
        shortDefinition: true,
        partOfSpeech: true,
        difficulty: true,
    },
};
/**
 * Get level configuration for a specific display level
 */
export function getLevelConfig(level) {
    return DEFAULT_LEVEL_CONFIGS[level];
}
/**
 * Check if a feature should be shown at a given level
 */
export function shouldShowAtLevel(level, feature) {
    return DEFAULT_LEVEL_CONFIGS[level][feature];
}
//# sourceMappingURL=display-level.js.map