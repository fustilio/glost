/**
 * Example Data Types
 *
 * Type definitions for example vocabulary and translation data.
 *
 * @packageDocumentation
 */

import type { GlostLanguage } from "glost-common";

/**
 * Frequency level (local definition to avoid dependency)
 */
export type FrequencyLevel = "very-common" | "common" | "uncommon" | "rare";

/**
 * Difficulty level (local definition to avoid dependency)
 */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | 1 | 2 | 3 | 4 | 5;

/**
 * Vocabulary entry structure
 */
export interface VocabularyEntry {
  /** The word in its native script */
  word: string;

  /** Frequency level */
  frequency: FrequencyLevel;

  /** Difficulty level */
  difficulty: DifficultyLevel;

  /** Part of speech */
  partOfSpeech: string;

  /** Grammatical gender (for gendered languages) */
  gender?: "masculine" | "feminine" | "neuter";

  /** Cultural notes and usage context */
  culturalNotes?: string;

  /** Transcriptions in various systems */
  transcription: Record<string, string>;

  /** Translations to other languages */
  translations: Record<string, string>;

  /** Example sentences */
  examples?: string[];

  /** Tone information (for tonal languages like Thai) */
  tone?: {
    syllables: string[];
    description: string;
  };
}

/**
 * Vocabulary dataset structure
 */
export interface VocabularyDataset {
  /** ISO 639-1 language code */
  language: GlostLanguage;

  /** Language name in English */
  languageName: string;

  /** Language name in native script */
  nativeName?: string;

  /** Vocabulary entries */
  vocabulary: VocabularyEntry[];
}

/**
 * Translation pair structure
 */
export interface TranslationPair {
  /** Source word */
  source: string;

  /** Target translation */
  target: string;

  /** Context or notes */
  context?: string;
}

/**
 * Translation dataset structure
 */
export interface TranslationDataset {
  /** Source language code */
  sourceLanguage: GlostLanguage;

  /** Target language code */
  targetLanguage: GlostLanguage;

  /** Translation pairs */
  translations: TranslationPair[];
}
