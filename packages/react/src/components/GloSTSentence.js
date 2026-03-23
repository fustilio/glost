import React from "react";
import { getAllWords, getSentenceTranslation } from "glost";
import { RubyWord } from "./RubyWord.js";
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
export function GloSTSentence({ sentence, displayLevel, transcriptionSystem, languageStrategy, extensions = [], showTranslation = false, className, renderWord, renderTranslation, }) {
    const words = getAllWords(sentence);
    const translation = getSentenceTranslation(sentence);
    const defaultRenderWord = (word, index) => (<RubyWord key={index} word={word} displayLevel={displayLevel} transcriptionSystem={transcriptionSystem} languageStrategy={languageStrategy} extensions={extensions}/>);
    const defaultRenderTranslation = (trans) => (<div style={{
            fontSize: "0.875rem",
            color: "#666",
            marginTop: "0.5rem",
            fontStyle: "italic",
        }}>
      {trans}
    </div>);
    return (<div className={className}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.25rem" }}>
        {words.map((word, index) => renderWord ? renderWord(word, index) : defaultRenderWord(word, index))}
      </div>
      {showTranslation &&
            translation &&
            (renderTranslation ?? defaultRenderTranslation)(translation)}
    </div>);
}
//# sourceMappingURL=GloSTSentence.js.map