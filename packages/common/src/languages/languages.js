/**
 * Language Code Management for GLOST
 *
 * Supports flexible language identification:
 * - ISO-639-1: Two-letter codes (en, th, ja)
 * - ISO-639-3: Three-letter codes for precision (eng, tha, jpn, cmn)
 * - BCP-47: Full tags with script/region (en-US, zh-Hans-CN)
 */
import { constructZodLiteralUnionType } from "../utils/zod.js";
// Re-export locale utilities
export { 
// ISO-639 mappings
ISO639_1_TO_3, ISO639_3_TO_1, LANGUAGE_DATA, 
// Core utilities
toISO639_3, toISO639_1, getLanguageName, getNativeLanguageName, isValidLanguageCode, 
// BCP-47 utilities
parseBCP47, buildBCP47, normalizeBCP47, isValidBCP47, toBCP47WithRegion, 
// Regions & special codes
DEFAULT_REGIONS, SPECIAL_CODES, 
// Info helper
getLanguageInfo, } from "./data/locale.js";
// Re-export proficiency utilities
export { 
// CEFR (base reference)
CEFR_LEVELS, CEFR_TO_NUMERIC, cefrToNumeric, numericToCEFR, 
// ILR (US Government)
ILR_LEVELS, ilrToNumeric, numericToILR, 
// ACTFL (American)
ACTFL_LEVELS, actflToNumeric, numericToACTFL, 
// HSK (Chinese)
HSK_LEVELS, hskToNumeric, numericToHSK, 
// JLPT (Japanese)
JLPT_LEVELS, jlptToNumeric, numericToJLPT, 
// TOPIK (Korean)
TOPIK_LEVELS, topikToNumeric, numericToTOPIK, ieltsToNumeric, numericToIELTS, toeflToNumeric, numericToTOEFL, 
// Cambridge (English)
CAMBRIDGE_LEVELS, cambridgeToNumeric, numericToCambridge, 
// DELE (Spanish)
DELE_LEVELS, deleToNumeric, numericToDELE, 
// DELF/DALF (French)
DELF_LEVELS, DALF_LEVELS, delfDalfToNumeric, numericToDELFDALF, 
// Goethe (German)
GOETHE_LEVELS, goetheToNumeric, numericToGoethe, 
// Universal conversion
toNumericLevel, fromNumericLevel, getProficiencyInfo, 
// Utility functions
meetsLevel, levelProgress, levelsBetween, } from "./data/proficiency.js";
/**
 * Zod schema for language codes (permissive - validates format only)
 */
export const languageCodeSchema = constructZodLiteralUnionType([
    // Common ISO-639-1 codes
    "en", "es", "fr", "de", "it", "pt", "ru", "ar", "hi", "bn",
    "ja", "ko", "zh", "vi", "th", "id", "ms", "nl", "pl", "tr",
    "uk", "sv", "el", "cs", "ro", "hu", "fi", "da", "no", "he",
    "ka", "km", "lo", "my", "ta", "te", "ml", "kn", "mr", "gu",
    // Common ISO-639-3 codes
    "eng", "spa", "fra", "deu", "ita", "por", "rus", "ara", "hin", "ben",
    "jpn", "kor", "zho", "cmn", "yue", "vie", "tha", "ind", "msa", "nld",
    "pol", "tur", "ukr", "swe", "ell", "ces", "ron", "hun", "fin", "dan",
    "nor", "heb", "kat", "khm", "lao", "mya", "tam", "tel", "mal", "kan",
    // Special codes
    "ipa", "und", "mul", "zxx",
]);
// ============================================================================
// Convenience Functions
// ============================================================================
import { getLanguageName as _getLanguageName, SPECIAL_CODES as _SPECIAL_CODES, } from "./data/locale.js";
/**
 * Get display name for any language code
 */
export function getLanguageDisplayName(code) {
    if ((_SPECIAL_CODES.includes(code))) {
        const specialNames = {
            ipa: "IPA",
            und: "Undetermined",
            mul: "Multiple Languages",
            zxx: "No Linguistic Content",
        };
        return specialNames[code] || code;
    }
    return _getLanguageName(code);
}
/**
 * Check if code is a special (non-language) code
 */
export function isSpecialCode(code) {
    return _SPECIAL_CODES.includes(code);
}
/** @deprecated Use languageCodeSchema instead */
export const glostLanguageSchema = languageCodeSchema;
export const lingoLogLanguageSchema = languageCodeSchema;
/** @deprecated Use CEFR_LEVELS instead */
export { CEFR_LEVELS as LINGOLOG_CEFR_LEVELS } from "./data/proficiency.js";
//# sourceMappingURL=languages.js.map