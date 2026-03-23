import { useMemo } from "react";
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
export function useSpacingFlags(displayLevel, transcriptionSystem, languageStrategy, word) {
    return useMemo(() => {
        // On display level 1, ignore transcriptions completely
        const hasTranscription = displayLevel >= 2 && !!transcriptionSystem && transcriptionSystem !== "";
        // Top spacing depends on ruby position - no need for top space if ruby is "under"
        const needsTopSpace = displayLevel >= 2 &&
            (word && transcriptionSystem
                ? languageStrategy?.getRubyPosition?.(word, transcriptionSystem) !==
                    "under"
                : true);
        // Bottom spacing depends on ruby position - no need for bottom space if ruby is "over"
        const needsBottomSpace = displayLevel >= 2 &&
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
//# sourceMappingURL=use-spacing-flags.js.map