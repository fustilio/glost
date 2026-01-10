/**
 * Korean Language Constants and Utilities
 * 
 * Korean-specific constants for Hangul script classification, transcription schemes,
 * and language-specific information.
 * 
 * @packageDocumentation
 */

/**
 * Korean transcription/romanization schemes
 * 
 * Common romanization systems for Korean
 */
export const KOREAN_TRANSCRIPTION_SCHEMES = {
  /** Revised Romanization (official South Korean standard since 2000) */
  RR: 'rr',
  /** McCune-Reischauer (older academic standard) */
  MCCUNE_REISCHAUER: 'mr',
  /** Yale Romanization (linguistics and academic) */
  YALE: 'yale',
  /** Hangul (native Korean script) */
  HANGUL: 'hangul',
  /** International Phonetic Alphabet */
  IPA: 'ipa',
} as const;

export type KoreanTranscriptionScheme = typeof KOREAN_TRANSCRIPTION_SCHEMES[keyof typeof KOREAN_TRANSCRIPTION_SCHEMES];

/**
 * Display names for Korean transcription schemes
 */
export const KOREAN_TRANSCRIPTION_SCHEME_NAMES: Record<string, string> = {
  [KOREAN_TRANSCRIPTION_SCHEMES.RR]: 'Revised Romanization',
  [KOREAN_TRANSCRIPTION_SCHEMES.MCCUNE_REISCHAUER]: 'McCune-Reischauer',
  [KOREAN_TRANSCRIPTION_SCHEMES.YALE]: 'Yale',
  [KOREAN_TRANSCRIPTION_SCHEMES.HANGUL]: 'Hangul',
  [KOREAN_TRANSCRIPTION_SCHEMES.IPA]: 'IPA',
};

/**
 * Hangul Jamo (consonants and vowels) Unicode ranges
 */
export const HANGUL_JAMO_RANGES = {
  /** Initial consonants (choseong): ㄱ-ㅎ (U+1100 to U+1112) */
  INITIAL: { start: 0x1100, end: 0x1112 },
  /** Medial vowels (jungseong): ㅏ-ㅣ (U+1161 to U+1175) */
  MEDIAL: { start: 0x1161, end: 0x1175 },
  /** Final consonants (jongseong): ㄱ-ㅎ (U+11A8 to U+11C2) */
  FINAL: { start: 0x11A8, end: 0x11C2 },
  /** Compatibility Jamo (separate characters): ㄱ-ㅣ (U+3131 to U+318E) */
  COMPATIBILITY: { start: 0x3131, end: 0x318E },
} as const;

/**
 * Korean script Unicode ranges
 */
export const KOREAN_UNICODE_RANGES = {
  /** Hangul syllables: 가-힣 (U+AC00 to U+D7AF) - composed syllables */
  SYLLABLES: { start: 0xAC00, end: 0xD7AF },
  /** Hangul Jamo (all components): U+1100 to U+11FF */
  JAMO: { start: 0x1100, end: 0x11FF },
  /** Hangul Compatibility Jamo: ㄱ-ㅣ (U+3130 to U+318F) */
  JAMO_COMPAT: { start: 0x3130, end: 0x318F },
  /** Hangul Jamo Extended-A: (U+A960 to U+A97F) */
  JAMO_EXTENDED_A: { start: 0xA960, end: 0xA97F },
  /** Hangul Jamo Extended-B: (U+D7B0 to U+D7FF) */
  JAMO_EXTENDED_B: { start: 0xD7B0, end: 0xD7FF },
} as const;

/**
 * Regular expressions for Korean script detection
 */
export const KOREAN_REGEX = {
  /** Match any Hangul syllable */
  SYLLABLE: /[\uAC00-\uD7AF]/,
  /** Match any Hangul Jamo */
  JAMO: /[\u1100-\u11FF\u3130-\u318F]/,
  /** Match any Korean character (syllables or Jamo) */
  ANY_KOREAN: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,
  /** Match Korean word (syllables only) */
  WORD: /[\uAC00-\uD7AF]+/,
  /** Match Korean punctuation and symbols */
  PUNCTUATION: /[\u3000-\u303F]/,
} as const;

/**
 * Korean language metadata
 */
