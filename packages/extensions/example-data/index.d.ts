/**
 * GLOST Example Data
 *
 * Example vocabulary and translation data for testing and documentation.
 * Demonstrates SRP (Single Responsibility Principle) and SSOT (Single Source of Truth).
 *
 * @packageDocumentation
 */
export type { VocabularyEntry, VocabularyDataset, TranslationPair, TranslationDataset, } from "./types.js";
export { loadVocabulary, getAvailableLanguages, findWord, getTranslation, getTranscription, getAllTranscriptions, getWordsByProperty, getRandomWord, countVocabulary, } from "./helpers.js";
export { createTranslationLookup, createTranscriptionLookup, createMultiSystemTranscriptionLookup, createCombinedLookup, createFallbackLookup, createEnrichedLookup, } from "./lookup-functions.js";
//# sourceMappingURL=index.d.ts.map