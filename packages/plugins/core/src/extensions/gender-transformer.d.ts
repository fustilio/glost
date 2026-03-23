/**
 * Gender Transformer Extension
 *
 * Transforms text containing {male|female} gender variant syntax,
 * replacing or annotating words based on the target gender.
 *
 * This is a TRANSFORMER (modifies AST structure) vs the gender generator
 * extension (from glost-gender) which is an ENRICHER (adds metadata only).
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "../types.js";
/**
 * Target gender type
 */
export type TargetGender = "male" | "female" | "both";
/**
 * Display format for gender variants
 */
export type GenderDisplayFormat = "replace" | "show-both" | "inline-toggle";
/**
 * Gender variant data stored in extras
 */
export interface GenderVariantData {
    /** Male form of the text */
    male: string;
    /** Female form of the text */
    female: string;
    /** Which gender was applied (if replaced) */
    appliedGender?: TargetGender;
    /** Display format to use */
    displayFormat?: GenderDisplayFormat;
    /** Original text with syntax intact */
    original: string;
}
/**
 * Gender transformer extension options
 */
export interface GenderTransformerOptions {
    /**
     * Target gender for replacement
     * - "male": Replace with male forms
     * - "female": Replace with female forms
     * - "both": Keep both forms with display annotation
     * @default "both"
     */
    targetGender?: TargetGender;
    /**
     * How to display gender variants
     * - "replace": Replace text with target gender form
     * - "show-both": Show both forms (e.g., "ครับ/ค่ะ")
     * - "inline-toggle": Mark for UI toggle rendering
     * @default "inline-toggle"
     */
    displayFormat?: GenderDisplayFormat;
    /**
     * Whether to process sentence-level text as well
     * @default true
     */
    processSentences?: boolean;
}
/**
 * Create Gender Transformer extension
 *
 * Creates a transformer extension that processes {male|female} gender
 * variant syntax in Thai text. Unlike the gender generator extension
 * from glost-gender (enricher), this transformer modifies the actual text content.
 *
 * @param options - Extension configuration options
 * @returns Configured gender transformer extension
 *
 * @example
 * ```typescript
 * import { createGenderTransformerExtension } from "glost-plugins/extensions";
 *
 * // Replace with male forms
 * const maleExt = createGenderTransformerExtension({
 *   targetGender: "male",
 *   displayFormat: "replace",
 * });
 *
 * // Keep both forms for toggling
 * const toggleExt = createGenderTransformerExtension({
 *   targetGender: "both",
 *   displayFormat: "inline-toggle",
 * });
 *
 * const result = processGLOSTWithExtensions(document, [maleExt]);
 *
 * // "ราคาเท่าไหร่{ครับ|คะ}" becomes "ราคาเท่าไหร่ครับ"
 * // with extras.genderVariants containing both forms
 * ```
 *
 * @see {@link GenderTransformerExtension} - Default extension
 *
 * @since 0.0.1
 */
export declare function createGenderTransformerExtension(options?: GenderTransformerOptions): GLOSTExtension;
/**
 * Default Gender Transformer extension
 *
 * Pre-configured transformer with default options (targetGender: "both",
 * displayFormat: "inline-toggle"). Use this for standard Thai gender
 * variant transformation, or create a custom extension with
 * `createGenderTransformerExtension()` for specific gender targeting.
 *
 * @example
 * ```typescript
 * import { GenderTransformerExtension } from "glost-plugins/extensions";
 * import { processGLOSTWithExtensions } from "glost-plugins/processor";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   GenderTransformerExtension,
 * ]);
 *
 * // Words with {male|female} syntax will be transformed and
 * // annotated with genderVariants in extras for UI toggling
 * ```
 *
 * @see {@link createGenderTransformerExtension} - Create custom extension
 *
 * @since 0.0.1
 */
export declare const GenderTransformerExtension: GLOSTExtension;
//# sourceMappingURL=gender-transformer.d.ts.map