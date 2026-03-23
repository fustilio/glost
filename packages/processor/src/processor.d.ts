/**
 * GLOST Processor
 *
 * Unified-style processor for GLOST documents with fluent API.
 * Similar to unified/remark processors.
 *
 * @packageDocumentation
 */
import type { GLOSTRoot } from "glost-core";
import type { PluginSpec, Preset, ProcessorOptions, ProcessingResult, BeforeHook, AfterHook, ErrorHook, SkipHook, ProgressHook } from "./types.js";
/**
 * GLOST Processor
 *
 * Fluent API for processing GLOST documents through plugin pipelines.
 *
 * @example
 * ```typescript
 * import { GLOSTProcessor } from "glost-processor";
 *
 * const processor = new GLOSTProcessor()
 *   .use(transcription, { scheme: "ipa" })
 *   .use(translation, { target: "en" })
 *   .use(frequency);
 *
 * const result = await processor.process(document);
 * ```
 */
export declare class GLOSTProcessor {
    private plugins;
    private hooks;
    private dataStore;
    private options;
    private frozen;
    /**
     * Create a new processor instance
     *
     * @param options - Initial processor options
     */
    constructor(options?: ProcessorOptions);
    /**
     * Use a plugin, preset, or extension
     *
     * @param spec - Plugin function, extension object, preset, or plugin ID
     * @param options - Plugin options
     * @returns This processor for chaining
     *
     * @example
     * ```typescript
     * processor
     *   .use(transcription, { scheme: "ipa" })
     *   .use(translation)
     *   .use("frequency");
     * ```
     */
    use(spec: PluginSpec | Preset, options?: any): this;
    /**
     * Apply a preset (collection of plugins)
     *
     * @param preset - Preset to apply
     * @returns This processor for chaining
     */
    private usePreset;
    /**
     * Register a hook to run before a plugin
     *
     * @param pluginId - Plugin ID to hook into
     * @param hook - Hook function to run
     * @returns This processor for chaining
     *
     * @example
     * ```typescript
     * processor.before("translation", (doc) => {
     *   console.log("About to translate");
     * });
     * ```
     */
    before(pluginId: string, hook: BeforeHook): this;
    /**
     * Register a hook to run after a plugin
     *
     * @param pluginId - Plugin ID to hook into
     * @param hook - Hook function to run
     * @returns This processor for chaining
     *
     * @example
     * ```typescript
     * processor.after("translation", (doc) => {
     *   console.log("Translation complete");
     * });
     * ```
     */
    after(pluginId: string, hook: AfterHook): this;
    /**
     * Register an error handler
     *
     * @param hook - Error handler function
     * @returns This processor for chaining
     *
     * @example
     * ```typescript
     * processor.onError((error, plugin) => {
     *   console.error(`Plugin ${plugin} failed:`, error);
     * });
     * ```
     */
    onError(hook: ErrorHook): this;
    /**
     * Register a skip handler
     *
     * @param hook - Skip handler function
     * @returns This processor for chaining
     *
     * @example
     * ```typescript
     * processor.onSkip((plugin, reason) => {
     *   console.log(`Plugin ${plugin} skipped: ${reason}`);
     * });
     * ```
     */
    onSkip(hook: SkipHook): this;
    /**
     * Register a progress handler
     *
     * @param hook - Progress handler function
     * @returns This processor for chaining
     *
     * @example
     * ```typescript
     * processor.onProgress((stats) => {
     *   console.log(`Progress: ${stats.completed}/${stats.total}`);
     * });
     * ```
     */
    onProgress(hook: ProgressHook): this;
    /**
     * Set or get data in the processor data store
     *
     * @param key - Data key
     * @param value - Data value (omit to get)
     * @returns Value if getting, this processor if setting
     *
     * @example
     * ```typescript
     * processor.data("config", { theme: "dark" });
     * const config = processor.data("config");
     * ```
     */
    data(key: string): any;
    data(key: string, value: any): this;
    /**
     * Freeze the processor
     *
     * Returns a frozen processor that cannot be modified.
     * Useful for reusing the same configuration across multiple documents.
     *
     * @returns A frozen copy of this processor
     *
     * @example
     * ```typescript
     * const frozen = processor
     *   .use(transcription)
     *   .use(translation)
     *   .freeze();
     *
     * // Can process multiple documents with the same pipeline
     * const result1 = await frozen.process(doc1);
     * const result2 = await frozen.process(doc2);
     * ```
     */
    freeze(): FrozenProcessor;
    /**
     * Process a document through the pipeline
     *
     * @param document - GLOST document to process
     * @returns Promise resolving to the processed document
     *
     * @example
     * ```typescript
     * const result = await processor.process(document);
     * console.log(result);
     * ```
     */
    process(document: GLOSTRoot): Promise<GLOSTRoot>;
    /**
     * Process a document and return detailed metadata
     *
     * @param document - GLOST document to process
     * @returns Promise resolving to processing result with metadata
     *
     * @example
     * ```typescript
     * const result = await processor.processWithMeta(document);
     * console.log(result.metadata.appliedPlugins);
     * console.log(result.metadata.stats.totalTime);
     * ```
     */
    processWithMeta(document: GLOSTRoot): Promise<ProcessingResult>;
    /**
     * Process a document synchronously (only if all plugins are sync)
     *
     * @param document - GLOST document to process
     * @returns The processed document
     * @throws {Error} If any plugin is async
     *
     * @example
     * ```typescript
     * const result = processor.processSync(document);
     * ```
     */
    processSync(document: GLOSTRoot): GLOSTRoot;
    /**
     * Resolve all plugins to extensions
     */
    private resolveExtensions;
    /**
     * Resolve a single plugin to an extension
     */
    private resolvePlugin;
    /**
     * Check if a spec is a preset
     */
    private isPreset;
    /**
     * Run before hooks for a plugin
     */
    private runBeforeHooks;
    /**
     * Run after hooks for a plugin
     */
    private runAfterHooks;
    /**
     * Emit error to error handlers
     */
    private emitError;
    /**
     * Emit skip to skip handlers
     */
    private emitSkip;
    /**
     * Emit progress to progress handlers
     */
    private emitProgress;
    /**
     * Assert that the processor is not frozen
     */
    private assertNotFrozen;
}
/**
 * Frozen processor type
 *
 * A frozen processor cannot be modified, only used for processing.
 */
export type FrozenProcessor = Omit<GLOSTProcessor, "use" | "before" | "after" | "onError" | "onSkip" | "onProgress" | "data" | "freeze"> & {
    readonly frozen: true;
};
//# sourceMappingURL=processor.d.ts.map