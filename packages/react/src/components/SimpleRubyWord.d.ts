import React from "react";
import type { GLOSTWord } from "glost";
import type { RubyPosition } from "../types/rendering-strategy.js";
/**
 * Props for SimpleRubyWord component
 */
export interface SimpleRubyWordProps {
    /** The GloST word node to render */
    word: GLOSTWord;
    /** Transcription system to use (e.g., "furigana", "pinyin", "paiboon+") */
    transcriptionSystem?: string;
    /** Ruby position relative to text */
    rubyPosition?: RubyPosition;
    /** Whether to show the definition below */
    showDefinition?: boolean;
    /** Custom class for the main text */
    textClassName?: string;
    /** Custom class for the ruby annotation */
    rubyClassName?: string;
    /** Custom class for the definition */
    definitionClassName?: string;
}
/**
 * Simple Ruby Word component with inline styles
 *
 * A straightforward component for rendering GloST words with ruby annotations.
 * Uses inline styles for basic styling, making it easy to use without CSS setup.
 *
 * @example
 * ```tsx
 * // Japanese with furigana
 * <SimpleRubyWord
 *   word={kanjiWord}
 *   transcriptionSystem="furigana"
 *   rubyPosition="over"
 * />
 *
 * // Thai with romanization below
 * <SimpleRubyWord
 *   word={thaiWord}
 *   transcriptionSystem="paiboon+"
 *   rubyPosition="under"
 *   showDefinition
 * />
 * ```
 */
export declare function SimpleRubyWord({ word, transcriptionSystem, rubyPosition, showDefinition, textClassName, rubyClassName, definitionClassName, }: SimpleRubyWordProps): React.ReactElement;
//# sourceMappingURL=SimpleRubyWord.d.ts.map