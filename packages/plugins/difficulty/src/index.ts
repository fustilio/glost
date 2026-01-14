/**
 * glost-difficulty
 * 
 * Language-agnostic difficulty assessment extension for GLOST.
 * 
 * @packageDocumentation
 */

// Export types
export type { DifficultyProvider, DifficultyLevel } from "./types.js";

// Export generator and enhancer functions
export { createDifficultyGeneratorExtension } from "./generator.js";
export { createDifficultyEnhancerExtension } from "./enhancer.js";

// Import for local use
import { createDifficultyGeneratorExtension } from "./generator.js";
import { createDifficultyEnhancerExtension } from "./enhancer.js";
import type { GlostLanguage } from "glost-common";

/**
 * Difficulty extension options
 */
export interface DifficultyExtensionOptions {
  /**
   * Target language for difficulty assessment
   */
  targetLanguage: GlostLanguage;

  /**
   * Provider for language-specific difficulty data
   */
  provider: import("./types.js").DifficultyProvider;

  /**
   * Skip words that already have difficulty data
   * @default false
   */
  skipExisting?: boolean;

  /**
   * Normalize difficulty levels to a common scale
   * @default true
   */
  normalize?: boolean;

  /**
   * Custom mapping for difficulty levels
   */
  customMapping?: Record<string, any>;
}

/**
 * Create difficulty extension (generator + enhancer)
 * 
 * Returns a tuple of [generator, enhancer] extensions.
 * 
 * @param options - Extension options
 * @returns Tuple of [generator, enhancer]
 */
export function createDifficultyExtension(options: DifficultyExtensionOptions) {
  const { targetLanguage, provider, skipExisting, normalize, customMapping } =
    options;

  const generator = createDifficultyGeneratorExtension({
    targetLanguage,
    provider,
    skipExisting,
  });

  const enhancer = createDifficultyEnhancerExtension({
    normalize,
    customMapping,
  });

  return [generator, enhancer] as const;
}
