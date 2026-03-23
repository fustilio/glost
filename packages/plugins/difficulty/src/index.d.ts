/**
 * glost-difficulty
 *
 * Language-agnostic difficulty assessment extension for GLOST.
 *
 * @packageDocumentation
 */
export type { DifficultyProvider, DifficultyLevel } from "./types.js";
export { createDifficultyGeneratorExtension } from "./generator.js";
export { createDifficultyEnhancerExtension } from "./enhancer.js";
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
export declare function createDifficultyExtension(options: DifficultyExtensionOptions): readonly [GLOSTExtension, GLOSTExtension];
//# sourceMappingURL=index.d.ts.map