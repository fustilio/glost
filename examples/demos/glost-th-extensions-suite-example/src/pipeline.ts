/**
 * Thai GLOST Processing Pipelines
 *
 * Pre-configured extension pipelines for different Thai language learning
 * use cases. These pipelines combine transformers and enrichers in the
 * correct order for optimal processing.
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GlostLanguage } from "glost-common";

import {
  ThaiSyllableSegmenter,
  ThaiGenderTransformer,
  ThaiClauseSegmenter,
  ThaiNegationTransformer,
  createThaiSyllableSegmenter,
  createThaiGenderTransformer,
  createThaiClauseSegmenter,
  createThaiNegationTransformer,
} from "./transformers";

import {
  ThaiWordJoinerExtension,
  createThaiWordJoinerExtension,
} from "./word-joiner";

import { createThaiTranscriptionExtension } from "./transcription";
import { createThaiTranslationExtension } from "./translation";

// ============================================================================
// Pipeline Types
// ============================================================================

/**
 * Thai pipeline options
 */
export interface ThaiPipelineOptions {
  /**
   * Target gender for gender variants
   * @default "both"
   */
  gender?: "male" | "female" | "both";

  /**
   * Native language for translations
   * @default "en-US"
   */
  nativeLanguage?: GlostLanguage;

  /**
   * Whether to include syllable segmentation
   * @default true
   */
  includeSyllables?: boolean;

  /**
   * Whether to include grammar analysis (clauses)
   * @default false
   */
  includeGrammar?: boolean;

  /**
   * Whether to include transcription enrichment
   * @default true
   */
  includeTranscription?: boolean;

  /**
   * Whether to include translation enrichment
   * @default true
   */
  includeTranslation?: boolean;
}

// ============================================================================
// Learning Pipelines
// ============================================================================

/**
 * Create Thai pronunciation learning pipeline
 *
 * Optimized for pronunciation practice:
 * 1. Syllable segmentation (see syllable structure)
 * 2. Transcription enrichment (see romanization)
 * 3. Translation enrichment (understand meaning)
 *
 * @param options - Pipeline options
 * @returns Array of extensions in correct order
 *
 * @example
 * ```typescript
 * import { createThaiPronunciationPipeline } from "glost-extensions-thai";
 * import { processGLOSTWithExtensions } from "glost-extensions";
 *
 * const extensions = createThaiPronunciationPipeline();
 * const result = processGLOSTWithExtensions(document, extensions);
 *
 * // Words will have:
 * // - Syllable nodes with tone information
 * // - Romanized transcriptions
 * // - English translations
 * ```
 */
export function createThaiPronunciationPipeline(
  options: ThaiPipelineOptions = {}
): GLOSTExtension[] {
  const {
    nativeLanguage = "en-US",
    includeTranscription = true,
    includeTranslation = true,
  } = options;

  const pipeline: GLOSTExtension[] = [];

  // 1. Transformers first
  // Word joiner combines chunks into composite words before syllable segmentation
  pipeline.push(ThaiWordJoinerExtension);
  pipeline.push(ThaiSyllableSegmenter);

  // 2. Enrichers
  if (includeTranscription) {
    pipeline.push(createThaiTranscriptionExtension());
  }
  if (includeTranslation) {
    pipeline.push(createThaiTranslationExtension(nativeLanguage));
  }

  return pipeline;
}

/**
 * Create Thai dialogue/conversation pipeline
 *
 * Optimized for dialogue practice:
 * 1. Gender transformation (apply speaker gender)
 * 2. Syllable segmentation (pronunciation help)
 * 3. Transcription/translation enrichment
 *
 * @param options - Pipeline options
 * @returns Array of extensions in correct order
 *
 * @example
 * ```typescript
 * import { createThaiDialoguePipeline } from "glost-extensions-thai";
 *
 * // For male speaker practice
 * const extensions = createThaiDialoguePipeline({ gender: "male" });
 *
 * // "{ผม|ดิฉัน}ชอบกาแฟ{ครับ|ค่ะ}" → "ผมชอบกาแฟครับ"
 * ```
 */
export function createThaiDialoguePipeline(
  options: ThaiPipelineOptions = {}
): GLOSTExtension[] {
  const {
    gender = "both",
    nativeLanguage = "en-US",
    includeSyllables = true,
    includeTranscription = true,
    includeTranslation = true,
  } = options;

  const pipeline: GLOSTExtension[] = [];

  // 1. Gender transformation first
  pipeline.push(createThaiGenderTransformer({ perspective: gender }));

  // 2. Word joiner (combines chunks into composite words)
  pipeline.push(ThaiWordJoinerExtension);

  // 3. Syllable segmentation (operates on composite words)
  if (includeSyllables) {
    pipeline.push(ThaiSyllableSegmenter);
  }

  // 3. Enrichers
  if (includeTranscription) {
    pipeline.push(createThaiTranscriptionExtension());
  }
  if (includeTranslation) {
    pipeline.push(createThaiTranslationExtension(nativeLanguage));
  }

  return pipeline;
}

