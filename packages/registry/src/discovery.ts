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
export class PluginFilter {
  /**
   * Filter plugins by keyword
   * 
   * @param plugins - Plugins to filter
   * @param keyword - Keyword to search for
   * @returns Filtered plugins
   */
  static byKeyword(plugins: PluginMetadata[], keyword: string): PluginMetadata[] {
    const lowerKeyword = keyword.toLowerCase();
    return plugins.filter((plugin) => {
      return (
        plugin.name.toLowerCase().includes(lowerKeyword) ||
        plugin.description.toLowerCase().includes(lowerKeyword) ||
        plugin.id.toLowerCase().includes(lowerKeyword) ||
        plugin.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
      );
    });
  }

  /**
   * Filter plugins by category
   * 
   * @param plugins - Plugins to filter
   * @param category - Category to filter by
   * @returns Filtered plugins
   */
  static byCategory(
    plugins: PluginMetadata[],
    category: PluginCategory
  ): PluginMetadata[] {
    return plugins.filter((plugin) => plugin.category === category);
  }

  /**
   * Filter plugins by language support
   * 
   * @param plugins - Plugins to filter
   * @param language - Language code
   * @returns Filtered plugins
   */
  static byLanguage(plugins: PluginMetadata[], language: string): PluginMetadata[] {
    return plugins.filter((plugin) => {
      return (
        !plugin.supports.languages ||
        plugin.supports.languages.includes(language)
      );
    });
  }

  /**
   * Filter plugins by tags
   * 
   * @param plugins - Plugins to filter
   * @param tags - Tags to match (any)
   * @returns Filtered plugins
   */
  static byTags(plugins: PluginMetadata[], tags: string[]): PluginMetadata[] {
    return plugins.filter((plugin) => {
      return tags.some((tag) => plugin.tags.includes(tag));
    });
  }

  /**
   * Filter plugins by author
   * 
   * @param plugins - Plugins to filter
   * @param author - Author name
   * @returns Filtered plugins
   */
  static byAuthor(plugins: PluginMetadata[], author: string): PluginMetadata[] {
    return plugins.filter((plugin) => plugin.author === author);
  }

  /**
   * Filter plugins that support async
   * 
   * @param plugins - Plugins to filter
   * @returns Filtered plugins
   */
  static asyncOnly(plugins: PluginMetadata[]): PluginMetadata[] {
    return plugins.filter((plugin) => plugin.supports.async);
  }

  /**
   * Filter plugins that support parallel execution
   * 
   * @param plugins - Plugins to filter
   * @returns Filtered plugins
   */
  static parallelOnly(plugins: PluginMetadata[]): PluginMetadata[] {
    return plugins.filter((plugin) => plugin.supports.parallel);
  }

  /**
   * Apply multiple filters
   * 
   * @param plugins - Plugins to filter
   * @param query - Filter query
   * @returns Filtered plugins
   */
  static apply(plugins: PluginMetadata[], query: PluginQuery): PluginMetadata[] {
    let result = plugins;

    if (query.keyword) {
      result = this.byKeyword(result, query.keyword);
    }

    if (query.category) {
      result = this.byCategory(result, query.category);
    }

    if (query.language) {
      result = this.byLanguage(result, query.language);
    }

    if (query.tags && query.tags.length > 0) {
      result = this.byTags(result, query.tags);
    }

    if (query.author) {
      result = this.byAuthor(result, query.author);
    }

    return result;
  }
}

/**
 * Sort plugins by various criteria
 */
export class PluginSorter {
  /**
   * Sort plugins by name
   * 
   * @param plugins - Plugins to sort
   * @param ascending - Sort order
   * @returns Sorted plugins
   */
  static byName(plugins: PluginMetadata[], ascending = true): PluginMetadata[] {
    return [...plugins].sort((a, b) => {
      const result = a.name.localeCompare(b.name);
      return ascending ? result : -result;
    });
  }

  /**
   * Sort plugins by registration date
   * 
   * @param plugins - Plugins to sort
   * @param ascending - Sort order
   * @returns Sorted plugins
   */
  static byDate(plugins: PluginMetadata[], ascending = true): PluginMetadata[] {
    return [...plugins].sort((a, b) => {
      const dateA = a.registeredAt?.getTime() || 0;
      const dateB = b.registeredAt?.getTime() || 0;
      const result = dateA - dateB;
      return ascending ? result : -result;
    });
  }

