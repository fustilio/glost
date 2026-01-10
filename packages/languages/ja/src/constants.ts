/**
 * Japanese Language Constants and Utilities
 * 
 * Japanese-specific constants for script classification, transcription schemes,
 * and language-specific information.
 * 
 * @packageDocumentation
 */

/**
 * Japanese transcription/romanization schemes
 * 
 * Common romanization systems and kana representations for Japanese
 */
export const JAPANESE_TRANSCRIPTION_SCHEMES = {
  /** Romaji (general romanization) */
  ROMAJI: 'romaji',
  /** Hepburn romanization (most common system) */
  HEPBURN: 'hepburn',
  /** Kunrei-shiki (official Japanese government standard) */
  KUNREI: 'kunrei',
  /** Nihon-shiki romanization */
  NIHON: 'nihon',
  /** Hiragana script */
  HIRAGANA: 'hiragana',
  /** Katakana script */
  KATAKANA: 'katakana',
  /** International Phonetic Alphabet */
  IPA: 'ipa',
} as const;

export type JapaneseTranscriptionScheme = typeof JAPANESE_TRANSCRIPTION_SCHEMES[keyof typeof JAPANESE_TRANSCRIPTION_SCHEMES];

/**
 * Display names for Japanese transcription schemes
 */
export const JAPANESE_TRANSCRIPTION_SCHEME_NAMES: Record<string, string> = {
  [JAPANESE_TRANSCRIPTION_SCHEMES.ROMAJI]: 'Romaji',
  [JAPANESE_TRANSCRIPTION_SCHEMES.HEPBURN]: 'Hepburn',
  [JAPANESE_TRANSCRIPTION_SCHEMES.KUNREI]: 'Kunrei-shiki',
  [JAPANESE_TRANSCRIPTION_SCHEMES.NIHON]: 'Nihon-shiki',
  [JAPANESE_TRANSCRIPTION_SCHEMES.HIRAGANA]: 'Hiragana',
  [JAPANESE_TRANSCRIPTION_SCHEMES.KATAKANA]: 'Katakana',
  [JAPANESE_TRANSCRIPTION_SCHEMES.IPA]: 'IPA',
};

/**
 * Japanese script Unicode ranges
 */
export const JAPANESE_UNICODE_RANGES = {
  /** Hiragana: ぁ-ゟ (U+3040 to U+309F) */
  HIRAGANA: { start: 0x3040, end: 0x309F },
  /** Katakana: ァ-ヿ (U+30A0 to U+30FF) */
  KATAKANA: { start: 0x30A0, end: 0x30FF },
  /** CJK Unified Ideographs (Common Kanji): 一-龯 (U+4E00 to U+9FFF) */
  KANJI_COMMON: { start: 0x4E00, end: 0x9FFF },
  /** CJK Unified Ideographs Extension A (Rare Kanji): (U+3400 to U+4DBF) */
  KANJI_RARE: { start: 0x3400, end: 0x4DBF },
  /** Halfwidth Katakana: ｦ-ﾟ (U+FF65 to U+FF9F) */
  KATAKANA_HALFWIDTH: { start: 0xFF65, end: 0xFF9F },
  /** Japanese punctuation and symbols: 〃-〿 (U+3003 to U+303F) */
  PUNCTUATION: { start: 0x3003, end: 0x303F },
} as const;

/**
 * Regular expressions for Japanese script detection
 */
export const JAPANESE_REGEX = {
  /** Match any Hiragana character */
  HIRAGANA: /[\u3040-\u309F]/,
  /** Match any Katakana character (full-width) */
  KATAKANA: /[\u30A0-\u30FF]/,
  /** Match any Katakana character (including half-width) */
  KATAKANA_ALL: /[\u30A0-\u30FF\uFF65-\uFF9F]/,
  /** Match common Kanji characters */
  KANJI: /[\u4E00-\u9FFF]/,
  /** Match any Japanese character (Hiragana, Katakana, or Kanji) */
  ANY_JAPANESE: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/,
  /** Match Japanese punctuation */
  PUNCTUATION: /[\u3000-\u303F]/,
  /** Match full Japanese word (with kana and kanji) */
  WORD: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/,
} as const;

/**
 * Japanese language metadata
 */
