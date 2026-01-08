/**
 * Frequency Extension
 * 
 * Processes and enhances word frequency metadata.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "../types";
import type { GLOSTWord } from "glost";

/**
 * Frequency level type
 * 
 * Represents the frequency of word usage in common language.
 * 
 * @example
 * ```typescript
 * const level: FrequencyLevel = "common";
 * ```
 * 
 * @since 0.0.1
 */
export type FrequencyLevel = "rare" | "uncommon" | "common" | "very-common";

/**
 * Frequency metadata structure
 * 
 * Enhanced metadata structure for word frequency, including display
 * information and UI properties.
 * 
 * @example
 * ```typescript
 * const metadata: FrequencyMetadata = {
 *   level: "common",
 *   display: "Common",
 *   color: "blue",
 *   priority: 3
 * };
 * ```
 * 
 * @since 0.0.1
 */
export interface FrequencyMetadata {
  /** Frequency level */
  level: FrequencyLevel;
  /** Human-readable display text */
  display: string;
  /** Color identifier for UI styling */
  color: string;
  /** Priority number for sorting (1-4) */
  priority: number;
}

/**
 * Get frequency display text
 * 
 * Converts a frequency level to human-readable text.
 * 
 * @param level - The frequency level
 * @returns Display text for the frequency level
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
 * Returns a color identifier for UI styling based on frequency level.
 * 
 * @param level - The frequency level
 * @returns Color identifier (gray, yellow, blue, green)
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
 * Returns a numeric priority for sorting frequency levels.
 * Higher numbers indicate more common words.
 * 
 * @param level - The frequency level
 * @returns Priority number (1-4)
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
 * Frequency extension options
 * 
 * Configuration options for the frequency extension.
 * 
 * @example
 * ```typescript
 * const options: FrequencyExtensionOptions = {
 *   normalize: true,
 *   customMapping: {
 *     "word1": "common",
 *     "word2": "rare"
 *   }
 * };
 * ```
 * 
 * @since 0.0.1
 */
export interface FrequencyExtensionOptions {
  /**
   * Whether to normalize frequency values
   * 
   * When `true`, attempts to normalize frequency strings to standard
   * frequency levels (e.g., "very common" → "very-common").
   * 
   * @default true
   */
  normalize?: boolean;

  /**
   * Custom frequency mapping
   * 
   * Maps specific words to frequency levels. Takes precedence over
   * metadata-based frequency detection.
   * 
   * @example
   * ```typescript
   * customMapping: {
   *   "สวัสดี": "very-common",
   *   "คำศัพท์": "common"
   * }
   * ```
   */
  customMapping?: Record<string, FrequencyLevel>;
}

/**
 * Create frequency extension
 * 
 * Creates a frequency extension with custom options. The extension
 * processes word frequency metadata and enhances it with display
 * information and UI properties.
 * 
 * @param options - Extension configuration options
 * @returns Configured frequency extension
 * 
 * @example
 * ```typescript
 * import { createFrequencyExtension } from "glost-extensions/extensions";
 * 
 * const customExtension = createFrequencyExtension({
 *   normalize: true,
 *   customMapping: {
 *     "word1": "common"
 *   }
 * });
 * 
 * const result = processGLOSTWithExtensions(document, [customExtension]);
 * ```
 * 
 * @see {@link FrequencyExtension} - Default frequency extension
 * 
 * @since 0.0.1
 */
export function createFrequencyExtension(
  options: FrequencyExtensionOptions = {},
): GLOSTExtension {
  const { normalize = true, customMapping } = options;

  return {
    id: "frequency",
    name: "Word Frequency",
    description: "Processes and enhances word frequency metadata",

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
        if (freqStr === "rare" || freqStr === "uncommon" || freqStr === "common" || freqStr === "very-common") {
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
 * Default frequency extension
 * 
 * Pre-configured frequency extension with default options.
 * Use this for standard frequency processing, or create a custom
 * extension with `createFrequencyExtension()` for advanced use cases.
 * 
 * @example
 * ```typescript
 * import { FrequencyExtension } from "glost-extensions/extensions";
 * 
 * const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
 * ```
 * 
 * @see {@link createFrequencyExtension} - Create custom frequency extension
 * 
 * @since 0.0.1
 */
export const FrequencyExtension = createFrequencyExtension();

