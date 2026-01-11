# glost-registry

Enhanced plugin registry with discovery, metadata, validation, and conflict detection for GLOST.

## Overview

`glost-registry` provides a comprehensive plugin registry system for managing GLOST plugins with:

- Plugin discovery and search
- Metadata management
- Conflict detection
- Dependency resolution
- Validation
- Statistics

## Installation

```bash
npm install glost-registry
# or
pnpm add glost-registry
```

## Usage

### Registering Plugins

```typescript
import { pluginRegistry } from "glost-registry";
import { myExtension } from "./my-plugin";

pluginRegistry.register(myExtension, {
  version: "1.0.0",
  description: "Adds transcription support for Thai",
  category: "enhancer",
  tags: ["transcription", "thai", "ipa"],
  author: "Your Name",
  repository: "https://github.com/yourusername/my-plugin",
  supports: {
    languages: ["th"],
    async: true,
    parallel: false
  },
  requires: {
    plugins: ["frequency"],
    glostVersion: ">=0.4.0"
  }
});
```

### Searching for Plugins

```typescript
// Search by keyword
const results = pluginRegistry.search({ keyword: "transcription" });

// Filter by category
const enhancers = pluginRegistry.search({ category: "enhancer" });

// Filter by language
const thaiPlugins = pluginRegistry.search({ language: "th" });

// Multiple filters
const results = pluginRegistry.search({
  category: "enhancer",
  language: "th",
  tags: ["transcription"]
});
```

### Get Plugin Metadata

```typescript
const metadata = pluginRegistry.getMetadata("my-plugin");
console.log(metadata.version);
console.log(metadata.category);
console.log(metadata.supports.languages);
```

### Check for Conflicts

```typescript
const report = pluginRegistry.checkConflicts([
  "plugin1",
  "plugin2",
  "plugin3"
]);

if (report.hasConflicts) {
  for (const conflict of report.conflicts) {
    console.error(`Conflict: ${conflict.plugin1} <-> ${conflict.plugin2}`);
    console.error(`Reason: ${conflict.reason}`);
    console.error(`Severity: ${conflict.severity}`);
  }
}
```

### Resolve Dependencies

```typescript
const orderedPlugins = pluginRegistry.resolveDependencies([
  "plugin-c", // depends on plugin-a
  "plugin-a",
  "plugin-b"  // depends on plugin-a
]);
// Returns: ["plugin-a", "plugin-c", "plugin-b"]
```

### Validate Plugins

```typescript
const result = pluginRegistry.validate("my-plugin", {
  scheme: "ipa",
  target: "en"
});

if (!result.valid) {
  console.error("Validation errors:", result.errors);
}

if (result.warnings.length > 0) {
  console.warn("Validation warnings:", result.warnings);
}
```

### Get Registry Statistics

```typescript
const stats = pluginRegistry.getStatistics();
console.log(`Total plugins: ${stats.total}`);
console.log(`By category:`, stats.byCategory);
console.log(`By language:`, stats.byLanguage);
console.log(`Top tags:`, stats.topTags);
```

## Advanced Usage

### Plugin Discovery

```typescript
import { PluginDiscovery, pluginRegistry } from "glost-registry";

// Find related plugins
const related = PluginDiscovery.findRelated(
  pluginRegistry.list(),
  "my-plugin"
);

// Suggest plugins based on current selection
const suggestions = PluginDiscovery.suggestPlugins(
  currentPlugins,
  pluginRegistry.list()
);
```

### Filtering and Sorting

```typescript
import { PluginFilter, PluginSorter } from "glost-registry";

let plugins = pluginRegistry.list();

// Filter
plugins = PluginFilter.byLanguage(plugins, "th");
plugins = PluginFilter.asyncOnly(plugins);

// Sort
plugins = PluginSorter.byName(plugins);
plugins = PluginSorter.byCategory(plugins);
plugins = PluginSorter.byDate(plugins, false); // newest first
```

### Custom Validation

```typescript
import { PluginValidator } from "glost-registry";

const metadata = pluginRegistry.getMetadata("my-plugin");

// Validate metadata
const metaResult = PluginValidator.validateMetadata(metadata);

// Validate compatibility
const compResult = PluginValidator.validateCompatibility(
  metadata,
  "0.4.0",  // GLOST version
  "20.0.0"  // Node.js version
);

// Validate dependencies
const depResult = PluginValidator.validateDependencies(
  metadata,
  new Set(["plugin-a", "plugin-b"])
);
```

## Plugin Metadata Schema

```typescript
interface PluginMetadata {
  // Required
  id: string;
  name: string;
  version: string;
  description: string;
  category: "transformer" | "enhancer" | "generator" | "analyzer" | "utility";
  tags: string[];
  supports: {
    languages?: string[];
    nodeTypes?: string[];
    async: boolean;
    parallel?: boolean;
  };
  
  // Optional
  author?: string;
  repository?: string;
  homepage?: string;
  requires?: {
    plugins?: string[];
    glostVersion?: string;
    nodeVersion?: string;
  };
  conflicts?: string[];
  options?: PluginOptionsSchema;
  examples?: PluginExample[];
}
```

## API

### PluginRegistry

- `register(extension, metadata)` - Register a plugin
- `getMetadata(id)` - Get plugin metadata
- `getExtension(id)` - Get plugin extension
- `list()` - List all plugins
- `search(query)` - Search for plugins
- `getByCategory(category)` - Get plugins by category
- `getLanguageSupport(language)` - Get plugins supporting a language
- `isLanguageSupported(id, language)` - Check language support
- `isCompatible(id, version)` - Check version compatibility
- `checkConflicts(ids)` - Check for conflicts
- `resolveDependencies(ids)` - Resolve dependencies
- `validate(id, options)` - Validate plugin configuration
- `getStatistics()` - Get registry statistics
- `has(id)` - Check if plugin exists
- `unregister(id)` - Unregister a plugin
- `clear()` - Clear all plugins

### PluginFilter

- `byKeyword(plugins, keyword)` - Filter by keyword
- `byCategory(plugins, category)` - Filter by category
- `byLanguage(plugins, language)` - Filter by language
- `byTags(plugins, tags)` - Filter by tags
- `byAuthor(plugins, author)` - Filter by author
- `asyncOnly(plugins)` - Filter async plugins
- `parallelOnly(plugins)` - Filter parallel plugins
- `apply(plugins, query)` - Apply multiple filters

### PluginSorter

- `byName(plugins, ascending)` - Sort by name
- `byDate(plugins, ascending)` - Sort by date
- `byCategory(plugins)` - Sort by category

### PluginDiscovery

- `findRelated(plugins, id)` - Find related plugins
- `findDependents(plugins, extensions, id)` - Find dependent plugins
- `findMissingDependencies(plugins, extensions)` - Find missing deps
- `suggestPlugins(current, all)` - Suggest plugins

### PluginValidator

- `validateMetadata(metadata)` - Validate metadata
- `validateCompatibility(metadata, glost, node)` - Validate compatibility
- `validateDependencies(metadata, available)` - Validate dependencies

## License

MIT
