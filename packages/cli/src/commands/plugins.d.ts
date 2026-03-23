/**
 * Plugin Commands
 *
 * CLI commands for plugin management and discovery.
 *
 * @packageDocumentation
 */
import type { PluginCategory } from "glost-registry";
/**
 * List all available plugins
 */
export declare function listPlugins(options?: {
    category?: PluginCategory;
    language?: string;
    verbose?: boolean;
}): void;
/**
 * Search for plugins
 */
export declare function searchPlugins(keyword: string, options?: {
    category?: PluginCategory;
    language?: string;
    tags?: string[];
}): void;
/**
 * Show plugin information
 */
export declare function showPluginInfo(pluginId: string): void;
/**
 * Validate plugin combinations
 */
export declare function validatePlugins(pluginIds: string[]): void;
/**
 * Show registry statistics
 */
export declare function showStats(): void;
/**
 * Create a new plugin template
 */
export declare function createPluginTemplate(name: string): void;
//# sourceMappingURL=plugins.d.ts.map