/**
 * Difficulty Enhancer Extension
 * 
 * Formats and enhances existing difficulty data with display properties.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import type { DifficultyLevel, DifficultyMetadata } from "./types.js";

/**
 * Get difficulty display text
 * 
 * @internal
 */
function getDifficultyDisplay(level: DifficultyLevel): string {
  const displays: Partial<Record<DifficultyLevel, string>> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  return displays[level] || String(level);
}

/**
 * Get difficulty color (for UI)
 * 
 * @internal
 */
function getDifficultyColor(level: DifficultyLevel): string {
  const colors: Partial<Record<DifficultyLevel, string>> = {
    beginner: "green",
    intermediate: "yellow",
    advanced: "red",
  };
  return colors[level] || "gray";
}

/**
 * Get difficulty priority (for sorting)
 * 
 * @internal
 */
function getDifficultyPriority(level: DifficultyLevel): number {
  const priorities: Partial<Record<DifficultyLevel, number>> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };
  return priorities[level] || 0;
}

/**
 * Difficulty enhancer extension options
 */
export interface DifficultyEnhancerOptions {
  /**
   * Whether to normalize difficulty values
   * @default true
   */
  normalize?: boolean;

  /**
   * Custom difficulty mapping (word → difficulty level)
   */
  customMapping?: Record<string, DifficultyLevel>;
}

/**
 * Create difficulty enhancer extension
 * 
 * This extension processes existing difficulty metadata and enhances it
 * with display information and UI properties (colors, labels, priorities).
 * It should run after the difficulty generator extension.
 * 
 * @param options - Extension configuration options
 * @returns Configured difficulty enhancer extension
 */
export function createDifficultyEnhancerExtension(
  options: DifficultyEnhancerOptions = {},
): GLOSTExtension {
  const { normalize = true, customMapping } = options;

  return {
    id: "difficulty-enhancer",
    name: "Difficulty Enhancer",
    description: "Enhances word difficulty metadata with display properties",

    dependencies: ["difficulty-generator"],

    provides: {
      extras: ["difficulty"],
    },

    enhanceMetadata: (node: GLOSTWord) => {
      // Get difficulty from various possible locations
      const difficulty =
        node.difficulty ||
        node.extras?.metadata?.difficulty ||
        (customMapping && node.children[0]?.type === "TextNode"
          ? customMapping[node.children[0].value]
          : undefined);

      if (!difficulty) {
        return;
      }

      // Normalize difficulty value
      let normalizedDifficulty: DifficultyLevel;
      if (normalize) {
        const diffStr = String(difficulty).toLowerCase();
        if (
          diffStr.includes("beginner") ||
          diffStr.includes("basic") ||
          diffStr.includes("easy")
        ) {
          normalizedDifficulty = "beginner";
        } else if (
          diffStr.includes("advanced") ||
          diffStr.includes("expert") ||
          diffStr.includes("hard")
        ) {
          normalizedDifficulty = "advanced";
        } else if (
          diffStr.includes("intermediate") ||
          diffStr.includes("medium")
        ) {
          normalizedDifficulty = "intermediate";
        } else {
          // Try to match exact value
          normalizedDifficulty = diffStr as DifficultyLevel;
        }
      } else {
        normalizedDifficulty = difficulty as DifficultyLevel;
      }

      // Validate difficulty level
      const validLevels: DifficultyLevel[] = [
        "beginner",
        "intermediate",
        "advanced",
      ];
      if (!validLevels.includes(normalizedDifficulty)) {
        return;
      }

      // Build difficulty metadata
      const difficultyMetadata: DifficultyMetadata = {
        level: normalizedDifficulty,
        display: getDifficultyDisplay(normalizedDifficulty),
        color: getDifficultyColor(normalizedDifficulty),
        priority: getDifficultyPriority(normalizedDifficulty),
      };

      return {
        difficulty: difficultyMetadata,
      };
    },
  };
}

/**
 * Default difficulty enhancer extension
 */
export const DifficultyEnhancerExtension = createDifficultyEnhancerExtension();
