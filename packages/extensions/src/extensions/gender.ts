/**
 * Gender Extension
 * 
 * Processes and enhances gender metadata.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "../types";
import type { GLOSTWord } from "@glost/core";

/**
 * Gender type
 * 
 * @since 0.0.1
 */
export type GenderType = "male" | "female" | "neuter" | "masculine" | "feminine";

/**
 * Gender metadata structure
 * 
 * @since 0.0.1
 */
export interface GenderMetadata {
  type: GenderType;
  display: string;
  color: string;
  abbreviation: string;
}

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
 * Gender extension options
 * 
 * @since 0.0.1
 */
export interface GenderExtensionOptions {
  /**
   * Whether to normalize gender values
   * @default true
   */
  normalize?: boolean;
}

/**
 * Create gender extension
 * 
 * @param options - Extension configuration options
 * @returns Configured gender extension
 * 
 * @since 0.0.1
 */
export function createGenderExtension(
  options: GenderExtensionOptions = {},
): GLOSTExtension {
  const { normalize = true } = options;

  return {
    id: "gender",
    name: "Gender",
    description: "Processes and enhances gender metadata",

    enhanceMetadata: (node: GLOSTWord) => {
      // Get gender from various possible locations
      const gender =
        node.extras?.gender ||
        (node.extras?.metadata as any)?.gender;

      if (!gender) {
        return;
      }

      const genderStr = String(gender);

      // Normalize gender value
      const normalizedGender = normalize
        ? normalizeGender(genderStr)
        : (genderStr as GenderType);

      // Build gender metadata
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
 * Default gender extension
 * 
 * @since 0.0.1
 */
export const GenderExtension = createGenderExtension();

