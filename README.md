# GLOST - Glossed Syntax Tree

[![npm version](https://img.shields.io/npm/v/glost.svg)](https://www.npmjs.com/package/glost)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/glost.svg)](https://www.npmjs.com/package/glost)

**GLOST** (Glossed Syntax Tree) is a framework for processing multilingual text with language learning annotations using a unified/remark-style plugin system.

## Features

- 🚀 **Unified-style API** - Fluent `.use()` chaining inspired by unified/remark
- 🔍 **Plugin Discovery** - Enhanced registry with search and validation
- 📦 **Presets** - Pre-configured plugin combinations for common use cases
- 🌍 **Multi-language** - Thai, Japanese, Korean, English with extensible language support
- 🎯 **Rich Annotations** - Transcription, translation, POS, difficulty, frequency
- 🔧 **CLI Tools** - Command-line plugin management
- 💪 **TypeScript** - Full type safety and excellent DX

## Quick Start

```bash
npm install glost
```

```typescript
import { glost } from 'glost';
import { languageLearningPreset } from 'glost/presets';
import { createThaiWord } from 'glost-th';

// Create a processor with a preset
const processor = glost()
  .use(languageLearningPreset)
  .freeze();

// Create a document
const document = createSimpleDocument(
  [
    createThaiWord({ text: "สวัสดี" }),
    createThaiWord({ text: "ครับ" })
  ],
  "th",
  "thai",
  { sentenceText: "สวัสดีครับ" }
);

// Process it
const result = await processor.process(document);
```

## Packages

### Main Packages
- **[glost](./packages/glost)** - Main facade package (re-exports core, processor, registry, presets)
- **[glost-core](./packages/core)** - Core types and node factories
- **[glost-processor](./packages/processor)** - Unified-style processor API
- **[glost-registry](./packages/registry)** - Plugin discovery and validation
- **[glost-presets](./packages/presets)** - Pre-configured plugin combinations
- **[glost-cli](./packages/cli)** - Command-line tools

### Supporting Packages
- **[glost-common](./packages/common)** - Language utilities and shared code
- **[glost-plugins](./packages/extensions/extensions)** - Extension system
- **[glost-utils](./packages/utils)** - Text utilities

### Language Packages
- **[glost-th](./packages/languages/th)** - Thai language support
- **[glost-ja](./packages/languages/ja)** - Japanese language support
- **[glost-ko](./packages/languages/ko)** - Korean language support
- **[glost-en](./packages/languages/en)** - English language support

### Extensions
- **[Transcription](./packages/extensions/transcription)** - Phonetic transcription
- **[Translation](./packages/extensions/translation)** - Text translation
- **[Frequency](./packages/extensions/frequency)** - Word frequency analysis
- **[Difficulty](./packages/extensions/difficulty)** - Difficulty scoring
- **[POS](./packages/extensions/pos)** - Part-of-speech tagging
- **[Gender](./packages/extensions/gender)** - Grammatical gender
- **[Clause Segmenter](./packages/extensions/clause-segmenter)** - Clause segmentation

### Plugins
- **[glost-plugin-inkle](./packages/plugins/inkle)** - Inkle/Ink integration

## Documentation

- **[Documentation Index](./docs/index.md)** - Complete documentation hub
- **[Getting Started](./docs/getting-started.md)** - Installation and first steps
- **[Migration Guide v0.4 → v0.5](./docs/migration/MIGRATION_v0.4_to_v0.5.md)** - Upgrading to v0.5.0
- **[Release Notes v0.5.0](./docs/releases/RELEASE_NOTES_v0.5.0.md)** - What's new in v0.5.0

### Core Guides
- **[Processor API](./docs/guides/processor-api.md)** - Unified-style processor
- **[Registry](./docs/guides/registry.md)** - Plugin discovery and validation
- **[Creating Documents](./docs/guides/creating-documents.md)** - Document creation
- **[Using Extensions](./docs/guides/using-extensions.md)** - Extension system
- **[Custom Extensions](./docs/guides/custom-extensions.md)** - Create your own

### Architecture
- **[Package Refactoring](./docs/PACKAGE_REFACTORING.md)** - v0.5.0 package structure
- **[Unified Pipeline](./docs/UNIFIED_PIPELINE_IMPLEMENTATION.md)** - Implementation details
- **[Multi-Language Architecture](./docs/guides/multi-language-architecture.md)** - Language support patterns

## Architecture

GLOST v0.5.0 follows a unified/remark-style architecture:

```
glost                    - Main facade package
  ├── glost-core         - Core types and nodes
  ├── glost-processor    - Processor API
  ├── glost-registry     - Plugin registry
  └── glost-presets      - Preset configurations

Supporting packages:
  ├── glost-common       - Language utilities
  ├── glost-plugins   - Extension system
  ├── glost-utils        - Text utilities
  ├── glost-cli          - CLI tools
  │
  └── Language packages:
      ├── glost-th       - Thai
      ├── glost-ja       - Japanese
      ├── glost-ko       - Korean
      └── glost-en       - English
```

## Use Cases

GLOST is designed for:
- 📚 **Language learning apps** - Interactive reading with annotations
- 📖 **Graded readers** - Content adapted to learner proficiency
- 🔤 **Transcription tools** - Romanization and IPA systems
- 📝 **Dictionary systems** - Multi-scheme transcription support
- 🎓 **Annotated corpora** - Research and teaching materials

## CLI Tools

```bash
npm install -g glost-cli

# Discover plugins
glost plugins list
glost plugins search transcription

# Get info
glost plugins info transcription

# Validate combinations
glost plugins validate transcription translation frequency

# Create new plugin
glost plugins create MyPlugin
```

## Status

**Current Version:** v0.5.0

GLOST is production-ready and actively maintained. Performance benchmarks show:
- ✅ Small docs (10-50 words): < 1ms
- ✅ Medium docs (100-500 words): 2-15ms
- ✅ Large docs (1000+ words): 15-70ms
- ✅ Handles 100K+ word documents
- ✅ 290+ tests passing

The framework has been tested with Thai, Japanese, Korean, and English across various transcription systems including IPA and romanization schemes.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines. For adding language packages, refer to the [Multi-Language Architecture](./docs/guides/multi-language-architecture.md) guide or use `glost-th` or `glost-ja` as examples.

## License

MIT

## Related Projects

- [nlcst](https://github.com/syntax-tree/nlcst) - Natural Language Concrete Syntax Tree
- [unist](https://github.com/syntax-tree/unist) - Universal Syntax Tree

## Links

- [Documentation](./docs/index.md)
- [Examples](./examples/)
- [Changelog](./CHANGELOG.md)
