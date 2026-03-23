/**
 * Plugin Validation
 *
 * Validation utilities for plugin configurations and dependencies.
 *
 * @packageDocumentation
 */
import type { PluginMetadata, ValidationResult } from "./types.js";
/**
 * Plugin validator
 */
export declare class PluginValidator {
    /**
     * Validate plugin metadata
     *
     * @param metadata - Plugin metadata to validate
     * @returns Validation result
     */
    static validateMetadata(metadata: PluginMetadata): ValidationResult;
    /**
     * Validate plugin compatibility with system
     *
     * @param metadata - Plugin metadata
     * @param glostVersion - Current GLOST version
     * @param nodeVersion - Current Node.js version
     * @returns Validation result
     */
    static validateCompatibility(metadata: PluginMetadata, glostVersion?: string, nodeVersion?: string): ValidationResult;
    /**
     * Validate plugin dependencies
     *
     * @param metadata - Plugin metadata
     * @param availablePlugins - Set of available plugin IDs
     * @returns Validation result
     */
    static validateDependencies(metadata: PluginMetadata, availablePlugins: Set<string>): ValidationResult;
    /**
     * Check if a version is compatible with a requirement
     *
     * @param version - Actual version
     * @param requirement - Required version or range
     * @returns True if compatible
     */
    private static isVersionCompatible;
    /**
     * Check if a string is a valid URL
     *
     * @param url - URL to check
     * @returns True if valid
     */
    private static isValidUrl;
}
//# sourceMappingURL=validation.d.ts.map