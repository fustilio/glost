/**
 * GLOST Processor
 * 
 * Unified-style processor for GLOST documents with fluent API.
 * Similar to unified/remark processors.
 * 
 * @packageDocumentation
 */

import type { GLOSTRoot } from "glost-core";
import type { GLOSTExtension } from "glost-plugins";
import { processGLOSTWithExtensionsAsync, extensionRegistry } from "glost-plugins";
import type {
  PluginSpec,
  Preset,
  ProcessorOptions,
  ProcessingResult,
  ProcessorHooks,
  BeforeHook,
  AfterHook,
  ErrorHook,
  SkipHook,
  ProgressHook,
  ProcessingError,
  ProcessingWarning,
  ProgressStats,
} from "./types.js";

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
export class GLOSTProcessor {
  private plugins: Array<{ spec: PluginSpec; options?: any }> = [];
  private hooks: ProcessorHooks = {
    before: new Map(),
    after: new Map(),
    onError: [],
    onSkip: [],
    onProgress: [],
  };
  private dataStore: Map<string, any> = new Map();
  private options: ProcessorOptions = {};
  private frozen = false;

  /**
   * Create a new processor instance
   * 
   * @param options - Initial processor options
   */
  constructor(options: ProcessorOptions = {}) {
    this.options = { ...options };
    if (options.data) {
      this.dataStore = new Map(options.data);
    }
  }

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
  use(spec: PluginSpec | Preset, options?: any): this {
    this.assertNotFrozen();

    // Handle presets
    if (this.isPreset(spec)) {
      return this.usePreset(spec);
    }

    // Add plugin to pipeline
    this.plugins.push({ spec, options });
    return this;
  }

  /**
   * Apply a preset (collection of plugins)
   * 
   * @param preset - Preset to apply
   * @returns This processor for chaining
   */
  private usePreset(preset: Preset): this {
    for (const pluginEntry of preset.plugins) {
      if (Array.isArray(pluginEntry)) {
        const [plugin, opts] = pluginEntry;
        this.use(plugin, opts);
      } else {
        this.use(pluginEntry);
      }
    }
    return this;
  }

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
  before(pluginId: string, hook: BeforeHook): this {
    this.assertNotFrozen();
    if (!this.hooks.before.has(pluginId)) {
      this.hooks.before.set(pluginId, []);
    }
    this.hooks.before.get(pluginId)!.push(hook);
    return this;
  }

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
  after(pluginId: string, hook: AfterHook): this {
    this.assertNotFrozen();
    if (!this.hooks.after.has(pluginId)) {
      this.hooks.after.set(pluginId, []);
    }
    this.hooks.after.get(pluginId)!.push(hook);
    return this;
  }

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
  onError(hook: ErrorHook): this {
    this.assertNotFrozen();
    this.hooks.onError.push(hook);
    return this;
  }

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
  onSkip(hook: SkipHook): this {
    this.assertNotFrozen();
    this.hooks.onSkip.push(hook);
    return this;
  }

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
  onProgress(hook: ProgressHook): this {
    this.assertNotFrozen();
    this.hooks.onProgress.push(hook);
    return this;
  }

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
  data(key: string, value?: any): any {
    if (arguments.length === 1) {
      return this.dataStore.get(key);
    }
    this.assertNotFrozen();
    this.dataStore.set(key, value);
    return this;
  }

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
  freeze(): FrozenProcessor {
    const frozen = new GLOSTProcessor(this.options);
    frozen.plugins = [...this.plugins];
    frozen.hooks = {
      before: new Map(this.hooks.before),
      after: new Map(this.hooks.after),
      onError: [...this.hooks.onError],
      onSkip: [...this.hooks.onSkip],
      onProgress: [...this.hooks.onProgress],
    };
    frozen.dataStore = new Map(this.dataStore);
    (frozen as any).frozen = true;
    return frozen as unknown as FrozenProcessor;
  }

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
  async process(document: GLOSTRoot): Promise<GLOSTRoot> {
    const result = await this.processWithMeta(document);
    return result.document;
  }

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
  async processWithMeta(document: GLOSTRoot): Promise<ProcessingResult> {
    const startTime = Date.now();
    const extensions = await this.resolveExtensions();
    const timing = new Map<string, number>();
    const errors: ProcessingError[] = [];
    const warnings: ProcessingWarning[] = [];
    const appliedPlugins: string[] = [];
    const skippedPlugins: string[] = [];

    // Emit initial progress
    this.emitProgress({
      total: extensions.length,
      completed: 0,
      startTime,
      elapsed: 0,
    });

    // Process extensions with hooks
    let processedDoc = document;
    
    for (let i = 0; i < extensions.length; i++) {
      const extension = extensions[i]!;
      const pluginStart = Date.now();

      try {
        // Run before hooks
        await this.runBeforeHooks(processedDoc, extension.id);

        // Process with this extension
        const { data: _, ...extensionOptions } = this.options as any;
        const result = await processGLOSTWithExtensionsAsync(
          processedDoc,
          [extension],
          extensionOptions
        );

        processedDoc = result.document;
        
        // Check for errors/skips
        if (result.metadata.errors.length > 0) {
          for (const err of result.metadata.errors) {
            errors.push({
              plugin: extension.id,
              phase: "transform",
              message: err.error.message,
              stack: err.error.stack,
              recoverable: true,
              error: err.error,
            });
          }
        }

        if (result.metadata.skippedExtensions.includes(extension.id)) {
          skippedPlugins.push(extension.id);
          this.emitSkip(extension.id, "Skipped by processor");
        } else {
          appliedPlugins.push(extension.id);
        }

        // Run after hooks
        await this.runAfterHooks(processedDoc, extension.id);

        // Record timing
        timing.set(extension.id, Date.now() - pluginStart);

        // Emit progress
        this.emitProgress({
          total: extensions.length,
          completed: i + 1,
          current: extension.id,
          startTime,
          elapsed: Date.now() - startTime,
        });
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        errors.push({
          plugin: extension.id,
          phase: "transform",
          message: err.message,
          stack: err.stack,
          recoverable: false,
          error: err,
        });
        skippedPlugins.push(extension.id);
        this.emitError(err, extension.id);
        this.emitSkip(extension.id, err.message);

        // Re-throw in strict mode
        if (!this.options.lenient) {
          throw err;
        }
      }
    }

    const endTime = Date.now();

    return {
      document: processedDoc,
      metadata: {
        appliedPlugins,
        skippedPlugins,
        errors,
        warnings,
        stats: {
          totalTime: endTime - startTime,
          timing,
          nodesProcessed: 0, // Could be calculated by visiting the tree
          startTime,
          endTime,
        },
      },
    };
  }

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
  processSync(document: GLOSTRoot): GLOSTRoot {
    throw new Error(
      "Synchronous processing not yet implemented. Use process() instead."
    );
  }

