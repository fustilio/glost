/**
 * glost-gender
 *
 * Grammatical gender extension for GLOST - generates and formats gender data.
 *
 * @packageDocumentation
 */
export type { GenderType, GenderMetadata, GenderProvider } from "./types.js";
export { createGenderGeneratorExtension, type GenderGeneratorOptions, } from "./generator.js";
export { createGenderEnhancerExtension, GenderEnhancerExtension, type GenderEnhancerOptions, } from "./enhancer.js";
import type { GlostLanguage } from "glost-common";
/**
 * Create a complete gender extension pipeline
 */
export declare function createGenderExtension(options: {
    targetLanguage: GlostLanguage;
    provider?: any;
    skipExisting?: boolean;
    normalize?: boolean;
}): any[];
//# sourceMappingURL=index.d.ts.map