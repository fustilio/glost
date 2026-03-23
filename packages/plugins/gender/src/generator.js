/**
 * Gender Generator Extension
 *
 * Generates grammatical gender data for words using a provider.
 *
 * @packageDocumentation
 */
import { getWordText } from "glost";
/**
 * Create gender generator extension
 */
export function createGenderGeneratorExtension(options) {
    const { provider, skipExisting = true } = options;
    return {
        id: "gender-generator",
        name: "Gender Generator",
        description: "Generates grammatical gender data using a provider",
        provides: {
            metadata: ["gender"],
        },
        visit: {
            word: async (node) => {
                if (!provider) {
                    console.warn("[Gender Generator] No provider provided, skipping processing");
                    return;
                }
                if (skipExisting) {
                    const existingGender = node.extras?.gender ||
                        node.extras?.metadata?.gender;
                    if (existingGender) {
                        return;
                    }
                }
                const wordText = getWordText(node);
                if (!wordText || wordText.trim() === "") {
                    return;
                }
                const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");
                try {
                    const gender = await provider.getGender(cleanWordText, options.targetLanguage);
                    if (gender) {
                        if (!node.extras) {
                            node.extras = {};
                        }
                        node.extras.gender = gender;
                    }
                }
                catch (error) {
                    console.debug(`[Gender Generator] Gender lookup failed for "${cleanWordText}":`, error);
                }
            },
        },
        options: options,
    };
}
//# sourceMappingURL=generator.js.map