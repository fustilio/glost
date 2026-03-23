import type { GLOSTWord } from "glost";
/**
 * Difficulty level type
 */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
/**
 * Get the best definition/translation to show for a word
 *
 * Priority: extras.translations > fullDefinition > shortDefinition > metadata.meaning
 */
export declare function getDefinitionTitle(word: GLOSTWord, language?: string): string;
/**
 * Default difficulty colors
 */
export declare const DIFFICULTY_COLORS: Record<DifficultyLevel, {
    bg: string;
    text: string;
}>;
/**
 * Get inline styles for difficulty badge
 */
export declare function getDifficultyStyles(difficulty?: string | DifficultyLevel): React.CSSProperties;
/**
 * Check if a string contains only hiragana characters
 * Useful for Japanese rendering strategies
 */
export declare function isAllHiragana(text: string): boolean;
/**
 * Check if a string contains only katakana characters
 */
export declare function isAllKatakana(text: string): boolean;
/**
 * Check if a string contains only kana (hiragana or katakana)
 */
export declare function isAllKana(text: string): boolean;
/**
 * Check if text contains kanji
 */
export declare function containsKanji(text: string): boolean;
//# sourceMappingURL=index.d.ts.map