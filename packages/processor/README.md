# glost-processor

Unified-style processor API for GLOST documents with fluent plugin composition.

## Overview

`glost-processor` provides a fluent API for processing GLOST documents through plugin pipelines, similar to the [unified](https://unifiedjs.com/) ecosystem (remark, rehype, etc.).

## Installation

```bash
npm install glost-processor
# or
pnpm add glost-processor
```

## Usage

### Basic Processing

```typescript
import { glost } from "glost-processor";
import { transcription } from "glost-transcription";
import { translation } from "glost-translation";
import { frequency } from "glost-frequency";

const processor = glost()
  .use(transcription, { scheme: "ipa" })
  .use(translation, { target: "en" })
  .use(frequency);

const result = await processor.process(document);
```

### Freezing for Reuse

```typescript
const frozen = glost()
  .use(transcription)
  .use(translation)
  .freeze();

// Reuse across multiple documents
const result1 = await frozen.process(doc1);
const result2 = await frozen.process(doc2);
```

### Using Presets

```typescript
import { languageLearningPreset } from "glost-presets";

const processor = glost()
  .use(languageLearningPreset);

const result = await processor.process(document);
```

### Hooks and Middleware

```typescript
const processor = glost()
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

const result = await processor.process(document);
```

### Data Storage

Share data between plugins:

```typescript
const processor = glost()
  .data("config", { theme: "dark" })
  .use(plugin1)
  .use(plugin2);

// Access in plugins
const config = processor.data("config");
```

### Processing with Metadata

Get detailed processing information:

```typescript
const result = await processor.processWithMeta(document);

console.log(result.document);              // Processed document
console.log(result.metadata.appliedPlugins);  // Which plugins ran
console.log(result.metadata.stats.totalTime); // Total time
console.log(result.metadata.errors);       // Any errors
```

## API

### `glost(options?)`

Create a new processor instance.

**Options:**
- `lenient?: boolean` - If true, continue processing on errors (default: false)
- `conflictStrategy?: "error" | "warn" | "lastWins"` - How to handle metadata conflicts
- `debug?: boolean` - Enable debug logging
- `data?: Map<string, any>` - Initial data store

### `processor.use(plugin, options?)`

Add a plugin to the pipeline.

**Parameters:**
- `plugin` - Plugin function, extension object, preset, or plugin ID string
- `options` - Plugin-specific options

**Returns:** The processor for chaining

### `processor.freeze()`

Freeze the processor configuration for reuse.

**Returns:** A frozen processor that can only process documents

### `processor.process(document)`

Process a document through the pipeline.

**Parameters:**
- `document` - GLOST document to process

**Returns:** Promise resolving to the processed document

### `processor.processWithMeta(document)`

Process a document and get detailed metadata.

**Parameters:**
- `document` - GLOST document to process

**Returns:** Promise resolving to processing result with metadata

### `processor.before(pluginId, hook)`

Register a hook to run before a plugin.

**Parameters:**
- `pluginId` - Plugin ID to hook into
- `hook` - Function to run before the plugin

**Returns:** The processor for chaining

### `processor.after(pluginId, hook)`

Register a hook to run after a plugin.

**Parameters:**
- `pluginId` - Plugin ID to hook into
- `hook` - Function to run after the plugin

**Returns:** The processor for chaining

### `processor.onError(hook)`

Register an error handler.

**Parameters:**
- `hook` - Function to handle errors

**Returns:** The processor for chaining

### `processor.onSkip(hook)`

Register a skip handler.

**Parameters:**
- `hook` - Function to handle skipped plugins

**Returns:** The processor for chaining

### `processor.onProgress(hook)`

Register a progress handler.

**Parameters:**
- `hook` - Function to handle progress updates

**Returns:** The processor for chaining

### `processor.data(key, value?)`

Get or set data in the processor data store.

**Parameters:**
- `key` - Data key
- `value` - Data value (omit to get)

**Returns:** Value if getting, processor if setting

## Plugin Format

Plugins can be:

1. **Plugin functions** (returns an extension)
```typescript
const myPlugin = (options) => {
  return {
    id: "my-plugin",
    name: "My Plugin",
    transform: (tree) => tree
  };
};
```

2. **Extension objects** (used directly)
```typescript
const myExtension = {
  id: "my-extension",
  name: "My Extension",
  transform: (tree) => tree
};
```

3. **Plugin ID strings** (looked up in registry)
```typescript
processor.use("transcription");
```

## Comparison with Old API

**Old API:**
```typescript
import { processGLOSTWithExtensions } from "glost-plugins";

const result = processGLOSTWithExtensions(doc, [ext1, ext2, ext3]);
```

**New API:**
```typescript
import { glost } from "glost-processor";

const result = await glost()
  .use(ext1)
  .use(ext2)
  .use(ext3)
  .process(doc);
```

## License

MIT