  /**
   * Resolve all plugins to extensions
   */
  private async resolveExtensions(): Promise<GLOSTExtension[]> {
    const extensions: GLOSTExtension[] = [];

    for (const { spec, options } of this.plugins) {
      const extension = await this.resolvePlugin(spec, options);
      if (extension) {
        extensions.push(extension);
      }
    }

    return extensions;
  }

  /**
   * Resolve a single plugin to an extension
   */
  private async resolvePlugin(
    spec: PluginSpec,
    options?: any
  ): Promise<GLOSTExtension | null> {
    // String ID - lookup in registry
    if (typeof spec === "string") {
      const ext = extensionRegistry.get(spec);
      if (!ext) {
        throw new Error(`Plugin "${spec}" not found in registry`);
      }
      return ext;
    }

    // Function - call to get extension
    if (typeof spec === "function") {
      const result = spec(options);
      return result || null;
    }

    // Extension object - use directly
    return spec;
  }

  /**
   * Check if a spec is a preset
   */
  private isPreset(spec: any): spec is Preset {
    return (
      spec &&
      typeof spec === "object" &&
      "plugins" in spec &&
      Array.isArray(spec.plugins)
    );
  }

  /**
   * Run before hooks for a plugin
   */
  private async runBeforeHooks(document: GLOSTRoot, pluginId: string): Promise<void> {
    const hooks = this.hooks.before.get(pluginId) || [];
    for (const hook of hooks) {
      await hook(document, pluginId);
    }
  }

  /**
   * Run after hooks for a plugin
   */
  private async runAfterHooks(document: GLOSTRoot, pluginId: string): Promise<void> {
    const hooks = this.hooks.after.get(pluginId) || [];
    for (const hook of hooks) {
      await hook(document, pluginId);
    }
  }

  /**
   * Emit error to error handlers
   */
  private emitError(error: Error, pluginId: string): void {
    for (const hook of this.hooks.onError) {
      try {
        hook(error, pluginId);
      } catch (err) {
        console.error("Error in error hook:", err);
      }
    }
  }

  /**
   * Emit skip to skip handlers
   */
  private emitSkip(pluginId: string, reason: string): void {
    for (const hook of this.hooks.onSkip) {
      try {
        hook(pluginId, reason);
      } catch (err) {
        console.error("Error in skip hook:", err);
      }
    }
  }

  /**
   * Emit progress to progress handlers
   */
  private emitProgress(stats: ProgressStats): void {
    for (const hook of this.hooks.onProgress) {
      try {
        hook(stats);
      } catch (err) {
        console.error("Error in progress hook:", err);
      }
    }
  }

  /**
   * Assert that the processor is not frozen
   */
  private assertNotFrozen(): void {
    if (this.frozen) {
      throw new Error("Cannot modify frozen processor");
    }
  }
}

/**
 * Frozen processor type
 * 
 * A frozen processor cannot be modified, only used for processing.
 */
export type FrozenProcessor = Omit<
  GLOSTProcessor,
  "use" | "before" | "after" | "onError" | "onSkip" | "onProgress" | "data" | "freeze"
> & {
  readonly frozen: true;
};
