/**
 * glost-difficulty
 *
 * Language-agnostic difficulty assessment extension for GLOST.
 *
 * @packageDocumentation
 */
// Export generator and enhancer functions
export { createDifficultyGeneratorExtension } from "./generator.js";
export { createDifficultyEnhancerExtension } from "./enhancer.js";
// Import for local use
import { createDifficultyGeneratorExtension } from "./generator.js";
import { createDifficultyEnhancerExtension } from "./enhancer.js";
/**
 * Create difficulty extension (generator + enhancer)
 *
 * Returns a tuple of [generator, enhancer] extensions.
 *
 * @param options - Extension options
 * @returns Tuple of [generator, enhancer]
 */
export function createDifficultyExtension(options) {
    const { targetLanguage, provider, skipExisting, normalize, customMapping } = options;
    const generator = createDifficultyGeneratorExtension({
        targetLanguage,
        provider,
        skipExisting,
    });
    const enhancer = createDifficultyEnhancerExtension({
        normalize,
        customMapping,
    });
    return [generator, enhancer];
}
//# sourceMappingURL=index.js.map