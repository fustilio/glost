/**
 * Difficulty Generator Extension
 *
 * Generates difficulty levels for words using a provider.
 *
 * @packageDocumentation
 */
import { getWordText } from "glost";
/**
 * Create difficulty generator extension
 *
 * This extension augments word nodes with difficulty data by using a provider
 * to assess word difficulty. It populates the raw difficulty level that can
 * then be enhanced by the DifficultyEnhancerExtension.
 *
 * @param options - Extension options
 * @returns GLOST extension for difficulty generation
 *
 * @example
 * ```typescript
 * import { createDifficultyGeneratorExtension } from "glost-difficulty";
 * import { createThaiDifficultyProvider } from "glost-th/extensions";
 *
 * const provider = createThaiDifficultyProvider(wordLists);
 * const extension = createDifficultyGeneratorExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 */
export function createDifficultyGeneratorExtension(options) {
    const { provider, skipExisting = true } = options;
    return {
        id: "difficulty-generator",
        name: "Difficulty Generator",
        description: "Generates word difficulty data using a provider",
        provides: {
            metadata: ["difficulty"],
        },
        visit: {
            word: async (node) => {
                // Skip if no provider
                if (!provider) {
                    console.warn("[Difficulty Generator] No provider provided, skipping processing");
                    return;
                }
                // Skip if difficulty already exists
                if (skipExisting) {
                    const existingDifficulty = node.difficulty ||
                        node.extras?.metadata?.difficulty;
                    if (existingDifficulty) {
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
                    const difficulty = await provider.getDifficulty(cleanWordText, options.targetLanguage);
                    if (difficulty) {
                        // Store difficulty in node
                        node.difficulty = difficulty;
                    }
                }
                catch (error) {
                    // Silently fail - difficulty assessment is optional
                    console.debug(`[Difficulty Generator] Difficulty assessment failed for "${cleanWordText}":`, error);
                }
            },
        },
        options: options,
    };
}
//# sourceMappingURL=generator.js.map