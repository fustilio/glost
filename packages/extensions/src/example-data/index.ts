/**
 * GLOST Example Data
 *
 * Example vocabulary and translation data for testing and documentation.
 * Demonstrates SRP (Single Responsibility Principle) and SSOT (Single Source of Truth).
 *
 * @packageDocumentation
 */

// Export types
export type {
  VocabularyEntry,
  VocabularyDataset,
  TranslationPair,
  TranslationDataset,
} from "./types.js";

// Export helpers (data access layer - SSOT)
export {
  loadVocabulary,
  getAvailableLanguages,
  findWord,
  getTranslation,
  getTranscription,
  getAllTranscriptions,
  getWordsByProperty,
  getRandomWord,
  countVocabulary,
} from "./helpers.js";

// Export lookup function factories (composition layer)
export {
  createTranslationLookup,
  createTranscriptionLookup,
  createMultiSystemTranscriptionLookup,
  createCombinedLookup,
  createFallbackLookup,
  createEnrichedLookup,
} from "./lookup-functions.js";
