import React from "react";
import type { GLOSTWord } from "glost";
import { getWordText, getWordTranscription } from "glost";
import type { DisplayLevel } from "../types/display-level.js";
import type { LanguageRenderingStrategy, RubyPosition } from "../types/rendering-strategy.js";
import type { GloSTRenderExtension } from "../types/extension.js";
import { useSpacingFlags } from "../hooks/use-spacing-flags.js";
import { useWordData } from "../hooks/use-word-data.js";
import { getActiveExtensions, combineExtensionClassNames } from "../types/extension.js";

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
export function RubyWord({
  word,
  displayLevel,
  transcriptionSystem,
  languageStrategy,
  extensions = [],
  className,
  renderText,
  renderRuby,
  renderDefinition,
  renderPartOfSpeech,
  renderDifficulty,
}: RubyWordProps): React.ReactElement {
  const flags = useSpacingFlags(
    displayLevel,
    transcriptionSystem,
    languageStrategy,
    word
  );

  const data = useWordData(word, transcriptionSystem);

  // Get active extensions
  const activeExtensions = getActiveExtensions(
    extensions,
    word,
    displayLevel,
    transcriptionSystem
  );

  // Combine extension class names
  const extensionClasses = combineExtensionClassNames(
    activeExtensions,
    word,
    displayLevel,
    transcriptionSystem,
    languageStrategy
  );

  // Determine if we should show transcription
  const shouldShowTranscription =
    flags.hasTranscription &&
    data.transcription &&
    (languageStrategy?.shouldShowTranscription?.(word, transcriptionSystem!) ??
      true);

  // Get ruby position
  const rubyPosition: RubyPosition =
    transcriptionSystem && languageStrategy?.getRubyPosition
      ? languageStrategy.getRubyPosition(word, transcriptionSystem)
      : "over";

  // Default render functions
  const defaultRenderText = (text: string, cls?: string) => (
    <span className={cls}>{text}</span>
  );

  const defaultRenderRuby = (transcription: string) => <rt>{transcription}</rt>;

  const defaultRenderDefinition = (translation: string) => (
    <div>{translation}</div>
  );

  const defaultRenderPOS = (pos: string) => <div>{pos}</div>;

  const defaultRenderDifficulty = (diff: string | number) => (
    <span>{diff}</span>
  );

  // Render extension content
  const extensionBefore = activeExtensions.map((ext, i) =>
    ext.renderBefore ? (
      <React.Fragment key={`before-${ext.id}-${i}`}>
        {ext.renderBefore(
          word,
          displayLevel,
          transcriptionSystem,
          languageStrategy
        )}
      </React.Fragment>
    ) : null
  );

  const extensionAfter = activeExtensions.map((ext, i) =>
    ext.renderAfter ? (
      <React.Fragment key={`after-${ext.id}-${i}`}>
        {ext.renderAfter(
          word,
          displayLevel,
          transcriptionSystem,
          languageStrategy
        )}
      </React.Fragment>
    ) : null
  );

  const extensionMetadata = activeExtensions.map((ext, i) =>
    ext.renderMetadata ? (
      <React.Fragment key={`meta-${ext.id}-${i}`}>
        {ext.renderMetadata(
          word,
          displayLevel,
          transcriptionSystem,
          languageStrategy
        )}
      </React.Fragment>
    ) : null
  );

  // Combined class name
  const combinedClassName = [className, extensionClasses]
    .filter(Boolean)
    .join(" ");

  // Render based on display level
  // Level 1: Plain text only
  if (displayLevel === 1) {
    return (
      <span className={combinedClassName}>
        {extensionBefore}
        {(renderText ?? defaultRenderText)(data.text)}
        {extensionAfter}
      </span>
    );
  }

  // Level 2+: With ruby annotations
  const textElement = (renderText ?? defaultRenderText)(
    data.text,
    extensionClasses
  );
  const rubyElement =
    shouldShowTranscription && data.transcription
      ? (renderRuby ?? defaultRenderRuby)(data.transcription, rubyPosition)
      : null;

  return (
    <span className={combinedClassName} title={data.tooltipText}>
      {extensionBefore}
      <ruby
        style={{
          rubyAlign: "center",
          rubyPosition: rubyPosition,
        }}
      >
        {textElement}
        {rubyElement}
      </ruby>
      {extensionAfter}

      {/* Definition section (level 3+) */}
      {flags.needsLevel3 &&
        data.translation &&
        (renderDefinition ?? defaultRenderDefinition)(data.translation)}

      {/* Part of speech (level 4+) */}
      {flags.needsLevel4 &&
        data.partOfSpeech &&
        (renderPartOfSpeech ?? defaultRenderPOS)(data.partOfSpeech)}

      {/* Difficulty (level 5) */}
      {flags.needsLevel5 &&
        data.difficulty &&
        (renderDifficulty ?? defaultRenderDifficulty)(data.difficulty)}

      {/* Extension metadata */}
      {extensionMetadata}
    </span>
  );
}
