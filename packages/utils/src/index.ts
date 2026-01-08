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
} from "./interfaces";

// Export text-to-glost utilities
export {
  convertTextToGLOST,
  type ConvertTextToGLOSTOptions,
} from "./text-to-glost";

// Export merger utilities
export {
  mergeTranscriptionData,
  mergeTranscriptionDataIntoDocument,
  extendGLOSTWithMetadata,
  extendGLOSTDocumentWithMetadata,
  hydrateGLOSTDocument,
  filterGLOSTByGender,
} from "./glost-merger";

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
} from "./document-utils";

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
} from "./script-conversion";

// Export ingredient prep utilities
export * from "./ingredient-prep";

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

