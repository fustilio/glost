/**
 * GloST React - React utilities for rendering GloST documents
 *
 * This package provides React components, hooks, and types for rendering
 * GloST (Glossed Syntax Tree) documents with ruby annotations, progressive
 * display levels, and extensible metadata.
 *
 * @packageDocumentation
 */

// Types
export * from "./types/index.js";

// Hooks
export * from "./hooks/index.js";

// Components
export * from "./components/index.js";

// Utilities
export * from "./utils/index.js";

// Re-export commonly used glost utilities for convenience
export {
  getWordText,
  getWordTranscription,
  getWordTranslation,
  getWordPartOfSpeech,
  getWordDifficulty,
  getAllWords,
  getAllSentences,
  getSentenceTranslation,
} from "glost";

export type {
  GLOSTWord,
  GLOSTSentence,
  GLOSTRoot,
  GLOSTParagraph,
} from "glost";
