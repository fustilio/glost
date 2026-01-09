/**
 * glost-gender
 * 
 * Grammatical gender extension for GLOST - generates and formats gender data.
 * 
 * @packageDocumentation
 */

// Export types
export type { GenderType, GenderMetadata, GenderProvider } from "./types";

// Export generator
export {
  createGenderGeneratorExtension,
  type GenderGeneratorOptions,
} from "./generator";

// Export enhancer
export {
  createGenderEnhancerExtension,
  GenderEnhancerExtension,
  type GenderEnhancerOptions,
} from "./enhancer";

// Import for local use
import { createGenderGeneratorExtension } from "./generator";
import { createGenderEnhancerExtension } from "./enhancer";
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
