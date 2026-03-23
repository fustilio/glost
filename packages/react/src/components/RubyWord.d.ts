import React from "react";
import type { GLOSTWord } from "glost";
import type { DisplayLevel } from "../types/display-level.js";
import type { LanguageRenderingStrategy, RubyPosition } from "../types/rendering-strategy.js";
import type { GloSTRenderExtension } from "../types/extension.js";
/**
 * Props for the RubyWord component
 */
export interface RubyWordProps {
    /** The GloST word node to render */
    word: GLOSTWord;
    /** Current display level (1-5) */
    displayLevel: DisplayLevel;
    /** Active transcription system (e.g., "furigana", "pinyin") */
    transcriptionSystem?: string;
    /** Language-specific rendering strategy */
    languageStrategy?: LanguageRenderingStrategy;
    /** Render extensions */
    extensions?: GloSTRenderExtension[];
    /** Additional class name for the container */
    className?: string;
    /** Render function for the main text */
    renderText?: (text: string, className?: string) => React.ReactNode;
    /** Render function for the ruby annotation */
    renderRuby?: (transcription: string, position: RubyPosition) => React.ReactNode;
    /** Render function for the definition section */
    renderDefinition?: (translation: string) => React.ReactNode;
    /** Render function for part of speech */
    renderPartOfSpeech?: (pos: string) => React.ReactNode;
    /** Render function for difficulty */
    renderDifficulty?: (difficulty: string | number) => React.ReactNode;
}
/**
 * Base Ruby Word component for rendering GloST words with ruby annotations
 *
 * This is a headless/unstyled component that handles the logic of rendering
 * words with ruby annotations, progressive display levels, and extensions.
 * Use the render props to customize styling.
 *
 * @example
 * ```tsx
 * <RubyWord
 *   word={word}
 *   displayLevel={3}
 *   transcriptionSystem="furigana"
 *   renderText={(text) => <span className="text-2xl">{text}</span>}
 *   renderRuby={(rt) => <rt className="text-sm text-gray-500">{rt}</rt>}
 *   renderDefinition={(def) => <div className="text-xs">{def}</div>}
 * />
 * ```
 */
export declare function RubyWord({ word, displayLevel, transcriptionSystem, languageStrategy, extensions, className, renderText, renderRuby, renderDefinition, renderPartOfSpeech, renderDifficulty, }: RubyWordProps): React.ReactElement;
//# sourceMappingURL=RubyWord.d.ts.map