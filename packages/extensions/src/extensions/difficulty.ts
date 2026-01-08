/**
 * Difficulty Extension
 * 
 * Processes and enhances word difficulty level metadata.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "../types";
import type { GLOSTWord } from "glost";

/**
 * Difficulty level type
 * 
 * Represents the learning difficulty level of a word.
 * 
 * @since 0.0.1
 */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

/**
 * Difficulty metadata structure
 * 
 * Enhanced metadata structure for word difficulty, including display
 * information and UI properties.
 * 
 * @since 0.0.1
 */
export interface DifficultyMetadata {
  level: DifficultyLevel;
  display: string;
  color: string;
  priority: number;
}

/**
 * Get difficulty display text
 * 
 * @internal
 */
function getDifficultyDisplay(level: DifficultyLevel): string {
  const displays: Record<DifficultyLevel, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  return displays[level] || level;
}

/**
 * Get difficulty color (for UI)
 * 
 * @internal
 */
function getDifficultyColor(level: DifficultyLevel): string {
  const colors: Record<DifficultyLevel, string> = {
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
  const priorities: Record<DifficultyLevel, number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };
  return priorities[level] || 0;
}

/**
 * Difficulty extension options
 * 
 * @since 0.0.1
 */
export interface DifficultyExtensionOptions {
  /**
   * Whether to normalize difficulty values
   * @default true
   */
  normalize?: boolean;

  /**
   * Custom difficulty mapping
   */
  customMapping?: Record<string, DifficultyLevel>;
}

/**
 * Create difficulty extension
 * 
 * @param options - Extension configuration options
 * @returns Configured difficulty extension
 * 
 * @example
 * ```typescript
 * const extension = createDifficultyExtension({ normalize: true });
 * ```
 * 
 * @since 0.0.1
 */
export function createDifficultyExtension(
  options: DifficultyExtensionOptions = {},
): GLOSTExtension {
  const { normalize = true, customMapping } = options;

  return {
    id: "difficulty",
    name: "Word Difficulty",
    description: "Processes and enhances word difficulty level metadata",

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
 * Default difficulty extension
 * 
 * @since 0.0.1
 */
export const DifficultyExtension = createDifficultyExtension();

