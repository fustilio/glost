# GLOST Documentation

**GLOST** (Glossed Syntax Tree) is a Concrete Syntax Tree format that extends [nlcst](https://github.com/syntax-tree/nlcst) to support language learning metadata.

## Navigation

- **[Documentation Structure](./DOCUMENTATION_STRUCTURE.md)** - How docs are organized

## Getting Started

- [Why GLOST?](./why.md) - Motivation and use cases
- [Getting Started](./getting-started.md) - Installation and first steps
- [Migration Guide](../MIGRATION.md) - Upgrading from v0.1.x to v0.2.0

## Reference

- [Language Codes](./languages.md) - ISO-639-1, ISO-639-3, BCP-47
- [Proficiency Levels](./proficiency.md) - CEFR, JLPT, HSK, TOPIK
- [API Reference](./api.md) - Complete glost-common API

## Ecosystem

- [Ecosystem Overview](./ecosystem.md) - GLOST ecosystem model and production implementations

## Standards

- [Metadata Schema](./standards/metadata-schema.md) - Standard metadata fields
- [Naming Conventions](./conventions/naming.md) - Package naming patterns

## Concepts

- [Node Types](./concepts/nodes.md) - GLOST's node hierarchy
- [Extensions](./concepts/extensions.md) - Extension system architecture

## Packages

| Package | Description |
|---------|-------------|
| [glost](./packages/core.md) | Core types, node factories, tree utilities |
| [glost-extensions](./packages/extensions.md) | Extension system and built-ins |
| [glost-utils](./packages/utils.md) | Text conversion and manipulation |
| [glost-th](../packages/languages/th/README.md) | Thai language support |
| [glost-ja](../packages/languages/ja/README.md) | Japanese language support |
| [glost-transcription](./packages/transcription.md) | Transcription extension |
| [glost-translation](./packages/translation.md) | Translation extension |
| [glost-inkle](./packages/inkle.md) | Ink/Inkle integration |

## Guides

### Core Guides
- [Creating Documents](./guides/creating-documents.md) - Build GLOST documents
- [Using Extensions](./guides/using-extensions.md) - Process with extensions
- [Custom Extensions](./guides/custom-extensions.md) - Create your own

### Language Implementation
- [Multi-Language Architecture](./guides/multi-language-architecture.md) - Structure for multi-language support
- [Implementing Transcription Providers](./guides/implementing-transcription-providers.md) - Three proven approaches
- [Creating Data Source Packages](./guides/creating-data-source-packages.md) - Package creation guide

### Language-Specific
- [Working with Thai](./guides/thai.md) - Thai-specific features
- [Working with Japanese](./guides/japanese.md) - Japanese-specific features

## Installation

```bash
pnpm add glost glost-common
```

## Quick Example

```typescript
import { createSentenceFromWords } from 'glost';
import { createThaiWord } from 'glost-th';
import { getLanguageName } from 'glost-common';

const words = [
  createThaiWord({ text: "สวัสดี", rtgs: "sawatdi", partOfSpeech: "interjection" }),
  createThaiWord({ text: "ครับ", rtgs: "khrap", partOfSpeech: "particle" })
];

const sentence = createSentenceFromWords(words, "th", "thai", "สวัสดีครับ");

getLanguageName("th"); // "Thai"
```

## Architecture

```
glost-transcription ─────────┐
                             ├── glost-extensions ── glost ── glost-common
glost-translation ───────────┤                         │
                             │                         ↓
glost-utils ─────────────────┘                    (nlcst/unist)
```
