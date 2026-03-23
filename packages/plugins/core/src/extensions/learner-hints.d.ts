/**
 * Learner Hints Extension
 *
 * Generates contextual hints for language learners based on word metadata.
 * Demonstrates extension stacking with required and optional dependencies.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "../types.js";
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
 * import { processGLOSTWithExtensions } from "glost-plugins/processor";
 * import { createLearnerHintsExtension } from "glost-plugins/extensions/learner-hints";
 * import { createPOSExtension } from "glost-pos";
 * import { createDifficultyExtension } from "glost-difficulty";
 * import { createGenderExtension } from "glost-gender";
 *
 * // These extensions are now in separate packages
 * const [posGen, posEnh] = createPOSExtension({ targetLanguage: "en", provider });
 * const [diffGen, diffEnh] = createDifficultyExtension({ targetLanguage: "en", provider });
 * const [genderGen, genderEnh] = createGenderExtension({ targetLanguage: "en", provider });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   posGen, posEnh,
 *   diffGen, diffEnh,
 *   genderGen, genderEnh,  // Optional - enhances hints
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
export declare function createLearnerHintsExtension(options?: LearnerHintsOptions): GLOSTExtension;
/**
 * Pre-configured Learner Hints extension with default options
 *
 * Includes grammar tips and encouragement by default.
 *
 * @example
 * ```typescript
 * import { processGLOSTWithExtensions } from "glost-plugins/processor";
 * import { LearnerHintsExtension } from "glost-plugins/extensions";
 * import { createPOSExtension } from "glost-pos";
 * import { createDifficultyExtension } from "glost-difficulty";
 *
 * // These extensions are now in separate packages
 * const [posGen, posEnh] = createPOSExtension({ targetLanguage: "en", provider });
 * const [diffGen, diffEnh] = createDifficultyExtension({ targetLanguage: "en", provider });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   posGen, posEnh,
 *   diffGen, diffEnh,
 *   LearnerHintsExtension,
 * ]);
 * ```
 *
 * @since 0.0.2
 */
export declare const LearnerHintsExtension: GLOSTExtension;
//# sourceMappingURL=learner-hints.d.ts.map