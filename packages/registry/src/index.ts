/**
 * GLOST Plugin Registry
 * 
 * Enhanced plugin registry with discovery, metadata, and validation.
 * 
 * @packageDocumentation
 * 
 * @example
 * ```typescript
 * import { pluginRegistry } from "glost-registry";
 * 
 * // Register a plugin
 * pluginRegistry.register(myExtension, {
 *   version: "1.0.0",
 *   description: "My awesome plugin",
 *   category: "enhancer",
 *   tags: ["transcription"],
 *   supports: {
 *     languages: ["th", "ja"],
 *     async: true
 *   }
 * });
 * 
 * // Search for plugins
 * const plugins = pluginRegistry.search({ language: "th" });
 * 
 * // Check for conflicts
 * const report = pluginRegistry.checkConflicts(["plugin1", "plugin2"]);
 * ```
 */

export { PluginRegistry, pluginRegistry } from "./registry.js";
export { PluginFilter, PluginSorter, PluginDiscovery } from "./discovery.js";
export { PluginValidator } from "./validation.js";
export type {
  PluginMetadata,
  PluginCategory,
  PluginCapabilities,
  PluginRequirements,
  PluginOptionsSchema,
  PropertySchema,
  PluginExample,
  PluginQuery,
  ConflictReport,
  PluginConflict,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  RegistryStatistics,
} from "./types.js";
