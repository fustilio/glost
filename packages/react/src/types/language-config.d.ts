import type { DisplayLevel, LevelConfig } from "./display-level.js";
/**
 * Configuration for a transcription system
 *
 * @example
 * ```ts
 * const furiganaConfig: TranscriptionSystemConfig = {
 *   id: "furigana",
 *   label: "Furigana",
 *   position: "above",
 *   hideWhenSameAsText: true,
 * };
 * ```
 */
export interface TranscriptionSystemConfig {
    /** Unique identifier for the transcription system */
    id: string;
    /** Human-readable label */
    label: string;
    /** Position relative to the main text */
    position: "above" | "below";
    /** Hide transcription when it matches the text (e.g., hiragana words in Japanese) */
    hideWhenSameAsText?: boolean;
    /** Optional CSS class name for styling */
    className?: string;
}
/**
 * Complete language configuration for rendering GloST documents
 *
 * @example
 * ```ts
 * const japaneseConfig: LanguageConfig = {
 *   lang: "ja",
 *   script: "kanji",
 *   name: "Japanese",
 *   transcriptionSystems: {
 *     furigana: { id: "furigana", label: "Furigana", position: "above", hideWhenSameAsText: true },
 *     romaji: { id: "romaji", label: "Romaji", position: "above" },
 *   },
 *   defaultTranscriptionSystem: "furigana",
 *   defaultLevel: 2,
 * };
 * ```
 */
export interface LanguageConfig {
    /** BCP-47 language code */
    lang: string;
    /** Script identifier (e.g., "kanji", "thai", "hangul") */
    script: string;
    /** Human-readable language name */
    name: string;
    /** Available transcription systems */
    transcriptionSystems: Record<string, TranscriptionSystemConfig>;
    /** Default transcription system to use */
    defaultTranscriptionSystem: string;
    /** Display level configurations (optional, uses defaults if not provided) */
    displayLevels?: Record<DisplayLevel, LevelConfig>;
    /** Level descriptions for UI (optional) */
    levelDescriptions?: Record<DisplayLevel, string>;
    /** Default display level */
    defaultLevel: DisplayLevel;
}
/**
 * Get transcription system config from a language config
 */
export declare function getTranscriptionSystem(config: LanguageConfig, system?: string): TranscriptionSystemConfig | undefined;
/**
 * Get available transcription system IDs
 */
export declare function getAvailableTranscriptionSystems(config: LanguageConfig): string[];
/**
 * Check if transcription should be hidden (when same as text)
 */
export declare function shouldHideTranscription(config: LanguageConfig, system: string, text: string, transcription: string): boolean;
//# sourceMappingURL=language-config.d.ts.map