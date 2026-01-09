/**
 * glost-utils
 * 
 * Framework-agnostic utilities for GLOST manipulation, conversion, and merging.
 * 
 * This package provides:
 * - Text-to-GLOST conversion with pluggable interfaces
 * - GLOST merging and hydration utilities
 * - Document manipulation utilities (re-exports from glost where applicable)
 * - Script conversion utilities
 */

// Export interfaces
export type {
  ILanguageStrategy,
  ITranscriptionProvider,
} from "./interfaces.js";

// Export text-to-glost utilities
export {
  convertTextToGLOST,
  type ConvertTextToGLOSTOptions,
} from "./text-to-glost.js";

// Export merger utilities
export {
  mergeTranscriptionData,
  mergeTranscriptionDataIntoDocument,
  extendGLOSTWithMetadata,
  extendGLOSTDocumentWithMetadata,
  hydrateGLOSTDocument,
  filterGLOSTByGender,
} from "./glost-merger.js";

// Export document utilities
// These re-export from glost where possible, adding convenience wrappers
export {
  getAllWordsFromDocument,
  getFirstSentenceFromDocument,
  getWordsFromFirstSentence,
  getDocumentTranscriptionSystems,
  hasTranscriptionData,
  getDocumentMetadata,
  getFirstSentence,
  getSentenceTranslation,
} from "./document-utils.js";

// Export script conversion utilities
export {
  type RubySegment,
  isRubySegment,
  convertScriptToString,
  isRubyScript,
  isPlainTextScript,
  ensureArrayFormat,
  ensureStringFormat,
  getPlainText,
} from "./script-conversion.js";

// Export ingredient prep utilities
export * from "./ingredient-prep/index.js";

// Export migration utilities
export {
  migrateLanguageCodes,
  migrateTranslationLanguageCodes,
  migrateAllLanguageCodes,
  type MigrateLanguageCodesOptions,
  type MigrationResult,
} from "./migrate-language-codes.js";

export {
  migrateTranscriptionSchema,
  needsTranscriptionMigration,
  analyzeTranscriptionMigration,
  type MigrateTranscriptionSchemaOptions,
  type TranscriptionMigrationResult,
} from "./migrate-transcription-schema.js";

// Re-export commonly used utilities from glost for convenience
export {
  // Tree traversal
  getAllWords,
  getAllSentences,
  getAllParagraphs,
  getWordsFromDocument,
  getWordsFromSentence,
  getWordsFromParagraph,
  
  // Node finding
  findNodesByType,
  findWordsByLanguage,
  findWordsByTranscriptionSystem,
  
  // Type guards
  isGLOSTWord,
  isGLOSTSentence,
  isGLOSTParagraph,
  isGLOSTRoot,
  
  // Word utilities
  getWordText,
  getWordTranscription,
  hasWordTranscription,
  getWordMeaning,
  getWordPartOfSpeech,
  getWordDifficulty,
  
  // BCP-47 Language utilities
  parseLanguageTag,
  getBaseLanguage,
  areLanguagesCompatible,
  findBestLanguageMatch,
  getLanguageFallback,
  normalizeLanguageTag,
  isValidLanguageTag,
} from "glost";

