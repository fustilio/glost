import React from "react";
import type { GLOSTWord } from "glost";
import { getWordText, getWordTranscription, getWordTranslation } from "glost";
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
export function SimpleRubyWord({
  word,
  transcriptionSystem,
  rubyPosition = "over",
  showDefinition = false,
  textClassName,
  rubyClassName,
  definitionClassName,
}: SimpleRubyWordProps): React.ReactElement {
  const text = getWordText(word);
  const transcription = transcriptionSystem
    ? getWordTranscription(word, transcriptionSystem)
    : null;
  const translation = getWordTranslation(word);

  const baseTextStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    lineHeight: 1.2,
  };

  const baseRubyStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "#666",
    fontFamily: "monospace",
  };

  const baseDefinitionStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "#444",
    marginTop: "0.25rem",
  };

  return (
    <span
      style={{ display: "inline-block", textAlign: "center" }}
      title={translation || undefined}
    >
      <ruby
        style={{
          rubyAlign: "center",
          rubyPosition: rubyPosition,
        }}
      >
        <span className={textClassName} style={baseTextStyle}>
          {text}
        </span>
        {transcription && (
          <rt className={rubyClassName} style={baseRubyStyle}>
            {transcription}
          </rt>
        )}
      </ruby>
      {showDefinition && translation && (
        <div className={definitionClassName} style={baseDefinitionStyle}>
          {translation}
        </div>
      )}
    </span>
  );
}
