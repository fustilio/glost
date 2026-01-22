/**
 * glost-clause-segmenter
 * 
 * Language-agnostic clause segmentation extension for GLOST.
 * 
 * This package provides the core segmentation logic. Language-specific
 * implementations should be provided via the ClauseSegmenterProvider interface.
 * 
 * Language-specific providers should be in:
 * - glost-en/segmenter (English)
 * - glost-th/segmenter (Thai)
 * - glost-ja/segmenter (Japanese)
 * etc.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-plugins";
import type { GLOSTNode, GLOSTRoot, GLOSTSentence, GLOSTWord, GLOSTClause, GLOSTPunctuation } from "glost";
import { getWordText, NODE_TYPES } from "glost";
import type { GlostLanguage } from "glost-common";

// Export types
export type {
  ClauseType,
  GrammaticalMood,
  ClauseBoundary,
  SegmentationResult,
  ClauseSegmenterProvider,
} from "./types.js";

// Import local types
import type { ClauseSegmenterProvider } from "./types.js";

/**
 * Clause segmenter extension options
 */
export interface ClauseSegmenterOptions {
  /**
   * Target language for segmentation
   */
  targetLanguage: GlostLanguage;

  /**
   * Provider for language-specific segmentation rules
   * 
   * Should be implemented by language packages:
   * - import { englishSegmenterProvider } from "glost-en/segmenter"
   * - import { thaiSegmenterProvider } from "glost-th/segmenter"
   */
  provider: ClauseSegmenterProvider;

  /**
   * Whether to include markers/conjunctions in clause nodes
   * @default true
   */
  includeMarkers?: boolean;
}

/**
 * Create clause segmenter extension
 * 
 * This extension transforms sentences into clause structures based on
 * language-specific markers provided by the segmenter provider.
 * 
 * @param options - Extension options including provider
 * @returns GLOST extension for clause segmentation
 * 
 * @example
 * ```typescript
 * import { createClauseSegmenterExtension } from "glost-clause-segmenter";
 * import { englishSegmenterProvider } from "glost-en/segmenter";
 * 
 * const segmenter = createClauseSegmenterExtension({
 *   targetLanguage: "en",
 *   provider: englishSegmenterProvider
 * });
 * 
 * const result = await processGLOSTWithExtensionsAsync(document, [segmenter]);
 * ```
 * 
 * @example
 * ```typescript
 * // Thai example
 * import { createClauseSegmenterExtension } from "glost-clause-segmenter";
 * import { thaiSegmenterProvider } from "glost-th/segmenter";
 * 
 * const segmenter = createClauseSegmenterExtension({
 *   targetLanguage: "th",
 *   provider: thaiSegmenterProvider
 * });
 * ```
 */
