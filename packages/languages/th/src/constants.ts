/**
 * Thai Language Constants and Utilities
 * 
 * Thai-specific constants for character classification, tones,
 * and language-specific information.
 * 
 * @packageDocumentation
 */

/**
 * Thai transcription schemes
 * 
 * Common romanization and phonetic transcription systems for Thai
 */
export const THAI_TRANSCRIPTION_SCHEMES = {
  /** Royal Thai General System of Transcription (official Thai government standard) */
  RTGS: 'rtgs',
  /** Paiboon romanization system (popular in language learning) */
  PAIBOON: 'paiboon',
  /** Paiboon+ with tone marks (enhanced version with explicit tone notation) */
  PAIBOON_PLUS: 'paiboon+',
  /** American University Alumni (AUA) system */
  AUA: 'aua',
  /** International Phonetic Alphabet */
  IPA: 'ipa',
} as const;

export type ThaiTranscriptionScheme = typeof THAI_TRANSCRIPTION_SCHEMES[keyof typeof THAI_TRANSCRIPTION_SCHEMES];

/**
 * Display names for Thai transcription schemes
 */
export const THAI_TRANSCRIPTION_SCHEME_NAMES: Record<string, string> = {
  [THAI_TRANSCRIPTION_SCHEMES.RTGS]: 'RTGS',
  [THAI_TRANSCRIPTION_SCHEMES.PAIBOON]: 'Paiboon',
  [THAI_TRANSCRIPTION_SCHEMES.PAIBOON_PLUS]: 'Paiboon+',
  [THAI_TRANSCRIPTION_SCHEMES.AUA]: 'AUA',
  [THAI_TRANSCRIPTION_SCHEMES.IPA]: 'IPA',
};

/**
 * Thai tone marks and their Unicode ranges
 */
export const THAI_TONE_MARKS = {
  /** Mai Ek (่) - Low tone */
  MAI_EK: '\u0E48',
  /** Mai Tho (้) - Falling tone */
  MAI_THO: '\u0E49',
  /** Mai Tri (๊) - High tone */
  MAI_TRI: '\u0E4A',
  /** Mai Chattawa (๋) - Rising tone */
  MAI_CHATTAWA: '\u0E4B',
} as const;

/**
 * Thai tone numbers (linguistic notation)
 * 
 * Standard five-tone system used in Thai linguistics
 */
export const THAI_TONES = {
  /** Mid tone (unmarked) */
  MID: 0,
  /** Low tone */
  LOW: 1,
  /** Falling tone */
  FALLING: 2,
  /** High tone */
  HIGH: 3,
  /** Rising tone */
  RISING: 4,
} as const;

/**
 * Thai tone names in English
 */
export const THAI_TONE_NAMES: Record<number, string> = {
  [THAI_TONES.MID]: 'Mid',
  [THAI_TONES.LOW]: 'Low',
  [THAI_TONES.FALLING]: 'Falling',
  [THAI_TONES.HIGH]: 'High',
  [THAI_TONES.RISING]: 'Rising',
};

/**
 * Thai script Unicode ranges
 */
export const THAI_UNICODE_RANGES = {
  /** Thai consonants: ก-ฮ (U+0E01 to U+0E2E) */
  CONSONANTS: { start: 0x0E01, end: 0x0E2E },
  /** Thai vowels: ะ-ๅ (U+0E30 to U+0E45) */
  VOWELS: { start: 0x0E30, end: 0x0E45 },
  /** Thai tone marks: ่-๋ (U+0E48 to U+0E4B) */
  TONE_MARKS: { start: 0x0E48, end: 0x0E4B },
  /** Thai digits: ๐-๙ (U+0E50 to U+0E59) */
  DIGITS: { start: 0x0E50, end: 0x0E59 },
  /** Full Thai script range (U+0E00 to U+0E7F) */
  FULL: { start: 0x0E00, end: 0x0E7F },
} as const;

/**
 * Regular expressions for Thai script detection
 */
export const THAI_REGEX = {
  /** Match any Thai character */
  ANY_THAI: /[\u0E00-\u0E7F]/,
  /** Match Thai consonants only */
  CONSONANT: /[\u0E01-\u0E2E]/,
  /** Match Thai vowels only */
  VOWEL: /[\u0E30-\u0E45]/,
  /** Match Thai tone marks only */
  TONE_MARK: /[\u0E48-\u0E4B]/,
  /** Match Thai digits only */
  DIGIT: /[\u0E50-\u0E59]/,
  /** Match entire Thai word (consonants, vowels, tone marks) */
  WORD: /[\u0E01-\u0E2E\u0E30-\u0E45\u0E48-\u0E4B]+/,
} as const;

/**
 * Thai language metadata
 */
export const THAI_LANGUAGE_INFO = {
  /** BCP-47 language code */
  code: 'th',
  /** BCP-47 with region */
  codeWithRegion: 'th-TH',
  /** Script name */
  script: 'Thai',
  /** ISO 15924 script code */
  scriptCode: 'Thai',
  /** Writing direction */
  direction: 'ltr' as const,
  /** Language name in English */
  nameEn: 'Thai',
  /** Language name in native script */
  nameNative: 'ภาษาไทย',
} as const;

/**
 * Check if a character is a Thai character
 * 
 * @param char - Character to check
 * @returns true if the character is in the Thai Unicode range
 * 
 * @example
 * ```typescript
 * isThaiCharacter('ก'); // true
 * isThaiCharacter('a'); // false
 * isThaiCharacter('สวัสดี'.charAt(0)); // true
 * ```
 */
