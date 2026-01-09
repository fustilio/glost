/**
 * GLOST Example Data (Test Utilities)
 *
 * Example vocabulary and translation data for testing and documentation.
 * This data is NOT included in the production build.
 *
 * @packageDocumentation
 */

// Export types
export type {
  VocabularyEntry,
  VocabularyDataset,
  TranslationPair,
  TranslationDataset,
} from "./types";

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
} from "./helpers";

// Export lookup function factories (composition layer)
export {
  createTranslationLookup,
  createTranscriptionLookup,
  createMultiSystemTranscriptionLookup,
  createCombinedLookup,
  createFallbackLookup,
  createEnrichedLookup,
} from "./lookup-functions";
