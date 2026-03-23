/**
 * Plugin Registry Types
 * 
 * Type definitions for the enhanced plugin registry.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";

/**
 * Plugin category
 */
export type PluginCategory =
  | "transformer"
  | "enhancer"
  | "generator"
  | "analyzer"
  | "utility";

/**
 * Plugin metadata
 * 
 * Extended metadata for plugins beyond the basic extension interface.
 */
export interface PluginMetadata {
  /** Unique plugin identifier */
  id: string;
  
  /** Human-readable name */
  name: string;
  
  /** Plugin version (semver) */
  version: string;
  
  /** Description of what the plugin does */
  description: string;
  
  /** Plugin author */
  author?: string;
  
  /** Plugin repository URL */
  repository?: string;
  
  /** Plugin homepage/documentation URL */
  homepage?: string;
  
  /** Plugin category */
  category: PluginCategory;
  
  /** Tags for searching/filtering */
  tags: string[];
  
  /** Plugin capabilities */
  supports: PluginCapabilities;
  
  /** Dependencies */
  requires?: PluginRequirements;
  
  /** Conflicting plugins */
  conflicts?: string[];
  
  /** Configuration options schema */
  options?: PluginOptionsSchema;
  
  /** Usage examples */
  examples?: PluginExample[];
  
  /** When the plugin was registered */
  registeredAt?: Date;
}

/**
 * Plugin capabilities
 */
export interface PluginCapabilities {
  /** Supported language codes */
  languages?: string[];
  
  /** Supported node types */
  nodeTypes?: string[];
  
  /** Whether the plugin supports async operations */
  async: boolean;
  
  /** Whether the plugin can run in parallel with others */
  parallel?: boolean;
  
  /** Custom capabilities */
  custom?: Record<string, any>;
}

/**
 * Plugin requirements
 */
export interface PluginRequirements {
  /** Required plugins (IDs) */
  plugins?: string[];
  
  /** Required GLOST version (semver range) */
  glostVersion?: string;
  
  /** Required Node.js version (semver range) */
  nodeVersion?: string;
  
  /** Custom requirements */
  custom?: Record<string, any>;
}

/**
 * Plugin options schema
 */
export interface PluginOptionsSchema {
  /** Schema type */
  type: "object";
  
  /** Properties definition */
  properties?: Record<string, PropertySchema>;
  
  /** Required properties */
  required?: string[];
  
  /** Allow additional properties */
  additionalProperties?: boolean;
}

/**
 * Property schema
 */
export interface PropertySchema {
  /** Property type */
  type: "string" | "number" | "boolean" | "array" | "object";
  
  /** Property description */
  description?: string;
  
  /** Default value */
  default?: any;
  
  /** Enum values */
  enum?: any[];
  
  /** Array items schema */
  items?: PropertySchema;
  
  /** Object properties schema */
  properties?: Record<string, PropertySchema>;
}

/**
 * Plugin example
 */
export interface PluginExample {
  /** Example title */
  title: string;
  
  /** Example description */
  description?: string;
  
  /** Example code */
  code: string;
  
  /** Expected output description */
  output?: string;
}

/**
 * Plugin query for searching
 */
export interface PluginQuery {
  /** Search by keyword */
  keyword?: string;
  
  /** Filter by category */
  category?: PluginCategory;
  
  /** Filter by language support */
  language?: string;
  
  /** Filter by tags */
  tags?: string[];
  
  /** Filter by author */
  author?: string;
  
  /** Filter by capability */
  capability?: string;
}

/**
 * Conflict report
 */
export interface ConflictReport {
  /** Whether conflicts were found */
  hasConflicts: boolean;
  
  /** Conflict details */
  conflicts: PluginConflict[];
}

/**
 * Plugin conflict
 */
export interface PluginConflict {
  /** First plugin in conflict */
  plugin1: string;
  
  /** Second plugin in conflict */
  plugin2: string;
  
  /** Conflict reason */
  reason: string;
  
  /** Conflict severity */
  severity: "error" | "warning";
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  
  /** Validation errors */
  errors: ValidationError[];
  
  /** Validation warnings */
  warnings: ValidationWarning[];
}

/**
 * Validation error
 */
export interface ValidationError {
  /** Plugin ID */
  plugin: string;
  
  /** Error message */
  message: string;
  
  /** Error code */
  code: string;
}

/**
 * Validation warning
 */
export interface ValidationWarning {
  /** Plugin ID */
  plugin: string;
  
  /** Warning message */
  message: string;
  
  /** Warning code */
  code: string;
}

/**
 * Registry statistics
 */
export interface RegistryStatistics {
  /** Total number of plugins */
  total: number;
  
  /** Plugins by category */
  byCategory: Record<PluginCategory, number>;
  
  /** Plugins by language */
  byLanguage: Record<string, number>;
  
  /** Most popular tags */
  topTags: Array<{ tag: string; count: number }>;
}
