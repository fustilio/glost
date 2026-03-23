/**
 * GloST React - React utilities for rendering GloST documents
 *
 * This package provides React components, hooks, and types for rendering
 * GloST (Glossed Syntax Tree) documents with ruby annotations, progressive
 * display levels, and extensible metadata.
 *
 * @packageDocumentation
 */
export * from "./types/index.js";
export * from "./hooks/index.js";
export * from "./components/index.js";
export * from "./utils/index.js";
export { getWordText, getWordTranscription, getWordTranslation, getWordPartOfSpeech, getWordDifficulty, getAllWords, getAllSentences, getSentenceTranslation, } from "glost";
export type { GLOSTWord, GLOSTSentence, GLOSTRoot, GLOSTParagraph, } from "glost";
//# sourceMappingURL=index.d.ts.map