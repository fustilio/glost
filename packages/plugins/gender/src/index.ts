/**
 * glost-gender
 * 
 * Grammatical gender extension for GLOST - generates and formats gender data.
 * 
 * @packageDocumentation
 */

// Export types
export type { GenderType, GenderMetadata, GenderProvider } from "./types.js";

// Export generator
export {
  createGenderGeneratorExtension,
  type GenderGeneratorOptions,
} from "./generator.js";

// Export enhancer
export {
  createGenderEnhancerExtension,
  GenderEnhancerExtension,
  type GenderEnhancerOptions,
} from "./enhancer.js";

// Import for local use
import { createGenderGeneratorExtension } from "./generator.js";
import { createGenderEnhancerExtension } from "./enhancer.js";
import type { GlostLanguage } from "glost-common";

/**
 * Create a complete gender extension pipeline
 */
export function createGenderExtension(options: {
  targetLanguage: GlostLanguage;
  provider?: any;
  skipExisting?: boolean;
  normalize?: boolean;
}) {
  const { targetLanguage, provider, skipExisting, normalize } = options;

  const generator = createGenderGeneratorExtension({
    targetLanguage,
    provider,
    skipExisting,
  });

  const enhancer = createGenderEnhancerExtension({
    normalize,
  });

  return [generator, enhancer];
}
