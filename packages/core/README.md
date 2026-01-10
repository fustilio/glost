# glost

Core types and node creation for GLOST (Glossed Syntax Tree).

## What is GLOST?

GLOST (Glossed Syntax Tree) is a Concrete Syntax Tree format that extends nlcst to support language learning annotations:

- **Translations and glosses** in multiple languages
- **Difficulty levels** and word frequency data
- **Pronunciation guides** (IPA, romanization, transcription systems)
- **Cultural context** and usage notes
- **Part-of-speech** tagging
- **Grammar metadata** for language learners

## Installation

```bash
pnpm add glost
```

## Usage

### Simple Document Creation (Recommended)

```typescript
import { createSimpleDocument, getAllWords, NODE_TYPES } from "glost";
import type { GLOSTWord, GLOSTRoot } from "glost";

// Create a simple document from words
const words = [
  createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
  createGLOSTWordNode({ value: "world", lang: "en", script: "latin" })
];

const document = createSimpleDocument(words, "en", "latin", {
  sentenceText: "hello world"
});

// Access words with type-safe helpers
const allWords = getAllWords(document);
console.log(allWords.length); // 2
```

### Manual Word Creation

```typescript
import { createGLOSTWordNode, createGLOSTRootNode } from "glost";
import type { GLOSTWord, GLOSTRoot } from "glost";

// Create a word node with annotations
// Language codes: ISO-639-1, ISO-639-3, or BCP-47 all work
const word = createGLOSTWordNode({
  value: "สวัสดี", // Thai: hello
  transcription: {
    rtgs: { text: "sà-wàt-dii", system: "rtgs" },
    ipa: { text: "sa.wàt.diː", system: "ipa" }
  },
  metadata: {
    partOfSpeech: "interjection",
    usage: "greeting"
  },
  lang: "th",    // Can also use "tha" (ISO-639-3) or "th-TH" (BCP-47)
  script: "thai"
});
```

## API

### Node Factory Functions

All factory functions accept a single options object for better readability and extensibility.

#### `createGLOSTWordNode(options)`

Create a word node with transcription and metadata.

```typescript
const word = createGLOSTWordNode({
  value: "hello",
  transcription: { ipa: { text: "həˈloʊ", system: "ipa" } },
  metadata: { partOfSpeech: "interjection" },
  lang: "en",        // optional
  script: "latin",   // optional
  extras: {}         // optional extension data
});
```

#### `createGLOSTSentenceNode(options)`

Create a sentence node containing word nodes.

```typescript
const sentence = createGLOSTSentenceNode({
  originalText: "Hello world",
  lang: "en",
  script: "latin",
  children: [wordNode1, wordNode2],  // optional
  transcription: {},                  // optional
  extras: {}                          // optional
});
```

#### `createGLOSTRootNode(options)`

Create a root document node.

```typescript
const root = createGLOSTRootNode({
  lang: "en",
  script: "latin",
  children: [paragraphNode],           // optional
  metadata: { title: "My Document" },  // optional
  extras: {}                           // optional
});
```

### Helper Functions

Convenience functions for common language patterns:

#### `createSimpleWord(options)`

```typescript
const word = createSimpleWord({
  text: "hello",
  transliteration: "həˈloʊ",
  system: "ipa",           // default: "ipa"
  partOfSpeech: "noun"     // default: "unknown"
});
```

### Language-Specific Helpers

**Note:** As of v0.2.0, language-specific helpers have been moved to separate packages.

#### Thai Language Support

```bash
npm install glost-th
```

```typescript
import { createThaiWord } from 'glost-th';

const word = createThaiWord({
  text: "สวัสดี",
  rtgs: "sawatdi",
  partOfSpeech: "interjection",
  tone: 2,
  syllables: ["sa", "wat", "di"]
});
```

See [glost-th documentation](../languages/th/README.md).

#### Japanese Language Support

```bash
npm install glost-ja
```

```typescript
import { createJapaneseWord } from 'glost-ja';

const word = createJapaneseWord({
  text: "こんにちは",
  romaji: "konnichiwa",
  partOfSpeech: "interjection",
  furigana: "こんにちは"
});
```

See [glost-ja documentation](../languages/ja/README.md).

**Migration:** See [MIGRATION.md](../../MIGRATION.md) for upgrading from v0.1.x.

## Features

- TypeScript support
- Extends nlcst (Natural Language Concrete Syntax Tree)
- Aims for compatibility with unist ecosystem
- Framework-agnostic
- Includes Zod validation schemas

## Related Packages

### Core Packages
- `glost-common` - Shared utilities and language configs
- `glost-extensions` - Extension system for transforming GLOST trees
- `glost-utils` - Utilities for working with GLOST documents

### Language Packages
- `glost-th` - Thai language support
- `glost-ja` - Japanese language support

## Documentation

See the main GLOST repository for full documentation.
