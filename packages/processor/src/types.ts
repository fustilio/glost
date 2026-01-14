/**
 * Processor Types
 * 
 * Type definitions for the unified-style GLOST processor.
 * 
 * @packageDocumentation
 */

import type { GLOSTRoot } from "glost-core";
import type { GLOSTExtension, ProcessorOptions as ExtensionProcessorOptions } from "glost-plugins";

/**
 * Plugin function signature
 * 
 * A plugin is a function that returns an extension or modifies the processor.
 * Similar to remark/unified plugins.
 * 
 * @example
 * ```typescript
 * const myPlugin: Plugin = (options) => {
 *   return {
 *     id: "my-plugin",
 *     name: "My Plugin",
 *     transform: (tree) => tree
 *   };
 * };
 * ```
 */
export type Plugin<TOptions = any> = (
  options?: TOptions
) => GLOSTExtension | void;

/**
 * Plugin specification
 * 
 * Can be a plugin function, extension object, or string ID.
 */
export type PluginSpec = Plugin | GLOSTExtension | string;

/**
 * Preset definition
 * 
 * A preset is a collection of plugins with their options.
 * Similar to babel presets.
 * 
 * @example
 * ```typescript
 * const preset: Preset = {
 *   id: "language-learning",
 *   name: "Language Learning",
 *   description: "Full language learning stack",
 *   plugins: [
 *     ["transcription", { scheme: "ipa" }],
 *     ["translation", { target: "en" }],
 *     ["frequency"],
 *   ]
 * };
 * ```
 */
export interface Preset {
  /** Unique preset identifier */
  id: string;
  
  /** Human-readable name */
  name: string;
  
  /** Optional description */
  description?: string;
  
  /** Plugins to apply with their options */
  plugins: Array<PluginSpec | [PluginSpec, any]>;
}

/**
 * Processing hook types
 */
export type BeforeHook = (document: GLOSTRoot, pluginId: string) => void | Promise<void>;
export type AfterHook = (document: GLOSTRoot, pluginId: string) => void | Promise<void>;
export type ErrorHook = (error: Error, pluginId: string) => void;
export type SkipHook = (pluginId: string, reason: string) => void;
export type ProgressHook = (stats: ProgressStats) => void;

/**
 * Progress statistics
 */
export interface ProgressStats {
  /** Total number of plugins */
  total: number;
  
  /** Number of plugins completed */
  completed: number;
  
  /** Current plugin being processed */
  current?: string;
  
  /** Processing start time */
  startTime: number;
  
  /** Elapsed time in ms */
  elapsed: number;
}

/**
 * Processing hooks
 */
export interface ProcessorHooks {
  before: Map<string, BeforeHook[]>;
  after: Map<string, AfterHook[]>;
  onError: ErrorHook[];
  onSkip: SkipHook[];
  onProgress: ProgressHook[];
}

/**
 * Processor options
 */
export interface ProcessorOptions extends ExtensionProcessorOptions {
  /** Data storage for sharing state between plugins */
  data?: Map<string, any>;
}

/**
 * Processing result with detailed metadata
 */
export interface ProcessingResult {
  /** The processed document */
  document: GLOSTRoot;
  
  /** Processing metadata */
  metadata: {
    /** Plugins that were applied */
    appliedPlugins: string[];
    
    /** Plugins that were skipped */
    skippedPlugins: string[];
    
    /** Processing errors */
    errors: ProcessingError[];
    
    /** Processing warnings */
    warnings: ProcessingWarning[];
    
    /** Processing statistics */
    stats: ProcessingStats;
  };
}

/**
 * Processing error details
 */
export interface ProcessingError {
  /** Plugin that caused the error */
  plugin: string;
  
  /** Processing phase */
  phase: "transform" | "visit" | "enhance";
  
  /** Error message */
  message: string;
  
  /** Error stack trace */
  stack?: string;
  
  /** Whether the error is recoverable */
  recoverable: boolean;
  
  /** Original error object */
  error: Error;
}

/**
 * Processing warning details
 */
export interface ProcessingWarning {
  /** Plugin that issued the warning */
  plugin: string;
  
  /** Warning message */
  message: string;
  
  /** Warning severity */
  severity: "low" | "medium" | "high";
}

/**
 * Processing statistics
 */
export interface ProcessingStats {
  /** Total processing time in ms */
  totalTime: number;
  
  /** Time per plugin in ms */
  timing: Map<string, number>;
  
  /** Total nodes processed */
  nodesProcessed: number;
  
  /** Processing start timestamp */
  startTime: number;
  
  /** Processing end timestamp */
  endTime: number;
}
