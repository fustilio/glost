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
export declare const JAPANESE_TRANSCRIPTION_SCHEMES: {
    /** Romaji (general romanization) */
    readonly ROMAJI: "romaji";
    /** Hepburn romanization (most common system) */
    readonly HEPBURN: "hepburn";
    /** Kunrei-shiki (official Japanese government standard) */
    readonly KUNREI: "kunrei";
    /** Nihon-shiki romanization */
    readonly NIHON: "nihon";
    /** Hiragana script */
    readonly HIRAGANA: "hiragana";
    /** Katakana script */
    readonly KATAKANA: "katakana";
    /** International Phonetic Alphabet */
    readonly IPA: "ipa";
};
export type JapaneseTranscriptionScheme = typeof JAPANESE_TRANSCRIPTION_SCHEMES[keyof typeof JAPANESE_TRANSCRIPTION_SCHEMES];
/**
 * Display names for Japanese transcription schemes
 */
export declare const JAPANESE_TRANSCRIPTION_SCHEME_NAMES: Record<string, string>;
/**
 * Japanese script Unicode ranges
 */
export declare const JAPANESE_UNICODE_RANGES: {
    /** Hiragana: ぁ-ゟ (U+3040 to U+309F) */
    readonly HIRAGANA: {
        readonly start: 12352;
        readonly end: 12447;
    };
    /** Katakana: ァ-ヿ (U+30A0 to U+30FF) */
    readonly KATAKANA: {
        readonly start: 12448;
        readonly end: 12543;
    };
    /** CJK Unified Ideographs (Common Kanji): 一-龯 (U+4E00 to U+9FFF) */
    readonly KANJI_COMMON: {
        readonly start: 19968;
        readonly end: 40959;
    };
    /** CJK Unified Ideographs Extension A (Rare Kanji): (U+3400 to U+4DBF) */
    readonly KANJI_RARE: {
        readonly start: 13312;
        readonly end: 19903;
    };
    /** Halfwidth Katakana: ｦ-ﾟ (U+FF65 to U+FF9F) */
    readonly KATAKANA_HALFWIDTH: {
        readonly start: 65381;
        readonly end: 65439;
    };
    /** Japanese punctuation and symbols: 〃-〿 (U+3003 to U+303F) */
    readonly PUNCTUATION: {
        readonly start: 12291;
        readonly end: 12351;
    };
};
/**
 * Regular expressions for Japanese script detection
 */
export declare const JAPANESE_REGEX: {
    /** Match any Hiragana character */
    readonly HIRAGANA: RegExp;
    /** Match any Katakana character (full-width) */
    readonly KATAKANA: RegExp;
    /** Match any Katakana character (including half-width) */
    readonly KATAKANA_ALL: RegExp;
    /** Match common Kanji characters */
    readonly KANJI: RegExp;
    /** Match any Japanese character (Hiragana, Katakana, or Kanji) */
    readonly ANY_JAPANESE: RegExp;
    /** Match Japanese punctuation */
    readonly PUNCTUATION: RegExp;
    /** Match full Japanese word (with kana and kanji) */
    readonly WORD: RegExp;
};
/**
 * Japanese language metadata
 */
export declare const JAPANESE_LANGUAGE_INFO: {
    /** BCP-47 language code */
    readonly code: "ja";
    /** BCP-47 with region */
    readonly codeWithRegion: "ja-JP";
    /** Script names */
    readonly scripts: readonly ["Hiragana", "Katakana", "Kanji", "Romaji"];
    /** ISO 15924 script codes */
    readonly scriptCodes: {
        readonly hiragana: "Hira";
        readonly katakana: "Kana";
        readonly kanji: "Hani";
    };
    /** Writing direction */
    readonly direction: "ltr";
    /** Language name in English */
    readonly nameEn: "Japanese";
    /** Language name in native script */
    readonly nameNative: "日本語";
};
/**
 * Japanese pitch accent patterns (for advanced features)
 */
export declare const JAPANESE_PITCH_PATTERNS: {
    /** 平板型 (Heiban) - Flat/Low-High pattern */
    readonly FLAT: 0;
    /** 頭高型 (Atamadaka) - Head-high pattern */
    readonly HEAD_HIGH: 1;
    /** 中高型 (Nakadaka) - Mid-high pattern */
    readonly MID_HIGH: 2;
    /** 尾高型 (Odaka) - Tail-high pattern */
    readonly TAIL_HIGH: 3;
};
/**
 * Common Japanese particles (助詞)
 */
export declare const JAPANESE_PARTICLES: readonly ["は", "が", "を", "に", "へ", "と", "や", "か", "の", "も", "で", "から", "まで", "より", "ね", "よ", "わ", "な", "ぞ", "ぜ"];
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
export declare function isHiragana(char: string): boolean;
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
export declare function isKatakana(char: string): boolean;
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
export declare function isKanji(char: string): boolean;
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
export declare function isJapaneseCharacter(char: string): boolean;
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
export declare function containsJapaneseCharacters(text: string): boolean;
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
export declare function isJapaneseText(text: string, allowSpaces?: boolean): boolean;
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
export declare function getScriptType(char: string): 'hiragana' | 'katakana' | 'kanji' | 'other';
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
export declare function analyzeText(text: string): {
    hiragana: {
        count: number;
        percentage: number;
    };
    katakana: {
        count: number;
        percentage: number;
    };
    kanji: {
        count: number;
        percentage: number;
    };
    other: {
        count: number;
        percentage: number;
    };
    total: number;
};
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
export declare function isValidJapaneseTranscriptionScheme(scheme: string): scheme is JapaneseTranscriptionScheme;
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
export declare function getJapaneseTranscriptionSchemeName(scheme: string): string;
//# sourceMappingURL=constants.d.ts.map