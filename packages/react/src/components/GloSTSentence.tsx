import React from "react";
import type { GLOSTSentence, GLOSTWord } from "glost";
import { getAllWords, getSentenceTranslation } from "glost";
import type { DisplayLevel } from "../types/display-level.js";
import type { LanguageRenderingStrategy } from "../types/rendering-strategy.js";
import type { GloSTRenderExtension } from "../types/extension.js";
import { RubyWord } from "./RubyWord.js";

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
export function GloSTSentence({
  sentence,
  displayLevel,
  transcriptionSystem,
  languageStrategy,
  extensions = [],
  showTranslation = false,
  className,
  renderWord,
  renderTranslation,
}: GloSTSentenceProps): React.ReactElement {
  const words = getAllWords(sentence);
  const translation = getSentenceTranslation(sentence);

  const defaultRenderWord = (word: GLOSTWord, index: number) => (
    <RubyWord
      key={index}
      word={word}
      displayLevel={displayLevel}
      transcriptionSystem={transcriptionSystem}
      languageStrategy={languageStrategy}
      extensions={extensions}
    />
  );

  const defaultRenderTranslation = (trans: string) => (
    <div
      style={{
        fontSize: "0.875rem",
        color: "#666",
        marginTop: "0.5rem",
        fontStyle: "italic",
      }}
    >
      {trans}
    </div>
  );

  return (
    <div className={className}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.25rem" }}>
        {words.map((word, index) =>
          renderWord ? renderWord(word, index) : defaultRenderWord(word, index)
        )}
      </div>
      {showTranslation &&
        translation &&
        (renderTranslation ?? defaultRenderTranslation)(translation)}
    </div>
  );
}
