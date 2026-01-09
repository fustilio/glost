// GLOST - Glossed Syntax Tree
// Extends nlcst for language learning with annotations

export * from "./types.js";
export * from "./nodes.js";
export * from "./utils.js";
export * from "./validators.js";
export * from "./guards.js";
export * from "./errors.js";
// export * from './example.js';

// Re-export utility types
export type { ParagraphLike } from "./utils.js";

// Re-export key utilities for transcription components
export {
  // Tree traversal
  getAllWords,
  getAllSentences,
  getAllParagraphs,
  getAllClauses,
  getAllPhrases,
  getAllSyllables,
  getAllCharacters,
  getWordsFromDocument,
  getFirstSentence,
  getWordsFromSentence,
  getWordsFromParagraph,

  // Node finding
  findNodesByType,
  findWordsByLanguage,
  findWordsByTranscriptionSystem,

  // Type guards (most are now exported via guards.ts)
  isGLOSTWord,
  isGLOSTSentence,
  isGLOSTParagraph,
  isGLOSTRoot,
  isGLOSTClause,
  isGLOSTPhrase,
  isGLOSTSyllable,
  isGLOSTCharacter,

  // Word utilities
  getWordText,
  getWordTranscription,
  hasWordTranscription,
  getWordTranslation,
  getWordMeaning,
  getWordPartOfSpeech,
  getWordDifficulty,

  // Sentence utilities
  getSentenceTranslation,

  // Content statistics utilities
  getGLOSTWordCount,
  adaptParagraphLikeToGLOST,

  // BCP-47 Language utilities
  parseLanguageTag,
  getBaseLanguage,
  areLanguagesCompatible,
  findBestLanguageMatch,
  getLanguageFallback,
  normalizeLanguageTag,
  isValidLanguageTag,
} from "./utils.js";
