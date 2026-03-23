/**
 * GLOST Stream Processor
 *
 * Streaming variant of GLOSTProcessor that yields processed sentence
 * batches progressively using AsyncGenerator. Keeps the full document
 * out of memory between chunks.
 *
 * Document-level transforms (extensions with streamingSupport !== 'chunk')
 * run once on the full document before streaming begins. Chunk-compatible
 * extensions (streamingSupport === 'chunk') then run on each batch.
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * import { GLOSTStreamProcessor } from "glost-processor";
 *
 * const processor = new GLOSTStreamProcessor()
 *   .use(transcription)
 *   .use(translation);
 *
 * for await (const chunk of processor.stream(document)) {
 *   console.log(chunk.sentences, chunk.isLast);
 * }
 * ```
 *
 * @since 0.7.0
 */
import type { GLOSTRoot, GLOSTSentence } from "glost-core";
import type { PluginSpec, Preset, ProcessorOptions } from "./types.js";
/**
 * Options for stream() method
 *
 * @since 0.7.0
 */
export interface StreamOptions {
    /**
     * Number of sentences per chunk.
     *
     * A smaller value reduces latency to first yielded chunk; a larger
     * value amortises per-chunk overhead. Default: 50.
     */
    batchSize?: number;
}
/**
 * A single yielded chunk from the stream
 *
 * @since 0.7.0
 */
export interface ProcessedChunk {
    /** Processed sentences in this batch */
    sentences: GLOSTSentence[];
    /**
     * Index of the source paragraph this chunk came from.
     *
     * When the document has multiple paragraphs each paragraph is
     * chunked independently, so multiple consecutive chunks may share
     * the same paragraphIndex.
     */
    paragraphIndex: number;
    /**
     * Index of this chunk within its paragraph (0-based).
     */
    chunkIndex: number;
    /** True for the final chunk across the whole document */
    isLast: boolean;
}
/**
 * Streaming processor for GLOST documents
 *
 * Mirrors the `GLOSTProcessor` API (`.use()`, `.freeze()`) but adds a
 * `.stream()` method that returns an `AsyncGenerator<ProcessedChunk>`.
 *
 * @since 0.7.0
 */
export declare class GLOSTStreamProcessor {
    private plugins;
    private options;
    private frozen;
    /**
     * Create a new stream processor instance
     *
     * @param options - Initial processor options
     */
    constructor(options?: ProcessorOptions);
    /**
     * Add a plugin, preset, or extension to the pipeline
     *
     * @param spec - Plugin function, extension object, preset, or ID
     * @param options - Plugin options
     * @returns This processor for chaining
     */
    use(spec: PluginSpec | Preset, options?: unknown): this;
    /**
     * Freeze the processor
     *
     * Returns a frozen processor that cannot be modified. Useful for
     * reusing the same pipeline configuration across multiple documents.
     *
     * @returns A frozen copy of this processor
     */
    freeze(): FrozenStreamProcessor;
    /**
     * Stream a document as progressive sentence batches
     *
     * Processing phases:
     * 1. All extensions with `streamingSupport !== 'chunk'` (i.e. `'none'`
     *    or `'full'`, or unset) run their `transform`, `visit`, and
     *    `enhanceMetadata` hooks on the **full** document.
     * 2. The resulting document is split into sentence batches.
     * 3. For each batch, extensions with `streamingSupport === 'chunk'`
     *    run their `visit` and `enhanceMetadata` hooks.
     * 4. A `ProcessedChunk` is yielded.
     *
     * Cancellation: break out of the `for await` loop at any time. The
     * generator will stop without processing remaining chunks.
     *
     * @param document - GLOST document to stream
     * @param streamOptions - Streaming options (batchSize etc.)
     * @yields `ProcessedChunk` objects in document order
     *
     * @example
     * ```typescript
     * for await (const chunk of processor.stream(doc, { batchSize: 20 })) {
     *   console.log(`para ${chunk.paragraphIndex} chunk ${chunk.chunkIndex}`);
     *   if (chunk.isLast) console.log("done");
     * }
     * ```
     */
    stream(document: GLOSTRoot, streamOptions?: StreamOptions): AsyncGenerator<ProcessedChunk>;
    private usePreset;
    private resolveExtensions;
    private resolvePlugin;
    private isPreset;
    private assertNotFrozen;
}
/**
 * A frozen `GLOSTStreamProcessor` that cannot be modified.
 *
 * @since 0.7.0
 */
export type FrozenStreamProcessor = Omit<GLOSTStreamProcessor, "use" | "freeze"> & {
    readonly frozen: true;
};
//# sourceMappingURL=stream-processor.d.ts.map