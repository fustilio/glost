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
export declare const KOREAN_TRANSCRIPTION_SCHEMES: {
    /** Revised Romanization (official South Korean standard since 2000) */
    readonly RR: "rr";
    /** McCune-Reischauer (older academic standard) */
    readonly MCCUNE_REISCHAUER: "mr";
    /** Yale Romanization (linguistics and academic) */
    readonly YALE: "yale";
    /** Hangul (native Korean script) */
    readonly HANGUL: "hangul";
    /** International Phonetic Alphabet */
    readonly IPA: "ipa";
};
export type KoreanTranscriptionScheme = typeof KOREAN_TRANSCRIPTION_SCHEMES[keyof typeof KOREAN_TRANSCRIPTION_SCHEMES];
/**
 * Display names for Korean transcription schemes
 */
export declare const KOREAN_TRANSCRIPTION_SCHEME_NAMES: Record<string, string>;
/**
 * Hangul Jamo (consonants and vowels) Unicode ranges
 */
export declare const HANGUL_JAMO_RANGES: {
    /** Initial consonants (choseong): ㄱ-ㅎ (U+1100 to U+1112) */
    readonly INITIAL: {
        readonly start: 4352;
        readonly end: 4370;
    };
    /** Medial vowels (jungseong): ㅏ-ㅣ (U+1161 to U+1175) */
    readonly MEDIAL: {
        readonly start: 4449;
        readonly end: 4469;
    };
    /** Final consonants (jongseong): ㄱ-ㅎ (U+11A8 to U+11C2) */
    readonly FINAL: {
        readonly start: 4520;
        readonly end: 4546;
    };
    /** Compatibility Jamo (separate characters): ㄱ-ㅣ (U+3131 to U+318E) */
    readonly COMPATIBILITY: {
        readonly start: 12593;
        readonly end: 12686;
    };
};
/**
 * Korean script Unicode ranges
 */
export declare const KOREAN_UNICODE_RANGES: {
    /** Hangul syllables: 가-힣 (U+AC00 to U+D7AF) - composed syllables */
    readonly SYLLABLES: {
        readonly start: 44032;
        readonly end: 55215;
    };
    /** Hangul Jamo (all components): U+1100 to U+11FF */
    readonly JAMO: {
        readonly start: 4352;
        readonly end: 4607;
    };
    /** Hangul Compatibility Jamo: ㄱ-ㅣ (U+3130 to U+318F) */
    readonly JAMO_COMPAT: {
        readonly start: 12592;
        readonly end: 12687;
    };
    /** Hangul Jamo Extended-A: (U+A960 to U+A97F) */
    readonly JAMO_EXTENDED_A: {
        readonly start: 43360;
        readonly end: 43391;
    };
    /** Hangul Jamo Extended-B: (U+D7B0 to U+D7FF) */
    readonly JAMO_EXTENDED_B: {
        readonly start: 55216;
        readonly end: 55295;
    };
};
/**
 * Regular expressions for Korean script detection
 */
export declare const KOREAN_REGEX: {
    /** Match any Hangul syllable */
    readonly SYLLABLE: RegExp;
    /** Match any Hangul Jamo */
    readonly JAMO: RegExp;
    /** Match any Korean character (syllables or Jamo) */
    readonly ANY_KOREAN: RegExp;
    /** Match Korean word (syllables only) */
    readonly WORD: RegExp;
    /** Match Korean punctuation and symbols */
    readonly PUNCTUATION: RegExp;
};
/**
 * Korean language metadata
 */
export declare const KOREAN_LANGUAGE_INFO: {
    /** BCP-47 language code */
    readonly code: "ko";
    /** BCP-47 with region (South Korea) */
    readonly codeWithRegion: "ko-KR";
    /** Script name */
    readonly script: "Hangul";
    /** ISO 15924 script code */
    readonly scriptCode: "Hang";
    /** Writing direction */
    readonly direction: "ltr";
    /** Language name in English */
    readonly nameEn: "Korean";
    /** Language name in native script */
    readonly nameNative: "한국어";
};
/**
 * Hangul syllable decomposition constants
 *
 * Used for breaking down composed Hangul syllables into Jamo components
 */
export declare const HANGUL_DECOMPOSITION: {
    /** Base code point for Hangul syllables */
    readonly BASE: 44032;
    /** Number of initial consonants (choseong) */
    readonly INITIAL_COUNT: 19;
    /** Number of medial vowels (jungseong) */
    readonly MEDIAL_COUNT: 21;
    /** Number of final consonants (jongseong) + 1 for none */
    readonly FINAL_COUNT: 28;
};
/**
 * Initial consonants (choseong) list in order
 */
export declare const INITIAL_CONSONANTS: readonly ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
/**
 * Medial vowels (jungseong) list in order
 */
export declare const MEDIAL_VOWELS: readonly ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
/**
 * Final consonants (jongseong) list in order (empty string for no final)
 */
export declare const FINAL_CONSONANTS: readonly ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
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
export declare function isHangulSyllable(char: string): boolean;
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
export declare function isHangulJamo(char: string): boolean;
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
export declare function isKoreanCharacter(char: string): boolean;
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
export declare function containsKoreanCharacters(text: string): boolean;
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
export declare function isKoreanText(text: string, allowSpaces?: boolean): boolean;
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
export declare function decomposeHangul(syllable: string): {
    initial: string;
    medial: string;
    final: string;
} | null;
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
export declare function composeHangul(initial: string, medial: string, final?: string): string | null;
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
export declare function isValidKoreanTranscriptionScheme(scheme: string): scheme is KoreanTranscriptionScheme;
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
export declare function getKoreanTranscriptionSchemeName(scheme: string): string;
//# sourceMappingURL=constants.d.ts.map