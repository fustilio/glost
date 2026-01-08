# glost

Core types and node creation for GLOST (Glossed Syntax Tree).

## What is GLOST?

GLOST (Glossed Syntax Tree) is a Concrete Syntax Tree format that extends nlcst to support rich language learning annotations:

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

```typescript
import { createGLOSTWordNode, createGLOSTRootNode } from "glost";
import type { GLOSTWord, GLOSTRoot } from "glost";

// Create a word node with annotations
// Language codes: ISO-639-1, ISO-639-3, or BCP-47 all work
const word = createGLOSTWordNode(
  "สวัสดี", // Thai: hello
  {
    rtgs: { text: "sà-wàt-dii", system: "rtgs" },
    ipa: { text: "sa.wàt.diː", system: "ipa" }
  },
  {
    partOfSpeech: "interjection",
    usage: "greeting"
  },
  "word",
  "th",    // Can also use "tha" (ISO-639-3) or "th-TH" (BCP-47)
  "thai"
);
```

## Features

- Full TypeScript support
- Extends nlcst (Natural Language Concrete Syntax Tree)
- Compatible with unist ecosystem
- Framework-agnostic
- Zod validation schemas included

## Related Packages

- `glost-extensions` - Extension system for transforming GLOST trees
- `glost-utils` - Utilities for working with GLOST documents
- `glost-common` - Shared utilities and language configs

## Documentation

See the main GLOST repository for full documentation.
