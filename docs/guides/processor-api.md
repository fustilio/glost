# Processor API Guide

The GLOST processor provides a unified/remark-style fluent API for processing documents through plugin pipelines.

## Table of Contents

- [Quick Start](#quick-start)
- [Creating a Processor](#creating-a-processor)
- [Using Plugins](#using-plugins)
- [Processing Documents](#processing-documents)
- [Hooks and Middleware](#hooks-and-middleware)
- [Data Storage](#data-storage)
- [Freezing](#freezing)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)

## Quick Start

```typescript
import { glost } from "glost-processor";
import { transcription } from "glost-transcription";
import { translation } from "glost-translation";

const processor = glost()
  .use(transcription, { scheme: "ipa" })
  .use(translation, { target: "en" });

const result = await processor.process(document);
```

## Creating a Processor

### Basic Creation

```typescript
import { glost } from "glost-processor";

const processor = glost();
```

### With Options

```typescript
const processor = glost({
  lenient: true,          // Continue on errors
  conflictStrategy: "warn", // How to handle conflicts
  debug: true             // Enable debug logging
});
```

### Processor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `lenient` | boolean | false | If true, continue processing on errors |
| `conflictStrategy` | string | "error" | How to handle metadata conflicts: "error", "warn", or "lastWins" |
| `debug` | boolean | false | Enable debug logging |
| `data` | Map | - | Initial data store |
| `onSkip` | function | - | Callback when a plugin is skipped |

## Using Plugins

### Plugin Functions

Recommended approach - plugins as functions:

```typescript
import { transcription } from "glost-transcription";

processor.use(transcription, {
  scheme: "ipa",
  includeStress: true
});
```

### Extension Objects

Direct extension objects (backwards compatible):

```typescript
import { transcriptionExtension } from "glost-transcription";

processor.use(transcriptionExtension);
```

### Plugin IDs

Use registered plugin IDs:

```typescript
processor.use("transcription");
```

### Presets

Use preset configurations:

```typescript
import { languageLearningPreset } from "glost-presets";

processor.use(languageLearningPreset);
```

### Chaining

Chain multiple plugins:

```typescript
processor
  .use(transcription)
  .use(translation)
  .use(frequency)
  .use(difficulty)
  .use(pos);
```

## Processing Documents

### Basic Processing

Returns just the processed document:

```typescript
const result = await processor.process(document);
// result is GLOSTRoot
```

### With Metadata

Returns document and processing metadata:

```typescript
const result = await processor.processWithMeta(document);

console.log(result.document);           // Processed document
console.log(result.metadata.appliedPlugins);  // Which plugins ran
console.log(result.metadata.stats.totalTime); // Total time
console.log(result.metadata.errors);    // Any errors
console.log(result.metadata.warnings);  // Any warnings
```

### Result Structure

```typescript
interface ProcessingResult {
  document: GLOSTRoot;
  metadata: {
    appliedPlugins: string[];
    skippedPlugins: string[];
    errors: ProcessingError[];
    warnings: ProcessingWarning[];
    stats: {
      totalTime: number;
      timing: Map<string, number>;
      nodesProcessed: number;
      startTime: number;
      endTime: number;
    };
  };
}
```

## Hooks and Middleware

### Before Hook

Run code before a plugin:

```typescript
processor.before("translation", (doc, pluginId) => {
  console.log("About to translate");
  // Can inspect/log document state
});
```

### After Hook

Run code after a plugin:

```typescript
processor.after("translation", (doc, pluginId) => {
  console.log("Translation complete");
  // Can inspect results
});
```

### Error Handler

Handle errors from plugins:

```typescript
processor.onError((error, pluginId) => {
  console.error(`Plugin ${pluginId} failed:`, error);
  // Log to monitoring service
  sendToSentry(error);
});
```

### Skip Handler

Handle skipped plugins:

```typescript
processor.onSkip((pluginId, reason) => {
  console.log(`Plugin ${pluginId} was skipped: ${reason}`);
});
```

### Progress Handler

Track processing progress:

```typescript
processor.onProgress((stats) => {
  const percent = (stats.completed / stats.total) * 100;
  console.log(`Progress: ${percent.toFixed(0)}%`);
  updateProgressBar(percent);
});
```

### Multiple Hooks

You can register multiple hooks:

```typescript
processor
  .before("translation", logBeforeTranslation)
  .before("translation", cacheOriginalText)
  .after("translation", logAfterTranslation)
  .after("translation", sendAnalytics);
```

## Data Storage

Share data between plugins:

### Setting Data

```typescript
processor.data("config", {
  theme: "dark",
  language: "th"
});
```

### Getting Data

```typescript
const config = processor.data("config");
console.log(config.theme); // "dark"
```

### Chaining

```typescript
processor
  .data("apiKey", process.env.API_KEY)
  .data("cache", new Map())
  .use(plugin1)
  .use(plugin2);
```

### Accessing in Plugins

```typescript
const myPlugin = (options) => ({
  id: "my-plugin",
  name: "My Plugin",
  transform: (tree, context) => {
    const cache = context?.options?.data?.get("cache");
    // Use cache
    return tree;
  }
});
```

## Freezing

Freeze a processor to reuse it:

### Create and Freeze

```typescript
const frozen = glost()
  .use(transcription)
  .use(translation)
  .freeze();
```

### Reuse Across Documents

```typescript
const result1 = await frozen.process(doc1);
const result2 = await frozen.process(doc2);
const result3 = await frozen.process(doc3);
```

### Why Freeze?

- **Performance**: Configure once, use many times
- **Immutability**: Prevents accidental modification
- **Type Safety**: Frozen processors have a different type

### What You Can't Do After Freezing

```typescript
const frozen = processor.freeze();

// These will throw errors:
frozen.use(plugin);        // ❌ Error
frozen.before(hook);       // ❌ Error
frozen.data("key", value); // ❌ Error

// These still work:
frozen.process(doc);       // ✅ OK
frozen.processWithMeta(doc); // ✅ OK
```

## Error Handling

### Lenient Mode

Continue processing even if plugins fail:

```typescript
const processor = glost({ lenient: true })
  .use(plugin1)
  .use(plugin2)  // Fails
  .use(plugin3); // Still runs

const result = await processor.processWithMeta(document);

// Check for errors
if (result.metadata.errors.length > 0) {
  console.error("Some plugins failed:", result.metadata.errors);
}

// Check which plugins ran
console.log("Applied:", result.metadata.appliedPlugins);
console.log("Skipped:", result.metadata.skippedPlugins);
```

### Strict Mode (Default)

Stop processing on first error:

```typescript
const processor = glost() // lenient: false by default
  .use(plugin1)
  .use(plugin2)  // Fails - throws error
  .use(plugin3); // Never runs

try {
  await processor.process(document);
} catch (error) {
  console.error("Processing failed:", error);
}
```

### Conflict Handling

Handle metadata field conflicts:

```typescript
// Error on conflicts (default)
const processor = glost({ conflictStrategy: "error" });

// Warn but continue
const processor = glost({ conflictStrategy: "warn" });

// Silently use last write
const processor = glost({ conflictStrategy: "lastWins" });
```

## Advanced Usage

### Dynamic Plugin Loading

```typescript
const pluginIds = ["transcription", "translation", "frequency"];

let processor = glost();
for (const id of pluginIds) {
  processor = processor.use(id);
}

await processor.process(document);
```

### Conditional Plugins

```typescript
let processor = glost()
  .use(transcription);

if (needsTranslation) {
  processor = processor.use(translation);
}

if (needsFrequency) {
  processor = processor.use(frequency);
}

await processor.process(document);
```

### Plugin Factories

```typescript
function createLanguageProcessor(sourceLanguage: string, targetLanguage: string) {
  return glost()
    .use(transcription, { language: sourceLanguage })
    .use(translation, { target: targetLanguage })
    .use(frequency, { language: sourceLanguage })
    .freeze();
}

const thaiProcessor = createLanguageProcessor("th", "en");
const japaneseProcessor = createLanguageProcessor("ja", "en");

await thaiProcessor.process(thaiDoc);
await japaneseProcessor.process(japaneseDoc);
```

### Custom Presets

```typescript
const myPreset = {
  id: "my-custom",
  name: "My Custom Preset",
  description: "Tailored for my use case",
  plugins: [
    ["transcription", { scheme: "ipa" }],
    "translation",
    ["frequency", { normalize: true }],
    "difficulty"
  ]
};

processor.use(myPreset);
```

### Nested Presets

```typescript
const basePreset = {
  id: "base",
  plugins: ["transcription", "translation"]
};

const enhancedPreset = {
  id: "enhanced",
  plugins: [
    basePreset,
    "frequency",
    "difficulty"
  ]
};

processor.use(enhancedPreset);
```

### Performance Monitoring

```typescript
processor
  .onProgress((stats) => {
    console.log(`Completed ${stats.completed}/${stats.total}`);
    console.log(`Elapsed: ${stats.elapsed}ms`);
  })
  .use(plugin1)
  .use(plugin2)
  .use(plugin3);

const result = await processor.processWithMeta(document);

// Detailed timing
for (const [plugin, time] of result.metadata.stats.timing) {
  console.log(`${plugin}: ${time}ms`);
}
```

### Integration with Existing Code

```typescript
// Wrapper function for gradual migration
async function processWithPlugins(
  doc: GLOSTRoot,
  plugins: string[]
): Promise<GLOSTRoot> {
  let processor = glost({ lenient: true });
  
  for (const plugin of plugins) {
    processor = processor.use(plugin);
  }
  
  return await processor.process(doc);
}

// Use it
const result = await processWithPlugins(document, [
  "transcription",
  "translation",
  "frequency"
]);
```

## Best Practices

### 1. Freeze for Reuse

```typescript
// Good
const processor = createProcessor().freeze();
for (const doc of documents) {
  await processor.process(doc);
}

// Bad (recreates processor each time)
for (const doc of documents) {
  await createProcessor().process(doc);
}
```

### 2. Use Presets for Common Patterns

```typescript
// Good
import { languageLearningPreset } from "glost-presets";
processor.use(languageLearningPreset);

// Less good
processor
  .use("transcription")
  .use("translation")
  .use("frequency")
  .use("difficulty")
  .use("pos");
```

### 3. Handle Errors Appropriately

```typescript
// Good - lenient for non-critical processing
const processor = glost({ lenient: true });
const result = await processor.processWithMeta(doc);
if (result.metadata.errors.length > 0) {
  logErrors(result.metadata.errors);
}

// Good - strict for critical processing
try {
  await processor.process(doc);
} catch (error) {
  handleCriticalError(error);
}
```

### 4. Use Hooks for Observability

```typescript
processor
  .onProgress(updateUI)
  .onError(logToMonitoring)
  .use(plugin1)
  .use(plugin2);
```

## Next Steps

- [Plugin Development Guide](./plugin-development.md)
- [Registry Usage Guide](./registry.md)
- [Presets Guide](./presets.md)
- [API Reference](../api.md)
