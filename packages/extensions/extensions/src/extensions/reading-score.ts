/**
 * Reading Score Extension
 *
 * Calculates a composite reading score based on frequency and difficulty.
 * Demonstrates extension stacking with proper dependency validation.
 *
 * @packageDocumentation
 */

import type { GLOSTWord } from "glost";
import type { GLOSTExtension } from "../types";
import { ExtensionDependencyError } from "../errors";
// Types moved to separate packages
type FrequencyLevel = "rare" | "uncommon" | "common" | "very-common";
type DifficultyLevel = "beginner" | "intermediate" | "advanced";

/**
 * Reading score metadata structure
 *
 * @since 0.0.2
 */
export interface ReadingScoreMetadata {
  /** Composite reading score (1-4 scale, lower is easier) */
  score: number;
  /** Human-readable difficulty label */
  label: "easy" | "moderate" | "challenging" | "difficult";
  /** Color identifier for UI styling */
  color: string;
}

/**
 * Options for the Reading Score extension
 *
 * @since 0.0.2
 */
export interface ReadingScoreOptions {
  /**
   * Weight for frequency in the composite score (0-1)
   * Default: 0.4
   */
  frequencyWeight?: number;

  /**
   * Weight for difficulty in the composite score (0-1)
   * Default: 0.6
   */
  difficultyWeight?: number;
}

/**
 * Map frequency level to numeric score
 */
const FREQUENCY_SCORES: Record<FrequencyLevel, number> = {
  "very-common": 1,
  common: 2,
  uncommon: 3,
  rare: 4,
};

/**
 * Map difficulty level to numeric score
 */
const DIFFICULTY_SCORES: Record<DifficultyLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

/**
 * Get reading label from score
 */
function getReadingLabel(
  score: number,
): "easy" | "moderate" | "challenging" | "difficult" {
  if (score <= 1.5) return "easy";
  if (score <= 2.5) return "moderate";
  if (score <= 3.5) return "challenging";
  return "difficult";
}

/**
 * Get color for reading score
 */
function getReadingColor(score: number): string {
  if (score <= 1.5) return "green";
  if (score <= 2.5) return "blue";
  if (score <= 3.5) return "yellow";
  return "red";
}

/**
 * Create a Reading Score extension
 *
 * This extension calculates a composite reading difficulty score
 * based on word frequency and difficulty level. It demonstrates
 * how extensions can build upon other extensions.
 *
 * **REQUIRES**: frequency and difficulty extensions to run first.
 *
 * @param options - Configuration options
 * @returns A configured GLOSTExtension
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import { createReadingScoreExtension } from "glost-extensions/extensions/reading-score";
 * import { createFrequencyExtension } from "glost-frequency";
 * import { createDifficultyExtension } from "glost-difficulty";
 *
 * // These extensions are now in separate packages
 * const [freqGen, freqEnh] = createFrequencyExtension({ targetLanguage: "en", provider });
 * const [diffGen, diffEnh] = createDifficultyExtension({ targetLanguage: "en", provider });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   freqGen, freqEnh,
 *   diffGen, diffEnh,
 *   createReadingScoreExtension({ frequencyWeight: 0.3, difficultyWeight: 0.7 }),
 * ]);
 *
 * // Access reading score on words
 * const word = result.document.children[0].children[0].children[0];
 * console.log(word.extras?.readingScore);
 * // { score: 2.1, label: "moderate", color: "blue" }
 * ```
 *
 * @since 0.0.2
 */
export function createReadingScoreExtension(
  options: ReadingScoreOptions = {},
): GLOSTExtension {
  const frequencyWeight = options.frequencyWeight ?? 0.4;
  const difficultyWeight = options.difficultyWeight ?? 0.6;

  return {
    id: "reading-score",
    name: "Reading Score",
    description:
      "Calculates composite reading score from frequency + difficulty",

    // Declare dependencies - these must run before this extension
    dependencies: ["frequency", "difficulty"],

    // Declare what we require from those dependencies
    requires: {
      extras: ["frequency", "difficulty"],
    },

    // Declare what we provide
    provides: {
      extras: ["readingScore"],
    },

    enhanceMetadata: (
      node: GLOSTWord,
    ): { readingScore: ReadingScoreMetadata } | void => {
      // Get frequency from the frequency extension's output
      const frequencyData = node.extras?.frequency as
        | { level: FrequencyLevel }
        | undefined;
      const frequency = frequencyData?.level;

      // Get difficulty from the difficulty extension's output
      const difficultyData = node.extras?.difficulty as
        | { level: DifficultyLevel }
        | undefined;
      const difficulty = difficultyData?.level;

      // Validate that frequency extension provided its output
      if (!frequency) {
        throw new ExtensionDependencyError(
          "reading-score",
          "frequency",
          "extras.frequency.level",
          "Frequency extension did not provide 'frequency.level' field. " +
            "Ensure frequency generator (from glost-frequency) runs before ReadingScoreExtension and " +
            "that the word has frequency metadata.",
        );
      }

      // Validate that difficulty extension provided its output
      if (!difficulty) {
        throw new ExtensionDependencyError(
          "reading-score",
          "difficulty",
          "extras.difficulty.level",
          "Difficulty extension did not provide 'difficulty.level' field. " +
            "Ensure difficulty generator (from glost-difficulty) runs before ReadingScoreExtension and " +
            "that the word has difficulty metadata.",
        );
      }

      // Calculate composite score
      const frequencyScore = FREQUENCY_SCORES[frequency] ?? 2;
      const difficultyScore = DIFFICULTY_SCORES[difficulty] ?? 2;

      const score =
        frequencyScore * frequencyWeight + difficultyScore * difficultyWeight;
      const roundedScore = Math.round(score * 100) / 100;

      return {
        readingScore: {
          score: roundedScore,
          label: getReadingLabel(roundedScore),
          color: getReadingColor(roundedScore),
        },
      };
    },
  };
}

/**
 * Pre-configured Reading Score extension with default options
 *
 * Uses default weights: 40% frequency, 60% difficulty.
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import { ReadingScoreExtension } from "glost-extensions/extensions";
 * import { createFrequencyExtension } from "glost-frequency";
 * import { createDifficultyExtension } from "glost-difficulty";
 *
 * // These extensions are now in separate packages
 * const [freqGen, freqEnh] = createFrequencyExtension({ targetLanguage: "en", provider });
 * const [diffGen, diffEnh] = createDifficultyExtension({ targetLanguage: "en", provider });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   freqGen, freqEnh,
 *   diffGen, diffEnh,
 *   ReadingScoreExtension,
 * ]);
 * ```
 *
 * @since 0.0.2
 */
export const ReadingScoreExtension = createReadingScoreExtension();
