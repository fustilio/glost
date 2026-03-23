/**
 * Negation Transformer Extension
 *
 * Transforms clauses or sentences by adding negation.
 * Requires clause segmenter (from glost-clause-segmenter) to run first for clause-level negation.
 *
 * Supports language-specific negation patterns:
 * - English: Adds "don't", "doesn't", "didn't" based on tense
 * - Thai: Adds "ไม่" before the main verb
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "../types.js";
import type { LanguageCode } from "glost-core";
/**
 * Negation type
 */
export type NegationType = "standard" | "emphatic";
/**
 * Negation transformer extension options
 */
export interface NegationTransformerOptions {
    /**
     * Language for negation rules
     * @default "en-US"
     */
    language?: LanguageCode;
    /**
     * Which clause index to negate (undefined = negate all main clauses)
     * @default undefined
     */
    clauseIndex?: number;
    /**
     * Type of negation
     * - "standard": Normal negation (not, ไม่)
     * - "emphatic": Strong negation (never, ไม่เคย)
     * @default "standard"
     */
    negationType?: NegationType;
    /**
     * Whether to negate only main clauses or all clauses
     * @default true (only main clauses)
     */
    mainClausesOnly?: boolean;
}
/**
 * Negation data stored in extras
 */
export interface NegationData {
    /** Whether this clause/sentence is negated */
    isNegated: boolean;
    /** The original (affirmative) text */
    originalForm?: string;
    /** The negation word(s) added */
    negationWord?: string;
    /** Type of negation applied */
    negationType?: NegationType;
}
/**
 * Create Negation Transformer extension
 *
 * Creates a transformer extension that negates clauses or sentences.
 * This extension REQUIRES clause segmenter (from glost-clause-segmenter)
 * to run first for clause-level negation.
 *
 * @param options - Extension configuration options
 * @returns Configured negation transformer extension
 *
 * @example
 * ```typescript
 * import { createNegationTransformerExtension } from "glost-plugins/extensions";
 * import { createClauseSegmenterExtension } from "glost-clause-segmenter";
 * import { englishSegmenterProvider } from "glost-en/segmenter";
 *
 * const segmenter = createClauseSegmenterExtension({
 *   targetLanguage: "en",
 *   provider: englishSegmenterProvider,
 * });
 *
 * // Negate all main clauses
 * const negationExt = createNegationTransformerExtension({
 *   language: "en-US",
 *   negationType: "standard",
 * });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   segmenter, // Must run first!
 *   negationExt,
 * ]);
 *
 * // "I like coffee" becomes "I don't like coffee"
 * ```
 *
 * @see {@link NegationTransformerExtension} - Default extension
 *
 * @since 0.0.1
 */
export declare function createNegationTransformerExtension(options?: NegationTransformerOptions): GLOSTExtension;
/**
 * Default Negation Transformer extension
 *
 * Pre-configured negation transformer with default options (English,
 * standard negation, main clauses only). Use this for standard
 * negation, or create a custom extension with
 * `createNegationTransformerExtension()` for specific options.
 *
 * **Important:** This extension requires clause segmenter (from glost-clause-segmenter)
 * to run first for clause-level negation.
 *
 * @example
 * ```typescript
 * import { NegationTransformerExtension } from "glost-plugins/extensions";
 * import { processGLOSTWithExtensions } from "glost-plugins/processor";
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
 *   NegationTransformerExtension,
 * ]);
 *
 * // Main clauses will be negated
 * ```
 *
 * @see {@link createNegationTransformerExtension} - Create custom extension
 *
 * @since 0.0.1
 */
export declare const NegationTransformerExtension: GLOSTExtension;
//# sourceMappingURL=negation-transformer.d.ts.map