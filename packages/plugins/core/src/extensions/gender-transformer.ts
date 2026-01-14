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
import type { GLOSTRoot, GLOSTWord, GLOSTSentence } from "glost-core";
import { visit } from "unist-util-visit";
import { getWordText } from "glost-core";

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
 * Regular expression to match gender variant syntax: {male|female}
 */
const GENDER_VARIANT_REGEX = /\{([^|]+)\|([^}]+)\}/g;

/**
 * Check if text contains gender variant syntax
 */
function hasGenderVariants(text: string): boolean {
  return GENDER_VARIANT_REGEX.test(text);
}

/**
 * Extract gender variant from text
 */
function extractGenderVariant(text: string, gender: "male" | "female"): string {
  return text.replace(
    GENDER_VARIANT_REGEX,
    (_, maleForm: string, femaleForm: string) =>
      gender === "male" ? maleForm : femaleForm
  );
}

/**
 * Parse all gender variants from text
 */
function parseGenderVariants(
  text: string
): Array<{ match: string; male: string; female: string; start: number; end: number }> {
  const variants: Array<{
    match: string;
    male: string;
    female: string;
    start: number;
    end: number;
  }> = [];

  const regex = new RegExp(GENDER_VARIANT_REGEX.source, "g");
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    variants.push({
      match: match[0],
      male: match[1] ?? "",
      female: match[2] ?? "",
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return variants;
}

/**
 * Format text for "show-both" display
 */
function formatShowBoth(male: string, female: string): string {
  return `${male}/${female}`;
}

/**
 * Transform word with gender variants
 */
function transformWord(
  word: GLOSTWord,
  options: Required<GenderTransformerOptions>
): GLOSTWord | null {
  const text = getWordText(word);
  if (!text || !hasGenderVariants(text)) {
    return null;
  }

  const variants = parseGenderVariants(text);
  if (variants.length === 0) {
    return null;
  }

  // Build gender variant data
  const genderData: GenderVariantData = {
    male: extractGenderVariant(text, "male"),
    female: extractGenderVariant(text, "female"),
    original: text,
    appliedGender: options.targetGender,
    displayFormat: options.displayFormat,
  };

  // Determine new text content
  let newText: string;
  switch (options.targetGender) {
    case "male":
      newText = genderData.male;
      break;
    case "female":
      newText = genderData.female;
      break;
    case "both":
      if (options.displayFormat === "show-both") {
        // Replace each variant with "male/female" format
        newText = text.replace(
          GENDER_VARIANT_REGEX,
          (_, maleForm: string, femaleForm: string) =>
            formatShowBoth(maleForm, femaleForm)
        );
      } else {
        // For inline-toggle, use male form as default display
        newText = genderData.male;
      }
      break;
    default:
      newText = text;
  }

  // Update word children (TextNode)
  const updatedChildren = word.children.map((child) => {
    if (child.type === "TextNode") {
      return {
        ...child,
        value: newText,
      };
    }
    return child;
  });

  return {
    ...word,
    children: updatedChildren,
    extras: {
      ...word.extras,
      genderVariants: genderData,
    },
  };
}

/**
 * Transform sentence with gender variants (in originalText)
 */
function transformSentence(
  sentence: GLOSTSentence,
  options: Required<GenderTransformerOptions>
): GLOSTSentence | null {
  const text = sentence.originalText;
  if (!text || !hasGenderVariants(text)) {
    return null;
  }

  const genderData: GenderVariantData = {
    male: extractGenderVariant(text, "male"),
    female: extractGenderVariant(text, "female"),
    original: text,
    appliedGender: options.targetGender,
    displayFormat: options.displayFormat,
  };

  // Determine new originalText
  let newText: string;
  switch (options.targetGender) {
    case "male":
      newText = genderData.male;
      break;
    case "female":
      newText = genderData.female;
      break;
    case "both":
      if (options.displayFormat === "show-both") {
        newText = text.replace(
          GENDER_VARIANT_REGEX,
          (_, maleForm: string, femaleForm: string) =>
            formatShowBoth(maleForm, femaleForm)
        );
      } else {
        newText = genderData.male;
      }
      break;
    default:
      newText = text;
  }

  return {
    ...sentence,
    originalText: newText,
    extras: {
      ...sentence.extras,
      genderVariants: genderData,
    },
  };
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
export function createGenderTransformerExtension(
  options: GenderTransformerOptions = {}
): GLOSTExtension {
  const {
    targetGender = "both",
    displayFormat = "inline-toggle",
    processSentences = true,
  } = options;

  const resolvedOptions: Required<GenderTransformerOptions> = {
    targetGender,
    displayFormat,
    processSentences,
  };

  return {
    id: "gender-transformer",
    name: "Gender Transformer",
    description:
      "Transforms {male|female} gender variant syntax in Thai text",

    transform: (document: GLOSTRoot) => {
      // Transform words with gender variants
      visit(document, "WordNode", (node: any) => {
        const word = node as GLOSTWord;
        const transformed = transformWord(word, resolvedOptions);
        if (transformed) {
          Object.assign(node, transformed);
        }
      });

      // Transform sentences if enabled
      if (processSentences) {
        visit(document, "SentenceNode", (node: any) => {
          const sentence = node as GLOSTSentence;
          const transformed = transformSentence(sentence, resolvedOptions);
          if (transformed) {
            Object.assign(node, transformed);
          }
        });
      }

      return document;
    },
  };
}

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
export const GenderTransformerExtension = createGenderTransformerExtension();
