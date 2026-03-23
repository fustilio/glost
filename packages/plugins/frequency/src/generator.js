/**
 * Frequency Generator Extension
 *
 * Generates frequency data for words using a provider.
 *
 * @packageDocumentation
 */
import { getWordText } from "glost";
/**
 * Create frequency generator extension
 *
 * This extension augments word nodes with frequency data by looking up
 * frequencies from the provider. It populates the raw frequency level
 * that can then be enhanced by the FrequencyEnhancerExtension.
 *
 * @param options - Extension options
 * @returns GLOST extension for frequency generation
 *
 * @example
 * ```typescript
 * import { createFrequencyGeneratorExtension } from "glost-frequency";
 * import { createThaiFrequencyProvider } from "glost-th/extensions";
 *
 * const provider = createThaiFrequencyProvider(datasource);
 * const extension = createFrequencyGeneratorExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createFrequencyGeneratorExtension(options) {
    const { provider, skipExisting = true } = options;
    return {
        id: "frequency-generator",
        name: "Frequency Generator",
        description: "Generates word frequency data using a provider",
        provides: {
            metadata: ["frequency"],
        },
        visit: {
            word: async (node) => {
                // Skip if no provider
                if (!provider) {
                    console.warn("[Frequency Generator] No provider provided, skipping processing");
                    return;
                }
                // Skip if frequency already exists
                if (skipExisting) {
                    const existingFrequency = node.extras?.metadata?.frequency ||
                        node.extras?.frequency;
                    if (existingFrequency) {
                        return;
                    }
                }
                const wordText = getWordText(node);
                if (!wordText || wordText.trim() === "") {
                    return;
                }
                // Clean word text (remove punctuation)
                const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");
                try {
                    const frequency = await provider.getFrequency(cleanWordText, options.targetLanguage);
                    if (frequency) {
                        // Store raw frequency level in metadata
                        if (!node.extras) {
                            node.extras = {};
                        }
                        const extras = node.extras;
                        if (!extras.metadata) {
                            extras.metadata = {};
                        }
                        extras.metadata.frequency = frequency;
                    }
                }
                catch (error) {
                    // Silently fail - frequency lookup is optional
                    console.debug(`[Frequency Generator] Frequency lookup failed for "${cleanWordText}":`, error);
                }
            },
        },
        options: options,
    };
}
//# sourceMappingURL=generator.js.map