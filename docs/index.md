# GLOST Documentation

**GLOST** (Glossed Syntax Tree) is a Concrete Syntax Tree format that extends [nlcst](https://github.com/syntax-tree/nlcst) to support rich language learning metadata.

## Getting Started

- [Why GLOST?](./why.md) - Motivation and use cases
- [Getting Started](./getting-started.md) - Installation and first steps

## Reference

- [Language Codes](./languages.md) - ISO-639-1, ISO-639-3, BCP-47
- [Proficiency Levels](./proficiency.md) - CEFR, JLPT, HSK, TOPIK
- [API Reference](./api.md) - Complete glost-common API

## Concepts

- [Node Types](./concepts/nodes.md) - GLOST's node hierarchy
- [Extensions](./concepts/extensions.md) - Extension system architecture

## Packages

| Package | Description |
|---------|-------------|
| [glost](./packages/core.md) | Core types, node factories, tree utilities |
| [glost-extensions](./packages/extensions.md) | Extension system and built-ins |
| [glost-utils](./packages/utils.md) | Text conversion and manipulation |
| [glost-transcription](./packages/transcription.md) | Transcription extension |
| [glost-translation](./packages/translation.md) | Translation extension |
| [glost-inkle](./packages/inkle.md) | Ink/Inkle integration |

## Guides

- [Creating Documents](./guides/creating-documents.md) - Build GLOST documents
- [Using Extensions](./guides/using-extensions.md) - Process with extensions
- [Custom Extensions](./guides/custom-extensions.md) - Create your own
- [Working with Thai](./guides/thai.md) - Thai-specific features
- [Working with Japanese](./guides/japanese.md) - Japanese-specific features

## Installation

```bash
pnpm add glost glost-common
```

## Quick Example

```typescript
import { createThaiWord, createSentenceFromWords } from 'glost';
import { getLanguageName } from 'glost-common';

const words = [
  createThaiWord("สวัสดี", "sawatdi", "interjection"),
  createThaiWord("ครับ", "khrap", "particle")
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