/**
 * Create Thai grammar analysis pipeline
 *
 * Optimized for grammar study:
 * 1. Clause segmentation (identify sentence structure)
 * 2. Syllable segmentation (word analysis)
 * 3. Transcription/translation enrichment
 *
 * @param options - Pipeline options
 * @returns Array of extensions in correct order
 *
 * @example
 * ```typescript
 * import { createThaiGrammarPipeline } from "glost-extensions-thai";
 *
 * const extensions = createThaiGrammarPipeline();
 *
 * // Sentences will be segmented into clauses:
 * // "ผมคิดว่าคุณถูก" → Clause(main) + Clause(subordinate)
 * ```
 */
export function createThaiGrammarPipeline(
  options: ThaiPipelineOptions = {}
): GLOSTExtension[] {
  const {
    nativeLanguage = "en-US",
    includeSyllables = true,
    includeTranscription = true,
    includeTranslation = true,
  } = options;

  const pipeline: GLOSTExtension[] = [];

  // 1. Word joiner (combines chunks into composite words)
  pipeline.push(ThaiWordJoinerExtension);

  // 2. Clause segmentation
  // TODO: Re-enable when clause segmenter is properly implemented
  // pipeline.push(ThaiClauseSegmenter);

  // 3. Syllable segmentation (operates on composite words)
  if (includeSyllables) {
    pipeline.push(ThaiSyllableSegmenter);
  }

  // 3. Enrichers
  if (includeTranscription) {
    pipeline.push(createThaiTranscriptionExtension());
  }
  if (includeTranslation) {
    pipeline.push(createThaiTranslationExtension(nativeLanguage));
  }

  return pipeline;
}

/**
 * Create Thai comprehensive learning pipeline
 *
 * Full pipeline with all transformers and enrichers:
 * 1. Gender transformation
 * 2. Clause segmentation
 * 3. Syllable segmentation
 * 4. Transcription enrichment
 * 5. Translation enrichment
 *
 * Use this for complete GLOST processing when you need all features.
 *
 * @param options - Pipeline options
 * @returns Array of extensions in correct order
 *
 * @example
 * ```typescript
 * import { createThaiComprehensivePipeline } from "glost-extensions-thai";
 *
 * const extensions = createThaiComprehensivePipeline({
 *   gender: "female",
 *   nativeLanguage: "en-US",
 * });
 *
 * const result = processGLOSTWithExtensions(document, extensions);
 *
 * // Document will have:
 * // - Gender variants applied
 * // - Sentences segmented into clauses
 * // - Words segmented into syllables with tones
 * // - Romanized transcriptions
 * // - English translations
 * ```
 */
export function createThaiComprehensivePipeline(
  options: ThaiPipelineOptions = {},
): GLOSTExtension[] {
  const {
    gender = "both",
    nativeLanguage = "en-US",
    includeSyllables = true,
    includeGrammar = true,
    includeTranscription = true,
    includeTranslation = true,
  } = options;

  const pipeline: GLOSTExtension[] = [];

  // 1. Transformers (order matters!)
  // Gender first (before word joining)
  pipeline.push(createThaiGenderTransformer({ perspective: gender }));

  // Word joiner (combines chunks into composite words)
  pipeline.push(ThaiWordJoinerExtension);

  // Clause segmentation (if grammar analysis needed)
  // TODO: Re-enable when clause segmenter is properly implemented
  // if (includeGrammar) {
  //   pipeline.push(ThaiClauseSegmenter);
  // }

  // Syllable segmentation last among transformers (operates on composite words)
  if (includeSyllables) {
    pipeline.push(ThaiSyllableSegmenter);
  }

  // 2. Enrichers
  if (includeTranscription) {
    pipeline.push(createThaiTranscriptionExtension());
  }
  if (includeTranslation) {
    pipeline.push(createThaiTranslationExtension(nativeLanguage));
  }

  return pipeline;
}

// ============================================================================
// Convenience Aliases
// ============================================================================

/**
 * Default Thai learning pipeline (pronunciation-focused)
 */
export const ThaiLearningPipeline = createThaiPronunciationPipeline();

/**
 * Default Thai conversation pipeline (male perspective)
 */
export const ThaiConversationPipelineMale = createThaiDialoguePipeline({
  gender: "male",
});

/**
 * Default Thai conversation pipeline (female perspective)
 */
export const ThaiConversationPipelineFemale = createThaiDialoguePipeline({
  gender: "female",
});