  /**
   * Sort plugins by category
   * 
   * @param plugins - Plugins to sort
   * @returns Sorted plugins
   */
  static byCategory(plugins: PluginMetadata[]): PluginMetadata[] {
    const order: PluginCategory[] = [
      "generator",
      "transformer",
      "enhancer",
      "analyzer",
      "utility",
    ];
    
    return [...plugins].sort((a, b) => {
      return order.indexOf(a.category) - order.indexOf(b.category);
    });
  }
}

/**
 * Plugin discovery helpers
 */
export class PluginDiscovery {
  /**
   * Find plugins related to a given plugin
   * 
   * @param plugins - All plugins
   * @param pluginId - Plugin to find related plugins for
   * @returns Related plugins
   */
  static findRelated(
    plugins: PluginMetadata[],
    pluginId: string
  ): PluginMetadata[] {
    const plugin = plugins.find((p) => p.id === pluginId);
    if (!plugin) {
      return [];
    }

    // Find plugins with similar tags
    return plugins.filter((p) => {
      if (p.id === pluginId) {
        return false;
      }
      
      const sharedTags = plugin.tags.filter((tag) => p.tags.includes(tag));
      return sharedTags.length > 0;
    });
  }

  /**
   * Find plugins that depend on a given plugin
   * 
   * @param plugins - All plugins
   * @param allExtensions - Map of extensions (for dependency info)
   * @param pluginId - Plugin to find dependents for
   * @returns Dependent plugins
   */
  static findDependents(
    plugins: PluginMetadata[],
    allExtensions: Map<string, { dependencies?: string[] }>,
    pluginId: string
  ): PluginMetadata[] {
    return plugins.filter((p) => {
      const ext = allExtensions.get(p.id);
      return ext?.dependencies?.includes(pluginId);
    });
  }

  /**
   * Find missing dependencies for plugins
   * 
   * @param plugins - Plugins to check
   * @param allExtensions - Map of all extensions
   * @returns Map of plugin ID to missing dependencies
   */
  static findMissingDependencies(
    plugins: PluginMetadata[],
    allExtensions: Map<string, { dependencies?: string[] }>
  ): Map<string, string[]> {
    const missing = new Map<string, string[]>();
    const availableIds = new Set(plugins.map((p) => p.id));

    for (const plugin of plugins) {
      const ext = allExtensions.get(plugin.id);
      if (ext?.dependencies) {
        const missingDeps = ext.dependencies.filter(
          (dep) => !availableIds.has(dep)
        );
        if (missingDeps.length > 0) {
          missing.set(plugin.id, missingDeps);
        }
      }
    }

    return missing;
  }

  /**
   * Suggest plugins based on a user's current plugins
   * 
   * @param currentPlugins - Currently used plugins
   * @param allPlugins - All available plugins
   * @returns Suggested plugins
   */
  static suggestPlugins(
    currentPlugins: PluginMetadata[],
    allPlugins: PluginMetadata[]
  ): PluginMetadata[] {
    if (currentPlugins.length === 0) {
      return [];
    }

    // Collect all tags from current plugins
    const currentTags = new Set<string>();
    for (const plugin of currentPlugins) {
      plugin.tags.forEach((tag) => currentTags.add(tag));
    }

    // Find plugins with similar tags that aren't already used
    const currentIds = new Set(currentPlugins.map((p) => p.id));
    const suggestions = allPlugins.filter((plugin) => {
      if (currentIds.has(plugin.id)) {
        return false;
      }
      
      const matchingTags = plugin.tags.filter((tag) => currentTags.has(tag));
      return matchingTags.length > 0;
    });

    // Sort by number of matching tags
    return suggestions.sort((a, b) => {
      const aMatches = a.tags.filter((tag) => currentTags.has(tag)).length;
      const bMatches = b.tags.filter((tag) => currentTags.has(tag)).length;
      return bMatches - aMatches;
    });
  }
}
