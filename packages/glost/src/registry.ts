/**
 * Registry exports
 * 
 * Re-exports the registry API for convenient access via glost/registry.
 */

export { pluginRegistry, PluginRegistry, PluginFilter, PluginSorter, PluginDiscovery, PluginValidator } from "glost-registry";
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
} from "glost-registry";
