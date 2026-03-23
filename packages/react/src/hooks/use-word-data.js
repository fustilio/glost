import { useMemo } from "react";
import { getWordText, getWordTranscription, getWordTranslation, getWordPartOfSpeech, getWordDifficulty, } from "glost";
/**
 * Hook to extract all relevant data from a GloST word node
 *
 * @example
 * ```tsx
 * function WordComponent({ word, transcriptionSystem }) {
 *   const data = useWordData(word, transcriptionSystem);
 *
 *   return (
 *     <ruby title={data.tooltipText}>
 *       <span>{data.text}</span>
 *       {data.transcription && <rt>{data.transcription}</rt>}
 *     </ruby>
 *   );
 * }
 * ```
 */
export function useWordData(word, transcriptionSystem, translationLanguage = "en-US") {
    return useMemo(() => {
        const text = getWordText(word);
        const transcription = transcriptionSystem
            ? (getWordTranscription(word, transcriptionSystem) ?? undefined)
            : undefined;
        const translation = getWordTranslation(word, translationLanguage);
        const partOfSpeech = getWordPartOfSpeech(word);
        const difficulty = getWordDifficulty(word);
        // Build tooltip text
        const tooltipParts = [];
        if (translation)
            tooltipParts.push(translation);
        if (partOfSpeech)
            tooltipParts.push(`(${partOfSpeech})`);
        const tooltipText = tooltipParts.join(" ");
        return {
            text,
            transcription,
            translation,
            partOfSpeech,
            difficulty,
            tooltipText,
        };
    }, [word, transcriptionSystem, translationLanguage]);
}
//# sourceMappingURL=use-word-data.js.map