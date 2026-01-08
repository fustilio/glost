/**
 * Interfaces for Pluggable Dependencies
 * 
 * These interfaces allow glost-utils to be framework-agnostic by accepting
 * implementations rather than depending on concrete classes.
 */

// GlostLanguage type is available from @glost/common if needed for type constraints

/**
 * Interface for language-specific strategies
 * 
 * Provides language-specific behavior like gender terms, script detection,
 * and transcription system configuration.
 */
export interface ILanguageStrategy {
  /**
   * Get gender-specific terms for the language
   * Returns arrays of male and female terms that can be used to detect gender in text
   */
  getGenderTerms(): { male: string[]; female: string[] };

  /**
   * Get the script system for a given language
   * Examples: "th-TH" -> "thai", "ja-JP" -> "kanji", "en-US" -> "latin"
   */
  getScriptForLanguage(language: string): string;

  /**
   * Get the default transcription system for the language
   */
  getDefaultTranscriptionSystem(): string;

  /**
   * Get all available transcription systems for the language
   */
  getTranscriptionSystems(): Record<string, {
    name: string;
    rubyPosition?: "over" | "under" | "inter-character";
    className?: string;
    shouldShow?: boolean;
  }>;
}

/**
 * Interface for transcription providers
 * 
 * Provides transcription/transliteration data for text in various schemes.
 */
export interface ITranscriptionProvider {
  /**
   * Get transcription for text in a specific scheme
   * @param text - The text to transcribe
   * @param scheme - The transcription scheme (e.g., "paiboon", "rtgs", "ipa")
   * @returns The transcription, or undefined if not available
   */
  getTranscription(text: string, scheme: string): string | undefined;

  /**
   * Get the default transcription scheme
   */
  getDefaultScheme(): string;

  /**
   * Check if a transcription scheme is available
   */
  hasScheme(scheme: string): boolean;
}

