/**
 * glost-plugins-thai
 *
 * Thai language-specific GLOST extensions for transcription, translation,
 * and language learning transformations.
 *
 * This package provides:
 * - **Enrichers**: Transcription and translation lookups using @lalia/th-content
 * - **Transformers**: Syllable segmentation, gender variants, clause analysis
 * - **Pipelines**: Pre-configured extension combinations for different learning goals
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * // Basic transcription/translation
 * import { createThaiExtensions } from "glost-plugins-thai";
 * const extensions = createThaiExtensions();
 *
 * // Pronunciation learning (syllables + transcription)
 * import { createThaiPronunciationPipeline } from "glost-plugins-thai";
 * const pipeline = createThaiPronunciationPipeline();
 *
 * // Dialogue practice (gender variants + syllables)
 * import { createThaiDialoguePipeline } from "glost-plugins-thai";
 * const pipeline = createThaiDialoguePipeline({ gender: "male" });
 *
 * // Full analysis (everything)
 * import { createThaiComprehensivePipeline } from "glost-plugins-thai";
 * const pipeline = createThaiComprehensivePipeline();
 * ```
 */
// ============================================================================
// Enrichers (transcription/translation)
// ============================================================================
export { createThaiTranscriptionExtension } from "./transcription";
export { createThaiTranslationExtension } from "./translation";
// ============================================================================
// Transformers (word joiner, syllables, gender, clauses, negation)
// ============================================================================
export { 
// Word Joiner
createThaiWordJoinerExtension, ThaiWordJoinerExtension, } from "./word-joiner";
export { 
// Syllable Segmenter
createThaiSyllableSegmenter, ThaiSyllableSegmenter, 
// Gender Transformer
createThaiGenderTransformer, ThaiGenderTransformer, 
// Clause Segmenter
createThaiClauseSegmenter, ThaiClauseSegmenter, 
// Negation Transformer
createThaiNegationTransformer, ThaiNegationTransformer, } from "./transformers";
// ============================================================================
// Pipelines (pre-configured extension combinations)
// ============================================================================
export { 
// Pipeline creators
createThaiPronunciationPipeline, createThaiDialoguePipeline, createThaiGrammarPipeline, createThaiComprehensivePipeline, 
// Pre-configured pipelines
ThaiLearningPipeline, ThaiConversationPipelineMale, ThaiConversationPipelineFemale, } from "./pipeline";
import { createThaiTranscriptionExtension } from "./transcription";
import { createThaiTranslationExtension } from "./translation";
/**
 * Create basic Thai transcription and translation extensions
 *
 * Legacy convenience function that creates both enricher extensions.
 * For more comprehensive pipelines, use `createThaiComprehensivePipeline()`
 * or other pipeline functions.
 *
 * @param nativeLanguage - Native language for translations (default: "en-US")
 * @returns Array of GLOST extensions for Thai
 *
 * @example
 * ```typescript
 * import { createThaiExtensions } from "glost-plugins-thai";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extensions = createThaiExtensions("en-US");
 * const result = await processGLOSTWithExtensionsAsync(document, extensions);
 * ```
 *
 * @deprecated Use `createThaiPronunciationPipeline()` or other pipelines instead
 */
export function createThaiExtensions(nativeLanguage) {
    return [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(nativeLanguage),
    ];
}
//# sourceMappingURL=index.js.map