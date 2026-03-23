import React from "react";
import { getWordText, getWordTranscription, getWordTranslation } from "glost";
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
export function SimpleRubyWord({ word, transcriptionSystem, rubyPosition = "over", showDefinition = false, textClassName, rubyClassName, definitionClassName, }) {
    const text = getWordText(word);
    const transcription = transcriptionSystem
        ? getWordTranscription(word, transcriptionSystem)
        : null;
    const translation = getWordTranslation(word);
    const baseTextStyle = {
        fontSize: "1.5rem",
        lineHeight: 1.2,
    };
    const baseRubyStyle = {
        fontSize: "0.75rem",
        color: "#666",
        fontFamily: "monospace",
    };
    const baseDefinitionStyle = {
        fontSize: "0.75rem",
        color: "#444",
        marginTop: "0.25rem",
    };
    return (<span style={{ display: "inline-block", textAlign: "center" }} title={translation || undefined}>
      <ruby style={{
            rubyAlign: "center",
            rubyPosition: rubyPosition,
        }}>
        <span className={textClassName} style={baseTextStyle}>
          {text}
        </span>
        {transcription && (<rt className={rubyClassName} style={baseRubyStyle}>
            {transcription}
          </rt>)}
      </ruby>
      {showDefinition && translation && (<div className={definitionClassName} style={baseDefinitionStyle}>
          {translation}
        </div>)}
    </span>);
}
//# sourceMappingURL=SimpleRubyWord.js.map