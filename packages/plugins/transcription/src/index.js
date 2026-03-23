/**
 * glost-transcription
 *
 * Language-agnostic transcription extension for GLOST.
 *
 * This package provides the core transcription logic. Language-specific
 * implementations should be provided via the TranscriptionProvider interface.
 *
 * Language-specific providers should be in:
 * - glost-th/extensions (Thai RTGS, IPA)
 * - glost-ja/extensions (Japanese romaji, kana)
 * - glost-zh/extensions (Chinese pinyin)
 * etc.
 *
 * @packageDocumentation
 */
import { getWordText } from "glost";
import { Logger } from "glost-utils/logger";
export { Logger } from "glost-utils/logger";
/**
 * Create transcription extension
 *
 * This extension augments word nodes with transcription data using a provider.
 * It only populates transcriptions if they don't already exist.
 *
 * @param options - Extension options including provider
 * @returns GLOST extension for transcriptions
 *
 * @example
 * ```typescript
 * import { createTranscriptionExtension } from "glost-transcription";
 * import { thaiTranscriptionProvider } from "glost-th/extensions";
 * import { processGLOSTWithExtensionsAsync } from "glost-plugins";
 *
 * const extension = createTranscriptionExtension({
 *   targetLanguage: "th",
 *   provider: thaiTranscriptionProvider
 * });
 *
 * const result = await processGLOSTWithExtensionsAsync(document, [extension]);
 * ```
 *
 * @example
 * ```typescript
 * // Japanese example
 * import { createTranscriptionExtension } from "glost-transcription";
 * import { japaneseTranscriptionProvider } from "glost-ja/extensions";
 *
 * const extension = createTranscriptionExtension({
 *   targetLanguage: "ja",
 *   provider: japaneseTranscriptionProvider
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With custom verbosity
 * const extension = createTranscriptionExtension({
 *   targetLanguage: "th",
 *   provider: thaiTranscriptionProvider,
 *   verbosity: "silent" // Options: "silent" | "error" | "warn" | "info" | "debug"
 * });
 * ```
 */
export function createTranscriptionExtension(options) {
    const { targetLanguage, provider, verbosity = "info" } = options;
    if (!provider) {
        throw new Error("[Transcription] Provider is required. " +
            "Import from language package: " +
            "import { thaiTranscriptionProvider } from 'glost-th/extensions'");
    }
    // Create a logger instance for this extension
    const logger = new Logger(verbosity, "[Transcription Extension]");
    return {
        id: "transcription",
        name: "Transcription",
        description: "Augments word nodes with transcription data via provider",
        visit: {
            word: async (node) => {
                // Skip if transcription already exists
                if (node.transcription && Object.keys(node.transcription).length > 0) {
                    logger.info(`Skipping "${getWordText(node)}" - already has transcription`);
                    return;
                }
                const wordText = getWordText(node);
                if (!wordText || wordText.trim() === "") {
                    return;
                }
                // Clean word text (remove punctuation)
                const cleanWordText = wordText.trim().replace(/[!?.,:;]$/, "");
                // Get language from node or use target language
                const nodeLanguage = node.lang || targetLanguage;
                logger.debug(`Looking up transcription for: "${cleanWordText}" (lang: ${nodeLanguage}, target: ${targetLanguage})`);
                try {
                    const transcriptions = await provider.getTranscriptions(cleanWordText, nodeLanguage);
                    if (transcriptions && Object.keys(transcriptions).length > 0) {
                        // Convert to GLOST transcription format
                        // Note: system is the key, not stored in the value (v0.4.0+)
                        const glostTranscription = {};
                        for (const [system, text] of Object.entries(transcriptions)) {
                            glostTranscription[system] = {
                                text,
                            };
                        }
                        node.transcription = glostTranscription;
                        logger.info(`✓ Added transcription for "${cleanWordText}"`);
                    }
                    else {
                        logger.info(`✗ No transcription found for "${cleanWordText}"`);
                    }
                }
                catch (error) {
                    // Silently fail - transcription lookup is optional
                    logger.debug(`Lookup failed for "${cleanWordText}":`, error);
                }
            },
        },
        options: options,
    };
}
//# sourceMappingURL=index.js.map