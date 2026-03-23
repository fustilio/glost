import type { GLOSTWord } from "glost";
import type { DisplayLevel } from "../types/display-level.js";
import type { LanguageRenderingStrategy } from "../types/rendering-strategy.js";
/**
 * Spacing flags for word rendering
 *
 * These flags help components determine what spacing and sections to render
 * based on the current display level and language strategy.
 */
export interface SpacingFlags {
    /** Whether top spacing is needed (for ruby above) */
    needsTopSpace: boolean;
    /** Whether bottom spacing is needed (for ruby below) */
    needsBottomSpace: boolean;
    /** Whether level 3+ content should show (definitions) */
    needsLevel3: boolean;
    /** Whether level 4+ content should show (part of speech) */
    needsLevel4: boolean;
    /** Whether level 5 content should show (difficulty) */
    needsLevel5: boolean;
    /** Whether transcription data is available and should be shown */
    hasTranscription: boolean;
}
/**
 * Hook to calculate spacing requirements based on display level and language strategy
 *
 * This hook determines what spacing and sections should be rendered for a word
 * based on the current display level, transcription system, and language strategy.
 *
 * @example
 * ```tsx
 * function WordComponent({ word, displayLevel, transcriptionSystem, languageStrategy }) {
 *   const flags = useSpacingFlags(displayLevel, transcriptionSystem, languageStrategy, word);
 *
 *   return (
 *     <div>
 *       {flags.needsTopSpace && <div className="spacer" />}
 *       <ruby>
 *         <span>{getWordText(word)}</span>
 *         {flags.hasTranscription && <rt>{transcription}</rt>}
 *       </ruby>
 *       {flags.needsLevel3 && <div>{definition}</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useSpacingFlags(displayLevel: DisplayLevel, transcriptionSystem?: string, languageStrategy?: LanguageRenderingStrategy, word?: GLOSTWord): SpacingFlags;
//# sourceMappingURL=use-spacing-flags.d.ts.map