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
export type BCP47LanguageCode = string & { readonly __brand: "BCP47" };

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
 * Mapping of ISO 639-1 (2-letter) to default regions
 */
const DEFAULT_REGIONS: Record<string, string> = {
  'en': 'US',
  'es': 'ES',
  'fr': 'FR',
  'de': 'DE',
  'it': 'IT',
  'pt': 'PT',
  'ru': 'RU',
  'ja': 'JP',
  'ko': 'KR',
  'zh': 'CN',
  'ar': 'SA',
  'hi': 'IN',
  'th': 'TH',
  'vi': 'VN',
  'id': 'ID',
  'tr': 'TR',
  'pl': 'PL',
  'nl': 'NL',
  'sv': 'SE',
  'no': 'NO',
  'da': 'DK',
  'fi': 'FI',
  'el': 'GR',
  'he': 'IL',
};

/**
 * Mapping of ISO 639-3 (3-letter) to ISO 639-1 (2-letter)
 */
const ISO639_3_TO_ISO639_1: Record<string, string> = {
  'eng': 'en',
  'spa': 'es',
  'fra': 'fr',
  'deu': 'de',
  'ita': 'it',
  'por': 'pt',
  'rus': 'ru',
  'jpn': 'ja',
  'kor': 'ko',
  'cmn': 'zh', // Mandarin Chinese
  'zho': 'zh', // Chinese (generic)
  'ara': 'ar',
  'hin': 'hi',
  'tha': 'th',
  'vie': 'vi',
  'ind': 'id',
  'tur': 'tr',
  'pol': 'pl',
  'nld': 'nl',
  'swe': 'sv',
  'nor': 'no',
  'dan': 'da',
  'fin': 'fi',
  'ell': 'el',
  'heb': 'he',
};

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
export function parseLanguageCode(code: string): LanguageCodeParts {
  const parts = code.split('-');
  const result: LanguageCodeParts = {
    language: parts[0].toLowerCase(),
  };

  let i = 1;
  
  // Script (4 letters, title case)
  if (parts[i] && parts[i].length === 4) {
    result.script = parts[i][0].toUpperCase() + parts[i].slice(1).toLowerCase();
    i++;
  }

  // Region (2 letters uppercase or 3 digits)
  if (parts[i] && (parts[i].length === 2 || parts[i].length === 3)) {
    result.region = parts[i].toUpperCase();
    i++;
  }

  // Variant
  if (parts[i] && parts[i].length >= 5) {
    result.variant = parts[i].toLowerCase();
    i++;
  }

  // Extensions and private use
  const extensions: Record<string, string> = {};
  while (i < parts.length) {
    if (parts[i] === 'x' || parts[i] === 'X') {
      result.privateUse = parts.slice(i + 1).join('-');
      break;
    } else if (parts[i].length === 1) {
      const key = parts[i].toLowerCase();
      i++;
      const values: string[] = [];
      while (i < parts.length && parts[i].length > 1 && parts[i] !== 'x' && parts[i] !== 'X') {
        values.push(parts[i]);
        i++;
      }
      extensions[key] = values.join('-');
    } else {
      i++;
    }
  }

  if (Object.keys(extensions).length > 0) {
    result.extensions = extensions;
  }

  return result;
}

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
export function normalizeLanguageCode(
  code: string,
  options: { addDefaultRegion?: boolean } = { addDefaultRegion: true }
): string {
  if (!code) return code;

  // Parse the code
  const parts = parseLanguageCode(code);
  
  // Convert ISO 639-3 to ISO 639-1 if applicable
  if (parts.language.length === 3 && ISO639_3_TO_ISO639_1[parts.language]) {
    parts.language = ISO639_3_TO_ISO639_1[parts.language];
  }

  // Add default region if missing and option enabled
  if (options.addDefaultRegion && !parts.region && DEFAULT_REGIONS[parts.language]) {
    parts.region = DEFAULT_REGIONS[parts.language];
  }

  // Reconstruct the code
  let result = parts.language;
  if (parts.script) result += `-${parts.script}`;
  if (parts.region) result += `-${parts.region}`;
  if (parts.variant) result += `-${parts.variant}`;
  
  return result;
}

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
export function getLanguageBase(code: string): string {
  const parts = parseLanguageCode(code);
  return parts.language;
}

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
export function matchLanguage(
  code1: string,
  code2: string,
  options: MatchOptions = {}
): boolean {
  const parts1 = parseLanguageCode(code1);
  const parts2 = parseLanguageCode(code2);

  // Language must always match
  if (parts1.language !== parts2.language) {
    return false;
  }

  // Check script if both present and not ignored
  if (!options.ignoreScript && parts1.script && parts2.script) {
    if (parts1.script !== parts2.script) {
      return false;
    }
  }

  // Check region if both present and not ignored
  if (!options.ignoreRegion && parts1.region && parts2.region) {
    if (parts1.region !== parts2.region) {
      return false;
    }
  }

  return true;
}

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
export function findBestMatch(
  targetCode: string,
  availableCodes: string[],
  options: MatchOptions = {}
): string | undefined {
  // Try exact match first
  if (availableCodes.includes(targetCode)) {
    return targetCode;
  }

  const targetParts = parseLanguageCode(targetCode);

  // Try matching with same language and region
  for (const code of availableCodes) {
    if (matchLanguage(targetCode, code, { ...options, ignoreScript: true })) {
      return code;
    }
  }

  // Try matching base language if fallback allowed
  if (options.allowFallback !== false) {
    for (const code of availableCodes) {
      const parts = parseLanguageCode(code);
      if (parts.language === targetParts.language) {
        return code;
      }
    }
  }

  return undefined;
}

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
export function getLanguageFallbacks(code: string): string[] {
  const parts = parseLanguageCode(code);
  const fallbacks: string[] = [code];

  // Add variant without region
  if (parts.variant) {
    let fallback = parts.language;
    if (parts.script) fallback += `-${parts.script}`;
    if (parts.region) fallback += `-${parts.region}`;
    fallbacks.push(fallback);
  }

  // Add without script
  if (parts.script) {
    let fallback = parts.language;
    if (parts.region) fallback += `-${parts.region}`;
    fallbacks.push(fallback);
  }

  // Add without region
  if (parts.region) {
    let fallback = parts.language;
    if (parts.script) fallback += `-${parts.script}`;
    if (fallback !== parts.language) {
      fallbacks.push(fallback);
    }
  }

  // Add base language
  if (parts.language !== code) {
    fallbacks.push(parts.language);
  }

  // Add default region variant if different from current
  const defaultRegion = DEFAULT_REGIONS[parts.language];
  if (defaultRegion && defaultRegion !== parts.region) {
    const withDefault = `${parts.language}-${defaultRegion}`;
    if (!fallbacks.includes(withDefault)) {
      fallbacks.splice(1, 0, withDefault); // Insert after exact match
    }
  }

  return fallbacks;
}

