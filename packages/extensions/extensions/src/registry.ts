/**
 * Extension Registry
 * 
 * Manages registration and lookup of GLOST extensions.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "./types";

/**
 * Extension registry class
 * 
 * Manages a collection of GLOST extensions with support for dependency resolution.
 * 
 * @example
 * ```typescript
 * const registry = new ExtensionRegistry();
 * registry.register(ReadingScoreExtension);
 * const ext = registry.get("reading-score");
 * ```
 * 
 * @since 0.0.1
 */
class ExtensionRegistry {
  private extensions = new Map<string, GLOSTExtension>();

  /**
   * Register an extension
   * 
   * Registers an extension with the registry. If an extension with the same ID
   * already exists, it will be overwritten and a warning will be logged.
   * 
   * @param extension - The extension to register
   * 
   * @example
   * ```typescript
   * registry.register({
   *   id: "my-extension",
   *   name: "My Extension",
   *   enhanceMetadata: (node) => ({ custom: "value" })
   * });
   * ```
   */
  register(extension: GLOSTExtension): void {
    if (this.extensions.has(extension.id)) {
      console.warn(
        `Extension with ID "${extension.id}" is already registered. Overwriting.`,
      );
    }
    this.extensions.set(extension.id, extension);
  }

  /**
   * Register multiple extensions
   * 
   * Registers multiple extensions at once. Each extension is registered
   * individually, so duplicates will overwrite previous registrations.
   * 
   * @param extensions - Array of extensions to register
   * 
   * @example
   * ```typescript
   * registry.registerAll([
   *   ReadingScoreExtension,
   *   LearnerHintsExtension,
   *   ClauseAnalysisExtension
   * ]);
   * ```
   */
  registerAll(extensions: GLOSTExtension[]): void {
    for (const extension of extensions) {
      this.register(extension);
    }
  }

  /**
   * Get an extension by ID
   * 
   * Retrieves a registered extension by its ID.
   * 
   * @param id - The extension ID to look up
   * @returns The extension if found, `undefined` otherwise
   * 
   * @example
   * ```typescript
   * const ext = registry.get("frequency");
   * if (ext) {
   *   console.log(ext.name);
   * }
   * ```
   */
  get(id: string): GLOSTExtension | undefined {
    return this.extensions.get(id);
  }

  /**
   * Get all registered extensions
   * 
   * Returns an array of all currently registered extensions.
   * 
   * @returns Array of all registered extensions
   * 
   * @example
   * ```typescript
   * const all = registry.getAll();
   * console.log(`Registered ${all.length} extensions`);
   * ```
   */
  getAll(): GLOSTExtension[] {
    return Array.from(this.extensions.values());
  }

  /**
   * Check if an extension is registered
   * 
   * Checks whether an extension with the given ID is registered.
   * 
   * @param id - The extension ID to check
   * @returns `true` if the extension is registered, `false` otherwise
   * 
   * @example
   * ```typescript
   * if (registry.has("frequency")) {
   *   // Extension is registered
   * }
   * ```
   */
  has(id: string): boolean {
    return this.extensions.has(id);
  }

  /**
   * Remove an extension
   * 
   * Unregisters an extension by its ID.
   * 
   * @param id - The extension ID to remove
   * @returns `true` if the extension was removed, `false` if it wasn't found
   * 
   * @example
   * ```typescript
   * if (registry.unregister("my-extension")) {
   *   console.log("Extension removed");
   * }
   * ```
   */
  unregister(id: string): boolean {
    return this.extensions.delete(id);
  }

  /**
   * Clear all extensions
   * 
   * Removes all registered extensions from the registry.
   * 
   * @example
   * ```typescript
   * registry.clear();
   * console.log(registry.getAll().length); // 0
   * ```
   */
  clear(): void {
    this.extensions.clear();
  }

