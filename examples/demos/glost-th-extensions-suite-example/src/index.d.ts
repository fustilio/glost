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
export { createThaiTranscriptionExtension } from "./transcription";
export { createThaiTranslationExtension } from "./translation";
export { createThaiWordJoinerExtension, ThaiWordJoinerExtension, type ThaiWordJoinerOptions, } from "./word-joiner";
export { createThaiSyllableSegmenter, ThaiSyllableSegmenter, type ThaiSyllableOptions, createThaiGenderTransformer, ThaiGenderTransformer, type ThaiGenderOptions, createThaiClauseSegmenter, ThaiClauseSegmenter, createThaiNegationTransformer, ThaiNegationTransformer, type ThaiNegationOptions, } from "./transformers";
export { createThaiPronunciationPipeline, createThaiDialoguePipeline, createThaiGrammarPipeline, createThaiComprehensivePipeline, ThaiLearningPipeline, ThaiConversationPipelineMale, ThaiConversationPipelineFemale, type ThaiPipelineOptions, } from "./pipeline";
import type { GLOSTASTExtension } from "glost-plugins";
import type { GlostLanguage } from "glost-common";
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
export declare function createThaiExtensions(nativeLanguage?: GlostLanguage): GLOSTASTExtension[];
//# sourceMappingURL=index.d.ts.map