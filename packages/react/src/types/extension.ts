import type { GLOSTWord } from "glost";
import type { DisplayLevel } from "./display-level.js";
import type { LanguageRenderingStrategy } from "./rendering-strategy.js";

/**
 * Extension for customizing word rendering in GloST React components
 *
 * Extensions allow adding custom rendering logic, CSS classes, and content
 * before/after words or in the metadata section.
 *
 * @example
 * ```tsx
 * const difficultyExtension: GloSTRenderExtension = {
 *   id: "difficulty",
 *   shouldApply: (node, level) => level >= 5 && !!node.difficulty,
 *   renderMetadata: (node) => (
 *     <span className="difficulty-badge">{node.difficulty}</span>
 *   ),
 * };
 * ```
 */
export interface GloSTRenderExtension {
  /** Unique identifier for this extension */
  id: string;

  /**
   * Determine if this extension should be active for the given context
   *
   * @param node - The word node being rendered
   * @param displayLevel - Current display level (1-5)
   * @param transcriptionSystem - Active transcription system
   * @returns true if the extension should be applied
   */
  shouldApply?: (
    node: GLOSTWord,
    displayLevel: DisplayLevel,
    transcriptionSystem?: string
  ) => boolean;

  /**
   * Get additional class names for the word container
   *
   * @returns CSS class names to add to the word container
   */
  getClassName?: (
    node: GLOSTWord,
    displayLevel: DisplayLevel,
    transcriptionSystem?: string,
    languageStrategy?: LanguageRenderingStrategy
  ) => string;

  /**
   * Render content before the word text (inside the main container)
   */
  renderBefore?: (
    node: GLOSTWord,
    displayLevel: DisplayLevel,
    transcriptionSystem?: string,
    languageStrategy?: LanguageRenderingStrategy
  ) => React.ReactNode;

  /**
   * Render content after the word text (inside the main container)
   */
  renderAfter?: (
    node: GLOSTWord,
    displayLevel: DisplayLevel,
    transcriptionSystem?: string,
    languageStrategy?: LanguageRenderingStrategy
  ) => React.ReactNode;

  /**
   * Render additional content in the definition/metadata section
   */
  renderMetadata?: (
    node: GLOSTWord,
    displayLevel: DisplayLevel,
    transcriptionSystem?: string,
    languageStrategy?: LanguageRenderingStrategy
  ) => React.ReactNode;
}

/**
 * Filter extensions that should apply for the current context
 */
export function getActiveExtensions(
  extensions: GloSTRenderExtension[],
  node: GLOSTWord,
  displayLevel: DisplayLevel,
  transcriptionSystem?: string
): GloSTRenderExtension[] {
  return extensions.filter(
    (ext) =>
      !ext.shouldApply ||
      ext.shouldApply(node, displayLevel, transcriptionSystem)
  );
}

/**
 * Combine class names from multiple extensions
 */
export function combineExtensionClassNames(
  extensions: GloSTRenderExtension[],
  node: GLOSTWord,
  displayLevel: DisplayLevel,
  transcriptionSystem?: string,
  languageStrategy?: LanguageRenderingStrategy
): string {
  return extensions
    .map(
      (ext) =>
        ext.getClassName?.(
          node,
          displayLevel,
          transcriptionSystem,
          languageStrategy
        ) ?? ""
    )
    .filter(Boolean)
    .join(" ");
}
