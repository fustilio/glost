import React from "react";
import type { GLOSTSentence, GLOSTWord } from "glost";
import type { DisplayLevel } from "../types/display-level.js";
import type { LanguageRenderingStrategy } from "../types/rendering-strategy.js";
import type { GloSTRenderExtension } from "../types/extension.js";
/**
 * Props for GloSTSentence component
 */
export interface GloSTSentenceProps {
    /** The GloST sentence node to render */
    sentence: GLOSTSentence;
    /** Current display level (1-5) */
    displayLevel: DisplayLevel;
    /** Active transcription system */
    transcriptionSystem?: string;
    /** Language-specific rendering strategy */
    languageStrategy?: LanguageRenderingStrategy;
    /** Render extensions */
    extensions?: GloSTRenderExtension[];
    /** Show sentence translation below */
    showTranslation?: boolean;
    /** Container class name */
    className?: string;
    /** Custom word renderer */
    renderWord?: (word: GLOSTWord, index: number) => React.ReactNode;
    /** Custom translation renderer */
    renderTranslation?: (translation: string) => React.ReactNode;
}
/**
 * Component for rendering a GloST sentence with all its words
 *
 * @example
 * ```tsx
 * <GloSTSentence
 *   sentence={sentence}
 *   displayLevel={3}
 *   transcriptionSystem="furigana"
 *   showTranslation
 * />
 * ```
 */
export declare function GloSTSentence({ sentence, displayLevel, transcriptionSystem, languageStrategy, extensions, showTranslation, className, renderWord, renderTranslation, }: GloSTSentenceProps): React.ReactElement;
//# sourceMappingURL=GloSTSentence.d.ts.map