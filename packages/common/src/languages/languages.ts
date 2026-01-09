/**
 * Language Code Management for GLOST
 *
 * Supports flexible language identification:
 * - ISO-639-1: Two-letter codes (en, th, ja)
 * - ISO-639-3: Three-letter codes for precision (eng, tha, jpn, cmn)
 * - BCP-47: Full tags with script/region (en-US, zh-Hans-CN)
 */

import type { z } from "zod";
import { constructZodLiteralUnionType } from "../utils/zod.js";

// Re-export locale utilities
export {
  // ISO-639 mappings
  ISO639_1_TO_3,
  ISO639_3_TO_1,
  LANGUAGE_DATA,
  type LanguageEntry,

  // Core utilities
  toISO639_3,
  toISO639_1,
  getLanguageName,
  getNativeLanguageName,
  isValidLanguageCode,

  // BCP-47 utilities
  parseBCP47,
  buildBCP47,
  normalizeBCP47,
  isValidBCP47,
  toBCP47WithRegion,
  type BCP47Components,

  // Regions & special codes
  DEFAULT_REGIONS,
  SPECIAL_CODES,
  type SpecialCode,

  // Info helper
  getLanguageInfo,
} from "./data/locale.js";

// Re-export proficiency utilities
export {
  // Core types
  type ProficiencyLevel,
  type ProficiencyStandard,
  type ProficiencyInfo,

  // CEFR (base reference)
  CEFR_LEVELS,
  type CEFRLevel,
  CEFR_TO_NUMERIC,
  cefrToNumeric,
  numericToCEFR,

  // ILR (US Government)
  ILR_LEVELS,
  type ILRLevel,
  ilrToNumeric,
  numericToILR,

  // ACTFL (American)
  ACTFL_LEVELS,
  type ACTFLLevel,
  actflToNumeric,
  numericToACTFL,

  // HSK (Chinese)
  HSK_LEVELS,
  type HSKLevel,
  hskToNumeric,
  numericToHSK,

  // JLPT (Japanese)
  JLPT_LEVELS,
  type JLPTLevel,
  jlptToNumeric,
  numericToJLPT,

  // TOPIK (Korean)
  TOPIK_LEVELS,
  type TOPIKLevel,
  topikToNumeric,
  numericToTOPIK,

  // IELTS (English)
  type IELTSBand,
  ieltsToNumeric,
  numericToIELTS,

  // TOEFL (English)
  type TOEFLScore,
  toeflToNumeric,
  numericToTOEFL,

  // Cambridge (English)
  CAMBRIDGE_LEVELS,
  type CambridgeLevel,
  cambridgeToNumeric,
  numericToCambridge,

  // DELE (Spanish)
  DELE_LEVELS,
  type DELELevel,
  deleToNumeric,
  numericToDELE,

  // DELF/DALF (French)
  DELF_LEVELS,
  DALF_LEVELS,
  type DELFLevel,
  type DALFLevel,
  type FrenchDiplomaLevel,
  delfDalfToNumeric,
  numericToDELFDALF,

  // Goethe (German)
  GOETHE_LEVELS,
  type GoetheLevel,
  goetheToNumeric,
  numericToGoethe,

  // Universal conversion
  toNumericLevel,
  fromNumericLevel,
  getProficiencyInfo,

  // Utility functions
  meetsLevel,
  levelProgress,
  levelsBetween,
} from "./data/proficiency.js";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Any valid language code (flexible - accepts ISO-639-1, ISO-639-3, or BCP-47)
 */
export type LanguageCode = string;

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
] as const);

export type GlostLanguage = z.infer<typeof languageCodeSchema>;

// ============================================================================
// Convenience Functions
// ============================================================================

import {
  getLanguageName as _getLanguageName,
  SPECIAL_CODES as _SPECIAL_CODES,
} from "./data/locale.js";

/**
 * Get display name for any language code
 */
export function getLanguageDisplayName(code: string): string {
  if (((_SPECIAL_CODES as readonly string[]).includes(code))) {
    const specialNames: Record<string, string> = {
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
export function isSpecialCode(code: string): boolean {
  return (_SPECIAL_CODES as readonly string[]).includes(code);
}

// ============================================================================
// Backwards Compatibility
// ============================================================================

/** @deprecated Use GlostLanguage instead */
export type LingoLogLanguage = GlostLanguage;

/** @deprecated Use languageCodeSchema instead */
export const glostLanguageSchema = languageCodeSchema;
export const lingoLogLanguageSchema = languageCodeSchema;

// Re-export CefrLevel as alias for backwards compatibility
export { type CEFRLevel as CefrLevel } from "./data/proficiency.js";

/** @deprecated Use CEFR_LEVELS instead */
export { CEFR_LEVELS as LINGOLOG_CEFR_LEVELS } from "./data/proficiency.js";

/** @deprecated Use CEFRLevel instead */
export { type CEFRLevel as LingoLogCefrLevels } from "./data/proficiency.js";
