/**
 * Thai GLOST Presets
 * 
 * Pre-configured presets for Thai language GLOST processing.
 * These presets combine Thai-specific extensions into ready-to-use
 * configurations for common use cases.
 * 
 * @packageDocumentation
 * 
 * @example
 * ```typescript
 * import { thaiQuickStartPreset } from "@glotblocks/glost-th/presets";
 * import { processGLOSTWithExtensionsAsync } from "@glotblocks/glost-plugins";
 * 
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiQuickStartPreset
 * );
 * ```
 */

import type { GLOSTExtension } from "@glotblocks/glost-plugins";
import type { GlostLanguage } from "@glotblocks/glost-common";
import { createTranscriptionExtension } from "@glotblocks/glost-transcription";
import { createTranslationExtension } from "@glotblocks/glost-translation";
import { createClauseSegmenterExtension } from "@glotblocks/glost-clause-segmenter";
import { 
  thaiTranscriptionProvider,
  thaiTranslationProvider,
} from "./extensions/index.js";
import { thaiSegmenterProvider } from "./segmenter/index.js";

// Re-export types for convenience
export type { GLOSTExtension } from "@glotblocks/glost-plugins";
export type { GlostLanguage } from "@glotblocks/glost-common";

/**
 * Options for Thai presets
 */
export interface ThaiPresetOptions {
  /** Native language for translations */
  nativeLanguage?: GlostLanguage;
  /** Whether to include clause segmentation */
  includeGrammar?: boolean;
  /** Whether to include syllable segmentation */
  includeSyllables?: boolean;
}

// ============================================================================
// Quick Start Preset
// ============================================================================

/**
 * Quick Start Preset
 * 
 * Perfect for getting started quickly with basic transcription and translation.
 * Use this when you just want to see Thai text with transcriptions.
 * 
 * **Includes:**
 * - Transcription (RTGS + IPA)
 * - Translation (English)
 * 
 * @example
 * ```typescript
 * import { thaiQuickStartPreset } from "@glotblocks/glost-th/presets";
 * 
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiQuickStartPreset
 * );
 * ```
 */
export const thaiQuickStartPreset: GLOSTExtension[] = [
  createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProvider,
  }),
  createTranslationExtension({
    from: "th",
    to: "en",
    provider: thaiTranslationProvider,
  }),
];

/**
 * Create a customized quick start preset
 */
export function createThaiQuickStartPreset(
  options?: { nativeLanguage?: GlostLanguage }
): GLOSTExtension[] {
  const targetLang = (options?.nativeLanguage?.startsWith("en") 
    ? "en" 
    : options?.nativeLanguage || "en") as GlostLanguage;
  
  return [
    createTranscriptionExtension({
      targetLanguage: "th",
      provider: thaiTranscriptionProvider,
    }),
    createTranslationExtension({
      from: "th",
      to: targetLang,
      provider: thaiTranslationProvider,
    }),
  ];
}

// ============================================================================
// Pronunciation Preset
// ============================================================================

/**
 * Pronunciation Preset
 * 
 * Focused on pronunciation learning with syllable breakdown and IPA.
 * 
 * **Includes:**
 * - Transcription (RTGS + IPA)
 * - Translation (English)
 * - Syllable segmentation (when available)
 * 
 * @example
 * ```typescript
 * import { thaiPronunciationPreset } from "@glotblocks/glost-th/presets";
 * 
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiPronunciationPreset
 * );
 * ```
 */
export const thaiPronunciationPreset: GLOSTExtension[] = [
  createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProvider,
  }),
  createTranslationExtension({
    from: "th",
    to: "en",
    provider: thaiTranslationProvider,
  }),
  // Note: Syllable segmentation would be added here when available
  // from the extensions suite
];

/**
 * Create a customized pronunciation preset
 */
export function createThaiPronunciationPreset(
  options?: { nativeLanguage?: GlostLanguage }
): GLOSTExtension[] {
  const targetLang = (options?.nativeLanguage?.startsWith("en") 
    ? "en" 
    : options?.nativeLanguage || "en") as GlostLanguage;
  
  return [
    createTranscriptionExtension({
      targetLanguage: "th",
      provider: thaiTranscriptionProvider,
    }),
    createTranslationExtension({
      from: "th",
      to: targetLang,
      provider: thaiTranslationProvider,
    }),
  ];
}

// ============================================================================
// Grammar Preset
// ============================================================================