export function isThaiCharacter(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return code >= THAI_UNICODE_RANGES.FULL.start && code <= THAI_UNICODE_RANGES.FULL.end;
}

/**
 * Check if a string contains Thai characters
 * 
 * @param text - Text to check
 * @returns true if the text contains at least one Thai character
 * 
 * @example
 * ```typescript
 * containsThaiCharacters('สวัสดี'); // true
 * containsThaiCharacters('hello'); // false
 * containsThaiCharacters('hello สวัสดี'); // true
 * ```
 */
export function containsThaiCharacters(text: string): boolean {
  return THAI_REGEX.ANY_THAI.test(text);
}

/**
 * Check if a string is entirely Thai script
 * 
 * @param text - Text to check
 * @param allowSpaces - Whether to allow spaces (default: true)
 * @returns true if the text is entirely Thai (and optionally spaces)
 * 
 * @example
 * ```typescript
 * isThaiText('สวัสดี'); // true
 * isThaiText('สวัสดี ครับ'); // true
 * isThaiText('สวัสดี hello'); // false
 * ```
 */
export function isThaiText(text: string, allowSpaces = true): boolean {
  if (!text) return false;
  const testText = allowSpaces ? text.replace(/\s/g, '') : text;
  if (testText.length === 0) return false;
  return Array.from(testText).every(char => isThaiCharacter(char));
}

/**
 * Check if a character is a Thai consonant
 * 
 * @param char - Character to check
 * @returns true if the character is a Thai consonant
 * 
 * @example
 * ```typescript
 * isThaiConsonant('ก'); // true
 * isThaiConsonant('า'); // false (vowel)
 * ```
 */
export function isThaiConsonant(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return code >= THAI_UNICODE_RANGES.CONSONANTS.start && code <= THAI_UNICODE_RANGES.CONSONANTS.end;
}

/**
 * Check if a character is a Thai vowel
 * 
 * @param char - Character to check
 * @returns true if the character is a Thai vowel
 * 
 * @example
 * ```typescript
 * isThaiVowel('า'); // true
 * isThaiVowel('ก'); // false (consonant)
 * ```
 */
export function isThaiVowel(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return code >= THAI_UNICODE_RANGES.VOWELS.start && code <= THAI_UNICODE_RANGES.VOWELS.end;
}

/**
 * Check if a character is a Thai tone mark
 * 
 * @param char - Character to check
 * @returns true if the character is a Thai tone mark
 * 
 * @example
 * ```typescript
 * isThaiToneMark('่'); // true
 * isThaiToneMark('ก'); // false
 * ```
 */
export function isThaiToneMark(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return code >= THAI_UNICODE_RANGES.TONE_MARKS.start && code <= THAI_UNICODE_RANGES.TONE_MARKS.end;
}

/**
 * Get the tone mark from a Thai character/syllable
 * 
 * @param text - Thai text to analyze
 * @returns The tone mark character if found, undefined otherwise
 * 
 * @example
 * ```typescript
 * getToneMark('ก่า'); // '่' (Mai Ek)
 * getToneMark('ก้า'); // '้' (Mai Tho)
 * getToneMark('กา'); // undefined (no tone mark)
 * ```
 */
export function getToneMark(text: string): string | undefined {
  const match = text.match(THAI_REGEX.TONE_MARK);
  return match ? match[0] : undefined;
}

/**
 * Get tone number from tone mark
 * 
 * @param toneMark - Thai tone mark character
 * @returns Tone number (0-4) or undefined if not a tone mark
 * 
 * @example
 * ```typescript
 * getToneNumber('่'); // 1 (Low)
 * getToneNumber('้'); // 2 (Falling)
 * getToneNumber('๊'); // 3 (High)
 * getToneNumber('๋'); // 4 (Rising)
 * ```
 */
export function getToneNumber(toneMark: string): number | undefined {
  switch (toneMark) {
    case THAI_TONE_MARKS.MAI_EK:
      return THAI_TONES.LOW;
    case THAI_TONE_MARKS.MAI_THO:
      return THAI_TONES.FALLING;
    case THAI_TONE_MARKS.MAI_TRI:
      return THAI_TONES.HIGH;
    case THAI_TONE_MARKS.MAI_CHATTAWA:
      return THAI_TONES.RISING;
    default:
      return undefined;
  }
}

/**
 * Validate a Thai transcription scheme
 * 
 * @param scheme - Scheme to validate
 * @returns true if the scheme is a valid Thai transcription scheme
 * 
 * @example
 * ```typescript
 * isValidThaiTranscriptionScheme('rtgs'); // true
 * isValidThaiTranscriptionScheme('paiboon+'); // true
 * isValidThaiTranscriptionScheme('invalid'); // false
 * ```
 */
export function isValidThaiTranscriptionScheme(scheme: string): scheme is ThaiTranscriptionScheme {
  return Object.values(THAI_TRANSCRIPTION_SCHEMES).includes(scheme as ThaiTranscriptionScheme);
}

/**
 * Get display name for a Thai transcription scheme
 * 
 * @param scheme - Transcription scheme
 * @returns Display name or the scheme itself if not found
 * 
 * @example
 * ```typescript
 * getThaiTranscriptionSchemeName('rtgs'); // 'RTGS'
 * getThaiTranscriptionSchemeName('paiboon+'); // 'Paiboon+'
 * ```
 */
export function getThaiTranscriptionSchemeName(scheme: string): string {
  return THAI_TRANSCRIPTION_SCHEME_NAMES[scheme] ?? scheme;
}
