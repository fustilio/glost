/**
 * Plugin Discovery
 *
 * Utilities for discovering and filtering plugins.
 *
 * @packageDocumentation
 */
import type { PluginMetadata, PluginQuery, PluginCategory } from "./types.js";
/**
 * Filter plugins by various criteria
 */
export declare class PluginFilter {
    /**
     * Filter plugins by keyword
     *
     * @param plugins - Plugins to filter
     * @param keyword - Keyword to search for
     * @returns Filtered plugins
     */
    static byKeyword(plugins: PluginMetadata[], keyword: string): PluginMetadata[];
    /**
     * Filter plugins by category
     *
     * @param plugins - Plugins to filter
     * @param category - Category to filter by
     * @returns Filtered plugins
     */
    static byCategory(plugins: PluginMetadata[], category: PluginCategory): PluginMetadata[];
    /**
     * Filter plugins by language support
     *
     * @param plugins - Plugins to filter
     * @param language - Language code
     * @returns Filtered plugins
     */
    static byLanguage(plugins: PluginMetadata[], language: string): PluginMetadata[];
    /**
     * Filter plugins by tags
     *
     * @param plugins - Plugins to filter
     * @param tags - Tags to match (any)
     * @returns Filtered plugins
     */
    static byTags(plugins: PluginMetadata[], tags: string[]): PluginMetadata[];
    /**
     * Filter plugins by author
     *
     * @param plugins - Plugins to filter
     * @param author - Author name
     * @returns Filtered plugins
     */
    static byAuthor(plugins: PluginMetadata[], author: string): PluginMetadata[];
    /**
     * Filter plugins that support async
     *
     * @param plugins - Plugins to filter
     * @returns Filtered plugins
     */
    static asyncOnly(plugins: PluginMetadata[]): PluginMetadata[];
    /**
     * Filter plugins that support parallel execution
     *
     * @param plugins - Plugins to filter
     * @returns Filtered plugins
     */
    static parallelOnly(plugins: PluginMetadata[]): PluginMetadata[];
    /**
     * Apply multiple filters
     *
     * @param plugins - Plugins to filter
     * @param query - Filter query
     * @returns Filtered plugins
     */
    static apply(plugins: PluginMetadata[], query: PluginQuery): PluginMetadata[];
}
/**
 * Sort plugins by various criteria
 */
export declare class PluginSorter {
    /**
     * Sort plugins by name
     *
     * @param plugins - Plugins to sort
     * @param ascending - Sort order
     * @returns Sorted plugins
     */
    static byName(plugins: PluginMetadata[], ascending?: boolean): PluginMetadata[];
    /**
     * Sort plugins by registration date
     *
     * @param plugins - Plugins to sort
     * @param ascending - Sort order
     * @returns Sorted plugins
     */
    static byDate(plugins: PluginMetadata[], ascending?: boolean): PluginMetadata[];
    /**
     * Sort plugins by category
     *
     * @param plugins - Plugins to sort
     * @returns Sorted plugins
     */
    static byCategory(plugins: PluginMetadata[]): PluginMetadata[];
}
/**
 * Plugin discovery helpers
 */
export declare class PluginDiscovery {
    /**
     * Find plugins related to a given plugin
     *
     * @param plugins - All plugins
     * @param pluginId - Plugin to find related plugins for
     * @returns Related plugins
     */
    static findRelated(plugins: PluginMetadata[], pluginId: string): PluginMetadata[];
    /**
     * Find plugins that depend on a given plugin
     *
     * @param plugins - All plugins
     * @param allExtensions - Map of extensions (for dependency info)
     * @param pluginId - Plugin to find dependents for
     * @returns Dependent plugins
     */
    static findDependents(plugins: PluginMetadata[], allExtensions: Map<string, {
        dependencies?: string[];
    }>, pluginId: string): PluginMetadata[];
    /**
     * Find missing dependencies for plugins
     *
     * @param plugins - Plugins to check
     * @param allExtensions - Map of all extensions
     * @returns Map of plugin ID to missing dependencies
     */
    static findMissingDependencies(plugins: PluginMetadata[], allExtensions: Map<string, {
        dependencies?: string[];
    }>): Map<string, string[]>;
    /**
     * Suggest plugins based on a user's current plugins
     *
     * @param currentPlugins - Currently used plugins
     * @param allPlugins - All available plugins
     * @returns Suggested plugins
     */
    static suggestPlugins(currentPlugins: PluginMetadata[], allPlugins: PluginMetadata[]): PluginMetadata[];
}
//# sourceMappingURL=discovery.d.ts.map