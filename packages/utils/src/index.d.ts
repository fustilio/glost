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
export type { ILanguageStrategy, ITranscriptionProvider, } from "./interfaces.js";
export { convertTextToGLOST, type ConvertTextToGLOSTOptions, } from "./text-to-glost.js";
export { mergeTranscriptionData, mergeTranscriptionDataIntoDocument, extendGLOSTWithMetadata, extendGLOSTDocumentWithMetadata, hydrateGLOSTDocument, filterGLOSTByGender, } from "./glost-merger.js";
export { getAllWordsFromDocument, getFirstSentenceFromDocument, getWordsFromFirstSentence, getDocumentTranscriptionSystems, hasTranscriptionData, getDocumentMetadata, getFirstSentence, getSentenceTranslation, } from "./document-utils.js";
export { type RubySegment, isRubySegment, convertScriptToString, isRubyScript, isPlainTextScript, ensureArrayFormat, ensureStringFormat, getPlainText, } from "./script-conversion.js";
export * from "./ingredient-prep/index.js";
export { migrateLanguageCodes, migrateTranslationLanguageCodes, migrateAllLanguageCodes, type MigrateLanguageCodesOptions, type MigrationResult, } from "./migrate-language-codes.js";
export { migrateTranscriptionSchema, needsTranscriptionMigration, analyzeTranscriptionMigration, type MigrateTranscriptionSchemaOptions, type TranscriptionMigrationResult, } from "./migrate-transcription-schema.js";
export { getAllWords, getAllSentences, getAllParagraphs, getWordsFromDocument, getWordsFromSentence, getWordsFromParagraph, findNodesByType, findWordsByLanguage, findWordsByTranscriptionSystem, isGLOSTWord, isGLOSTSentence, isGLOSTParagraph, isGLOSTRoot, getWordText, getWordTranscription, hasWordTranscription, getWordMeaning, getWordPartOfSpeech, getWordDifficulty, parseLanguageTag, getBaseLanguage, areLanguagesCompatible, findBestLanguageMatch, getLanguageFallback, normalizeLanguageTag, isValidLanguageTag, } from "glost";
//# sourceMappingURL=index.d.ts.map