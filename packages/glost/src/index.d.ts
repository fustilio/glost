/**
 * GLOST - Glossed Syntax Tree
 *
 * Main package that re-exports all GLOST functionality.
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * // Import everything from one place
 * import { glost, createSimpleDocument, getAllWords } from "glost";
 * import { languageLearningPreset } from "glost/presets";
 *
 * // Create a document
 * const document = createSimpleDocument(words, "th", "thai");
 *
 * // Process with plugins
 * const result = await glost()
 *   .use(languageLearningPreset)
 *   .process(document);
 * ```
 */
export type { GLOSTNode, GLOSTRoot, GLOSTParagraph, GLOSTSentence, GLOSTWord, GLOSTText, GLOSTWhiteSpace, GLOSTPunctuation, GLOSTSymbol, GLOSTSource, GLOSTClause, GLOSTPhrase, GLOSTSyllable, GLOSTCharacter, GLOSTExtras, TransliterationData, LinguisticMetadata, LanguageCode, ScriptSystem, } from "glost-core";
export { createGLOSTRootNode, createGLOSTParagraphNode, createGLOSTSentenceNode, createGLOSTWordNode, createGLOSTTextNode, createGLOSTWhiteSpaceNode, createGLOSTPunctuationNode, createGLOSTSymbolNode, createSimpleDocument, createDocumentFromSentences, createDocumentFromParagraphs, createSentenceFromWords, createParagraphFromSentences, createSimpleWord, NODE_TYPES, } from "glost-core";
export { getAllWords, getAllSentences, getAllParagraphs, getAllClauses, getFirstSentence, getWordsFromSentence, getWordsFromParagraph, findWordsByLanguage, isGLOSTWord, isGLOSTSentence, isGLOSTParagraph, isGLOSTRoot, getWordText, getWordTranscription, getWordTranslation, getSentenceTranslation, getGLOSTWordCount, } from "glost-core";
export { glost, GLOSTProcessor, GLOSTStreamProcessor } from "glost-processor";
export type { FrozenProcessor, FrozenStreamProcessor, Plugin, PluginSpec, Preset, ProcessorOptions, ProcessingResult, ProcessingError, ProcessingWarning, ProcessingStats, BeforeHook, AfterHook, ErrorHook, SkipHook, ProgressHook, ProgressStats, StreamOptions, ProcessedChunk, } from "glost-processor";
export { pluginRegistry, PluginRegistry } from "glost-registry";
export type { PluginMetadata, PluginCategory, PluginCapabilities, PluginQuery, ConflictReport, ValidationResult, } from "glost-registry";
//# sourceMappingURL=index.d.ts.map