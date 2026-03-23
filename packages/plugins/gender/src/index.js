/**
 * glost-gender
 *
 * Grammatical gender extension for GLOST - generates and formats gender data.
 *
 * @packageDocumentation
 */
// Export generator
export { createGenderGeneratorExtension, } from "./generator.js";
// Export enhancer
export { createGenderEnhancerExtension, GenderEnhancerExtension, } from "./enhancer.js";
// Import for local use
import { createGenderGeneratorExtension } from "./generator.js";
import { createGenderEnhancerExtension } from "./enhancer.js";
/**
 * Create a complete gender extension pipeline
 */
export function createGenderExtension(options) {
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
//# sourceMappingURL=index.js.map