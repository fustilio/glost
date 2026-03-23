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
import { createTranscriptionExtension } from "glost-transcription";
import { createTranslationExtension } from "glost-translation";
import { createClauseSegmenterExtension } from "glost-clause-segmenter";
import { thaiTranscriptionProvider, thaiTranslationProvider, } from "./extensions/index.js";
import { thaiSegmenterProvider } from "./segmenter/index.js";
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
 * import { thaiQuickStartPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiQuickStartPreset
 * );
 * ```
 */
export const thaiQuickStartPreset = [
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
export function createThaiQuickStartPreset(options) {
    const targetLang = (options?.nativeLanguage?.startsWith("en")
        ? "en"
        : options?.nativeLanguage || "en");
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
 * import { thaiPronunciationPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiPronunciationPreset
 * );
 * ```
 */
export const thaiPronunciationPreset = [
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
export function createThaiPronunciationPreset(options) {
    const targetLang = (options?.nativeLanguage?.startsWith("en")
        ? "en"
        : options?.nativeLanguage || "en");
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
 * import { thaiGrammarPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiGrammarPreset
 * );
 * ```
 */
export const thaiGrammarPreset = [
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
export function createThaiGrammarPreset(options) {
    const targetLang = (options?.nativeLanguage?.startsWith("en")
        ? "en"
        : options?.nativeLanguage || "en");
    const extensions = [
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
        extensions.push(createClauseSegmenterExtension({
            targetLanguage: "th",
            provider: thaiSegmenterProvider,
            includeMarkers: true,
        }));
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
 * import { thaiLearningPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiLearningPreset
 * );
 * ```
 */
export const thaiLearningPreset = [
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
export function createThaiLearningPreset(options) {
    const targetLang = (options?.nativeLanguage?.startsWith("en")
        ? "en"
        : options?.nativeLanguage || "en");
    const extensions = [
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
        extensions.push(createClauseSegmenterExtension({
            targetLanguage: "th",
            provider: thaiSegmenterProvider,
            includeMarkers: true,
        }));
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
 * import { thaiMinimalPreset } from "glost-th/presets";
 *
 * const result = await processGLOSTWithExtensionsAsync(
 *   document,
 *   thaiMinimalPreset
 * );
 * ```
 */
export const thaiMinimalPreset = [
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
};
//# sourceMappingURL=presets.js.map