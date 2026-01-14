/**
 * Enhanced Plugin Registry
 * 
 * Plugin registry with discovery, metadata, and validation capabilities.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-plugins";
import type {
  PluginMetadata,
  PluginQuery,
  PluginCategory,
  ConflictReport,
  PluginConflict,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  RegistryStatistics,
} from "./types.js";

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
export class PluginRegistry {
  private plugins = new Map<string, PluginMetadata>();
  private extensions = new Map<string, GLOSTExtension>();

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
  register(
    extension: GLOSTExtension,
    metadata: Omit<PluginMetadata, "id" | "name">
  ): void {
    const pluginMetadata: PluginMetadata = {
      ...metadata,
      id: extension.id,
      name: extension.name,
      description: extension.description || metadata.description,
      registeredAt: new Date(),
    };

    if (this.plugins.has(extension.id)) {
      console.warn(
        `Plugin "${extension.id}" is already registered. Overwriting.`
      );
    }

    this.plugins.set(extension.id, pluginMetadata);
    this.extensions.set(extension.id, extension);
  }

  /**
   * Get plugin metadata
   * 
   * @param pluginId - Plugin ID
   * @returns Plugin metadata or undefined
   */
  getMetadata(pluginId: string): PluginMetadata | undefined {
    return this.plugins.get(pluginId);
  }

  /**
   * Get plugin extension
   * 
   * @param pluginId - Plugin ID
   * @returns Plugin extension or undefined
   */
  getExtension(pluginId: string): GLOSTExtension | undefined {
    return this.extensions.get(pluginId);
  }

  /**
   * List all plugins
   * 
   * @returns Array of all plugin metadata
   */
  list(): PluginMetadata[] {
    return Array.from(this.plugins.values());
  }

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
  search(query: PluginQuery): PluginMetadata[] {
    let results = this.list();

    // Filter by keyword
    if (query.keyword) {
      const keyword = query.keyword.toLowerCase();
      results = results.filter((plugin) => {
        return (
          plugin.name.toLowerCase().includes(keyword) ||
          plugin.description.toLowerCase().includes(keyword) ||
          plugin.tags.some((tag) => tag.toLowerCase().includes(keyword))
        );
      });
    }

    // Filter by category
    if (query.category) {
      results = results.filter((plugin) => plugin.category === query.category);
    }

    // Filter by language
    if (query.language) {
      results = results.filter((plugin) => {
        return (
          !plugin.supports.languages ||
          plugin.supports.languages.includes(query.language!)
        );
      });
    }

    // Filter by tags
    if (query.tags && query.tags.length > 0) {
      results = results.filter((plugin) => {
        return query.tags!.some((tag) => plugin.tags.includes(tag));
      });
    }

    // Filter by author
    if (query.author) {
      results = results.filter((plugin) => plugin.author === query.author);
    }

    // Filter by capability
    if (query.capability) {
      results = results.filter((plugin) => {
        return plugin.supports.custom?.[query.capability!] === true;
      });
    }

    return results;
  }

  /**
   * Get plugins by category
   * 
   * @param category - Plugin category
   * @returns Array of plugin metadata
   */
  getByCategory(category: PluginCategory): PluginMetadata[] {
    return this.list().filter((plugin) => plugin.category === category);
  }

  /**
   * Get plugins that support a language
   * 
   * @param language - Language code
   * @returns Array of plugin metadata
   */
  getLanguageSupport(language: string): PluginMetadata[] {
    return this.list().filter((plugin) => {
      return (
        !plugin.supports.languages ||
        plugin.supports.languages.includes(language)
      );
    });
  }

  /**
   * Check if a plugin supports a language
   * 
   * @param pluginId - Plugin ID
   * @param language - Language code
   * @returns True if supported
   */
  isLanguageSupported(pluginId: string, language: string): boolean {
    const metadata = this.getMetadata(pluginId);
    if (!metadata) {
      return false;
    }
    return (
      !metadata.supports.languages ||
      metadata.supports.languages.includes(language)
    );
  }

  /**
   * Check plugin compatibility
   * 
   * @param pluginId - Plugin ID
   * @param version - Version to check (semver)
   * @returns True if compatible
   */
  isCompatible(pluginId: string, version: string): boolean {
    const metadata = this.getMetadata(pluginId);
    if (!metadata) {
      return false;
    }
    // Simple version check (could use semver library for proper range checking)
    return metadata.version === version || metadata.version >= version;
  }

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
  checkConflicts(pluginIds: string[]): ConflictReport {
    const conflicts: PluginConflict[] = [];

    for (let i = 0; i < pluginIds.length; i++) {
      const pluginId1 = pluginIds[i]!;
      const metadata1 = this.getMetadata(pluginId1);
      
      if (!metadata1) {
        continue;
      }

      for (let j = i + 1; j < pluginIds.length; j++) {
        const pluginId2 = pluginIds[j]!;
        const metadata2 = this.getMetadata(pluginId2);
        
        if (!metadata2) {
          continue;
        }

        // Check explicit conflicts
        if (metadata1.conflicts?.includes(pluginId2)) {
          conflicts.push({
            plugin1: pluginId1,
            plugin2: pluginId2,
            reason: `${pluginId1} declares conflict with ${pluginId2}`,
            severity: "error",
          });
        }

        if (metadata2.conflicts?.includes(pluginId1)) {
          conflicts.push({
            plugin1: pluginId2,
            plugin2: pluginId1,
            reason: `${pluginId2} declares conflict with ${pluginId1}`,
            severity: "error",
          });
        }

        // Check for field ownership conflicts
        const ext1 = this.getExtension(pluginId1);
        const ext2 = this.getExtension(pluginId2);
        
        if (ext1?.provides?.extras && ext2?.provides?.extras) {
          const sharedFields = ext1.provides.extras.filter((field) =>
            ext2.provides!.extras!.includes(field)
          );
          
          if (sharedFields.length > 0) {
            conflicts.push({
              plugin1: pluginId1,
              plugin2: pluginId2,
              reason: `Both plugins provide the same fields: ${sharedFields.join(", ")}`,
              severity: "warning",
            });
          }
        }
      }
    }

    return {
      hasConflicts: conflicts.length > 0,
      conflicts,
    };
  }

  /**
   * Resolve dependencies for plugins
   * 
   * @param pluginIds - Plugin IDs to resolve
   * @returns Array of plugin IDs in dependency order
   * @throws {Error} If circular dependencies detected or plugin not found
   */
  resolveDependencies(pluginIds: string[]): string[] {
    const resolved: string[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (id: string): void => {
      if (visiting.has(id)) {
        throw new Error(
          `Circular dependency detected involving plugin: ${id}`
        );
      }

      if (visited.has(id)) {
        return;
      }

      const extension = this.getExtension(id);
      if (!extension) {
        throw new Error(`Plugin "${id}" not found in registry`);
      }

      visiting.add(id);

      // Visit dependencies first
      if (extension.dependencies) {
        for (const depId of extension.dependencies) {
          if (!pluginIds.includes(depId)) {
            // Dependency not in the list, skip
            continue;
          }
          visit(depId);
        }
      }

      visiting.delete(id);
      visited.add(id);
      resolved.push(id);
    };

    for (const id of pluginIds) {
      visit(id);
    }

    return resolved;
  }

  /**
   * Validate a plugin configuration
   * 
   * @param pluginId - Plugin ID
   * @param options - Plugin options to validate
   * @returns Validation result
   */
  validate(pluginId: string, options?: any): ValidationResult {
    const metadata = this.getMetadata(pluginId);
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!metadata) {
      errors.push({
        plugin: pluginId,
        message: `Plugin "${pluginId}" not found in registry`,
        code: "PLUGIN_NOT_FOUND",
      });
      return { valid: false, errors, warnings };
    }

    // Validate options against schema
    if (metadata.options && options) {
      const schema = metadata.options;
      
      // Check required properties
      if (schema.required) {
        for (const required of schema.required) {
          if (!(required in options)) {
            errors.push({
              plugin: pluginId,
              message: `Required option "${required}" is missing`,
              code: "MISSING_REQUIRED_OPTION",
            });
          }
        }
      }

      // Check property types (basic validation)
      if (schema.properties) {
        for (const [key, value] of Object.entries(options)) {
          const propSchema = schema.properties[key];
          if (!propSchema) {
            if (!schema.additionalProperties) {
              warnings.push({
                plugin: pluginId,
                message: `Unknown option "${key}"`,
                code: "UNKNOWN_OPTION",
              });
            }
            continue;
          }

          const actualType = typeof value;
          const expectedType = propSchema.type;
          
          if (
            actualType !== expectedType &&
            !(expectedType === "array" && Array.isArray(value))
          ) {
            errors.push({
              plugin: pluginId,
              message: `Option "${key}" should be ${expectedType}, got ${actualType}`,
              code: "INVALID_OPTION_TYPE",
            });
          }
        }
      }
    }

    // Check requirements
    if (metadata.requires?.glostVersion) {
      // Could check against actual glost version
      // For now, just emit a warning
      warnings.push({
        plugin: pluginId,
        message: `Plugin requires GLOST version ${metadata.requires.glostVersion}`,
        code: "VERSION_REQUIREMENT",
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Get registry statistics
   * 
   * @returns Registry statistics
   */
  getStatistics(): RegistryStatistics {
    const plugins = this.list();
    
    const byCategory: Record<PluginCategory, number> = {
      transformer: 0,
      enhancer: 0,
      generator: 0,
      analyzer: 0,
      utility: 0,
    };
    
    const byLanguage: Record<string, number> = {};
    const tagCounts: Record<string, number> = {};

    for (const plugin of plugins) {
      byCategory[plugin.category]++;
      
      if (plugin.supports.languages) {
        for (const lang of plugin.supports.languages) {
          byLanguage[lang] = (byLanguage[lang] || 0) + 1;
        }
      }
      
      for (const tag of plugin.tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    return {
      total: plugins.length,
      byCategory,
      byLanguage,
      topTags,
    };
  }

  /**
   * Check if a plugin is registered
   * 
   * @param pluginId - Plugin ID
   * @returns True if registered
   */
  has(pluginId: string): boolean {
    return this.plugins.has(pluginId);
  }

  /**
   * Unregister a plugin
   * 
   * @param pluginId - Plugin ID
   * @returns True if unregistered
   */
  unregister(pluginId: string): boolean {
    const hasPlugin = this.plugins.has(pluginId);
    this.plugins.delete(pluginId);
    this.extensions.delete(pluginId);
    return hasPlugin;
  }

  /**
   * Clear all plugins
   */
  clear(): void {
    this.plugins.clear();
    this.extensions.clear();
  }
}

/**
 * Global plugin registry instance
 */
export const pluginRegistry = new PluginRegistry();
