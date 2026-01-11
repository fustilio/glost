# GLOST v0.5.0 Release Notes

## Overview

GLOST v0.5.0 is a major release that transforms GLOST into a unified/remark-style ecosystem with enhanced plugin management, discovery, and composition capabilities.

## What's New

### 🚀 Unified-Style Processor API

Fluent API for plugin composition inspired by unified/remark:

```typescript
import { glost } from "glost";
import { languageLearningPreset } from "glost/presets";

const processor = glost()
  .use(languageLearningPreset)
  .freeze();

const result = await processor.process(document);
```

### 🔍 Enhanced Plugin Registry

Comprehensive plugin discovery and validation:

```typescript
import { pluginRegistry } from "glost/registry";

const plugins = pluginRegistry.search({ language: "th" });
const report = pluginRegistry.checkConflicts(["plugin1", "plugin2"]);
```

### 📦 Preset System

Pre-configured plugin combinations for common use cases:

- `languageLearningPreset` - Full language learning stack
- `readingAppPreset` - Interactive reading features
- `vocabularyBuilderPreset` - Word frequency and difficulty
- `grammarAnalyzerPreset` - POS and clause analysis
- `minimalPreset` - Just the essentials

### 🔧 CLI Tools

Command-line plugin management:

```bash
glost plugins list
glost plugins search transcription
glost plugins info transcription
glost plugins validate transcription translation frequency
```

### 🎯 Package Restructure

- **`glost`** - Main facade package (new)
- **`glost-core`** - Core types and nodes (renamed from `glost`)
- **`glost-processor`** - Processor API (new)
- **`glost-registry`** - Plugin registry (new)
- **`glost-presets`** - Preset configurations (new)
- **`glost-cli`** - CLI tools (new)

## Breaking Changes

### Package Names

The core package has been renamed:
- **Before:** `glost` (the core package)
- **After:** `glost-core` (core implementation), `glost` (facade package)

### Import Changes

```typescript
// v0.4.x - Still works but deprecated
import { processGLOSTWithExtensions } from "glost-extensions";
const result = processGLOSTWithExtensions(doc, [ext1, ext2]);

// v0.5.0 - Recommended
import { glost } from "glost";
const result = await glost().use(ext1).use(ext2).process(doc);
```

### Async-Only Processing

The new processor API is always async:

```typescript
// Add await to all process() calls
const result = await processor.process(document);
```

## Migration

See the [Migration Guide](../migration/MIGRATION_v0.4_to_v0.5.md) for detailed migration instructions.

### Quick Migration

1. Install new packages:
```bash
npm install glost@0.5.0
```

2. Update imports:
```typescript
// Old
import { processGLOSTWithExtensions } from "glost-extensions";

// New
import { glost } from "glost";
```

3. Convert to fluent API:
```typescript
// Old
const result = processGLOSTWithExtensions(doc, [ext1, ext2]);

// New
const doc = await glost().use(ext1).use(ext2).process(document);
```

## Backwards Compatibility

✅ The old API (`processGLOSTWithExtensions`) still works in v0.5.0 but is deprecated.
⚠️ You'll see deprecation warnings in the console.
❌ The old API will be removed in v1.0.

## New Features

### Hooks and Middleware

```typescript
processor
  .before("translation", (doc) => console.log("Starting translation"))
  .after("translation", (doc) => console.log("Translation complete"))
  .onError((error, plugin) => console.error(`${plugin} failed:`, error))
  .onProgress((stats) => console.log(`${stats.completed}/${stats.total}`));
```

### Data Storage

Share data between plugins:

```typescript
processor
  .data("config", { theme: "dark" })
  .use(plugin1)
  .use(plugin2);
```

### Processor Freezing

Freeze for reuse across multiple documents:

```typescript
const frozen = processor.freeze();

const result1 = await frozen.process(doc1);
const result2 = await frozen.process(doc2);
```

## Performance

All performance targets exceeded:
- ✅ Small docs (10-50 words): < 1ms (target: < 10ms)
- ✅ Medium docs (100-500 words): 2-15ms (target: < 50ms)
- ✅ Large docs (1000+ words): 15-70ms (target: < 200ms)
- ✅ Handles 100K word documents
- ✅ 290 tests passing across the codebase

## Documentation

- [Migration Guide](../migration/MIGRATION_v0.4_to_v0.5.md)
- [Processor API Guide](../guides/processor-api.md)
- [Registry Guide](../guides/registry.md)
- [Package Refactoring](../PACKAGE_REFACTORING.md)
- [Unified Pipeline Implementation](../UNIFIED_PIPELINE_IMPLEMENTATION.md)

## Acknowledgments

This release brings GLOST in line with modern JavaScript ecosystem patterns (unified, remark, babel) while maintaining its unique focus on language learning and multilingual text processing.

## What's Next

v0.6 will focus on:
- Registry website for plugin discovery
- Comprehensive test coverage for new packages
- Additional community presets
- Performance optimizations

---

**Full Changelog:** v0.4.0...v0.5.0
