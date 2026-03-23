/**
 * Clause Analysis Extension
 *
 * Analyzes clause structure for grammar learning applications.
 * Demonstrates extension stacking with node type requirements.
 *
 * @packageDocumentation
 */
import type { GLOSTClause } from "glost-core";
import type { GLOSTExtension } from "../types.js";
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
export declare function createClauseAnalysisExtension(options?: ClauseAnalysisOptions): GLOSTExtension;
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
export declare const ClauseAnalysisExtension: GLOSTExtension;
export {};
//# sourceMappingURL=clause-analysis.d.ts.map