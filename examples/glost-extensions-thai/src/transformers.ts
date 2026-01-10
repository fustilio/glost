/**
 * Thai-specific Transformer Extensions
 *
 * Pre-configured transformer extensions optimized for Thai language learning.
 * Leverages the base extensions from glost-extensions with Thai-specific
 * configurations.
 *
 * @packageDocumentation
 */

import {
  createGenderTransformerExtension,
  createNegationTransformerExtension,
  type GenderTransformerOptions,
  type NegationTransformerOptions,
  type GLOSTExtension,
} from "glost-extensions";

// Note: createClauseSegmenterExtension has moved to glost-clause-segmenter package
// and has a different API. Commenting out until we can properly implement it.
// import { createClauseSegmenterExtension, type ClauseSegmenterOptions } from "glost-clause-segmenter";

import {
  createThaiSyllableSegmenterExtension,
  type ThaiSyllableSegmenterOptions,
} from "./syllable-segmenter";

// ============================================================================
// Thai Syllable Segmenter (pre-configured)
// ============================================================================

/**
 * Options for Thai syllable segmentation
 */
export interface ThaiSyllableOptions
  extends Partial<ThaiSyllableSegmenterOptions> {
  /**
   * Whether to include detailed character breakdown
   * @default true for learning mode, false for compact mode
   */
  detailedBreakdown?: boolean;
}

/**
 * Create Thai syllable segmenter optimized for learning
 *
 * Pre-configured to include full phonological structure and
 * character-level breakdown for language learners.
 *
 * @param options - Configuration options
 * @returns Configured Thai syllable segmenter
 *
 * @example
 * ```typescript
 * import { createThaiSyllableSegmenter } from "glost-extensions-thai";
 *
 * const extension = createThaiSyllableSegmenter();
 *
 * // Word("สวัสดี") transforms to:
 * // Word: [
 * //   Syllable("ส-ะ"),   // with tone, characters
 * //   Syllable("ว-ั-ส"), // with tone, characters
 * //   Syllable("ด-ี")    // with tone, characters
 * // ]
 * ```
 */
export function createThaiSyllableSegmenter(
  options: ThaiSyllableOptions = {}
): GLOSTExtension {
  const { detailedBreakdown = true, ...rest } = options;

  return createThaiSyllableSegmenterExtension({
    segmentAllThai: true,
    includeCharacters: detailedBreakdown,
    computeTones: true,
    ...rest,
  });
}

/**
 * Pre-configured Thai syllable segmenter for learning
 */
export const ThaiSyllableSegmenter = createThaiSyllableSegmenter();

// ============================================================================
// Thai Gender Transformer (pre-configured)
// ============================================================================

/**
 * Options for Thai gender transformation
 */
export interface ThaiGenderOptions extends Partial<GenderTransformerOptions> {
  /**
   * Which gender perspective to use
   * @default "both" for showing toggle UI
   */
  perspective?: "male" | "female" | "both";
}

/**
 * Create Thai gender transformer for polite particles
 *
 * Handles Thai gender-specific particles like ครับ/ค่ะ/คะ
 * and pronouns like ผม/ดิฉัน.
 *
 * @param options - Configuration options
 * @returns Configured Thai gender transformer
 *
 * @example
 * ```typescript
 * import { createThaiGenderTransformer } from "glost-extensions-thai";
 *
 * // For male speaker
 * const maleExt = createThaiGenderTransformer({ perspective: "male" });
 *
 * // "ราคาเท่าไหร่{ครับ|คะ}" → "ราคาเท่าไหร่ครับ"
 *
 * // For toggling in UI
 * const toggleExt = createThaiGenderTransformer({ perspective: "both" });
 * ```
 */
export function createThaiGenderTransformer(
  options: ThaiGenderOptions = {}
): GLOSTExtension {
  const { perspective = "both", ...rest } = options;

  return createGenderTransformerExtension({
    targetGender: perspective,
    displayFormat: perspective === "both" ? "inline-toggle" : "replace",
    processSentences: true,
    ...rest,
  });
}

/**
 * Pre-configured Thai gender transformer (toggle mode)
 */
export const ThaiGenderTransformer = createThaiGenderTransformer();

// ============================================================================
// Thai Clause Segmenter (pre-configured)
// ============================================================================

/**
 * Create Thai clause segmenter
 *
 * **Note**: Clause segmenter is currently disabled due to API changes.
 * The createClauseSegmenterExtension function has moved to the glost-clause-segmenter
 * package and requires a provider-based API that needs to be implemented.
 *
 * Segments Thai sentences into clauses using Thai-specific
 * subordinating conjunctions and particles.
 *
 * @param options - Configuration options
 * @returns Configured Thai clause segmenter
 *
 * @example
 * ```typescript
 * import { createThaiClauseSegmenter } from "glost-extensions-thai";
 *
 * const extension = createThaiClauseSegmenter();
 *
 * // "ผมคิดว่าคุณถูก" segments into:
 * // Clause(main): ["ผม", "คิด"]
 * // Clause(subordinate): ["ว่า", "คุณ", "ถูก"]
 * ```
 */
export function createThaiClauseSegmenter(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: Record<string, unknown> = {}
): GLOSTExtension {
  // TODO: Implement using glost-clause-segmenter provider API
  // See: https://www.npmjs.com/package/glost-clause-segmenter
  throw new Error(
    "Thai clause segmenter is not yet implemented. " +
      "The API has changed to require a provider-based implementation."
  );
}

/**
 * Pre-configured Thai clause segmenter
 *
 * **Note**: Currently throws an error. Will be implemented in a future version.
 */
export const ThaiClauseSegmenter: GLOSTExtension = {
  id: "thai-clause-segmenter-placeholder",
  name: "Thai Clause Segmenter (Not Implemented)",
  description: "Placeholder for Thai clause segmenter",
  transform: () => {
    throw new Error(
      "Thai clause segmenter is not yet implemented. " +
        "The API has changed to require a provider-based implementation."
    );
  },
};

// ============================================================================
// Thai Negation Transformer (pre-configured)
// ============================================================================

/**
 * Options for Thai negation
 */
export interface ThaiNegationOptions
  extends Partial<NegationTransformerOptions> {
  /**
   * Style of negation
   * - "simple": ไม่ (not)
   * - "emphatic": ไม่เคย (never)
   * - "past": ไม่ได้ (didn't)
   * @default "simple"
   */
  style?: "simple" | "emphatic" | "past";
}

/**
 * Create Thai negation transformer
 *
 * Adds Thai negation words (ไม่, ไม่เคย, ไม่ได้) to clauses.
 * Requires ThaiClauseSegmenter to run first for clause-level negation.
 *
 * @param options - Configuration options
 * @returns Configured Thai negation transformer
 *
 * @example
 * ```typescript
 * import {
 *   createThaiClauseSegmenter,
 *   createThaiNegationTransformer
 * } from "glost-extensions-thai";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   createThaiClauseSegmenter(),
 *   createThaiNegationTransformer(),
 * ]);
 *
 * // "ผมชอบกาแฟ" → "ผมไม่ชอบกาแฟ"
 * ```
 */
export function createThaiNegationTransformer(
  options: ThaiNegationOptions = {}
): GLOSTExtension {
  const { style = "simple", ...rest } = options;

  return createNegationTransformerExtension({
    language: "th-TH",
    negationType: style === "emphatic" ? "emphatic" : "standard",
    mainClausesOnly: true,
    ...rest,
  });
}

/**
 * Pre-configured Thai negation transformer
 */
export const ThaiNegationTransformer = createThaiNegationTransformer();
