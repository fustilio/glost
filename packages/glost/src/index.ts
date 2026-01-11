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

// ============================================================================
// Core Types
// ============================================================================
export type {
  GLOSTNode,
  GLOSTRoot,
  GLOSTParagraph,
  GLOSTSentence,
  GLOSTWord,
  GLOSTText,
  GLOSTWhiteSpace,
  GLOSTPunctuation,
  GLOSTSymbol,
  GLOSTSource,
  GLOSTClause,
  GLOSTPhrase,
  GLOSTSyllable,
  GLOSTCharacter,
  GLOSTExtras,
  TransliterationData,
  LinguisticMetadata,
  LanguageCode,
  ScriptSystem,
} from "glost-core";

// ============================================================================
// Node Factories
// ============================================================================
export {
  createGLOSTRootNode,
  createGLOSTParagraphNode,
  createGLOSTSentenceNode,
  createGLOSTWordNode,
  createGLOSTTextNode,
  createGLOSTWhiteSpaceNode,
  createGLOSTPunctuationNode,
  createGLOSTSymbolNode,
  createSimpleDocument,
  createDocumentFromSentences,
  createDocumentFromParagraphs,
  createSentenceFromWords,
  createParagraphFromSentences,
  createSimpleWord,
  NODE_TYPES,
} from "glost-core";

// ============================================================================
// Tree Utilities
// ============================================================================
export {
  getAllWords,
  getAllSentences,
  getAllParagraphs,
  getAllClauses,
  getFirstSentence,
  getWordsFromSentence,
  getWordsFromParagraph,
  findWordsByLanguage,
  isGLOSTWord,
  isGLOSTSentence,
  isGLOSTParagraph,
  isGLOSTRoot,
  getWordText,
  getWordTranscription,
  getWordTranslation,
  getSentenceTranslation,
  getGLOSTWordCount,
} from "glost-core";

// ============================================================================
// Processor API
// ============================================================================
export { glost, GLOSTProcessor } from "glost-processor";
export type {
  FrozenProcessor,
  Plugin,
  PluginSpec,
  Preset,
  ProcessorOptions,
  ProcessingResult,
  ProcessingError,
  ProcessingWarning,
  ProcessingStats,
  BeforeHook,
  AfterHook,
  ErrorHook,
  SkipHook,
  ProgressHook,
  ProgressStats,
} from "glost-processor";

// ============================================================================
// Plugin Registry
// ============================================================================
export { pluginRegistry, PluginRegistry } from "glost-registry";
export type {
  PluginMetadata,
  PluginCategory,
  PluginCapabilities,
  PluginQuery,
  ConflictReport,
  ValidationResult,
} from "glost-registry";