/**
 * Validate if a string is a valid BCP-47 language tag
 * 
 * @param code - Code to validate
 * @returns True if valid BCP-47 format
 * 
 * @internal - Use isValidBCP47 from main export instead
 */
function isValidBCP47Internal(code: string): code is BCP47LanguageCode {
  if (!code || typeof code !== 'string') return false;
  
  // Basic BCP-47 pattern check
  const bcp47Pattern = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-[A-Z]{2}|[0-9]{3})?(-[a-zA-Z0-9]{5,8})*$/i;
  return bcp47Pattern.test(code);
}

/**
 * Cast a string to BCP47LanguageCode type (with runtime validation)
 * 
 * @param code - Code to cast
 * @returns BCP-47 language code
 * @throws Error if code is not valid BCP-47 format
 */
export function asBCP47(code: string): BCP47LanguageCode {
  const normalized = normalizeLanguageCode(code, { addDefaultRegion: false });
  if (!isValidBCP47Internal(normalized)) {
    throw new Error(`Invalid BCP-47 language code: ${code}`);
  }
  return normalized as BCP47LanguageCode;
}

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
export function getTranslationKeys(code: string): string[] {
  const parts = parseLanguageCode(code);
  const keys: string[] = [];

  // Full code
  keys.push(code);

  // Without region
  if (parts.region) {
    let key = parts.language;
    if (parts.script) key += `-${parts.script}`;
    keys.push(key);
  }

  // Base language
  if (parts.language !== code) {
    keys.push(parts.language);
  }

  // ISO 639-1 to ISO 639-3
  const iso3 = Object.entries(ISO639_3_TO_ISO639_1).find(
    ([_, iso1]) => iso1 === parts.language
  )?.[0];
  if (iso3) {
    keys.push(iso3);
  }

  return keys;
}
