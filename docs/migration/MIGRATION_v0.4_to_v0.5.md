# Migration Guide: v0.4 to v0.5

This guide helps you migrate from the current GLOST extension API to the new unified-style processor API.

## Overview

GLOST v0.5 introduces a unified/remark-style processor API with:

- **Fluent `.use()` API** for plugin composition
- **Enhanced plugin registry** with discovery and validation
- **Preset system** for common configurations
- **CLI tools** for plugin management
- **Middleware/hooks** for observability

## Quick Migration

### Before (v0.4.x)

```typescript
import { processGLOSTWithExtensions } from "glost-extensions";
import { transcriptionExtension } from "glost-transcription";
import { translationExtension } from "glost-translation";
import { frequencyExtension } from "glost-frequency";

const result = processGLOSTWithExtensions(document, [
  transcriptionExtension,
  translationExtension,
  frequencyExtension,
]);

const processed = result.document;
```

### After (v0.5.0)

```typescript
import { glost } from "glost-processor";
import { transcription } from "glost-transcription";
import { translation } from "glost-translation";
import { frequency } from "glost-frequency";

const result = await glost()
  .use(transcription)
  .use(translation)
  .use(frequency)
  .process(document);
```

## Key Changes

### 1. Processor API

#### Old: Array of Extensions

```typescript
processGLOSTWithExtensions(doc, [ext1, ext2, ext3]);
```

#### New: Fluent Chaining

```typescript
glost()
  .use(ext1)
  .use(ext2)
  .use(ext3)
  .process(doc);
```

### 2. Plugin Format

Plugins can now be:

1. **Plugin functions** (recommended)
```typescript
export function myPlugin(options?) {
  return {
    id: "my-plugin",
    name: "My Plugin",
    transform: (tree) => tree
  };
}
```

2. **Extension objects** (backwards compatible)
```typescript
export const myExtension: GLOSTExtension = {
  id: "my-extension",
  name: "My Extension",
  transform: (tree) => tree
};
```

3. **String IDs** (from registry)
```typescript
processor.use("my-plugin");
```

### 3. Async Processing

#### Old: Two Functions

```typescript
// Sync
processGLOSTWithExtensions(doc, extensions);

// Async
await processGLOSTWithExtensionsAsync(doc, extensions);
```

#### New: One Function

```typescript
// Always async
await processor.process(doc);
```

### 4. Options

#### Old: Options in Third Parameter

```typescript
processGLOSTWithExtensions(doc, extensions, {
  lenient: true,
  conflictStrategy: "warn"
});
```

#### New: Options in Constructor

```typescript
glost({ lenient: true, conflictStrategy: "warn" })
  .use(ext1)
  .use(ext2)
  .process(doc);
```

### 5. Metadata

#### Old: Always Returns Metadata

```typescript
const result = processGLOSTWithExtensions(doc, extensions);
console.log(result.document);
console.log(result.metadata);
```

#### New: Two Methods

```typescript
// Just the document
const doc = await processor.process(document);

// With metadata
const result = await processor.processWithMeta(document);
console.log(result.document);
console.log(result.metadata);
```

## New Features

### 1. Presets

Group plugins into reusable configurations:

```typescript
import { languageLearningPreset } from "glost-presets";

const processor = glost()
  .use(languageLearningPreset);
```

Create custom presets:

```typescript
const myPreset = {
  id: "my-preset",
  name: "My Preset",
  plugins: [
    ["transcription", { scheme: "ipa" }],
    "translation",
    "frequency"
  ]
};

processor.use(myPreset);
```

### 2. Hooks and Middleware

Add hooks to observe and modify processing:

```typescript
processor
  .use(transcription)
  .use(translation)
  .before("translation", (doc) => {
    console.log("About to translate");
  })
  .after("translation", (doc) => {
    console.log("Translation complete");
  })
  .onError((error, plugin) => {
    console.error(`Plugin ${plugin} failed:`, error);
  })
  .onProgress((stats) => {
    console.log(`Progress: ${stats.completed}/${stats.total}`);
  });
```

### 3. Data Storage

Share data between plugins:

```typescript
processor
  .data("config", { theme: "dark" })
  .use(plugin1)
  .use(plugin2);

// Access in plugins
const config = processor.data("config");
```

### 4. Freezing

Freeze configuration for reuse:

```typescript
const frozen = glost()
  .use(transcription)
  .use(translation)
  .freeze();

// Reuse across documents
const result1 = await frozen.process(doc1);
const result2 = await frozen.process(doc2);
```

### 5. Enhanced Registry

Register plugins with rich metadata:

```typescript
import { pluginRegistry } from "glost-registry";

pluginRegistry.register(myExtension, {
  version: "1.0.0",
  description: "My awesome plugin",
  category: "enhancer",
  tags: ["transcription", "thai"],
  supports: {
    languages: ["th"],
    async: true
  },
  requires: {
    plugins: ["frequency"],
    glostVersion: ">=0.4.0"
  }
});
```

Search and validate:

```typescript
// Search
const plugins = pluginRegistry.search({ language: "th" });

// Validate
const report = pluginRegistry.checkConflicts(["plugin1", "plugin2"]);

// Resolve dependencies
const ordered = pluginRegistry.resolveDependencies(["p1", "p2", "p3"]);
```

### 6. CLI Tools

```bash
# List plugins
glost plugins list

# Search
glost plugins search transcription

# Show info
glost plugins info transcription

# Validate combinations
glost plugins validate transcription translation frequency

# Stats
glost plugins stats

# Create template
glost plugins create MyPlugin
```

