/**
 * Thai Frequency Extension
 * 
 * Combines glost-frequency framework with Thai frequency data.
 * This demonstrates the X * Y pattern: glost-th + glost-frequency.
 */

import {
  createFrequencyExtension,
  type FrequencyProvider,
  type FrequencyLevel,
} from "glost-frequency";
import { getThaiFrequency } from "../demo-data/frequency-data.js";

/**
 * Thai frequency provider implementation
 * 
 * Provides frequency levels based on corpus data:
 * - very-common: top 1000 words
 * - common: top 5000 words
 * - uncommon: top 20000 words
 * - rare: beyond 20000
 */
export const thaiFrequencyProvider: FrequencyProvider = {
  async getFrequency(
    word: string,
    language: string
  ): Promise<FrequencyLevel | undefined> {
    // Only handle Thai words
    if (language !== "th" && language !== "th-TH") {
      return undefined;
    }

    // Look up frequency from demo data
    return getThaiFrequency(word);
  },
};

/**
 * Create Thai frequency extension
 * 
 * Pre-configured extension for Thai word frequency analysis.
 * Returns both generator and enhancer extensions as a tuple.
 * 
 * @returns Tuple of [generator, enhancer] extensions
 * 
 * @example
 * ```typescript
 * import { createThaiFrequencyExtension } from "./extensions/thai-frequency";
 * import { processGLOSTWithExtensionsAsync } from "glost-extensions";
 * 
 * const [generator, enhancer] = createThaiFrequencyExtension();
 * const result = await processGLOSTWithExtensionsAsync(document, [generator, enhancer]);
 * ```
 */
export function createThaiFrequencyExtension() {
  return createFrequencyExtension({
    targetLanguage: "th",
    provider: thaiFrequencyProvider,
  });
}