export const KOREAN_LANGUAGE_INFO = {
  /** BCP-47 language code */
  code: 'ko',
  /** BCP-47 with region (South Korea) */
  codeWithRegion: 'ko-KR',
  /** Script name */
  script: 'Hangul',
  /** ISO 15924 script code */
  scriptCode: 'Hang',
  /** Writing direction */
  direction: 'ltr' as const,
  /** Language name in English */
  nameEn: 'Korean',
  /** Language name in native script */
  nameNative: '한국어',
} as const;

/**
 * Hangul syllable decomposition constants
 * 
 * Used for breaking down composed Hangul syllables into Jamo components
 */
export const HANGUL_DECOMPOSITION = {
  /** Base code point for Hangul syllables */
  BASE: 0xAC00,
  /** Number of initial consonants (choseong) */
  INITIAL_COUNT: 19,
  /** Number of medial vowels (jungseong) */
  MEDIAL_COUNT: 21,
  /** Number of final consonants (jongseong) + 1 for none */
  FINAL_COUNT: 28,
} as const;

/**
 * Initial consonants (choseong) list in order
 */
export const INITIAL_CONSONANTS = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
] as const;

/**
 * Medial vowels (jungseong) list in order
 */
export const MEDIAL_VOWELS = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
] as const;

/**
 * Final consonants (jongseong) list in order (empty string for no final)
 */
export const FINAL_CONSONANTS = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
] as const;

/**
 * Check if a character is a Hangul syllable
 * 
 * @param char - Character to check
 * @returns true if the character is a Hangul syllable
 * 
 * @example
 * ```typescript
 * isHangulSyllable('가'); // true
 * isHangulSyllable('ㄱ'); // false (Jamo)
 * isHangulSyllable('a'); // false
 * ```
 */
export function isHangulSyllable(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return code >= KOREAN_UNICODE_RANGES.SYLLABLES.start && code <= KOREAN_UNICODE_RANGES.SYLLABLES.end;
}

/**
 * Check if a character is a Hangul Jamo
 * 
 * @param char - Character to check
 * @returns true if the character is a Hangul Jamo
 * 
 * @example
 * ```typescript
 * isHangulJamo('ㄱ'); // true
 * isHangulJamo('가'); // false (syllable)
 * isHangulJamo('a'); // false
 * ```
 */
export function isHangulJamo(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return (code >= KOREAN_UNICODE_RANGES.JAMO.start && code <= KOREAN_UNICODE_RANGES.JAMO.end) ||
         (code >= KOREAN_UNICODE_RANGES.JAMO_COMPAT.start && code <= KOREAN_UNICODE_RANGES.JAMO_COMPAT.end);
}

/**
 * Check if a character is any Korean script
 * 
 * @param char - Character to check
 * @returns true if the character is Hangul (syllable or Jamo)
 * 
 * @example
 * ```typescript
 * isKoreanCharacter('가'); // true
 * isKoreanCharacter('ㄱ'); // true
 * isKoreanCharacter('a'); // false
 * ```
 */
export function isKoreanCharacter(char: string): boolean {
  return isHangulSyllable(char) || isHangulJamo(char);
}

/**
 * Check if a string contains Korean characters
 * 
 * @param text - Text to check
 * @returns true if the text contains at least one Korean character
 * 
 * @example
 * ```typescript
 * containsKoreanCharacters('안녕하세요'); // true
 * containsKoreanCharacters('hello'); // false
 * containsKoreanCharacters('hello 안녕'); // true
 * ```
 */
export function containsKoreanCharacters(text: string): boolean {
  return KOREAN_REGEX.ANY_KOREAN.test(text);
}

/**
 * Check if a string is entirely Korean script
 * 
 * @param text - Text to check
 * @param allowSpaces - Whether to allow spaces (default: true)
 * @returns true if the text is entirely Korean (and optionally spaces)
 * 
 * @example
 * ```typescript
 * isKoreanText('안녕하세요'); // true
 * isKoreanText('안녕 하세요'); // true
 * isKoreanText('안녕 hello'); // false
 * ```
 */
