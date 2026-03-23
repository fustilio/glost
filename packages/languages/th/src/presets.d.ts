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
 * import { thaiQuickStartPreset } from "glost-th/presets";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiQuickStartPreset
 * );
 * ```
 */
import type { GLOSTExtension } from "glost-plugins";
import type { GlostLanguage } from "glost-common";
export type { GLOSTExtension } from "glost-plugins";
export type { GlostLanguage } from "glost-common";
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
 * import { thaiQuickStartPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiQuickStartPreset
 * );
 * ```
 */
export declare const thaiQuickStartPreset: GLOSTExtension[];
/**
 * Create a customized quick start preset
 */
export declare function createThaiQuickStartPreset(options?: {
    nativeLanguage?: GlostLanguage;
}): GLOSTExtension[];
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
 * import { thaiPronunciationPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiPronunciationPreset
 * );
 * ```
 */
export declare const thaiPronunciationPreset: GLOSTExtension[];
/**
 * Create a customized pronunciation preset
 */
export declare function createThaiPronunciationPreset(options?: {
    nativeLanguage?: GlostLanguage;
}): GLOSTExtension[];
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
 * import { thaiGrammarPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiGrammarPreset
 * );
 * ```
 */
export declare const thaiGrammarPreset: GLOSTExtension[];
/**
 * Create a customized grammar preset
 */
export declare function createThaiGrammarPreset(options?: ThaiPresetOptions): GLOSTExtension[];
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
 * import { thaiLearningPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiLearningPreset
 * );
 * ```
 */
export declare const thaiLearningPreset: GLOSTExtension[];
/**
 * Create a customized learning preset
 */
export declare function createThaiLearningPreset(options?: ThaiPresetOptions): GLOSTExtension[];
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
 * import { thaiMinimalPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiMinimalPreset
 * );
 * ```
 */
export declare const thaiMinimalPreset: GLOSTExtension[];
/**
 * All available Thai presets
 */
export declare const THAI_PRESETS: {
    readonly minimal: GLOSTExtension[];
    readonly quickStart: GLOSTExtension[];
    readonly pronunciation: GLOSTExtension[];
    readonly grammar: GLOSTExtension[];
    readonly learning: GLOSTExtension[];
};
export type ThaiPresetName = keyof typeof THAI_PRESETS;
//# sourceMappingURL=presets.d.ts.map