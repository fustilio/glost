import { useMemo } from "react";
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
export function useSpacingFlags(
  displayLevel: DisplayLevel,
  transcriptionSystem?: string,
  languageStrategy?: LanguageRenderingStrategy,
  word?: GLOSTWord
): SpacingFlags {
  return useMemo(() => {
    // On display level 1, ignore transcriptions completely
    const hasTranscription =
      displayLevel >= 2 && !!transcriptionSystem && transcriptionSystem !== "";

    // Top spacing depends on ruby position - no need for top space if ruby is "under"
    const needsTopSpace =
      displayLevel >= 2 &&
      (word && transcriptionSystem
        ? languageStrategy?.getRubyPosition?.(word, transcriptionSystem) !==
          "under"
        : true);

    // Bottom spacing depends on ruby position - no need for bottom space if ruby is "over"
    const needsBottomSpace =
      displayLevel >= 2 &&
      (word && transcriptionSystem
        ? languageStrategy?.getRubyPosition?.(word, transcriptionSystem) !==
          "over"
        : true);

    const needsLevel3 = displayLevel >= 3;
    const needsLevel4 = displayLevel >= 4;
    const needsLevel5 = displayLevel >= 5;

    return {
      needsTopSpace,
      needsBottomSpace,
      needsLevel3,
      needsLevel4,
      needsLevel5,
      hasTranscription,
    };
  }, [displayLevel, transcriptionSystem, languageStrategy, word]);
}
