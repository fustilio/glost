/**
 * glost-frequency
 * 
 * Word frequency extension for GLOST - generates and formats frequency data.
 * 
 * This package provides both frequency generation (via providers) and
 * frequency enhancement (display formatting). It follows the pattern of
 * separating data generation from data presentation.
 * 
 * **Philosophy**: This package intentionally does NOT include fallback/heuristic
 * providers. No data is better than inaccurate data. You must provide a real
 * frequency provider based on corpus data or language-specific resources.
 * 
 * @packageDocumentation
 * 
 * @example
 * ```typescript
 * import {
 *   createFrequencyGeneratorExtension,
 *   createFrequencyEnhancerExtension
 * } from "glost-frequency";
 * import { createThaiFrequencyProvider } from "glost-th/extensions";
 * 
 * // Create provider from language package (with real corpus data)
 * const provider = createThaiFrequencyProvider({
 *   corpusData: thaiNationalCorpusFrequencies
 * });
 * 
 * // Create extensions
 * const generator = createFrequencyGeneratorExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * const enhancer = createFrequencyEnhancerExtension();
 * 
 * // Process document
 * const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
 * ```
 */

// Export types
export type { FrequencyLevel, FrequencyMetadata, FrequencyProvider } from "./types";

// Export generator
export {
  createFrequencyGeneratorExtension,
  type FrequencyGeneratorOptions,
} from "./generator";

// Export enhancer
export {
  createFrequencyEnhancerExtension,
  FrequencyEnhancerExtension,
  type FrequencyEnhancerOptions,
} from "./enhancer";

// Import for local use
import { createFrequencyGeneratorExtension } from "./generator";
import { createFrequencyEnhancerExtension } from "./enhancer";

import type { GlostLanguage } from "glost-common";

/**
 * Create a complete frequency extension pipeline
 * 
 * Convenience function that creates both generator and enhancer extensions
 * configured to work together.
 * 
 * **Note**: You MUST provide a real provider. This package intentionally does NOT
 * include fallback/heuristic providers because inaccurate data is worse than no data.
 * 
 * @param options - Configuration options
 * @returns Array of [generator, enhancer] extensions
 * 
 * @example
 * ```typescript
 * import { createFrequencyExtension } from "glost-frequency";
 * import { createThaiFrequencyProvider } from "glost-th/extensions";
 * 
 * const provider = createThaiFrequencyProvider(datasource);
 * const [generator, enhancer] = createFrequencyExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * 
 * const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
 * ```
 */
export function createFrequencyExtension(options: {
  targetLanguage: GlostLanguage;
  provider?: any;
  skipExisting?: boolean;
  normalize?: boolean;
  customMapping?: Record<string, any>;
}) {
  const { targetLanguage, provider, skipExisting, normalize, customMapping } = options;
  
  const generator = createFrequencyGeneratorExtension({
    targetLanguage,
    provider,
    skipExisting,
  });
  
  const enhancer = createFrequencyEnhancerExtension({
    normalize,
    customMapping,
  });
  
  return [generator, enhancer];
}