## Breaking Changes

### 1. Async Only

The new processor API is **always async**. No synchronous processing.

**Migration:** Add `await` to all `process()` calls.

### 2. Import Paths

Some import paths have changed:

#### Old

```typescript
import { processGLOSTWithExtensions } from "glost-extensions";
```

#### New

```typescript
import { glost } from "glost-processor";
```

### 3. Plugin Registration

Extensions are now automatically registered when used:

#### Old

```typescript
import { registerExtension } from "glost-extensions";

registerExtension(myExtension);
```

#### New

```typescript
// Automatic registration when used
processor.use(myExtension);

// Or explicit registration in enhanced registry
import { pluginRegistry } from "glost-registry";
pluginRegistry.register(myExtension, metadata);
```

## Deprecation Timeline

### v0.5 (Current)
- ✅ New processor API available
- ✅ Old API still works (deprecated)
- ⚠️ Deprecation warnings in console

### v0.6 (Future)
- ⚠️ Louder deprecation warnings
- 📖 Migration guide prominent in docs

### v1.0 (Future)
- ❌ Old API removed
- ✅ Only new processor API supported

## Backwards Compatibility

The old API still works in v0.5:

```typescript
// This still works!
import { processGLOSTWithExtensions } from "glost-extensions";

const result = processGLOSTWithExtensions(doc, [ext1, ext2]);
```

But you'll see deprecation warnings:

```
DeprecationWarning: processGLOSTWithExtensions is deprecated.
Use glost().use(ext1).use(ext2).process(doc) instead.
See migration guide: https://glost.dev/migration
```

## Step-by-Step Migration

### Step 1: Install New Packages

```bash
pnpm add glost-processor glost-registry glost-presets
```

### Step 2: Update Imports

```typescript
// Before
import { processGLOSTWithExtensions } from "glost-extensions";

// After
import { glost } from "glost-processor";
```

### Step 3: Convert to Fluent API

```typescript
// Before
const result = processGLOSTWithExtensions(doc, [ext1, ext2, ext3]);

// After
const doc = await glost()
  .use(ext1)
  .use(ext2)
  .use(ext3)
  .process(document);
```

### Step 4: Handle Async

```typescript
// Before
const result = processGLOSTWithExtensions(doc, extensions);
doSomething(result.document);

// After
const doc = await glost()
  .use(ext1)
  .use(ext2)
  .process(document);
doSomething(doc);
```

### Step 5: Update Options

```typescript
// Before
processGLOSTWithExtensions(doc, extensions, { lenient: true });

// After
glost({ lenient: true })
  .use(ext1)
  .use(ext2)
  .process(doc);
```

### Step 6: Use Presets (Optional)

```typescript
// Before
const result = processGLOSTWithExtensions(doc, [
  transcriptionExt,
  translationExt,
  frequencyExt,
  difficultyExt,
  posExt
]);

// After - use preset
import { languageLearningPreset } from "glost-presets";

const doc = await glost()
  .use(languageLearningPreset)
  .process(document);
```

## Common Patterns

### Pattern 1: Reusable Processor

#### Old

```typescript
function createProcessor(lang: string) {
  return (doc: GLOSTRoot) => {
    return processGLOSTWithExtensions(doc, [
      transcriptionExt,
      translationExt
    ]);
  };
}
```

#### New

```typescript
function createProcessor(lang: string) {
  return glost()
    .use(transcription, { language: lang })
    .use(translation, { target: "en" })
    .freeze();
}

const processor = createProcessor("th");
const result = await processor.process(doc);
```

### Pattern 2: Conditional Plugins

#### Old

```typescript
const extensions = [transcriptionExt];
if (needsTranslation) {
  extensions.push(translationExt);
}
processGLOSTWithExtensions(doc, extensions);
```

#### New

```typescript
let processor = glost().use(transcription);

if (needsTranslation) {
  processor = processor.use(translation);
}

await processor.process(doc);
```

### Pattern 3: Dynamic Plugin Loading

#### Old

```typescript
const extensions = pluginIds.map(id => getExtension(id));
processGLOSTWithExtensions(doc, extensions);
```

#### New

```typescript
let processor = glost();
for (const id of pluginIds) {
  processor = processor.use(id); // Looks up in registry
}
await processor.process(doc);
```

## Troubleshooting

### Error: "Plugin not found in registry"

**Solution:** Register the plugin first:

```typescript
import { pluginRegistry } from "glost-registry";
pluginRegistry.register(myExtension, metadata);
```

Or use the extension object directly:

```typescript
processor.use(myExtension);
```

### Error: "Cannot modify frozen processor"

**Solution:** Don't call `.use()` after `.freeze()`:

```typescript
// Wrong
const frozen = processor.freeze();
frozen.use(plugin); // Error!

// Right
processor.use(plugin).freeze();
```

### Warning: "Circular dependency detected"

**Solution:** Check plugin dependencies:

```bash
glost plugins validate plugin1 plugin2 plugin3
```

## Getting Help

- 📖 [Documentation](../../index.md)
- 💬 [GitHub Discussions](https://github.com/glost/glost/discussions)
- 🐛 [Issue Tracker](https://github.com/glost/glost/issues)

## Summary

The new processor API provides:

✅ More intuitive fluent interface  
✅ Better TypeScript support  
✅ Enhanced plugin discovery  
✅ Middleware and hooks  
✅ Preset system  
✅ CLI tools  
✅ Backwards compatible (v0.5)

Take your time migrating. The old API works until v1.0.
