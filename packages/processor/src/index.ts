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
export type { FrozenProcessor } from "./processor.js";
export type {
  Plugin,
  PluginSpec,
  Preset,
  ProcessorOptions,
  ProcessingResult,
  ProcessingError,
  ProcessingWarning,
  ProcessingStats,
  BeforeHook,
  AfterHook,
  ErrorHook,
  SkipHook,
  ProgressHook,
  ProgressStats,
} from "./types.js";

import { GLOSTProcessor } from "./processor.js";
import type { ProcessorOptions } from "./types.js";

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
export function glost(options?: ProcessorOptions): GLOSTProcessor {
  return new GLOSTProcessor(options);
}
