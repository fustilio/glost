# GLOST - Glossed Syntax Tree

[![npm version](https://img.shields.io/npm/v/glost.svg)](https://www.npmjs.com/package/glost)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**GLOST** (Glossed Syntax Tree) is a powerful framework for processing multilingual text with language learning annotations using a unified/remark-style plugin system.

## Quick Start

```bash
npm install glost
```

```typescript
import { glost, createSimpleDocument, getAllWords } from "glost";
import { languageLearningPreset } from "glost/presets";

// Create a document
const words = [
  { type: "WordNode", value: "สวัสดี" },
  { type: "WordNode", value: "ครับ" }
];

const document = createSimpleDocument(words, "th", "thai", {
  sentenceText: "สวัสดีครับ"
});

// Process with plugins
const result = await glost()
  .use(languageLearningPreset)
  .process(document);

// Access processed data
const allWords = getAllWords(result);
```

## What's Included

The `glost` package is a convenient meta-package that includes:

- **glost-core** - Core types, nodes, and utilities
- **glost-processor** - Unified-style processor with fluent API
- **glost-registry** - Plugin discovery and validation
- **glost-presets** - Pre-configured plugin combinations

## Features

### 🚀 Unified-Style Processor

Fluent API for plugin composition:

```typescript
const processor = glost()
  .use(transcription, { scheme: "ipa" })
  .use(translation, { target: "en" })
  .use(frequency)
  .freeze();

const result = await processor.process(document);
```

### 🔍 Plugin Discovery

Find and validate plugins:

```typescript
import { pluginRegistry } from "glost";

const plugins = pluginRegistry.search({ language: "th" });
const report = pluginRegistry.checkConflicts(["plugin1", "plugin2"]);
```

### 📦 Presets

Quick setup with common configurations:

```typescript
import { languageLearningPreset } from "glost/presets";

const processor = glost()
  .use(languageLearningPreset);
```

Available presets:
- `languageLearningPreset` - Full language learning stack
- `readingAppPreset` - Interactive reading features
- `vocabularyBuilderPreset` - Word frequency and difficulty
- `grammarAnalyzerPreset` - POS and clause analysis
- `minimalPreset` - Just the essentials

### 🎯 Multi-Language Support

Built-in support for:
- Thai (`glost-th`)
- Japanese (`glost-ja`)
- Korean (`glost-ko`)
- English (`glost-en`)

### 🔧 Extensible

Create custom plugins or use community plugins:

```typescript
const myPlugin = {
  id: "my-plugin",
  name: "My Custom Plugin",
  transform: (tree) => {
    // Your custom logic
    return tree;
  }
};

processor.use(myPlugin);
```

## Package Structure

GLOST is organized as a monorepo:

```
glost/
├── glost              # Main package (this one)
├── glost-core         # Core types and nodes
├── glost-processor    # Processor API
├── glost-registry     # Plugin registry
├── glost-presets      # Preset configurations
├── glost-common       # Language utilities
├── glost-extensions   # Extension system
├── glost-th           # Thai language support
├── glost-ja           # Japanese language support
└── glost-cli          # CLI tools
```

## Installation Options

### All-in-One (Recommended)

```bash
npm install glost
```

### Granular Installation

```bash
# Just the core
npm install glost-core

# Core + processor
npm install glost-core glost-processor

# Core + specific language
npm install glost-core glost-th
```

## Usage Examples

### Basic Document Creation

```typescript
import { createSimpleDocument, getAllWords } from "glost";

const document = createSimpleDocument(words, "th", "thai");
const allWords = getAllWords(document);
```

### With Processor

```typescript
import { glost } from "glost";

const processor = glost()
  .use("transcription")
  .use("translation")
  .use("frequency");

const result = await processor.process(document);
```

### With Hooks

```typescript
import { glost } from "glost";

const processor = glost()
  .use("transcription")
  .before("transcription", (doc) => {
    console.log("Starting transcription");
  })
  .after("transcription", (doc) => {
    console.log("Transcription complete");
  })
  .onProgress((stats) => {
    console.log(`Progress: ${stats.completed}/${stats.total}`);
  });

await processor.process(document);
```

### With Registry

```typescript
import { pluginRegistry } from "glost";

// Search for plugins
const thaiPlugins = pluginRegistry.search({ 
  language: "th",
  category: "enhancer"
});

// Validate combinations
const report = pluginRegistry.checkConflicts([
  "transcription",
  "translation",
  "frequency"
]);

if (!report.hasConflicts) {
  // Safe to use together
  processor.use("transcription").use("translation").use("frequency");
}
```

## CLI Tools

Install CLI tools globally:

```bash
npm install -g glost-cli
```

```bash
# List plugins
glost plugins list

# Search
glost plugins search transcription

# Show info
glost plugins info transcription

# Validate
glost plugins validate transcription translation frequency
```

## Documentation

- **[Getting Started](./docs/getting-started.md)** - Installation and first steps
- **[Processor API](./docs/guides/processor-api.md)** - Complete processor guide
- **[Registry](./docs/guides/registry.md)** - Plugin discovery and validation
- **[Migration Guide](./MIGRATION_v0.4_to_v1.0.md)** - Upgrading from v0.4
- **[API Reference](./docs/api.md)** - Complete API documentation

## Examples

See the [examples](./examples/) directory for complete examples:

- Language learning app
- Large document processing
- Custom plugin development
- Multi-language support

## Use Cases

GLOST is used for:

- **Language Learning Apps** - Interactive reading with annotations
- **Dictionary Systems** - Multiple transcription schemes
- **Graded Readers** - Content adapted to learner level
- **Educational Tools** - Vocabulary and grammar practice
- **Text Analysis** - Linguistic annotation and processing

## Comparison with v0.4

### Before (v0.4)

```typescript
import { processGLOSTWithExtensions } from "glost-extensions";

const result = processGLOSTWithExtensions(doc, [ext1, ext2, ext3]);
```

### After (v1.0)

```typescript
import { glost } from "glost";

const result = await glost()
  .use(ext1)
  .use(ext2)
  .use(ext3)
  .process(doc);
```

See the [Migration Guide](./MIGRATION_v0.4_to_v1.0.md) for details.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT © fustilio

## Related Projects

- [nlcst](https://github.com/syntax-tree/nlcst) - Natural Language Concrete Syntax Tree
- [unist](https://github.com/syntax-tree/unist) - Universal Syntax Tree
- [unified](https://unifiedjs.com/) - Interface for parsing, inspecting, transforming, and serializing content

## Links

- [GitHub Repository](https://github.com/fustilio/glost)
- [Documentation](https://github.com/fustilio/glost/tree/main/docs)
- [npm Package](https://www.npmjs.com/package/glost)
- [Changelog](./CHANGELOG.md)