export const JAPANESE_LANGUAGE_INFO = {
  /** BCP-47 language code */
  code: 'ja',
  /** BCP-47 with region */
  codeWithRegion: 'ja-JP',
  /** Script names */
  scripts: ['Hiragana', 'Katakana', 'Kanji', 'Romaji'],
  /** ISO 15924 script codes */
  scriptCodes: {
    hiragana: 'Hira',
    katakana: 'Kana',
    kanji: 'Hani',
  },
  /** Writing direction */
  direction: 'ltr' as const,
  /** Language name in English */
  nameEn: 'Japanese',
  /** Language name in native script */
  nameNative: '日本語',
} as const;

/**
 * Japanese pitch accent patterns (for advanced features)
 */
export const JAPANESE_PITCH_PATTERNS = {
  /** 平板型 (Heiban) - Flat/Low-High pattern */
  FLAT: 0,
  /** 頭高型 (Atamadaka) - Head-high pattern */
  HEAD_HIGH: 1,
  /** 中高型 (Nakadaka) - Mid-high pattern */
  MID_HIGH: 2,
  /** 尾高型 (Odaka) - Tail-high pattern */
  TAIL_HIGH: 3,
} as const;

/**
 * Common Japanese particles (助詞)
 */
export const JAPANESE_PARTICLES = [
  'は', 'が', 'を', 'に', 'へ', 'と', 'や', 'か', 'の', 'も', 
  'で', 'から', 'まで', 'より', 'ね', 'よ', 'わ', 'な', 'ぞ', 'ぜ'
] as const;

/**
 * Check if a character is Hiragana
 * 
 * @param char - Character to check
 * @returns true if the character is Hiragana
 * 
 * @example
 * ```typescript
 * isHiragana('あ'); // true
 * isHiragana('ア'); // false (Katakana)
 * isHiragana('a'); // false
 * ```
 */
export function isHiragana(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return code >= JAPANESE_UNICODE_RANGES.HIRAGANA.start && code <= JAPANESE_UNICODE_RANGES.HIRAGANA.end;
}

/**
 * Check if a character is Katakana (full-width or half-width)
 * 
 * @param char - Character to check
 * @returns true if the character is Katakana
 * 
 * @example
 * ```typescript
 * isKatakana('ア'); // true
 * isKatakana('ｱ'); // true (half-width)
 * isKatakana('あ'); // false (Hiragana)
 * ```
 */
export function isKatakana(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return (code >= JAPANESE_UNICODE_RANGES.KATAKANA.start && code <= JAPANESE_UNICODE_RANGES.KATAKANA.end) ||
         (code >= JAPANESE_UNICODE_RANGES.KATAKANA_HALFWIDTH.start && code <= JAPANESE_UNICODE_RANGES.KATAKANA_HALFWIDTH.end);
}

/**
 * Check if a character is Kanji
 * 
 * @param char - Character to check
 * @returns true if the character is Kanji
 * 
 * @example
 * ```typescript
 * isKanji('漢'); // true
 * isKanji('あ'); // false (Hiragana)
 * isKanji('a'); // false
 * ```
 */
export function isKanji(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return (code >= JAPANESE_UNICODE_RANGES.KANJI_COMMON.start && code <= JAPANESE_UNICODE_RANGES.KANJI_COMMON.end) ||
         (code >= JAPANESE_UNICODE_RANGES.KANJI_RARE.start && code <= JAPANESE_UNICODE_RANGES.KANJI_RARE.end);
}

/**
 * Check if a character is any Japanese script
 * 
 * @param char - Character to check
 * @returns true if the character is Hiragana, Katakana, or Kanji
 * 
 * @example
 * ```typescript
 * isJapaneseCharacter('あ'); // true
 * isJapaneseCharacter('ア'); // true
 * isJapaneseCharacter('漢'); // true
 * isJapaneseCharacter('a'); // false
 * ```
 */
export function isJapaneseCharacter(char: string): boolean {
  return isHiragana(char) || isKatakana(char) || isKanji(char);
}

/**
 * Check if a string contains Japanese characters
 * 
 * @param text - Text to check
 * @returns true if the text contains at least one Japanese character
 * 
 * @example
 * ```typescript
 * containsJapaneseCharacters('こんにちは'); // true
 * containsJapaneseCharacters('hello'); // false
 * containsJapaneseCharacters('hello こんにちは'); // true
 * ```
 */
