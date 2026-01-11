# Plugin Registry Guide

The GLOST plugin registry provides discovery, metadata management, validation, and conflict detection for plugins.

## Table of Contents

- [Quick Start](#quick-start)
- [Registering Plugins](#registering-plugins)
- [Discovering Plugins](#discovering-plugins)
- [Validation](#validation)
- [Conflict Detection](#conflict-detection)
- [Dependency Resolution](#dependency-resolution)
- [Statistics](#statistics)
- [Best Practices](#best-practices)

## Quick Start

```typescript
import { pluginRegistry } from "glost-registry";

// Register a plugin
pluginRegistry.register(myExtension, {
  version: "1.0.0",
  description: "My awesome plugin",
  category: "enhancer",
  tags: ["transcription"],
  supports: {
    languages: ["th", "ja"],
    async: true
  }
});

// Search for plugins
const plugins = pluginRegistry.search({ language: "th" });

// Check for conflicts
const report = pluginRegistry.checkConflicts(["plugin1", "plugin2"]);
```

## Registering Plugins

### Basic Registration

```typescript
import { pluginRegistry } from "glost-registry";

pluginRegistry.register(myExtension, {
  version: "1.0.0",
  description: "Adds transcription support",
  category: "enhancer",
  tags: ["transcription", "phonetics"],
  supports: {
    async: true
  }
});
```

### Complete Metadata

```typescript
pluginRegistry.register(myExtension, {
  // Required
  version: "1.0.0",
  description: "Comprehensive transcription support",
  category: "enhancer",
  tags: ["transcription", "ipa", "phonetics"],
  supports: {
    async: true
  },
  
  // Optional
  author: "Your Name",
  repository: "https://github.com/yourusername/glost-transcription",
  homepage: "https://transcription.glost.dev",
  
  // Capabilities
  supports: {
    languages: ["th", "ja", "ko"],
    nodeTypes: ["WordNode", "SentenceNode"],
    async: true,
    parallel: false,
    custom: {
      streaming: true,
      offline: true
    }
  },
  
  // Requirements
  requires: {
    plugins: ["frequency"],
    glostVersion: ">=0.4.0",
    nodeVersion: ">=18.0.0"
  },
  
  // Conflicts
  conflicts: ["old-transcription-plugin"],
  
  // Options schema
  options: {
    type: "object",
    properties: {
      scheme: {
        type: "string",
        description: "Transcription scheme to use",
        enum: ["ipa", "rtgs", "paiboon"],
        default: "ipa"
      },
      includeStress: {
        type: "boolean",
        description: "Include stress markers",
        default: false
      }
    },
    required: ["scheme"]
  },
  
  // Examples
  examples: [
    {
      title: "Basic Usage",
      description: "Transcribe with IPA",
      code: `
import { glost } from "glost-processor";
import { transcription } from "glost-transcription";

const processor = glost()
  .use(transcription, { scheme: "ipa" });
      `.trim()
    }
  ]
});
```

### Plugin Categories

- **`transformer`** - Modifies document structure
- **`enhancer`** - Adds metadata to existing nodes
- **`generator`** - Generates new data/metadata
- **`analyzer`** - Analyzes document without modification
- **`utility`** - Utility functions

## Discovering Plugins

### List All Plugins

```typescript
const plugins = pluginRegistry.list();

for (const plugin of plugins) {
  console.log(plugin.name, plugin.version);
}
```

### Search by Keyword

```typescript
const results = pluginRegistry.search({ keyword: "transcription" });
```

Searches in:
- Plugin name
- Plugin description
- Plugin ID
- Tags

### Filter by Category

```typescript
const enhancers = pluginRegistry.search({ category: "enhancer" });
const transformers = pluginRegistry.search({ category: "transformer" });
```

### Filter by Language

```typescript
const thaiPlugins = pluginRegistry.search({ language: "th" });
const japanesePlugins = pluginRegistry.search({ language: "ja" });
```

### Filter by Tags

```typescript
const results = pluginRegistry.search({
  tags: ["transcription", "ipa"]
});
```

### Combined Filters

```typescript
const results = pluginRegistry.search({
  keyword: "transcription",
  category: "enhancer",
  language: "th",
  tags: ["ipa"]
});
```

### Get by Category

```typescript
const enhancers = pluginRegistry.getByCategory("enhancer");
```

### Get Language Support

```typescript
const thaiPlugins = pluginRegistry.getLanguageSupport("th");
```

### Check Language Support

```typescript
if (pluginRegistry.isLanguageSupported("transcription", "th")) {
  console.log("Transcription supports Thai");
}
```

## Validation

### Validate Plugin Configuration

```typescript
const result = pluginRegistry.validate("transcription", {
  scheme: "ipa",
  includeStress: true
});

if (!result.valid) {
  for (const error of result.errors) {
    console.error(error.message);
  }
}

for (const warning of result.warnings) {
  console.warn(warning.message);
}
```

### Validation Checks

The validator checks:
- Required options are provided
- Option types match schema
- Unknown options (if not allowed)
- Version requirements
- Dependency availability

### Validation Result

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  plugin: string;
  message: string;
  code: string;
}
```

## Conflict Detection

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

### Conflict Types

1. **Explicit Conflicts** - Declared in `conflicts` field
2. **Field Ownership Conflicts** - Both plugins provide same fields

### Conflict Severity

- **`error`** - Cannot be used together
- **`warning`** - Can be used but may cause issues

### Example

```typescript
const report = pluginRegistry.checkConflicts([
  "new-transcription",
  "old-transcription"
]);

// Output:
// {
//   hasConflicts: true,
//   conflicts: [{
//     plugin1: "new-transcription",
//     plugin2: "old-transcription",
//     reason: "new-transcription declares conflict with old-transcription",
//     severity: "error"
//   }]
// }
```

## Dependency Resolution

### Resolve Dependencies

```typescript
const ordered = pluginRegistry.resolveDependencies([
  "plugin-c", // depends on plugin-a
  "plugin-a",
  "plugin-b"  // depends on plugin-a
]);

console.log(ordered);
// ["plugin-a", "plugin-c", "plugin-b"]
```

### Handles Circular Dependencies

```typescript
try {
  pluginRegistry.resolveDependencies(["plugin-a", "plugin-b"]);
} catch (error) {
  console.error("Circular dependency detected:", error.message);
}
```

### Use with Processor

```typescript
const pluginIds = ["plugin3", "plugin1", "plugin2"];
const ordered = pluginRegistry.resolveDependencies(pluginIds);

let processor = glost();
for (const id of ordered) {
  processor = processor.use(id);
}
```

## Statistics

### Get Statistics

```typescript
const stats = pluginRegistry.getStatistics();

console.log(`Total plugins: ${stats.total}`);
console.log("By category:", stats.byCategory);
console.log("By language:", stats.byLanguage);
console.log("Top tags:", stats.topTags);
```

### Example Output

```typescript
{
  total: 12,
  byCategory: {
    transformer: 2,
    enhancer: 5,
    generator: 3,
    analyzer: 2,
    utility: 0
  },
  byLanguage: {
    th: 8,
    ja: 6,
    ko: 4,
    en: 12
  },
  topTags: [
    { tag: "transcription", count: 5 },
    { tag: "translation", count: 3 },
    { tag: "frequency", count: 2 }
  ]
}
```

## Advanced Usage

### Custom Registry

Create an isolated registry:

```typescript
import { PluginRegistry } from "glost-registry";

const myRegistry = new PluginRegistry();

myRegistry.register(plugin1, metadata1);
myRegistry.register(plugin2, metadata2);

const plugins = myRegistry.search({ keyword: "test" });
```

### Plugin Discovery Utilities

```typescript
import { PluginDiscovery } from "glost-registry";

// Find related plugins
const related = PluginDiscovery.findRelated(
  pluginRegistry.list(),
  "transcription"
);

// Find plugins that depend on a plugin
const dependents = PluginDiscovery.findDependents(
  pluginRegistry.list(),
  extensionsMap,
  "frequency"
);

// Find missing dependencies
const missing = PluginDiscovery.findMissingDependencies(
  pluginRegistry.list(),
  extensionsMap
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
plugins = PluginFilter.byCategory(plugins, "enhancer");
plugins = PluginFilter.asyncOnly(plugins);

// Sort
plugins = PluginSorter.byName(plugins);
plugins = PluginSorter.byDate(plugins, false); // newest first
plugins = PluginSorter.byCategory(plugins);
```

### Custom Validation

```typescript
import { PluginValidator } from "glost-registry";

const metadata = pluginRegistry.getMetadata("my-plugin");

// Validate metadata structure
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

## Best Practices

### 1. Register Plugins at Application Startup

```typescript
// In your app initialization
import { pluginRegistry } from "glost-registry";
import { allPlugins } from "./plugins";

for (const [extension, metadata] of allPlugins) {
  pluginRegistry.register(extension, metadata);
}
```

### 2. Validate Plugin Combinations

```typescript
function createProcessor(pluginIds: string[]) {
  // Validate before creating processor
  const report = pluginRegistry.checkConflicts(pluginIds);
  
  if (report.hasConflicts) {
    throw new Error(`Plugin conflicts: ${JSON.stringify(report.conflicts)}`);
  }
  
  // Resolve dependencies
  const ordered = pluginRegistry.resolveDependencies(pluginIds);
  
  // Create processor
  let processor = glost();
  for (const id of ordered) {
    processor = processor.use(id);
  }
  
  return processor.freeze();
}
```

### 3. Use Rich Metadata

Provide complete metadata for better discovery:

```typescript
pluginRegistry.register(myExtension, {
  version: "1.0.0",
  description: "Clear, concise description",
  category: "enhancer",
  tags: ["relevant", "searchable", "tags"],
  author: "Your Name",
  repository: "https://github.com/...",
  homepage: "https://...",
  supports: {
    languages: ["th", "ja"],
    async: true
  },
  examples: [
    {
      title: "Basic Usage",
      code: "..."
    }
  ]
});
```

### 4. Check Compatibility

```typescript
if (pluginRegistry.isCompatible("transcription", "1.0.0")) {
  // Use the plugin
}
```

### 5. Handle Missing Plugins Gracefully

```typescript
const pluginIds = ["plugin1", "plugin2", "plugin3"];
const available = pluginIds.filter(id => pluginRegistry.has(id));
const missing = pluginIds.filter(id => !pluginRegistry.has(id));

if (missing.length > 0) {
  console.warn(`Missing plugins: ${missing.join(", ")}`);
}

// Use only available plugins
let processor = glost();
for (const id of available) {
  processor = processor.use(id);
}
```

## Integration with CLI

The registry powers the CLI tools:

```bash
# List plugins
glost plugins list

# Search
glost plugins search transcription

# Show info
glost plugins info transcription

# Validate
glost plugins validate transcription translation frequency

# Stats
glost plugins stats
```

## Next Steps

- [Processor API Guide](./processor-api.md)
- [Plugin Development Guide](./plugin-development.md)
- [CLI Tools](../../packages/cli/README.md)
- [API Reference](../api.md)
