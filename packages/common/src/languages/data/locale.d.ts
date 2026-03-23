/**
 * Language Code Management
 *
 * Internal format: BCP-47 with ISO-639-3 (three-letter codes) for precise identification
 * - ISO-639-3: Three-letter codes covering 7000+ languages
 * - ISO-639-1: Two-letter codes (184 languages) - supported for convenience
 * - BCP-47: Full language tags with script/region (e.g., "cmn-Hans-CN")
 */
/**
 * Map ISO-639-1 (two-letter) to ISO-639-3 (three-letter) codes
 * ISO-639-3 is more precise - e.g., "zh" maps to multiple languages
 */
export declare const ISO639_1_TO_3: Record<string, string>;
/**
 * Reverse mapping: ISO-639-3 to ISO-639-1
 */
export declare const ISO639_3_TO_1: Record<string, string>;
export type LanguageEntry = {
    name: string;
    nativeName: string;
    iso1?: string;
};
/**
 * Complete language database indexed by ISO-639-3
 * Includes all 184 ISO-639-1 languages plus Chinese varieties
 */
export declare const LANGUAGE_DATA: Record<string, LanguageEntry>;
/**
 * Normalize any language code to ISO-639-3
 */
export declare function toISO639_3(code: string): string;
/**
 * Normalize to ISO-639-1 if possible
 */
export declare function toISO639_1(code: string): string | undefined;
/**
 * Get language name from any code format
 */
export declare function getLanguageName(code: string): string;
/**
 * Get native language name from any code format
 */
export declare function getNativeLanguageName(code: string): string;
/**
 * Check if code is valid (known in our database)
 */
export declare function isValidLanguageCode(code: string): boolean;
export type BCP47Components = {
    language: string;
    script?: string;
    region?: string;
};
/**
 * Parse BCP-47 tag into components
 */
export declare function parseBCP47(tag: string): BCP47Components;
/**
 * Build BCP-47 tag from components
 */
export declare function buildBCP47(components: BCP47Components): string;
/**
 * Normalize BCP-47 tag (consistent casing)
 */
export declare function normalizeBCP47(tag: string): string;
/**
 * Check if tag is valid BCP-47 format
 */
export declare function isValidBCP47(tag: string): boolean;
export declare const DEFAULT_REGIONS: Record<string, string>;
/**
 * Get full BCP-47 tag with default region
 */
export declare function toBCP47WithRegion(code: string): string;
export declare const SPECIAL_CODES: readonly ["ipa", "und", "mul", "zxx"];
export type SpecialCode = (typeof SPECIAL_CODES)[number];
export declare function getLanguageInfo(code: string): {
    code: string;
    iso3: string;
    iso1: string | undefined;
    name: string;
    nativeName: string;
    bcp47: string;
};
//# sourceMappingURL=locale.d.ts.map