/**
 * GLOST Presets
 * 
 * Preset configurations for common GLOST use cases.
 * 
 * @packageDocumentation
 * 
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { languageLearningPreset } from "glost-presets";
 * 
 * const processor = glost()
 *   .use(languageLearningPreset);
 * 
 * const result = await processor.process(document);
 * ```
 */

export {
  languageLearningPreset,
  createLanguageLearningPreset,
} from "./language-learning.js";

export {
  readingAppPreset,
  createReadingAppPreset,
} from "./reading-app.js";

export {
  vocabularyBuilderPreset,
  createVocabularyBuilderPreset,
} from "./vocabulary-builder.js";

export {
  grammarAnalyzerPreset,
  createGrammarAnalyzerPreset,
} from "./grammar-analyzer.js";

export {
  minimalPreset,
  createMinimalPreset,
} from "./minimal.js";