export function containsJapaneseCharacters(text: string): boolean {
  return JAPANESE_REGEX.ANY_JAPANESE.test(text);
}

/**
 * Check if a string is entirely Japanese script
 * 
 * @param text - Text to check
 * @param allowSpaces - Whether to allow spaces (default: true)
 * @returns true if the text is entirely Japanese (and optionally spaces)
 * 
 * @example
 * ```typescript
 * isJapaneseText('こんにちは'); // true
 * isJapaneseText('こんにちは 世界'); // true
 * isJapaneseText('こんにちは hello'); // false
 * ```
 */
export function isJapaneseText(text: string, allowSpaces = true): boolean {
  if (!text) return false;
  const testText = allowSpaces ? text.replace(/\s/g, '') : text;
  if (testText.length === 0) return false;
  return Array.from(testText).every(char => isJapaneseCharacter(char));
}

/**
 * Detect the script type of a character
 * 
 * @param char - Character to check
 * @returns Script type: 'hiragana', 'katakana', 'kanji', or 'other'
 * 
 * @example
 * ```typescript
 * getScriptType('あ'); // 'hiragana'
 * getScriptType('ア'); // 'katakana'
 * getScriptType('漢'); // 'kanji'
 * getScriptType('a'); // 'other'
 * ```
 */
export function getScriptType(char: string): 'hiragana' | 'katakana' | 'kanji' | 'other' {
  if (isHiragana(char)) return 'hiragana';
  if (isKatakana(char)) return 'katakana';
  if (isKanji(char)) return 'kanji';
  return 'other';
}

/**
 * Analyze the composition of a Japanese text
 * 
 * @param text - Text to analyze
 * @returns Object with counts and percentages of each script type
 * 
 * @example
 * ```typescript
 * analyzeText('日本語を勉強します');
 * // {
 * //   hiragana: { count: 3, percentage: 42.86 },
 * //   katakana: { count: 0, percentage: 0 },
 * //   kanji: { count: 4, percentage: 57.14 },
 * //   other: { count: 0, percentage: 0 },
 * //   total: 7
 * // }
 * ```
 */
export function analyzeText(text: string) {
  const chars = Array.from(text.replace(/\s/g, ''));
  const counts = {
    hiragana: 0,
    katakana: 0,
    kanji: 0,
    other: 0,
  };

  for (const char of chars) {
    const type = getScriptType(char);
    counts[type]++;
  }

  const total = chars.length;
  return {
    hiragana: {
      count: counts.hiragana,
      percentage: total > 0 ? (counts.hiragana / total) * 100 : 0,
    },
    katakana: {
      count: counts.katakana,
      percentage: total > 0 ? (counts.katakana / total) * 100 : 0,
    },
    kanji: {
      count: counts.kanji,
      percentage: total > 0 ? (counts.kanji / total) * 100 : 0,
    },
    other: {
      count: counts.other,
      percentage: total > 0 ? (counts.other / total) * 100 : 0,
    },
    total,
  };
}

/**
 * Validate a Japanese transcription scheme
 * 
 * @param scheme - Scheme to validate
 * @returns true if the scheme is a valid Japanese transcription scheme
 * 
 * @example
 * ```typescript
 * isValidJapaneseTranscriptionScheme('romaji'); // true
 * isValidJapaneseTranscriptionScheme('hepburn'); // true
 * isValidJapaneseTranscriptionScheme('invalid'); // false
 * ```
 */
export function isValidJapaneseTranscriptionScheme(scheme: string): scheme is JapaneseTranscriptionScheme {
  return Object.values(JAPANESE_TRANSCRIPTION_SCHEMES).includes(scheme as JapaneseTranscriptionScheme);
}

/**
 * Get display name for a Japanese transcription scheme
 * 
 * @param scheme - Transcription scheme
 * @returns Display name or the scheme itself if not found
 * 
 * @example
 * ```typescript
 * getJapaneseTranscriptionSchemeName('hepburn'); // 'Hepburn'
 * getJapaneseTranscriptionSchemeName('kunrei'); // 'Kunrei-shiki'
 * ```
 */
export function getJapaneseTranscriptionSchemeName(scheme: string): string {
  return JAPANESE_TRANSCRIPTION_SCHEME_NAMES[scheme] ?? scheme;
}
