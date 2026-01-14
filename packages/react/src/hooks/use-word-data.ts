import { useMemo } from "react";
import type { GLOSTWord } from "glost";
import {
  getWordText,
  getWordTranscription,
  getWordTranslation,
  getWordPartOfSpeech,
  getWordDifficulty,
} from "glost";

/**
 * Extracted data from a GloST word node for rendering
 */
export interface WordData {
  /** The main text content */
  text: string;
  /** Transcription for the specified system (or undefined) */
  transcription: string | undefined;
  /** Translation/definition */
  translation: string;
  /** Part of speech */
  partOfSpeech: string;
  /** Difficulty level */
  difficulty: string | number;
  /** Full tooltip text combining available info */
  tooltipText: string;
}

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
export function useWordData(
  word: GLOSTWord,
  transcriptionSystem?: string,
  translationLanguage = "en-US"
): WordData {
  return useMemo(() => {
    const text = getWordText(word);
    const transcription = transcriptionSystem
      ? (getWordTranscription(word, transcriptionSystem) ?? undefined)
      : undefined;
    const translation = getWordTranslation(word, translationLanguage);
    const partOfSpeech = getWordPartOfSpeech(word);
    const difficulty = getWordDifficulty(word);

    // Build tooltip text
    const tooltipParts: string[] = [];
    if (translation) tooltipParts.push(translation);
    if (partOfSpeech) tooltipParts.push(`(${partOfSpeech})`);
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
