/**
 * Learner Hints Extension
 *
 * Generates contextual hints for language learners based on word metadata.
 * Demonstrates extension stacking with required and optional dependencies.
 *
 * @packageDocumentation
 */

import type { GLOSTWord } from "glost";
import type { GLOSTExtension, ExtensionContext } from "../types";
import { ExtensionDependencyError } from "../errors";
import type { DifficultyLevel } from "./difficulty";
import type { PartOfSpeechMetadata } from "./part-of-speech";

/**
 * Learner hints metadata structure
 *
 * @since 0.0.2
 */
export interface LearnerHintsMetadata {
  /** Array of contextual hints for the learner */
  hints: string[];
  /** Priority level for displaying hints (higher = more important) */
  priority: "low" | "medium" | "high";
  /** Whether this word needs special attention */
  needsAttention: boolean;
}

/**
 * Options for the Learner Hints extension
 *
 * @since 0.0.2
 */
export interface LearnerHintsOptions {
  /**
   * Include grammar tips based on part of speech
   * Default: true
   */
  includeGrammarTips?: boolean;

  /**
   * Include difficulty-based encouragement
   * Default: true
   */
  includeEncouragement?: boolean;

  /**
   * Target language for localized hints (ISO code)
   * Default: "en"
   */
  targetLanguage?: string;
}

/**
 * Grammar tips for different parts of speech
 */
const GRAMMAR_TIPS: Record<string, string[]> = {
  verb: [
    "Pay attention to conjugation patterns",
    "Note the tense and aspect",
    "Check for irregular forms",
  ],
  noun: [
    "Learn the grammatical gender if applicable",
    "Note singular/plural forms",
    "Remember articles that go with this noun",
  ],
  adjective: [
    "Note agreement patterns with nouns",
    "Learn comparative and superlative forms",
    "Check position relative to noun",
  ],
  adverb: ["Note position in sentence", "Learn related adjective form"],
  pronoun: [
    "Pay attention to case (subject/object)",
    "Note formal/informal distinctions",
  ],
  preposition: [
    "Learn common phrases using this preposition",
    "Note case requirements if applicable",
  ],
};

/**
 * Get difficulty-based hints
 */
function getDifficultyHints(
  difficulty: DifficultyLevel,
  includeEncouragement: boolean,
): string[] {
  const hints: string[] = [];

  switch (difficulty) {
    case "advanced":
      hints.push("This is an advanced word - take note!");
      if (includeEncouragement) {
        hints.push("Great job tackling difficult vocabulary");
      }
      break;
    case "intermediate":
      hints.push("Building your intermediate vocabulary");
      break;
    case "beginner":
      if (includeEncouragement) {
        hints.push("Keep building your foundation");
      }
      break;
  }

  return hints;
}

/**
 * Get priority based on difficulty
 */
function getPriority(difficulty: DifficultyLevel): "low" | "medium" | "high" {
  switch (difficulty) {
    case "advanced":
      return "high";
    case "intermediate":
      return "medium";
    default:
      return "low";
  }
}

/**
 * Create a Learner Hints extension
 *
 * This extension generates contextual hints for language learners
 * based on word difficulty, part of speech, and other metadata.
 * It demonstrates how extensions can have both required and optional
 * dependencies.
 *
 * **REQUIRES**: part-of-speech and difficulty extensions.
 * **OPTIONAL**: gender extension (enhances hints for gendered languages).
 *
 * @param options - Configuration options
 * @returns A configured GLOSTExtension
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import {
 *   PartOfSpeechExtension,
 *   DifficultyExtension,
 *   GenderExtension
 * } from "glost-extensions/extensions";
 * import { createLearnerHintsExtension } from "glost-extensions/extensions/learner-hints";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   PartOfSpeechExtension,
 *   DifficultyExtension,
 *   GenderExtension,  // Optional - enhances hints
 *   createLearnerHintsExtension({ includeGrammarTips: true }),
 * ]);
 *
 * // Access hints on words
 * const word = result.document.children[0].children[0].children[0];
 * console.log(word.extras?.learnerHints);
 * // { hints: ["Pay attention to conjugation patterns", ...], priority: "high", needsAttention: true }
 * ```
 *
 * @since 0.0.2
 */
export function createLearnerHintsExtension(
  options: LearnerHintsOptions = {},
): GLOSTExtension {
  const includeGrammarTips = options.includeGrammarTips ?? true;
  const includeEncouragement = options.includeEncouragement ?? true;

  return {
    id: "learner-hints",
    name: "Learner Hints",
    description:
      "Generates contextual hints for language learners based on word metadata",

    // Declare dependencies
    dependencies: ["part-of-speech", "difficulty"],

    // Declare required fields from dependencies
    requires: {
      extras: ["partOfSpeech", "difficulty"],
      // Note: gender is optional, not listed here
    },

    // Declare what we provide
    provides: {
      extras: ["learnerHints"],
    },

    enhanceMetadata: (
      node: GLOSTWord,
      context?: ExtensionContext,
    ): { learnerHints: LearnerHintsMetadata } | void => {
      // Get part of speech from the extension's output
      const posData = node.extras?.partOfSpeech as
        | PartOfSpeechMetadata
        | undefined;
      const pos = posData?.tag;

      // Get difficulty from the extension's output
      const difficultyData = node.extras?.difficulty as
        | { level: DifficultyLevel }
        | undefined;
      const difficulty = difficultyData?.level;

      // Get gender (optional - may not be present)
      const genderData = node.extras?.gender as
        | { value: string; display: string }
        | undefined;
      const gender = genderData?.display;

      // Strict validation for required fields
      if (!pos) {
        throw new ExtensionDependencyError(
          "learner-hints",
          "part-of-speech",
          "extras.partOfSpeech.tag",
          "PartOfSpeechExtension must run before LearnerHintsExtension. " +
            "Add PartOfSpeechExtension to your extension list.",
        );
      }

      if (!difficulty) {
        throw new ExtensionDependencyError(
          "learner-hints",
          "difficulty",
          "extras.difficulty.level",
          "DifficultyExtension must run before LearnerHintsExtension. " +
            "Add DifficultyExtension to your extension list.",
        );
      }

      const hints: string[] = [];

      // Add difficulty-based hints
      hints.push(...getDifficultyHints(difficulty, includeEncouragement));

      // Add grammar tips based on POS
      if (includeGrammarTips) {
        const normalizedPos = pos.toLowerCase();
        const grammarTips = GRAMMAR_TIPS[normalizedPos];
        if (grammarTips && grammarTips.length > 0) {
          // Add first tip for this POS
          hints.push(grammarTips[0]!);
        }
      }

      // Optional enhancement: add gender hint if available
      if (gender) {
        hints.push(`Grammatical gender: ${gender}`);
      }

      // Determine if word needs special attention
      const needsAttention = difficulty === "advanced" || difficulty === "intermediate";

      return {
        learnerHints: {
          hints,
          priority: getPriority(difficulty),
          needsAttention,
        },
      };
    },
  };
}

/**
 * Pre-configured Learner Hints extension with default options
 *
 * Includes grammar tips and encouragement by default.
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import {
 *   PartOfSpeechExtension,
 *   DifficultyExtension,
 *   LearnerHintsExtension
 * } from "glost-extensions/extensions";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   PartOfSpeechExtension,
 *   DifficultyExtension,
 *   LearnerHintsExtension,
 * ]);
 * ```
 *
 * @since 0.0.2
 */
export const LearnerHintsExtension = createLearnerHintsExtension();
