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
export declare const THAI_TRANSCRIPTION_SCHEMES: {
    /** Royal Thai General System of Transcription (official Thai government standard) */
    readonly RTGS: "rtgs";
    /** Paiboon romanization system (popular in language learning) */
    readonly PAIBOON: "paiboon";
    /** Paiboon+ with tone marks (enhanced version with explicit tone notation) */
    readonly PAIBOON_PLUS: "paiboon+";
    /** American University Alumni (AUA) system */
    readonly AUA: "aua";
    /** International Phonetic Alphabet */
    readonly IPA: "ipa";
};
export type ThaiTranscriptionScheme = typeof THAI_TRANSCRIPTION_SCHEMES[keyof typeof THAI_TRANSCRIPTION_SCHEMES];
/**
 * Display names for Thai transcription schemes
 */
export declare const THAI_TRANSCRIPTION_SCHEME_NAMES: Record<string, string>;
/**
 * Thai tone marks and their Unicode ranges
 */
export declare const THAI_TONE_MARKS: {
    /** Mai Ek (่) - Low tone */
    readonly MAI_EK: "่";
    /** Mai Tho (้) - Falling tone */
    readonly MAI_THO: "้";
    /** Mai Tri (๊) - High tone */
    readonly MAI_TRI: "๊";
    /** Mai Chattawa (๋) - Rising tone */
    readonly MAI_CHATTAWA: "๋";
};
/**
 * Thai tone numbers (linguistic notation)
 *
 * Standard five-tone system used in Thai linguistics
 */
export declare const THAI_TONES: {
    /** Mid tone (unmarked) */
    readonly MID: 0;
    /** Low tone */
    readonly LOW: 1;
    /** Falling tone */
    readonly FALLING: 2;
    /** High tone */
    readonly HIGH: 3;
    /** Rising tone */
    readonly RISING: 4;
};
/**
 * Thai tone names in English
 */
export declare const THAI_TONE_NAMES: Record<number, string>;
/**
 * Thai script Unicode ranges
 */
export declare const THAI_UNICODE_RANGES: {
    /** Thai consonants: ก-ฮ (U+0E01 to U+0E2E) */
    readonly CONSONANTS: {
        readonly start: 3585;
        readonly end: 3630;
    };
    /** Thai vowels: ะ-ๅ (U+0E30 to U+0E45) */
    readonly VOWELS: {
        readonly start: 3632;
        readonly end: 3653;
    };
    /** Thai tone marks: ่-๋ (U+0E48 to U+0E4B) */
    readonly TONE_MARKS: {
        readonly start: 3656;
        readonly end: 3659;
    };
    /** Thai digits: ๐-๙ (U+0E50 to U+0E59) */
    readonly DIGITS: {
        readonly start: 3664;
        readonly end: 3673;
    };
    /** Full Thai script range (U+0E00 to U+0E7F) */
    readonly FULL: {
        readonly start: 3584;
        readonly end: 3711;
    };
};
/**
 * Regular expressions for Thai script detection
 */
export declare const THAI_REGEX: {
    /** Match any Thai character */
    readonly ANY_THAI: RegExp;
    /** Match Thai consonants only */
    readonly CONSONANT: RegExp;
    /** Match Thai vowels only */
    readonly VOWEL: RegExp;
    /** Match Thai tone marks only */
    readonly TONE_MARK: RegExp;
    /** Match Thai digits only */
    readonly DIGIT: RegExp;
    /** Match entire Thai word (consonants, vowels, tone marks) */
    readonly WORD: RegExp;
};
/**
 * Thai language metadata
 */
export declare const THAI_LANGUAGE_INFO: {
    /** BCP-47 language code */
    readonly code: "th";
    /** BCP-47 with region */
    readonly codeWithRegion: "th-TH";
    /** Script name */
    readonly script: "Thai";
    /** ISO 15924 script code */
    readonly scriptCode: "Thai";
    /** Writing direction */
    readonly direction: "ltr";
    /** Language name in English */
    readonly nameEn: "Thai";
    /** Language name in native script */
    readonly nameNative: "ภาษาไทย";
};
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
export declare function isThaiCharacter(char: string): boolean;
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
export declare function containsThaiCharacters(text: string): boolean;
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
export declare function isThaiText(text: string, allowSpaces?: boolean): boolean;
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
export declare function isThaiConsonant(char: string): boolean;
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
export declare function isThaiVowel(char: string): boolean;
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
export declare function isThaiToneMark(char: string): boolean;
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
export declare function getToneMark(text: string): string | undefined;
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
export declare function getToneNumber(toneMark: string): number | undefined;
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
export declare function isValidThaiTranscriptionScheme(scheme: string): scheme is ThaiTranscriptionScheme;
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
export declare function getThaiTranscriptionSchemeName(scheme: string): string;
//# sourceMappingURL=constants.d.ts.map