/**
 * Grammar Preset
 * 
 * Focused on grammar analysis with clause segmentation.
 * 
 * **Includes:**
 * - Clause segmentation
 * - Transcription (RTGS + IPA)
 * - Translation (English)
 * 
 * @example
 * ```typescript
 * import { thaiGrammarPreset } from "@glotblocks/glost-th/presets";
 * 
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiGrammarPreset
 * );
 * ```
 */
export const thaiGrammarPreset: GLOSTExtension[] = [
  createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProvider,
  }),
  createTranslationExtension({
    from: "th",
    to: "en",
    provider: thaiTranslationProvider,
  }),
  createClauseSegmenterExtension({
    targetLanguage: "th",
    provider: thaiSegmenterProvider,
    includeMarkers: true,
  }),
];

/**
 * Create a customized grammar preset
 */
export function createThaiGrammarPreset(
  options?: ThaiPresetOptions
): GLOSTExtension[] {
  const targetLang = (options?.nativeLanguage?.startsWith("en") 
    ? "en" 
    : options?.nativeLanguage || "en") as GlostLanguage;
  
  const extensions: GLOSTExtension[] = [
    createTranscriptionExtension({
      targetLanguage: "th",
      provider: thaiTranscriptionProvider,
    }),
    createTranslationExtension({
      from: "th",
      to: targetLang,
      provider: thaiTranslationProvider,
    }),
  ];

  if (options?.includeGrammar !== false) {
    extensions.push(
      createClauseSegmenterExtension({
        targetLanguage: "th",
        provider: thaiSegmenterProvider,
        includeMarkers: true,
      })
    );
  }

  return extensions;
}

// ============================================================================
// Learning Preset
// ============================================================================

/**
 * Learning Preset
 * 
 * Comprehensive preset for language learning with all features.
 * 
 * **Includes:**
 * - Transcription (RTGS + IPA)
 * - Translation (English)
 * - Clause segmentation
 * - Syllable segmentation (when available)
 * 
 * @example
 * ```typescript
 * import { thaiLearningPreset } from "@glotblocks/glost-th/presets";
 * 
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiLearningPreset
 * );
 * ```
 */
export const thaiLearningPreset: GLOSTExtension[] = [
  createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProvider,
  }),
  createTranslationExtension({
    from: "th",
    to: "en",
    provider: thaiTranslationProvider,
  }),
  createClauseSegmenterExtension({
    targetLanguage: "th",
    provider: thaiSegmenterProvider,
    includeMarkers: true,
  }),
];

/**
 * Create a customized learning preset
 */
export function createThaiLearningPreset(
  options?: ThaiPresetOptions
): GLOSTExtension[] {
  const targetLang = (options?.nativeLanguage?.startsWith("en") 
    ? "en" 
    : options?.nativeLanguage || "en") as GlostLanguage;
  
  const extensions: GLOSTExtension[] = [
    createTranscriptionExtension({
      targetLanguage: "th",
      provider: thaiTranscriptionProvider,
    }),
    createTranslationExtension({
      from: "th",
      to: targetLang,
      provider: thaiTranslationProvider,
    }),
  ];

  if (options?.includeGrammar !== false) {
    extensions.push(
      createClauseSegmenterExtension({
        targetLanguage: "th",
        provider: thaiSegmenterProvider,
        includeMarkers: true,
      })
    );
  }

  return extensions;
}

// ============================================================================
// Minimal Preset
// ============================================================================

/**
 * Minimal Preset
 * 
 * Just the essentials - transcription only. Fastest option.
 * 
 * **Includes:**
 * - Transcription (RTGS + IPA)
 * 
 * @example
 * ```typescript
 * import { thaiMinimalPreset } from "@glotblocks/glost-th/presets";
 * 
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiMinimalPreset
 * );
 * ```
 */
export const thaiMinimalPreset: GLOSTExtension[] = [
  createTranscriptionExtension({
    targetLanguage: "th",
    provider: thaiTranscriptionProvider,
  }),
];

// ============================================================================
// All Presets Export
// ============================================================================

/**
 * All available Thai presets
 */
export const THAI_PRESETS = {
  minimal: thaiMinimalPreset,
  quickStart: thaiQuickStartPreset,
  pronunciation: thaiPronunciationPreset,
  grammar: thaiGrammarPreset,
  learning: thaiLearningPreset,
} as const;

export type ThaiPresetName = keyof typeof THAI_PRESETS;