  /**
   * Resolve extension dependencies
   * 
   * Returns extensions in dependency order using topological sort.
   * Dependencies are processed before dependents. Circular dependencies
   * are detected and will throw an error.
   * 
   * @param extensionIds - Array of extension IDs to resolve
   * @returns Array of extension IDs in dependency order
   * 
   * @throws {Error} If circular dependencies are detected
   * @throws {Error} If an extension ID is not found
   * 
   * @example
   * ```typescript
   * // If extensionB depends on extensionA:
   * const ordered = registry.resolveDependencies(["extensionB", "extensionA"]);
   * // Returns: ["extensionA", "extensionB"]
   * ```
   * 
   * @example
   * ```typescript
   * // Circular dependency throws error:
   * try {
   *   registry.resolveDependencies(["a", "b"]); // a depends on b, b depends on a
   * } catch (error) {
   *   console.error("Circular dependency detected");
   * }
   * ```
   */
  resolveDependencies(extensionIds: string[]): string[] {
    const resolved: string[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (id: string): void => {
      if (visiting.has(id)) {
        throw new Error(
          `Circular dependency detected in extensions: ${id}`,
        );
      }

      if (visited.has(id)) {
        return;
      }

      const extension = this.get(id);
      if (!extension) {
        throw new Error(`Extension "${id}" not found`);
      }

      visiting.add(id);

      // Visit dependencies first
      if (extension.dependencies) {
        for (const depId of extension.dependencies) {
          if (!extensionIds.includes(depId)) {
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

    for (const id of extensionIds) {
      visit(id);
    }

    return resolved;
  }
}

/**
 * Global extension registry instance
 * 
 * Singleton instance of the extension registry. Use this for global
 * extension management, or create your own instance for isolated registries.
 * 
 * @example
 * ```typescript
 * import { extensionRegistry } from "glost-extensions/registry";
 * 
 * extensionRegistry.register(MyExtension);
 * const ext = extensionRegistry.get("my-extension");
 * ```
 * 
 * @since 0.0.1
 */
export const extensionRegistry = new ExtensionRegistry();

/**
 * Register an extension
 * 
 * Convenience function that registers an extension with the global registry.
 * 
 * @param extension - The extension to register
 * 
 * @example
 * ```typescript
 * import { registerExtension } from "glost-extensions/registry";
 * 
 * registerExtension({
 *   id: "my-extension",
 *   name: "My Extension",
 *   enhanceMetadata: (node) => ({ custom: "value" })
 * });
 * ```
 * 
 * @see {@link extensionRegistry} - Global registry instance
 * 
 * @since 0.0.1
 */
export function registerExtension(extension: GLOSTExtension): void {
  extensionRegistry.register(extension);
}

/**
 * Register multiple extensions
 * 
 * Convenience function that registers multiple extensions with the global registry.
 * 
 * @param extensions - Array of extensions to register
 * 
 * @example
 * ```typescript
 * import { registerExtensions } from "glost-extensions/registry";
 * 
 * registerExtensions([
 *   ReadingScoreExtension,
 *   LearnerHintsExtension,
 *   ClauseAnalysisExtension
 * ]);
 * ```
 * 
 * @see {@link extensionRegistry} - Global registry instance
 * 
 * @since 0.0.1
 */
export function registerExtensions(extensions: GLOSTExtension[]): void {
  extensionRegistry.registerAll(extensions);
}

/**
 * Get an extension by ID
 * 
 * Convenience function that retrieves an extension from the global registry.
 * 
 * @param id - The extension ID to look up
 * @returns The extension if found, `undefined` otherwise
 * 
 * @example
 * ```typescript
 * import { getExtension } from "glost-extensions/registry";
 * 
 * const ext = getExtension("frequency");
 * if (ext) {
 *   console.log(ext.name);
 * }
 * ```
 * 
 * @see {@link extensionRegistry} - Global registry instance
 * 
 * @since 0.0.1
 */
export function getExtension(id: string): GLOSTExtension | undefined {
  return extensionRegistry.get(id);
}

/**
 * Get all registered extensions
 * 
 * Convenience function that retrieves all extensions from the global registry.
 * 
 * @returns Array of all registered extensions
 * 
 * @example
 * ```typescript
 * import { getAllExtensions } from "glost-extensions/registry";
 * 
 * const all = getAllExtensions();
 * console.log(`Registered ${all.length} extensions`);
 * ```
 * 
 * @see {@link extensionRegistry} - Global registry instance
 * 
 * @since 0.0.1
 */
export function getAllExtensions(): GLOSTExtension[] {
  return extensionRegistry.getAll();
}

