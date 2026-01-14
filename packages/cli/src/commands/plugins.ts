/**
 * Plugin Commands
 * 
 * CLI commands for plugin management and discovery.
 * 
 * @packageDocumentation
 */

import { pluginRegistry } from "glost-registry";
import type { PluginCategory } from "glost-registry";

/**
 * List all available plugins
 */
export function listPlugins(options?: {
  category?: PluginCategory;
  language?: string;
  verbose?: boolean;
}): void {
  let plugins = pluginRegistry.list();

  // Filter by category
  if (options?.category) {
    plugins = plugins.filter((p) => p.category === options.category);
  }

  // Filter by language
  if (options?.language) {
    plugins = pluginRegistry.getLanguageSupport(options.language);
  }

  if (plugins.length === 0) {
    console.log("No plugins found.");
    return;
  }

  console.log(`\nFound ${plugins.length} plugin(s):\n`);

  for (const plugin of plugins) {
    if (options?.verbose) {
      console.log(`${plugin.name} (${plugin.id})`);
      console.log(`  Version: ${plugin.version}`);
      console.log(`  Category: ${plugin.category}`);
      console.log(`  Description: ${plugin.description}`);
      if (plugin.author) {
        console.log(`  Author: ${plugin.author}`);
      }
      if (plugin.tags.length > 0) {
        console.log(`  Tags: ${plugin.tags.join(", ")}`);
      }
      if (plugin.supports.languages) {
        console.log(`  Languages: ${plugin.supports.languages.join(", ")}`);
      }
      console.log();
    } else {
      console.log(
        `  ${plugin.name.padEnd(30)} ${plugin.id.padEnd(25)} ${plugin.version}`
      );
    }
  }
}

/**
 * Search for plugins
 */
export function searchPlugins(keyword: string, options?: {
  category?: PluginCategory;
  language?: string;
  tags?: string[];
}): void {
  const results = pluginRegistry.search({
    keyword,
    category: options?.category,
    language: options?.language,
    tags: options?.tags,
  });

  if (results.length === 0) {
    console.log(`No plugins found matching "${keyword}".`);
    return;
  }

  console.log(`\nFound ${results.length} plugin(s) matching "${keyword}":\n`);

  for (const plugin of results) {
    console.log(`${plugin.name} (${plugin.id})`);
    console.log(`  ${plugin.description}`);
    console.log(`  Category: ${plugin.category} | Version: ${plugin.version}`);
    if (plugin.tags.length > 0) {
      console.log(`  Tags: ${plugin.tags.join(", ")}`);
    }
    console.log();
  }
}

/**
 * Show plugin information
 */
export function showPluginInfo(pluginId: string): void {
  const metadata = pluginRegistry.getMetadata(pluginId);

  if (!metadata) {
    console.error(`Plugin "${pluginId}" not found.`);
    return;
  }

  console.log(`\n${metadata.name}`);
  console.log("=".repeat(metadata.name.length));
  console.log();
  console.log(`ID: ${metadata.id}`);
  console.log(`Version: ${metadata.version}`);
  console.log(`Category: ${metadata.category}`);
  console.log(`Description: ${metadata.description}`);
  
  if (metadata.author) {
    console.log(`Author: ${metadata.author}`);
  }
  
  if (metadata.repository) {
    console.log(`Repository: ${metadata.repository}`);
  }
  
  if (metadata.homepage) {
    console.log(`Homepage: ${metadata.homepage}`);
  }

  console.log();
  console.log("Capabilities:");
  console.log(`  Async: ${metadata.supports.async ? "Yes" : "No"}`);
  console.log(`  Parallel: ${metadata.supports.parallel ? "Yes" : "No"}`);
  
  if (metadata.supports.languages) {
    console.log(`  Languages: ${metadata.supports.languages.join(", ")}`);
  }
  
  if (metadata.supports.nodeTypes) {
    console.log(`  Node Types: ${metadata.supports.nodeTypes.join(", ")}`);
  }

  if (metadata.tags.length > 0) {
    console.log();
    console.log(`Tags: ${metadata.tags.join(", ")}`);
  }

  if (metadata.requires) {
    console.log();
    console.log("Requirements:");
    
    if (metadata.requires.plugins) {
      console.log(`  Plugins: ${metadata.requires.plugins.join(", ")}`);
    }
    
    if (metadata.requires.glostVersion) {
      console.log(`  GLOST Version: ${metadata.requires.glostVersion}`);
    }
    
    if (metadata.requires.nodeVersion) {
      console.log(`  Node.js Version: ${metadata.requires.nodeVersion}`);
    }
  }

  if (metadata.conflicts && metadata.conflicts.length > 0) {
    console.log();
    console.log(`Conflicts with: ${metadata.conflicts.join(", ")}`);
  }

  if (metadata.examples && metadata.examples.length > 0) {
    console.log();
    console.log("Examples:");
    for (const example of metadata.examples) {
      console.log(`\n  ${example.title}`);
      if (example.description) {
        console.log(`  ${example.description}`);
      }
      console.log();
      console.log("  ```typescript");
      console.log(example.code.split("\n").map((line) => `  ${line}`).join("\n"));
      console.log("  ```");
    }
  }

  console.log();
}

