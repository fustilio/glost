/**
 * GLOST Processor
 *
 * Unified-style processor for GLOST documents.
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 * import { transcription } from "glost-transcription";
 * import { translation } from "glost-translation";
 *
 * const processor = glost()
 *   .use(transcription, { scheme: "ipa" })
 *   .use(translation, { target: "en" })
 *   .freeze();
 *
 * const result = await processor.process(document);
 * ```
 */
export { GLOSTProcessor } from "./processor.js";
export { GLOSTStreamProcessor } from "./stream-processor.js";
import { GLOSTProcessor } from "./processor.js";
/**
 * Create a new GLOST processor
 *
 * Factory function for creating a new processor instance.
 * Similar to `unified()` from the unified ecosystem.
 *
 * @param options - Initial processor options
 * @returns A new processor instance
 *
 * @example
 * ```typescript
 * import { glost } from "glost-processor";
 *
 * const processor = glost()
 *   .use(plugin1)
 *   .use(plugin2)
 *   .use(plugin3);
 *
 * const result = await processor.process(document);
 * ```
 *
 * @example
 * ```typescript
 * // With options
 * const processor = glost({ lenient: true, debug: true })
 *   .use(plugin1)
 *   .use(plugin2);
 * ```
 */
export function glost(options) {
    return new GLOSTProcessor(options);
}
//# sourceMappingURL=index.js.map