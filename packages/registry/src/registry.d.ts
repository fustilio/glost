/**
 * Enhanced Plugin Registry
 *
 * Plugin registry with discovery, metadata, and validation capabilities.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-extensions";
import type { PluginMetadata, PluginQuery, PluginCategory, ConflictReport, ValidationResult, RegistryStatistics } from "./types.js";
/**
 * Enhanced Plugin Registry
 *
 * Manages plugin metadata, discovery, validation, and conflict detection.
 *
 * @example
 * ```typescript
 * import { PluginRegistry } from "glost-registry";
 *
 * const registry = new PluginRegistry();
 *
 * registry.register(myPlugin, {
 *   version: "1.0.0",
 *   category: "enhancer",
 *   tags: ["transcription", "ipa"]
 * });
 *
 * const plugins = registry.search({ language: "th" });
 * ```
 */
export declare class PluginRegistry {
    private plugins;
    private extensions;
    /**
     * Register a plugin with metadata
     *
     * @param extension - The plugin extension
     * @param metadata - Plugin metadata
     *
     * @example
     * ```typescript
     * registry.register(myExtension, {
     *   version: "1.0.0",
     *   description: "Adds transcription support",
     *   category: "enhancer",
     *   tags: ["transcription"],
     *   supports: {
     *     languages: ["th", "ja"],
     *     async: true
     *   }
     * });
     * ```
     */
    register(extension: GLOSTExtension, metadata: Omit<PluginMetadata, "id" | "name">): void;
    /**
     * Get plugin metadata
     *
     * @param pluginId - Plugin ID
     * @returns Plugin metadata or undefined
     */
    getMetadata(pluginId: string): PluginMetadata | undefined;
    /**
     * Get plugin extension
     *
     * @param pluginId - Plugin ID
     * @returns Plugin extension or undefined
     */
    getExtension(pluginId: string): GLOSTExtension | undefined;
    /**
     * List all plugins
     *
     * @returns Array of all plugin metadata
     */
    list(): PluginMetadata[];
    /**
     * Search for plugins
     *
     * @param query - Search query
     * @returns Array of matching plugin metadata
     *
     * @example
     * ```typescript
     * // Search by keyword
     * const results = registry.search({ keyword: "transcription" });
     *
     * // Filter by category
     * const enhancers = registry.search({ category: "enhancer" });
     *
     * // Filter by language
     * const thaiPlugins = registry.search({ language: "th" });
     *
     * // Multiple filters
     * const results = registry.search({
     *   category: "enhancer",
     *   language: "th",
     *   tags: ["transcription"]
     * });
     * ```
     */
    search(query: PluginQuery): PluginMetadata[];
    /**
     * Get plugins by category
     *
     * @param category - Plugin category
     * @returns Array of plugin metadata
     */
    getByCategory(category: PluginCategory): PluginMetadata[];
    /**
     * Get plugins that support a language
     *
     * @param language - Language code
     * @returns Array of plugin metadata
     */
    getLanguageSupport(language: string): PluginMetadata[];
    /**
     * Check if a plugin supports a language
     *
     * @param pluginId - Plugin ID
     * @param language - Language code
     * @returns True if supported
     */
    isLanguageSupported(pluginId: string, language: string): boolean;
    /**
     * Check plugin compatibility
     *
     * @param pluginId - Plugin ID
     * @param version - Version to check (semver)
     * @returns True if compatible
     */
    isCompatible(pluginId: string, version: string): boolean;
    /**
     * Check for conflicts between plugins
     *
     * @param pluginIds - Plugin IDs to check
     * @returns Conflict report
     *
     * @example
     * ```typescript
     * const report = registry.checkConflicts(["plugin1", "plugin2", "plugin3"]);
     * if (report.hasConflicts) {
     *   for (const conflict of report.conflicts) {
     *     console.error(`Conflict: ${conflict.plugin1} <-> ${conflict.plugin2}`);
     *     console.error(`Reason: ${conflict.reason}`);
     *   }
     * }
     * ```
     */
    checkConflicts(pluginIds: string[]): ConflictReport;
    /**
     * Resolve dependencies for plugins
     *
     * @param pluginIds - Plugin IDs to resolve
     * @returns Array of plugin IDs in dependency order
     * @throws {Error} If circular dependencies detected or plugin not found
     */
    resolveDependencies(pluginIds: string[]): string[];
    /**
     * Validate a plugin configuration
     *
     * @param pluginId - Plugin ID
     * @param options - Plugin options to validate
     * @returns Validation result
     */
    validate(pluginId: string, options?: any): ValidationResult;
    /**
     * Get registry statistics
     *
     * @returns Registry statistics
     */
    getStatistics(): RegistryStatistics;
    /**
     * Check if a plugin is registered
     *
     * @param pluginId - Plugin ID
     * @returns True if registered
     */
    has(pluginId: string): boolean;
    /**
     * Unregister a plugin
     *
     * @param pluginId - Plugin ID
     * @returns True if unregistered
     */
    unregister(pluginId: string): boolean;
    /**
     * Clear all plugins
     */
    clear(): void;
}
/**
 * Global plugin registry instance
 */
export declare const pluginRegistry: PluginRegistry;
//# sourceMappingURL=registry.d.ts.map