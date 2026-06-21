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
 * import { glost, createSimpleDocument, getAllWords } from "@glotblocks/glost";
 * import { languageLearningPreset } from "@glotblocks/glost/presets";
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
} from "@glotblocks/glost-core";

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
} from "@glotblocks/glost-core";

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
  getWordsFromDocument,
  findNodesByType,
  findWordsByLanguage,
  findWordsByTranscriptionSystem,
  isGLOSTWord,
  isGLOSTSentence,
  isGLOSTParagraph,
  isGLOSTRoot,
  getWordText,
  getWordTranscription,
  hasWordTranscription,
  getWordTranslation,
  getSentenceTranslation,
  getGLOSTWordCount,
  getWordPartOfSpeech,
  getWordDifficulty,
  getWordMeaning,
  // BCP-47 Language utilities
  parseLanguageTag,
  getBaseLanguage,
  areLanguagesCompatible,
  findBestLanguageMatch,
  getLanguageFallback,
  normalizeLanguageTag,
  isValidLanguageTag,
} from "@glotblocks/glost-core";

// ============================================================================
// Processor API
// ============================================================================
export { glost, GLOSTProcessor, GLOSTStreamProcessor } from "@glotblocks/glost-processor";
export type {
  FrozenProcessor,
  FrozenStreamProcessor,
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
  StreamOptions,
  ProcessedChunk,
} from "@glotblocks/glost-processor";

// ============================================================================
// Plugin Registry
// ============================================================================
export { pluginRegistry, PluginRegistry } from "@glotblocks/glost-registry";
export type {
  PluginMetadata,
  PluginCategory,
  PluginCapabilities,
  PluginQuery,
  ConflictReport,
  ValidationResult,
} from "@glotblocks/glost-registry";