export function createClauseSegmenterExtension(
  options: ClauseSegmenterOptions,
): GLOSTExtension {
  const {
    targetLanguage,
    provider,
    includeMarkers = true,
  } = options;

  if (!provider) {
    throw new Error(
      "[Clause Segmenter] Provider is required. " +
      "Import from language package: " +
      "import { englishSegmenterProvider } from 'glost-en/segmenter'"
    );
  }

  return {
    id: "clause-segmenter",
    name: "Clause Segmenter",
    description: "Segments sentences into grammatical clauses",

    provides: {
      nodes: ["ClauseNode"],
    },

    transform: async (tree: GLOSTRoot): Promise<GLOSTRoot> => {
      // Process document sentences
      const processNode = async (node: GLOSTNode): Promise<GLOSTNode> => {
        // Only process sentence nodes
        if (node.type !== "SentenceNode") {
          // Recursively process children if node has them
          if ("children" in node && Array.isArray(node.children) && node.children.length > 0) {
            return {
              ...node,
              children: await Promise.all(
                node.children.map((child: GLOSTNode) => processNode(child))
              ),
            } as GLOSTNode;
          }
          return node;
        }

        // Extract words from sentence
        const sentenceNode = node as GLOSTSentence;
        const wordNodes = sentenceNode.children?.filter(
          (child) => child.type === NODE_TYPES.WORD
        ) as GLOSTWord[] || [];
        
        const words = wordNodes.map((word) => getWordText(word)).filter(Boolean);

        if (words.length === 0) {
          return node;
        }

        // Get segmentation from provider
        const segmentation = await provider.segmentSentence(
          words,
          targetLanguage
        );

        if (!segmentation || segmentation.boundaries.length === 0) {
          // No segmentation available, return unchanged
          return node;
        }

        // Apply segmentation to create clause nodes
        const sentenceChildren = sentenceNode.children || [];
        
        // Build word index map: which child index corresponds to which word index
        const wordIndexMap: number[] = [];
        sentenceChildren.forEach((child, index) => {
          if (child.type === NODE_TYPES.WORD) {
            wordIndexMap.push(index);
          }
        });

        // Sort boundaries by position
        const sortedBoundaries = [...segmentation.boundaries].sort(
          (a, b) => a.position - b.position
        );

        // Map clause types from boundary types to GLOST clause types
        const mapClauseType = (
          boundaryType: string
        ): "main" | "subordinate" | "relative" | "adverbial" => {
          switch (boundaryType) {
            case "main":
              return "main";
            case "relative":
              return "relative";
            case "causal":
            case "conditional":
            case "temporal":
              return "adverbial";
            case "complement":
            case "coordinate":
            case "subordinate":
            default:
              return "subordinate";
          }
        };

        // Create clauses from boundaries
        const clauses: GLOSTClause[] = [];
        let currentClauseStart = 0;

        // Process each boundary to create clauses
        for (const boundary of sortedBoundaries) {
          // Get the child index for this boundary position
          const boundaryChildIndex = wordIndexMap[boundary.position];
          
          if (boundaryChildIndex === undefined || boundaryChildIndex < currentClauseStart) {
            // Skip invalid or out-of-order boundaries
            continue;
          }

          // Determine where to split: include marker in new clause if includeMarker is true
          const splitIndex = includeMarkers && boundary.includeMarker
            ? boundaryChildIndex + 1
            : boundaryChildIndex;

          // Create clause from current start to split point
          const clauseChildren = sentenceChildren.slice(
            currentClauseStart,
            splitIndex
          );

          // Filter to only include words and punctuation (exclude whitespace and symbols)
          // Note: GLOSTClause children type only allows GLOSTPhrase | GLOSTWord | GLOSTPunctuation
          const filteredChildren: (GLOSTWord | GLOSTPunctuation)[] = clauseChildren.filter(
            (child): child is GLOSTWord | GLOSTPunctuation => {
              return (
                child.type === NODE_TYPES.WORD ||
                child.type === NODE_TYPES.PUNCTUATION
              );
            }
          );

          // Only create clause if it has content
          if (filteredChildren.length > 0) {
            // Determine clause type: first clause is main, others based on boundary
            const clauseType =
              clauses.length === 0
                ? "main"
                : mapClauseType(boundary.clauseType);

            const clause: GLOSTClause = {
              type: NODE_TYPES.CLAUSE as "ClauseNode",
              clauseType,
              children: filteredChildren, // GLOSTWord | GLOSTPunctuation is compatible with GLOSTClause children
              lang: sentenceNode.lang,
              script: sentenceNode.script,
              extras: segmentation.mood
                ? {
                    mood: segmentation.mood,
                  }
                : undefined,
            };

            clauses.push(clause);
          }

          // Update start position for next clause
          currentClauseStart = splitIndex;
        }

        // Add remaining children as final clause (if any)
        if (currentClauseStart < sentenceChildren.length) {
          const remainingChildren = sentenceChildren.slice(currentClauseStart);
          const filteredRemaining: (GLOSTWord | GLOSTPunctuation)[] = remainingChildren.filter(
            (child): child is GLOSTWord | GLOSTPunctuation => {
              return (
                child.type === NODE_TYPES.WORD ||
                child.type === NODE_TYPES.PUNCTUATION
              );
            }
          );
          
          if (filteredRemaining.length > 0) {
            const finalClause: GLOSTClause = {
              type: NODE_TYPES.CLAUSE as "ClauseNode",
              clauseType: clauses.length === 0 ? "main" : "subordinate",
              children: filteredRemaining,
              lang: sentenceNode.lang,
              script: sentenceNode.script,
            };
            clauses.push(finalClause);
          }
        }

        // If no clauses were created (shouldn't happen, but safety check)
        if (clauses.length === 0) {
          return node;
        }

        // Return sentence with clause children
        // Note: GLOSTSentence children can include GLOSTClause nodes
        return {
          ...sentenceNode,
          children: clauses as GLOSTClause[],
        } as GLOSTSentence;
      };

      const result = await processNode(tree);
      return result as GLOSTRoot;
    },

    options: options as unknown as Record<string, unknown>,
  };
}
