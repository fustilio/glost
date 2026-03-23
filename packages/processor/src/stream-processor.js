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
import { processGLOSTWithExtensionsAsync, processGLOSTChunkAsync, extensionRegistry, } from "glost-extensions";
// ============================================================================
// GLOSTStreamProcessor
// ============================================================================
/**
 * Streaming processor for GLOST documents
 *
 * Mirrors the `GLOSTProcessor` API (`.use()`, `.freeze()`) but adds a
 * `.stream()` method that returns an `AsyncGenerator<ProcessedChunk>`.
 *
 * @since 0.7.0
 */
export class GLOSTStreamProcessor {
    plugins = [];
    options = {};
    frozen = false;
    /**
     * Create a new stream processor instance
     *
     * @param options - Initial processor options
     */
    constructor(options = {}) {
        this.options = { ...options };
    }
    /**
     * Add a plugin, preset, or extension to the pipeline
     *
     * @param spec - Plugin function, extension object, preset, or ID
     * @param options - Plugin options
     * @returns This processor for chaining
     */
    use(spec, options) {
        this.assertNotFrozen();
        if (this.isPreset(spec)) {
            return this.usePreset(spec);
        }
        this.plugins.push({ spec, options });
        return this;
    }
    /**
     * Freeze the processor
     *
     * Returns a frozen processor that cannot be modified. Useful for
     * reusing the same pipeline configuration across multiple documents.
     *
     * @returns A frozen copy of this processor
     */
    freeze() {
        const frozen = new GLOSTStreamProcessor(this.options);
        frozen.plugins = [...this.plugins];
        frozen.frozen = true;
        return frozen;
    }
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
    async *stream(document, streamOptions) {
        const batchSize = streamOptions?.batchSize ?? 50;
        const extensions = await this.resolveExtensions();
        // Split extensions into doc-level and chunk-level
        const docExtensions = extensions.filter((e) => e.streamingSupport !== "chunk");
        const chunkExtensions = extensions.filter((e) => e.streamingSupport === "chunk");
        // Phase 1: run doc-level transforms on the full document
        let processedDoc = document;
        if (docExtensions.length > 0) {
            const { data: _data, ...extOptions } = this.options;
            const result = await processGLOSTWithExtensionsAsync(processedDoc, docExtensions, extOptions);
            processedDoc = result.document;
        }
        // Phase 2: collect all sentences grouped by paragraph index
        const paragraphSentences = collectSentencesByParagraph(processedDoc);
        if (paragraphSentences.length === 0) {
            return;
        }
        const allChunks = [];
        for (let pIdx = 0; pIdx < paragraphSentences.length; pIdx++) {
            const sentences = paragraphSentences[pIdx];
            let chunkIndex = 0;
            for (let offset = 0; offset < sentences.length; offset += batchSize) {
                allChunks.push({
                    paragraphIndex: pIdx,
                    chunkIndex,
                    sentences: sentences.slice(offset, offset + batchSize),
                });
                chunkIndex++;
            }
        }
        const totalChunks = allChunks.length;
        // Phase 3: yield each chunk, optionally running chunk-level extensions
        for (let i = 0; i < totalChunks; i++) {
            const descriptor = allChunks[i];
            let processedSentences = descriptor.sentences;
            if (chunkExtensions.length > 0) {
                const { data: _data, ...extOptions } = this.options;
                processedSentences = await processGLOSTChunkAsync(processedSentences, chunkExtensions, extOptions);
            }
            yield {
                sentences: processedSentences,
                paragraphIndex: descriptor.paragraphIndex,
                chunkIndex: descriptor.chunkIndex,
                isLast: i === totalChunks - 1,
            };
        }
    }
    // =====================================================================
    // Private helpers
    // =====================================================================
    usePreset(preset) {
        for (const entry of preset.plugins) {
            if (Array.isArray(entry)) {
                const [plugin, opts] = entry;
                this.use(plugin, opts);
            }
            else {
                this.use(entry);
            }
        }
        return this;
    }
    async resolveExtensions() {
        const result = [];
        for (const { spec, options } of this.plugins) {
            const ext = await this.resolvePlugin(spec, options);
            if (ext) {
                result.push(ext);
            }
        }
        return result;
    }
    async resolvePlugin(spec, options) {
        if (typeof spec === "string") {
            const ext = extensionRegistry.get(spec);
            if (!ext) {
                throw new Error(`Plugin "${spec}" not found in registry`);
            }
            return ext;
        }
        if (typeof spec === "function") {
            const result = spec(options);
            return result ?? null;
        }
        return spec;
    }
    isPreset(spec) {
        return (spec !== null &&
            typeof spec === "object" &&
            "plugins" in spec &&
            Array.isArray(spec.plugins));
    }
    assertNotFrozen() {
        if (this.frozen) {
            throw new Error("Cannot modify frozen stream processor");
        }
    }
}
// ============================================================================
// Internal helpers
// ============================================================================
/**
 * Collect all sentences from a GLOSTRoot, grouped by paragraph index.
 *
 * Only `SentenceNode` children of `ParagraphNode` children are
 * collected. Sentences that appear directly under the root (without a
 * wrapping paragraph) are collected as a single synthetic group at
 * index 0.
 *
 * @internal
 */
function collectSentencesByParagraph(document) {
    const groups = [];
    // Sentences that sit directly under the root (no paragraph wrapper)
    const rootSentences = [];
    for (const child of document.children) {
        if (child.type === "ParagraphNode" && "children" in child) {
            const para = child;
            const sentences = para.children.filter((c) => typeof c === "object" &&
                c !== null &&
                c.type === "SentenceNode");
            if (sentences.length > 0) {
                groups.push(sentences);
            }
        }
        else if (child.type === "SentenceNode") {
            rootSentences.push(child);
        }
    }
    // Prepend root-level sentences as paragraph 0 (if any)
    if (rootSentences.length > 0) {
        groups.unshift(rootSentences);
    }
    return groups;
}
//# sourceMappingURL=stream-processor.js.map