/**
 * Plugin Validation
 * 
 * Validation utilities for plugin configurations and dependencies.
 * 
 * @packageDocumentation
 */

import type {
  PluginMetadata,
  ValidationResult,
  ValidationError,
  ValidationWarning,
} from "./types.js";

/**
 * Plugin validator
 */
export class PluginValidator {
  /**
   * Validate plugin metadata
   * 
   * @param metadata - Plugin metadata to validate
   * @returns Validation result
   */
  static validateMetadata(metadata: PluginMetadata): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check required fields
    if (!metadata.id) {
      errors.push({
        plugin: metadata.id || "unknown",
        message: "Plugin ID is required",
        code: "MISSING_ID",
      });
    }

    if (!metadata.name) {
      errors.push({
        plugin: metadata.id,
        message: "Plugin name is required",
        code: "MISSING_NAME",
      });
    }

    if (!metadata.version) {
      errors.push({
        plugin: metadata.id,
        message: "Plugin version is required",
        code: "MISSING_VERSION",
      });
    }

    if (!metadata.description) {
      warnings.push({
        plugin: metadata.id,
        message: "Plugin description is recommended",
        code: "MISSING_DESCRIPTION",
      });
    }

    // Validate version format (basic semver check)
    if (metadata.version && !/^\d+\.\d+\.\d+/.test(metadata.version)) {
      warnings.push({
        plugin: metadata.id,
        message: "Version should follow semver format (e.g., 1.0.0)",
        code: "INVALID_VERSION_FORMAT",
      });
    }

    // Validate category
    const validCategories = [
      "transformer",
      "enhancer",
      "generator",
      "analyzer",
      "utility",
    ];
    if (!validCategories.includes(metadata.category)) {
      errors.push({
        plugin: metadata.id,
        message: `Invalid category "${metadata.category}". Must be one of: ${validCategories.join(", ")}`,
        code: "INVALID_CATEGORY",
      });
    }

    // Validate tags
    if (!metadata.tags || metadata.tags.length === 0) {
      warnings.push({
        plugin: metadata.id,
        message: "At least one tag is recommended for discoverability",
        code: "MISSING_TAGS",
      });
    }

    // Validate URLs
    if (metadata.repository && !this.isValidUrl(metadata.repository)) {
      warnings.push({
        plugin: metadata.id,
        message: "Repository URL appears to be invalid",
        code: "INVALID_REPOSITORY_URL",
      });
    }

    if (metadata.homepage && !this.isValidUrl(metadata.homepage)) {
      warnings.push({
        plugin: metadata.id,
        message: "Homepage URL appears to be invalid",
        code: "INVALID_HOMEPAGE_URL",
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate plugin compatibility with system
   * 
   * @param metadata - Plugin metadata
   * @param glostVersion - Current GLOST version
   * @param nodeVersion - Current Node.js version
   * @returns Validation result
   */
  static validateCompatibility(
    metadata: PluginMetadata,
    glostVersion?: string,
    nodeVersion?: string
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check GLOST version requirement
    if (metadata.requires?.glostVersion && glostVersion) {
      if (!this.isVersionCompatible(glostVersion, metadata.requires.glostVersion)) {
        errors.push({
          plugin: metadata.id,
          message: `Plugin requires GLOST ${metadata.requires.glostVersion}, but ${glostVersion} is installed`,
          code: "INCOMPATIBLE_GLOST_VERSION",
        });
      }
    }

    // Check Node.js version requirement
    if (metadata.requires?.nodeVersion && nodeVersion) {
      if (!this.isVersionCompatible(nodeVersion, metadata.requires.nodeVersion)) {
        errors.push({
          plugin: metadata.id,
          message: `Plugin requires Node.js ${metadata.requires.nodeVersion}, but ${nodeVersion} is running`,
          code: "INCOMPATIBLE_NODE_VERSION",
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate plugin dependencies
   * 
   * @param metadata - Plugin metadata
   * @param availablePlugins - Set of available plugin IDs
   * @returns Validation result
   */
  static validateDependencies(
    metadata: PluginMetadata,
    availablePlugins: Set<string>
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (metadata.requires?.plugins) {
      for (const dep of metadata.requires.plugins) {
        if (!availablePlugins.has(dep)) {
          errors.push({
            plugin: metadata.id,
            message: `Required plugin "${dep}" is not available`,
            code: "MISSING_DEPENDENCY",
          });
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Check if a version is compatible with a requirement
   * 
   * @param version - Actual version
   * @param requirement - Required version or range
   * @returns True if compatible
   */
  private static isVersionCompatible(
    version: string,
    requirement: string
  ): boolean {
    // Simple comparison - in production would use semver library
    // For now, just check if version >= requirement
    const versionParts = version.split(".").map(Number);
    const requirementParts = requirement.replace(/[^\d.]/g, "").split(".").map(Number);

    for (let i = 0; i < 3; i++) {
      const v = versionParts[i] || 0;
      const r = requirementParts[i] || 0;
      
      if (v > r) return true;
      if (v < r) return false;
    }

    return true;
  }

  /**
   * Check if a string is a valid URL
   * 
   * @param url - URL to check
   * @returns True if valid
   */
  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
