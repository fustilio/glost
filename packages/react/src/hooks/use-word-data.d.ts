import type { GLOSTWord } from "glost";
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
export declare function useWordData(word: GLOSTWord, transcriptionSystem?: string, translationLanguage?: string): WordData;
//# sourceMappingURL=use-word-data.d.ts.map