/**
 * Validate plugin combinations
 */
export function validatePlugins(pluginIds: string[]): void {
  console.log(`\nValidating plugins: ${pluginIds.join(", ")}\n`);

  // Check if all plugins exist
  const missing: string[] = [];
  for (const id of pluginIds) {
    if (!pluginRegistry.has(id)) {
      missing.push(id);
    }
  }

  if (missing.length > 0) {
    console.error(`❌ Missing plugins: ${missing.join(", ")}`);
    return;
  }

  console.log("✓ All plugins found");

  // Check for conflicts
  const conflictReport = pluginRegistry.checkConflicts(pluginIds);
  
  if (conflictReport.hasConflicts) {
    console.log(`\n⚠️  Found ${conflictReport.conflicts.length} conflict(s):\n`);
    
    for (const conflict of conflictReport.conflicts) {
      const icon = conflict.severity === "error" ? "❌" : "⚠️ ";
      console.log(`${icon} ${conflict.plugin1} <-> ${conflict.plugin2}`);
      console.log(`   ${conflict.reason}`);
    }
  } else {
    console.log("✓ No conflicts detected");
  }

  // Resolve dependencies
  try {
    const ordered = pluginRegistry.resolveDependencies(pluginIds);
    console.log("\n✓ Dependency resolution successful");
    console.log(`\nExecution order: ${ordered.join(" → ")}`);
  } catch (error) {
    console.error(`\n❌ Dependency resolution failed:`);
    console.error(`   ${error instanceof Error ? error.message : String(error)}`);
  }

  console.log();
}

/**
 * Show registry statistics
 */
export function showStats(): void {
  const stats = pluginRegistry.getStatistics();

  console.log("\nGLOST Plugin Registry Statistics");
  console.log("=".repeat(35));
  console.log();
  console.log(`Total Plugins: ${stats.total}`);
  console.log();
  console.log("By Category:");
  for (const [category, count] of Object.entries(stats.byCategory)) {
    if (count > 0) {
      console.log(`  ${category.padEnd(15)} ${count}`);
    }
  }
  
  if (Object.keys(stats.byLanguage).length > 0) {
    console.log();
    console.log("By Language:");
    for (const [lang, count] of Object.entries(stats.byLanguage)) {
      console.log(`  ${lang.padEnd(15)} ${count}`);
    }
  }

  if (stats.topTags.length > 0) {
    console.log();
    console.log("Top Tags:");
    for (const { tag, count } of stats.topTags) {
      console.log(`  ${tag.padEnd(15)} ${count}`);
    }
  }

  console.log();
}

/**
 * Create a new plugin template
 */
export function createPluginTemplate(name: string): void {
  const template = `/**
 * ${name}
 * 
 * TODO: Add description
 */

import type { GLOSTExtension } from "glost-plugins";

export const ${name}Extension: GLOSTExtension = {
  id: "${name.toLowerCase()}",
  name: "${name}",
  description: "TODO: Add description",
  
  // TODO: Implement transform, visit, or enhanceMetadata
  transform: (tree) => {
    // Transform the document tree
    return tree;
  },
  
  // Optional: Declare dependencies
  // dependencies: ["other-plugin"],
  
  // Optional: Declare requirements
  // requires: {
  //   extras: ["field-name"],
  //   metadata: ["metadata-field"],
  // },
  
  // Optional: Declare what this extension provides
  // provides: {
  //   extras: ["my-field"],
  // },
};

// Export as a plugin function
export function ${name.toLowerCase()}(options?: {
  // TODO: Add options
}) {
  return (pluginOptions?: any): GLOSTExtension => {
    return {
      ...${name}Extension,
      options: { ...options, ...pluginOptions },
    };
  };
}
`;

  console.log(template);
  console.log(`\n// Save this to: packages/${name.toLowerCase()}/src/index.ts`);
}
