import { getWordTranslation } from "glost";
/**
 * Get the best definition/translation to show for a word
 *
 * Priority: extras.translations > fullDefinition > shortDefinition > metadata.meaning
 */
export function getDefinitionTitle(word, language = "en-US") {
    const translation = getWordTranslation(word, language);
    if (translation)
        return translation;
    return (word.fullDefinition ?? word.shortDefinition ?? word.metadata?.meaning ?? "");
}
/**
 * Default difficulty colors
 */
export const DIFFICULTY_COLORS = {
    beginner: { bg: "#dcfce7", text: "#166534" },
    intermediate: { bg: "#fef9c3", text: "#854d0e" },
    advanced: { bg: "#fee2e2", text: "#991b1b" },
};
/**
 * Get inline styles for difficulty badge
 */
export function getDifficultyStyles(difficulty) {
    const level = difficulty ?? "intermediate";
    const colors = DIFFICULTY_COLORS[level] ?? DIFFICULTY_COLORS.intermediate;
    return {
        backgroundColor: colors.bg,
        color: colors.text,
        padding: "0.125rem 0.5rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
    };
}
/**
 * Check if a string contains only hiragana characters
 * Useful for Japanese rendering strategies
 */
export function isAllHiragana(text) {
    return /^[\u3040-\u309f]+$/.test(text);
}
/**
 * Check if a string contains only katakana characters
 */
export function isAllKatakana(text) {
    return /^[\u30a0-\u30ff]+$/.test(text);
}
/**
 * Check if a string contains only kana (hiragana or katakana)
 */
export function isAllKana(text) {
    return /^[\u3040-\u309f\u30a0-\u30ff]+$/.test(text);
}
/**
 * Check if text contains kanji
 */
export function containsKanji(text) {
    return /[\u4e00-\u9faf]/.test(text);
}
//# sourceMappingURL=index.js.map