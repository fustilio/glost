# GLOST Documentation

**GLOST** (Glossed Syntax Tree) is a Concrete Syntax Tree format that extends [nlcst](https://github.com/syntax-tree/nlcst) for representing multilingual text with language learning annotations.

## Getting Started

- [Why GLOST?](./why.md) - Motivation and comparison with other approaches
- [Getting Started](./getting-started.md) - Installation, basic usage, and examples
- [Migration Guide](../MIGRATION.md) - Upgrading from previous versions

## Core Concepts

- [Node Types](./concepts/nodes.md) - Understanding GLOST's node hierarchy
- [Extensions](./concepts/extensions.md) - Extension system architecture and usage

## Package Reference

Core packages and their APIs:

| Package | Description |
|---------|-------------|
| [glost](./packages/core.md) | Core types, node factories, tree utilities |
| [glost-common](../packages/common/README.md) | Language utilities and proficiency levels |
| [glost-extensions](./packages/extensions.md) | Extension system and built-in extensions |
| [glost-utils](./packages/utils.md) | Text parsing and manipulation |
| [glost-th](../packages/languages/th/README.md) | Thai language support |
| [glost-ja](../packages/languages/ja/README.md) | Japanese language support |
| [glost-transcription](./packages/transcription.md) | Transcription extension |
| [glost-translation](./packages/translation.md) | Translation extension |
| [glost-inkle](./packages/inkle.md) | Ink/Inkle integration |

## Guides

### Core Usage
- [Creating Documents](./guides/creating-documents.md) - Build GLOST documents from words and sentences
- [Using Extensions](./guides/using-extensions.md) - Process documents with extensions
- [Custom Extensions](./guides/custom-extensions.md) - Create your own extensions
### Language Implementation
- [Multi-Language Architecture](./guides/multi-language-architecture.md) - Pattern for multi-language support
- [Implementing Transcription Providers](./guides/implementing-transcription-providers.md) - Provider implementation approaches
- [Creating Data Source Packages](./guides/creating-data-source-packages.md) - Building extension packages

### Language-Specific
- [Thai](./guides/thai.md) - Thai-specific features and usage
- [Japanese](./guides/japanese.md) - Japanese-specific features and usage

## Standards & Reference

- [API Reference](./api.md) - Complete glost-common API
- [Language Codes](./languages.md) - ISO-639-1, ISO-639-3, BCP-47 support
- [Proficiency Levels](./proficiency.md) - CEFR, JLPT, HSK, TOPIK mappings
- [Metadata Schema](./standards/metadata-schema.md) - Standard metadata structure
- [Naming Conventions](./conventions/naming.md) - Package naming patterns

## Ecosystem & Contributing

- [Ecosystem Overview](./ecosystem.md) - Core framework, standards, and community packages
- [Architecture Summary](./ARCHITECTURE_SUMMARY.md) - SRP/SSOT principles and composable design
- [Provider Philosophy](./PROVIDER_PHILOSOPHY.md) - "No Data > Bad Data" principle
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute

## Quick Example

```typescript
import { createSentenceFromWords } from 'glost';
import { createThaiWord } from 'glost-th';

const words = [
  createThaiWord({ text: "สวัสดี", rtgs: "sawatdi", partOfSpeech: "interjection" }),
  createThaiWord({ text: "ครับ", rtgs: "khrap", partOfSpeech: "particle" })
];

const sentence = createSentenceFromWords(words, "th", "thai", "สวัสดีครับ");
```
