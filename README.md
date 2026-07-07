# GLOST - Glossed Syntax Tree

[![npm version](https://img.shields.io/npm/v/%40glotblocks%2Fglost.svg)](https://www.npmjs.com/package/@glotblocks/glost)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/%40glotblocks%2Fglost.svg)](https://www.npmjs.com/package/@glotblocks/glost)

**GLOST** (Glossed Syntax Tree) is a framework for processing multilingual text with language learning annotations using a unified/remark-style plugin system.

All packages are published under the **`@glotblocks/`** npm scope. The old unscoped `glost*` packages are deprecated on npm and no longer receive updates.

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
npm install @glotblocks/glost
```

```typescript
import { glost } from '@glotblocks/glost';
import { languageLearningPreset } from '@glotblocks/glost/presets';
import { createThaiWord } from '@glotblocks/glost-th';

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
- **[@glotblocks/glost](./packages/glost)** - Main facade package (re-exports core, processor, registry, presets)
- **[@glotblocks/glost-core](./packages/core)** - Core types and node factories
- **[@glotblocks/glost-processor](./packages/processor)** - Unified-style processor API
- **[@glotblocks/glost-registry](./packages/registry)** - Plugin discovery and validation
- **[@glotblocks/glost-presets](./packages/presets)** - Pre-configured plugin combinations
- **[@glotblocks/glost-cli](./packages/cli)** - Command-line tools

### Supporting Packages
- **[@glotblocks/glost-common](./packages/common)** - Language utilities and shared code
- **[@glotblocks/glost-plugins](./packages/plugins/core)** - Plugin system core
- **[@glotblocks/glost-extensions](./packages/extensions)** - Extension system
- **[@glotblocks/glost-utils](./packages/utils)** - Text utilities
- **[@glotblocks/glost-align](./packages/align)** - Cross-language alignment (`ParallelDocument`)
- **[@glotblocks/glost-dialogue](./packages/dialogue)** - Dialogue/speaker annotations
- **[@glotblocks/glost-react](./packages/react)** - React rendering components

### Language Packages
- **[@glotblocks/glost-th](./packages/languages/th)** - Thai language support
- **[@glotblocks/glost-ja](./packages/languages/ja)** - Japanese language support
- **[@glotblocks/glost-ko](./packages/languages/ko)** - Korean language support
- **[@glotblocks/glost-en](./packages/languages/en)** - English language support

### Plugins
- **[@glotblocks/glost-transcription](./packages/plugins/transcription)** - Phonetic transcription
- **[@glotblocks/glost-translation](./packages/plugins/translation)** - Text translation
- **[@glotblocks/glost-frequency](./packages/plugins/frequency)** - Word frequency analysis
- **[@glotblocks/glost-difficulty](./packages/plugins/difficulty)** - Difficulty scoring
- **[@glotblocks/glost-pos](./packages/plugins/pos)** - Part-of-speech tagging
- **[@glotblocks/glost-gender](./packages/plugins/gender)** - Grammatical gender
- **[@glotblocks/glost-clause-segmenter](./packages/plugins/clause-segmenter)** - Clause segmentation
- **[@glotblocks/glost-inkle](./packages/plugins/inkle)** - Inkle/Ink integration

## Documentation

Documentation lives in the [docs site](./docs) (`docs/content/`):

- **[Getting Started](./docs/content/getting-started.mdx)** - Installation and first steps
- **[Concepts](./docs/content/concepts)** - Core concepts and data model
- **[Guides](./docs/content/guides)** - Processor API, registry, creating documents, plugin guides
- **[API Reference](./docs/content/api)** - Language codes, BCP-47, proficiency scales
- **[ADRs](./docs/adr)** - Architecture decision records (alignment, dialogue, id-stamp)

## Architecture

GLOST follows a unified/remark-style architecture:

```
@glotblocks/glost                    - Main facade package
  ├── @glotblocks/glost-core         - Core types and nodes
  ├── @glotblocks/glost-processor    - Processor API
  ├── @glotblocks/glost-registry     - Plugin registry
  └── @glotblocks/glost-presets      - Preset configurations

Supporting packages:
  ├── @glotblocks/glost-common       - Language utilities
  ├── @glotblocks/glost-plugins      - Plugin system
  ├── @glotblocks/glost-utils        - Text utilities
  ├── @glotblocks/glost-cli          - CLI tools
  │
  └── Language packages:
      ├── @glotblocks/glost-th       - Thai
      ├── @glotblocks/glost-ja       - Japanese
      ├── @glotblocks/glost-ko       - Korean
      └── @glotblocks/glost-en       - English
```

Packages are versioned independently with [Changesets](https://github.com/changesets/changesets); there is no single framework version. See each package's `CHANGELOG.md` for its history.

## Use Cases

GLOST is designed for:
- 📚 **Language learning apps** - Interactive reading with annotations
- 📖 **Graded readers** - Content adapted to learner proficiency
- 🔤 **Transcription tools** - Romanization and IPA systems
- 📝 **Dictionary systems** - Multi-scheme transcription support
- 🎓 **Annotated corpora** - Research and teaching materials

## CLI Tools

```bash
npm install -g @glotblocks/glost-cli

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

GLOST is production-ready and actively maintained. Performance benchmarks show:
- ✅ Small docs (10-50 words): < 1ms
- ✅ Medium docs (100-500 words): 2-15ms
- ✅ Large docs (1000+ words): 15-70ms
- ✅ Handles 100K+ word documents

The framework has been tested with Thai, Japanese, Korean, and English across various transcription systems including IPA and romanization schemes.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines. For adding language packages, refer to the [Multi-Language Architecture](./docs/content/guides/multi-language-architecture.mdx) guide or use `@glotblocks/glost-th` or `@glotblocks/glost-ja` as examples.

## License

MIT

## Related Projects

- [nlcst](https://github.com/syntax-tree/nlcst) - Natural Language Concrete Syntax Tree
- [unist](https://github.com/syntax-tree/unist) - Universal Syntax Tree

## Links

- [Documentation](./docs/content/index.mdx)
- [Examples](./examples/)
- [Changelogs](./packages) (per-package `CHANGELOG.md`, generated by Changesets)
