/**
 * Frequency Enhancer Extension
 * 
 * Formats and enhances existing frequency data with display properties.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import type { FrequencyLevel, FrequencyMetadata } from "./types.js";

/**
 * Get frequency display text
 * 
 * @internal
 */
function getFrequencyDisplay(level: FrequencyLevel): string {
  const displays: Record<FrequencyLevel, string> = {
    rare: "Rare",
    uncommon: "Uncommon",
    common: "Common",
    "very-common": "Very Common",
  };
  return displays[level] || level;
}

/**
 * Get frequency color (for UI)
 * 
 * @internal
 */
function getFrequencyColor(level: FrequencyLevel): string {
  const colors: Record<FrequencyLevel, string> = {
    rare: "gray",
    uncommon: "yellow",
    common: "blue",
    "very-common": "green",
  };
  return colors[level] || "gray";
}

/**
 * Get frequency priority (for sorting)
 * 
 * @internal
 */
function getFrequencyPriority(level: FrequencyLevel): number {
  const priorities: Record<FrequencyLevel, number> = {
    rare: 1,
    uncommon: 2,
    common: 3,
    "very-common": 4,
  };
  return priorities[level] || 0;
}

/**
 * Frequency enhancer extension options
 */
export interface FrequencyEnhancerOptions {
  /**
   * Whether to normalize frequency values
   * @default true
   */
  normalize?: boolean;

  /**
   * Custom frequency mapping (word → frequency level)
   * Takes precedence over metadata-based frequency detection.
   */
  customMapping?: Record<string, FrequencyLevel>;
}

/**
 * Create frequency enhancer extension
 * 
 * This extension processes existing frequency metadata and enhances it
 * with display information and UI properties (colors, labels, priorities).
 * It should run after the frequency generator extension.
 * 
 * @param options - Extension configuration options
 * @returns Configured frequency enhancer extension
 * 
 * @example
 * ```typescript
 * import { createFrequencyEnhancerExtension } from "glost-frequency";
 * 
 * const enhancer = createFrequencyEnhancerExtension({
 *   normalize: true,
 *   customMapping: { "hello": "very-common" }
 * });
 * 
 * const result = processGLOSTWithExtensions(document, [enhancer]);
 * ```
 */
export function createFrequencyEnhancerExtension(
  options: FrequencyEnhancerOptions = {},
): GLOSTExtension {
  const { normalize = true, customMapping } = options;

  return {
    id: "frequency-enhancer",
    name: "Frequency Enhancer",
    description: "Enhances word frequency metadata with display properties",

    dependencies: ["frequency-generator"],

    provides: {
      extras: ["frequency"],
    },

    enhanceMetadata: (node: GLOSTWord) => {
      // Get frequency from various possible locations
      const frequency =
        node.extras?.metadata?.frequency ||
        node.extras?.frequency ||
        (customMapping && node.children[0]?.type === "TextNode"
          ? customMapping[node.children[0].value]
          : undefined);

      if (!frequency) {
        return;
      }

      // Normalize frequency value
      let normalizedFrequency: FrequencyLevel;
      if (normalize) {
        const freqStr = String(frequency).toLowerCase();
        // Check for exact matches first
        if (
          freqStr === "rare" ||
          freqStr === "uncommon" ||
          freqStr === "common" ||
          freqStr === "very-common"
        ) {
          normalizedFrequency = freqStr as FrequencyLevel;
        } else if (freqStr.includes("very") || freqStr.includes("most")) {
          normalizedFrequency = "very-common";
        } else if (freqStr.includes("uncommon")) {
          normalizedFrequency = "uncommon";
        } else if (freqStr.includes("rare")) {
          normalizedFrequency = "rare";
        } else if (freqStr.includes("common") || freqStr.includes("frequent")) {
          normalizedFrequency = "common";
        } else {
          // Try to match exact value
          normalizedFrequency = freqStr as FrequencyLevel;
        }
      } else {
        normalizedFrequency = frequency as FrequencyLevel;
      }

      // Validate frequency level
      const validLevels: FrequencyLevel[] = [
        "rare",
        "uncommon",
        "common",
        "very-common",
      ];
      if (!validLevels.includes(normalizedFrequency)) {
        return;
      }

      // Build frequency metadata
      const frequencyMetadata: FrequencyMetadata = {
        level: normalizedFrequency,
        display: getFrequencyDisplay(normalizedFrequency),
        color: getFrequencyColor(normalizedFrequency),
        priority: getFrequencyPriority(normalizedFrequency),
      };

      return {
        frequency: frequencyMetadata,
      };
    },
  };
}

/**
 * Default frequency enhancer extension
 * 
 * Pre-configured frequency enhancer with default options.
 */
export const FrequencyEnhancerExtension = createFrequencyEnhancerExtension();
