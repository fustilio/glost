/**
 * Language Code Utilities for BCP-47 Standard
 *
 * Comprehensive utilities for working with language codes in BCP-47 format.
 * Provides normalization, matching, and conversion between different standards.
 *
 * @packageDocumentation
 */
/**
 * Branded type for BCP-47 language codes to ensure type safety
 */
export type BCP47LanguageCode = string & {
    readonly __brand: "BCP47";
};
/**
 * Parsed components of a BCP-47 language tag
 */
export interface LanguageCodeParts {
    /** Primary language subtag (ISO 639) */
    language: string;
    /** Optional script subtag (ISO 15924) */
    script?: string;
    /** Optional region subtag (ISO 3166-1) */
    region?: string;
    /** Optional variant subtag */
    variant?: string;
    /** Optional extension subtags */
    extensions?: Record<string, string>;
    /** Optional private use subtag */
    privateUse?: string;
}
/**
 * Options for language matching operations
 */
export interface MatchOptions {
    /** Ignore region differences when matching (e.g., en-US matches en-GB) */
    ignoreRegion?: boolean;
    /** Ignore script differences when matching */
    ignoreScript?: boolean;
    /** Fallback to base language if exact match not found */
    allowFallback?: boolean;
}
/**
 * Parse a BCP-47 language tag into its components
 *
 * @param code - Language code to parse
 * @returns Parsed components
 *
 * @example
 * ```typescript
 * parseLanguageCode("zh-Hans-CN")
 * // Returns: { language: 'zh', script: 'Hans', region: 'CN' }
 *
 * parseLanguageCode("en-US")
 * // Returns: { language: 'en', region: 'US' }
 * ```
 */
export declare function parseLanguageCode(code: string): LanguageCodeParts;
/**
 * Normalize a language code to BCP-47 format
 *
 * Converts ISO 639-3 (3-letter) codes to ISO 639-1 (2-letter) format
 * and adds default region if missing.
 *
 * @param code - Language code to normalize
 * @param options - Normalization options
 * @returns Normalized BCP-47 language code
 *
 * @example
 * ```typescript
 * normalizeLanguageCode("en")        // "en-US"
 * normalizeLanguageCode("tha")       // "th-TH"
 * normalizeLanguageCode("en-GB")     // "en-GB"
 * normalizeLanguageCode("fra")       // "fr-FR"
 * ```
 */
export declare function normalizeLanguageCode(code: string, options?: {
    addDefaultRegion?: boolean;
}): string;
/**
 * Get the base language code without region or script
 *
 * @param code - Language code
 * @returns Base language code
 *
 * @example
 * ```typescript
 * getLanguageBase("en-US")        // "en"
 * getLanguageBase("zh-Hans-CN")   // "zh"
 * ```
 */
export declare function getLanguageBase(code: string): string;
/**
 * Check if two language codes match according to specified options
 *
 * @param code1 - First language code
 * @param code2 - Second language code
 * @param options - Matching options
 * @returns True if codes match
 *
 * @example
 * ```typescript
 * matchLanguage("en-US", "en")                           // true
 * matchLanguage("en-GB", "en-US")                        // false
 * matchLanguage("en-GB", "en-US", { ignoreRegion: true }) // true
 * ```
 */
export declare function matchLanguage(code1: string, code2: string, options?: MatchOptions): boolean;
/**
 * Find the best matching language code from a list of available codes
 *
 * @param targetCode - Target language code to match
 * @param availableCodes - List of available language codes
 * @param options - Matching options
 * @returns Best matching code or undefined
 *
 * @example
 * ```typescript
 * findBestMatch("en-GB", ["en-US", "en-GB", "fr-FR"])  // "en-GB"
 * findBestMatch("en-AU", ["en-US", "en-GB", "fr-FR"])  // "en-US" (fallback)
 * ```
 */
export declare function findBestMatch(targetCode: string, availableCodes: string[], options?: MatchOptions): string | undefined;
/**
 * Get fallback languages for a given language code
 *
 * @param code - Language code
 * @returns Array of fallback codes in order of preference
 *
 * @example
 * ```typescript
 * getLanguageFallbacks("en-GB")
 * // Returns: ["en-GB", "en-US", "en"]
 *
 * getLanguageFallbacks("zh-Hans-CN")
 * // Returns: ["zh-Hans-CN", "zh-CN", "zh"]
 * ```
 */
export declare function getLanguageFallbacks(code: string): string[];
/**
 * Cast a string to BCP47LanguageCode type (with runtime validation)
 *
 * @param code - Code to cast
 * @returns BCP-47 language code
 * @throws Error if code is not valid BCP-47 format
 */
export declare function asBCP47(code: string): BCP47LanguageCode;
/**
 * Get translation lookup key candidates for a language code
 * Useful for finding translations in objects with mixed key formats
 *
 * @param code - Language code
 * @returns Array of possible keys to try
 *
 * @example
 * ```typescript
 * getTranslationKeys("en-US")
 * // Returns: ["en-US", "en", "eng"]
 * ```
 */
export declare function getTranslationKeys(code: string): string[];
//# sourceMappingURL=language-utils.d.ts.map