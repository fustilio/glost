/**
 * Display levels for progressive disclosure of GloST content
 *
 * The 5-level system allows gradual exposure of linguistic information:
 * - Level 1: Text only (no annotations)
 * - Level 2: Text + transcription (pronunciation guides)
 * - Level 3: Text + transcription + definitions
 * - Level 4: Text + transcription + definitions + grammar (POS)
 * - Level 5: Full detail (all metadata including difficulty)
 */
export type DisplayLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Configuration for what to show at each display level
 */
export interface LevelConfig {
  /** Show the main text */
  text: boolean;
  /** Show transcription/pronunciation (e.g., furigana, pinyin, romaji) */
  transcription: boolean;
  /** Show short definition/translation */
  shortDefinition: boolean;
  /** Show part of speech */
  partOfSpeech: boolean;
  /** Show difficulty level */
  difficulty: boolean;
}

/**
 * Default level configurations following the 5-level progressive pattern
 */
export const DEFAULT_LEVEL_CONFIGS: Record<DisplayLevel, LevelConfig> = {
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
export function getLevelConfig(level: DisplayLevel): LevelConfig {
  return DEFAULT_LEVEL_CONFIGS[level];
}

/**
 * Check if a feature should be shown at a given level
 */
export function shouldShowAtLevel(
  level: DisplayLevel,
  feature: keyof LevelConfig
): boolean {
  return DEFAULT_LEVEL_CONFIGS[level][feature];
}
