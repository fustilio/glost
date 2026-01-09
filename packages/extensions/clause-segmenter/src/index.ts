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

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTNode, GLOSTRoot, GLOSTSentence, GLOSTWord } from "glost";

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
        const words = sentenceNode.children
          ?.filter((child) => child.type === "WordNode")
          .map((child) => {
            const word = child as GLOSTWord;
            // Get text from word node - check different possible locations
            const text = (word as any).text || "";
            return text;
          })
          .filter(Boolean) || [];

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
        // This is where the actual transformation would happen
        // For now, we'll return the sentence unchanged
        return {
          ...sentenceNode,
          children: sentenceNode.children,
        } as GLOSTNode;
      };

      const result = await processNode(tree);
      return result as GLOSTRoot;
    },

    options: options as unknown as Record<string, unknown>,
  };
}
