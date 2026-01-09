/**
 * Clause Analysis Extension
 *
 * Analyzes clause structure for grammar learning applications.
 * Demonstrates extension stacking with node type requirements.
 *
 * @packageDocumentation
 */

import type { GLOSTRoot, GLOSTClause } from "glost";
import { visit } from "unist-util-visit";
import type { GLOSTExtension, ExtensionContext } from "../types.js";
import { ExtensionDependencyError } from "../errors.js";

/**
 * Clause type - matches the clauseType field of GLOSTClause
 */
type ClauseType = GLOSTClause["clauseType"];

/**
 * Clause analysis metadata structure
 *
 * @since 0.0.2
 */
export interface ClauseAnalysisMetadata {
  /** Number of words in the clause */
  wordCount: number;
  /** Whether the clause contains a verb */
  hasVerb: boolean;
  /** The type of clause */
  clauseType: ClauseType;
  /** Grammatical complexity score (1-5) */
  complexity: number;
  /** Description for learners */
  description: string;
}

/**
 * Options for the Clause Analysis extension
 *
 * @since 0.0.2
 */
export interface ClauseAnalysisOptions {
  /**
   * Include detailed descriptions for each clause type
   * Default: true
   */
  includeDescriptions?: boolean;

  /**
   * Language code for localized descriptions
   * Default: "en"
   */
  language?: string;
}

/**
 * Descriptions of clause types for learners
 */
const CLAUSE_DESCRIPTIONS: Record<ClauseType, string> = {
  main: "Main clause - the primary statement of the sentence",
  subordinate: "Subordinate clause - depends on the main clause for meaning",
  relative: "Relative clause - describes or identifies a noun",
  adverbial:
    "Adverbial clause - modifies the verb by expressing time, cause, or condition",
};

/**
 * Complexity scores for different clause types
 */
const CLAUSE_COMPLEXITY: Record<ClauseType, number> = {
  main: 1,
  subordinate: 3,
  relative: 4,
  adverbial: 3,
};

/**
 * Count words in a clause
 */
function countWords(clause: GLOSTClause): number {
  let count = 0;
  visit(clause, "WordNode", () => {
    count++;
  });
  return count;
}

/**
 * Check if clause contains a verb
 * This is a simple heuristic - a full implementation would use POS tagging
 */
function checkForVerb(clause: GLOSTClause): boolean {
  let hasVerb = false;

  visit(clause, "WordNode", (node: any) => {
    // Check if word has part-of-speech metadata indicating it's a verb
    const pos = node.extras?.partOfSpeech?.tag?.toLowerCase();
    if (pos && (pos === "verb" || pos.startsWith("vb") || pos.includes("verb"))) {
      hasVerb = true;
      return false; // Stop visiting
    }

    // Also check metadata.partOfSpeech for backwards compatibility
    const metaPos = node.extras?.metadata?.partOfSpeech?.toLowerCase();
    if (
      metaPos &&
      (metaPos === "verb" || metaPos.startsWith("vb") || metaPos.includes("verb"))
    ) {
      hasVerb = true;
      return false;
    }
  });

  return hasVerb;
}

/**
 * Calculate complexity based on clause structure
 */
function calculateComplexity(
  clause: GLOSTClause,
  wordCount: number,
  hasVerb: boolean,
): number {
  let complexity = CLAUSE_COMPLEXITY[clause.clauseType] ?? 2;

  // Add complexity for longer clauses
  if (wordCount > 10) complexity += 1;
  if (wordCount > 20) complexity += 1;

  // Clauses without verbs are often fragments (simpler or incomplete)
  if (!hasVerb) complexity = Math.max(1, complexity - 1);

  // Cap at 5
  return Math.min(5, complexity);
}

