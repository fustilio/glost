// GLOST - Glossed Syntax Tree
// Extends nlcst for language learning with annotations

export * from "./types";
export * from "./nodes";
export * from "./utils";
export * from "./validators";
export * from "./guards";
// export * from './example';
export * from "./mock-data";

// Re-export utility types
export type { ParagraphLike } from "./utils";

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
} from "./utils";
