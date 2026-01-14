import type { GLOSTWord } from "glost";

/**
 * Ruby position for transcription annotations
 *
 * - "over": Transcription appears above the text (standard for Japanese furigana)
 * - "under": Transcription appears below the text (common for Thai, Korean)
 * - "inter-character": Transcription between characters (rare, for special cases)
 */
export type RubyPosition = "over" | "under" | "inter-character";

/**
 * Language-specific rendering strategy
 *
 * This interface allows customizing how words are rendered based on
 * language-specific requirements. For example, Japanese furigana should
 * appear above kanji but hidden for hiragana-only words.
 *
 * @example
 * ```ts
 * const japaneseStrategy: LanguageRenderingStrategy = {
 *   shouldShowTranscription: (word, system) => {
 *     // Hide furigana for pure hiragana words
 *     if (system === "furigana") {
 *       const text = getWordText(word);
 *       return !isAllHiragana(text);
 *     }
 *     return true;
 *   },
 *   getRubyPosition: () => "over",
 * };
 * ```
 */
export interface LanguageRenderingStrategy {
  /**
   * Determine if transcription should be hidden for this word
   * @deprecated Use shouldShowTranscription instead
   */
  shouldHideTranscription?: (
    word: GLOSTWord,
    transcriptionSystem: string
  ) => boolean;

  /**
   * Get the position for transcription display
   */
  getTranscriptionPosition?: (
    word: GLOSTWord,
    transcriptionSystem: string
  ) => "above" | "below";

  /**
   * Get additional CSS class for transcription
   */
  getTranscriptionClassName?: (
    word: GLOSTWord,
    transcriptionSystem: string
  ) => string;

  /**
   * Get ruby annotation position
   */
  getRubyPosition?: (
    word: GLOSTWord,
    transcriptionSystem: string
  ) => RubyPosition;

  /**
   * Determine if transcription should be shown for this word
   * This is the preferred method over shouldHideTranscription
   */
  shouldShowTranscription?: (
    word: GLOSTWord,
    transcriptionSystem: string
  ) => boolean;

  /**
   * Get placeholder content when transcription is hidden
   * Used to maintain consistent spacing
   */
  getTranscriptionPlaceholder?: (
    word: GLOSTWord,
    transcriptionSystem: string
  ) => string;
}

/**
 * Default rendering strategy with sensible defaults
 */
export const defaultRenderingStrategy: LanguageRenderingStrategy = {
  shouldHideTranscription: () => false,
  getTranscriptionPosition: () => "below",
  getTranscriptionClassName: () => "",
  getRubyPosition: () => "over",
  shouldShowTranscription: () => true,
  getTranscriptionPlaceholder: () => "",
};

/**
 * Create a rendering strategy by merging with defaults
 */
export function createRenderingStrategy(
  overrides: Partial<LanguageRenderingStrategy>
): LanguageRenderingStrategy {
  return {
    ...defaultRenderingStrategy,
    ...overrides,
  };
}