export function isKoreanText(text: string, allowSpaces = true): boolean {
  if (!text) return false;
  const testText = allowSpaces ? text.replace(/\s/g, '') : text;
  if (testText.length === 0) return false;
  return Array.from(testText).every(char => isKoreanCharacter(char));
}

/**
 * Decompose a Hangul syllable into its Jamo components
 * 
 * @param syllable - Hangul syllable character
 * @returns Object with initial, medial, and final Jamo, or null if not a syllable
 * 
 * @example
 * ```typescript
 * decomposeHangul('한');
 * // { initial: 'ㅎ', medial: 'ㅏ', final: 'ㄴ' }
 * 
 * decomposeHangul('가');
 * // { initial: 'ㄱ', medial: 'ㅏ', final: '' }
 * ```
 */
export function decomposeHangul(syllable: string): { initial: string; medial: string; final: string } | null {
  if (!isHangulSyllable(syllable)) return null;

  const code = syllable.charCodeAt(0) - HANGUL_DECOMPOSITION.BASE;
  
  const finalIndex = code % HANGUL_DECOMPOSITION.FINAL_COUNT;
  const medialIndex = Math.floor(code / HANGUL_DECOMPOSITION.FINAL_COUNT) % HANGUL_DECOMPOSITION.MEDIAL_COUNT;
  const initialIndex = Math.floor(code / (HANGUL_DECOMPOSITION.FINAL_COUNT * HANGUL_DECOMPOSITION.MEDIAL_COUNT));

  return {
    initial: INITIAL_CONSONANTS[initialIndex],
    medial: MEDIAL_VOWELS[medialIndex],
    final: FINAL_CONSONANTS[finalIndex],
  };
}

/**
 * Compose Jamo components into a Hangul syllable
 * 
 * @param initial - Initial consonant (choseong)
 * @param medial - Medial vowel (jungseong)
 * @param final - Final consonant (jongseong), optional
 * @returns Composed Hangul syllable or null if invalid
 * 
 * @example
 * ```typescript
 * composeHangul('ㅎ', 'ㅏ', 'ㄴ'); // '한'
 * composeHangul('ㄱ', 'ㅏ', ''); // '가'
 * composeHangul('ㄱ', 'ㅏ'); // '가'
 * ```
 */
export function composeHangul(initial: string, medial: string, final: string = ''): string | null {
  const initialIndex = INITIAL_CONSONANTS.indexOf(initial as any);
  const medialIndex = MEDIAL_VOWELS.indexOf(medial as any);
  const finalIndex = FINAL_CONSONANTS.indexOf(final as any);

  if (initialIndex === -1 || medialIndex === -1 || finalIndex === -1) {
    return null;
  }

  const code = HANGUL_DECOMPOSITION.BASE +
    (initialIndex * HANGUL_DECOMPOSITION.MEDIAL_COUNT * HANGUL_DECOMPOSITION.FINAL_COUNT) +
    (medialIndex * HANGUL_DECOMPOSITION.FINAL_COUNT) +
    finalIndex;

  return String.fromCharCode(code);
}

/**
 * Validate a Korean transcription scheme
 * 
 * @param scheme - Scheme to validate
 * @returns true if the scheme is a valid Korean transcription scheme
 * 
 * @example
 * ```typescript
 * isValidKoreanTranscriptionScheme('rr'); // true
 * isValidKoreanTranscriptionScheme('mr'); // true
 * isValidKoreanTranscriptionScheme('invalid'); // false
 * ```
 */
export function isValidKoreanTranscriptionScheme(scheme: string): scheme is KoreanTranscriptionScheme {
  return Object.values(KOREAN_TRANSCRIPTION_SCHEMES).includes(scheme as KoreanTranscriptionScheme);
}

/**
 * Get display name for a Korean transcription scheme
 * 
 * @param scheme - Transcription scheme
 * @returns Display name or the scheme itself if not found
 * 
 * @example
 * ```typescript
 * getKoreanTranscriptionSchemeName('rr'); // 'Revised Romanization'
 * getKoreanTranscriptionSchemeName('mr'); // 'McCune-Reischauer'
 * ```
 */
export function getKoreanTranscriptionSchemeName(scheme: string): string {
  return KOREAN_TRANSCRIPTION_SCHEME_NAMES[scheme] ?? scheme;
}
