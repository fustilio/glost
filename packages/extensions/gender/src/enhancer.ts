/**
 * Gender Enhancer Extension
 * 
 * Formats and enhances existing gender data with display properties.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import type { GenderType, GenderMetadata } from "./types";

/**
 * Normalize gender value
 * 
 * @internal
 */
function normalizeGender(gender: string): GenderType {
  const normalized = gender.toLowerCase().trim();

  if (normalized.startsWith("m") || normalized === "masculine") {
    return "male";
  }
  if (normalized.startsWith("f") || normalized === "feminine") {
    return "female";
  }
  if (normalized.startsWith("n") || normalized === "neuter") {
    return "neuter";
  }

  return normalized as GenderType;
}

/**
 * Get gender display text
 * 
 * @internal
 */
function getGenderDisplay(type: GenderType): string {
  const displays: Record<GenderType, string> = {
    male: "Masculine",
    female: "Feminine",
    neuter: "Neuter",
    masculine: "Masculine",
    feminine: "Feminine",
  };
  return displays[type] || type;
}

/**
 * Get gender color (for UI)
 * 
 * @internal
 */
function getGenderColor(type: GenderType): string {
  if (type === "male" || type === "masculine") {
    return "blue";
  }
  if (type === "female" || type === "feminine") {
    return "pink";
  }
  return "gray";
}

/**
 * Get gender abbreviation
 * 
 * @internal
 */
function getGenderAbbreviation(type: GenderType): string {
  const abbreviations: Record<GenderType, string> = {
    male: "Masc",
    female: "Fem",
    neuter: "Neut",
    masculine: "Masc",
    feminine: "Fem",
  };
  return abbreviations[type] || type.substring(0, 4);
}

/**
 * Gender enhancer extension options
 */
export interface GenderEnhancerOptions {
  /**
   * Whether to normalize gender values
   * @default true
   */
  normalize?: boolean;
}

/**
 * Create gender enhancer extension
 */
export function createGenderEnhancerExtension(
  options: GenderEnhancerOptions = {},
): GLOSTExtension {
  const { normalize = true } = options;

  return {
    id: "gender-enhancer",
    name: "Gender Enhancer",
    description: "Enhances gender metadata with display properties",

    dependencies: ["gender-generator"],

    provides: {
      extras: ["gender"],
    },

    enhanceMetadata: (node: GLOSTWord) => {
      const gender =
        node.extras?.gender ||
        (node.extras?.metadata as any)?.gender;

      if (!gender) {
        return;
      }

      const genderStr = String(gender);

      const normalizedGender = normalize
        ? normalizeGender(genderStr)
        : (genderStr as GenderType);

      const genderMetadata: GenderMetadata = {
        type: normalizedGender,
        display: getGenderDisplay(normalizedGender),
        color: getGenderColor(normalizedGender),
        abbreviation: getGenderAbbreviation(normalizedGender),
      };

      return {
        gender: genderMetadata,
      };
    },
  };
}

/**
 * Default gender enhancer extension
 */
export const GenderEnhancerExtension = createGenderEnhancerExtension();
