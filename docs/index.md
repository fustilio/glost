# GLOST Documentation

**Current Version:** v0.5.0

**GLOST** (Glossed Syntax Tree) is a framework for processing multilingual text with language learning annotations using a unified/remark-style plugin system.

## Quick Links

### 🚀 Getting Started
- [Installation & Quick Start](./getting-started.md)
- [Why GLOST?](./why.md)
- [Release Notes v0.5.0](./releases/RELEASE_NOTES_v0.5.0.md)
- [Migration Guide v0.4 → v0.5](./migration/MIGRATION_v0.4_to_v0.5.md)

### 📚 Core Guides
- [Processor API](./guides/processor-api.md) - Unified-style processor with fluent `.use()` API
- [Plugin Registry](./guides/registry.md) - Discovery, validation, and conflict detection
- [Creating Documents](./guides/creating-documents.md) - Build GLOST documents
- [Using Extensions](./guides/using-extensions.md) - Process with plugins
- [Custom Extensions](./guides/custom-extensions.md) - Create your own plugins

### 🌍 Language Implementation
- [Multi-Language Architecture](./guides/multi-language-architecture.md) - Language support patterns
- [Implementing Transcription Providers](./guides/implementing-transcription-providers.md) - Provider patterns
- [Creating Data Source Packages](./guides/creating-data-source-packages.md) - Package creation
- [Thai Guide](./guides/thai.md) - Thai-specific features
- [Japanese Guide](./guides/japanese.md) - Japanese-specific features

## Package Reference

### Main Packages
| Package | Description |
|---------|-------------|
| [glost](../packages/glost/README.md) | Main facade package |
| [glost-core](../packages/core/README.md) | Core types and nodes |
| [glost-processor](../packages/processor/README.md) | Processor API |
| [glost-registry](../packages/registry/README.md) | Plugin registry |
| [glost-presets](../packages/presets/README.md) | Preset configurations |
| [glost-cli](../packages/cli/README.md) | CLI tools |

### Supporting Packages
| Package | Description |
|---------|-------------|
| [glost-common](../packages/common/README.md) | Language utilities |
| [glost-extensions](./packages/extensions.md) | Extension system |
| [glost-utils](./packages/utils.md) | Text utilities |

### Language Packages
| Package | Description |
|---------|-------------|
| [glost-th](../packages/languages/th/README.md) | Thai language support |
| [glost-ja](../packages/languages/ja/README.md) | Japanese language support |
| [glost-ko](../packages/languages/ko/README.md) | Korean language support |
| [glost-en](../packages/languages/en/README.md) | English language support |

### Extensions
| Extension | Description |
|-----------|-------------|
| [Transcription](./packages/transcription.md) | Phonetic transcription |
| [Translation](./packages/translation.md) | Text translation |
| [Frequency](../packages/extensions/frequency/README.md) | Word frequency |
| [Difficulty](../packages/extensions/difficulty/README.md) | Difficulty scoring |
| [POS](../packages/extensions/pos/README.md) | Part-of-speech tagging |
| [Gender](../packages/extensions/gender/README.md) | Grammatical gender |
| [Clause Segmenter](../packages/extensions/clause-segmenter/README.md) | Clause segmentation |

### Plugins
| Plugin | Description |
|--------|-------------|
| [glost-inkle](./packages/inkle.md) | Ink/Inkle integration |

## Core Concepts

- [Node Types](./concepts/nodes.md) - Understanding GLOST's node hierarchy
- [Extensions](./concepts/extensions.md) - Extension system architecture

## Standards & Reference

- [API Reference](./api.md) - Complete API documentation
- [Language Codes](./languages.md) - ISO-639-1, ISO-639-3, BCP-47
- [Proficiency Levels](./proficiency.md) - CEFR, JLPT, HSK, TOPIK mappings
- [Metadata Schema](./standards/metadata-schema.md) - Standard metadata structure
- [Naming Conventions](./conventions/naming.md) - Package naming patterns

## Architecture & Philosophy

- [Architecture Summary](./ARCHITECTURE_SUMMARY.md) - SRP/SSOT principles and composable design
- [Package Refactoring](./PACKAGE_REFACTORING.md) - v0.5.0 package structure changes
- [Unified Pipeline Implementation](./UNIFIED_PIPELINE_IMPLEMENTATION.md) - v0.5.0 technical details
- [Provider Philosophy](./PROVIDER_PHILOSOPHY.md) - "No Data > Bad Data" principle

## Ecosystem & Community

- [Ecosystem Overview](./ecosystem.md) - Core framework, standards, community packages
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute
- [Examples](../examples/) - Code examples and use cases

## Version History

- **v0.5.0** (Current) - [Release Notes](./releases/RELEASE_NOTES_v0.5.0.md) - Unified-style processor, enhanced registry, CLI tools, presets
- **v0.4.0** - Extension system, multi-language support
- **v0.3.0** - Core types and document creation

## Quick Example

```typescript
import { glost } from 'glost';
import { languageLearningPreset } from 'glost/presets';
import { createThaiWord, createSimpleDocument } from 'glost';

// Create processor with preset
const processor = glost()
  .use(languageLearningPreset)
  .freeze();

// Create document
const document = createSimpleDocument(
  [
    createThaiWord({ text: "สวัสดี" }),
    createThaiWord({ text: "ครับ" })
  ],
  "th",
  "thai",
  { sentenceText: "สวัสดีครับ" }
);

// Process
const result = await processor.process(document);
```

## Support

- 📖 [Documentation](https://github.com/fustilio/glost/tree/main/docs)
- 💬 [GitHub Discussions](https://github.com/fustilio/glost/discussions)
- 🐛 [Issue Tracker](https://github.com/fustilio/glost/issues)