/**
 * Create a Clause Analysis extension
 *
 * This extension analyzes clause structure for grammar learning.
 * It requires the clause-segmenter extension to create ClauseNode
 * nodes first.
 *
 * **REQUIRES**: clause-segmenter extension to create ClauseNode nodes.
 *
 * @param options - Configuration options
 * @returns A configured GLOSTExtension
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import { createClauseAnalysisExtension } from "glost-extensions/extensions/clause-analysis";
 * import { createClauseSegmenterExtension } from "glost-clause-segmenter";
 * import { englishSegmenterProvider } from "glost-en/segmenter";
 *
 * const segmenter = createClauseSegmenterExtension({
 *   targetLanguage: "en",
 *   provider: englishSegmenterProvider,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   segmenter,
 *   createClauseAnalysisExtension({ includeDescriptions: true }),
 * ]);
 *
 * // Access clause analysis
 * // Clauses are children of SentenceNode after clause-segmenter runs
 * ```
 *
 * @since 0.0.2
 */
export function createClauseAnalysisExtension(
  options: ClauseAnalysisOptions = {},
): GLOSTExtension {
  const includeDescriptions = options.includeDescriptions ?? true;

  return {
    id: "clause-analysis",
    name: "Clause Analysis",
    description: "Analyzes clause structure for grammar learning",

    // Declare dependencies
    dependencies: ["clause-segmenter"],

    // Declare that we require ClauseNode nodes to exist
    requires: {
      nodes: ["ClauseNode"],
    },

    // Declare what we provide
    provides: {
      extras: ["clauseAnalysis"],
    },

    transform: (
      document: GLOSTRoot,
      context?: ExtensionContext,
    ): GLOSTRoot => {
      // Check if clause-segmenter ran by looking at context
      const segmenterRan =
        context?.appliedExtensions.includes("clause-segmenter");

      // Count ClauseNodes in the document
      let clauseCount = 0;
      visit(document, (node: any) => {
        if (node.type === "ClauseNode") {
          clauseCount++;
        }
      });

      // If no clauses found, check why and provide helpful error
      if (clauseCount === 0) {
        if (!segmenterRan) {
          throw new ExtensionDependencyError(
            "clause-analysis",
            "clause-segmenter",
            "ClauseNode nodes",
            "Clause segmenter (from glost-clause-segmenter) must run before ClauseAnalysisExtension. " +
              "Add clause segmenter extension to your extension list before ClauseAnalysisExtension.",
          );
        }

        // Segmenter ran but found no clauses - this is valid, just return unchanged
        // This might happen with very simple sentences or certain language structures
        console.warn(
          "[clause-analysis] No clauses found in document. " +
            "ClauseSegmenter may not have detected any clause boundaries in this text.",
        );
        return document;
      }

      // Analyze each clause
      visit(document, (node: any) => {
        if (node.type === "ClauseNode") {
          const clause = node as GLOSTClause;
          const wordCount = countWords(clause);
          const hasVerb = checkForVerb(clause);
          const complexity = calculateComplexity(clause, wordCount, hasVerb);

          const analysis: ClauseAnalysisMetadata = {
            wordCount,
            hasVerb,
            clauseType: clause.clauseType,
            complexity,
            description: includeDescriptions
              ? CLAUSE_DESCRIPTIONS[clause.clauseType] ?? "Unknown clause type"
              : "",
          };

          // Add analysis to clause extras
          clause.extras = {
            ...clause.extras,
            clauseAnalysis: analysis,
          };
        }
      });

      return document;
    },
  };
}

/**
 * Pre-configured Clause Analysis extension with default options
 *
 * Includes descriptions by default.
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 * import { ClauseAnalysisExtension } from "glost-extensions/extensions";
 * import { createClauseSegmenterExtension } from "glost-clause-segmenter";
 * import { englishSegmenterProvider } from "glost-en/segmenter";
 *
 * const segmenter = createClauseSegmenterExtension({
 *   targetLanguage: "en",
 *   provider: englishSegmenterProvider,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   segmenter,
 *   ClauseAnalysisExtension,
 * ]);
 * ```
 *
 * @since 0.0.2
 */
export const ClauseAnalysisExtension = createClauseAnalysisExtension();
