# GLOST - Glossed Syntax Tree

> Framework-agnostic syntax tree format for representing multilingual text enriched with learner-focused annotations.

## What is GLOST?

**GLOST** (Glossed Syntax Tree) is a Concrete Syntax Tree (CST) format that extends [nlcst](https://github.com/syntax-tree/nlcst) to support rich language learning metadata. It's designed to augment text with everything a language learner needs:

- **Translations and glosses** in multiple languages
- **Difficulty levels** and word frequency data  
- **Pronunciation guides** (IPA, romanization, transcription systems)
- **Cultural context** and usage notes
- **Part-of-speech** tagging
- **Grammar metadata** for language learners

## Why GLOST?

The name "GLOST" comes from "glossed" - the linguistic practice of adding annotations and translations to text. It's a CST (not AST) because it preserves all syntactic details including whitespace and punctuation, which is essential for language learning applications.

## Packages

### Core Packages

- **[glost](packages/core)** - Core types and node creation
- **[glost-common](packages/common)** - Shared utilities and language configs
- **[glost-extensions](packages/extensions)** - Extension system and built-in extensions
- **[glost-utils](packages/utils)** - Text parsing and manipulation utilities

### Extension Packages

- **[glost-transcription](packages/extensions/transcription)** - Pronunciation and transcription
- **[glost-translation](packages/extensions/translation)** - Multilingual glosses

### Plugin Packages

- **[glost-inkle](packages/plugins/inkle)** - Inkle/Ink integration

## Quick Start

```bash
# Install packages
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Usage Example

```typescript
import { createGLOSTWordNode, createGLOSTRootNode } from "glost";
import { processGLOST, FrequencyExtension, DifficultyExtension } from "glost-extensions";

// Create a word node with annotations
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
  "th",      // ISO-639-1 code
  "thai",
  {
    translations: {
      en: "hello, hi",
      ja: "こんにちは",
      zh: "你好"
    },
    metadata: {
      difficulty: "beginner",
      frequency: "very-common",
      culturalNotes: "Standard greeting used throughout the day"
    }
  }
);

// Process with extensions
const result = processGLOST(document, [
  FrequencyExtension,
  DifficultyExtension
]);
```

## Language Support

GLOST uses a **flexible language identification system** that accepts multiple formats:

- **ISO-639-1**: Two-letter codes (en, th, ja) - 184 languages
- **ISO-639-3**: Three-letter codes (eng, tha, jpn, cmn) - more precise identification
- **BCP-47**: Full tags with script/region (en-US, zh-Hans-CN)

Internally, GLOST normalizes to ISO-639-3 for precision, supporting distinctions that ISO-639-1 cannot make (e.g., Mandarin `cmn` vs Cantonese `yue`).

```typescript
import {
  // Core utilities (accept any format)
  getLanguageName,         // "th" or "tha" → "Thai"
  getNativeLanguageName,   // "ja" or "jpn" → "日本語"
  isValidLanguageCode,     // Validate any code format

  // ISO-639 conversion
  toISO639_3,              // "en" → "eng", "en-US" → "eng"
  toISO639_1,              // "eng" → "en", "cmn" → undefined

  // BCP-47 utilities
  parseBCP47,              // "zh-Hans-CN" → { language: "zh", script: "Hans", region: "CN" }
  buildBCP47,              // { language: "zh", script: "Hans" } → "zh-Hans"
  toBCP47WithRegion,       // "th" → "th-TH"

  // Language info
  getLanguageInfo,         // Full details for any code

  // Special codes
  SPECIAL_CODES,           // ["ipa", "und", "mul", "zxx"]
  isSpecialCode,           // Check for non-language codes
} from "glost-common";
```

### Supported Language Codes

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `en` | `eng` | English | English |
| `th` | `tha` | Thai | ไทย |
| `zh` | `zho` | Chinese | 中文 |
| `ja` | `jpn` | Japanese | 日本語 |
| `ko` | `kor` | Korean | 한국어 |
| - | `cmn` | Mandarin Chinese | 普通话 |
| - | `yue` | Cantonese | 粵語 |

See the [full list of ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and [ISO-639-3 codes](https://iso639-3.sil.org/code_tables/639/data).

## Architecture

GLOST follows a layered architecture:

```
┌─────────────────────────────────────┐
│   Language-Specific Extensions      │
│   (Thai, French, Japanese, etc.)    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Extension Packages             │
│   glost-transcription               │
│   glost-translation                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Core Extension System          │
│   glost-extensions                  │
│   (processor, registry, built-ins)  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Core & Utilities               │
│   glost          - Types & nodes    │
│   glost-common   - Language codes   │
│   glost-utils    - Helpers          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Foundation                     │
│   nlcst (Natural Language CST)      │
│   unist (Universal Syntax Tree)     │
└─────────────────────────────────────┘
```

## Features

- ✅ **Framework-agnostic** - Works in any JavaScript/TypeScript environment
- ✅ **Type-safe** - Full TypeScript support with comprehensive types
- ✅ **Extensible** - Plugin system for custom transformations
- ✅ **Standards-based** - Extends nlcst, compatible with unist ecosystem
- ✅ **Flexible language codes** - Accepts ISO-639-1, ISO-639-3, and BCP-47 formats
- ✅ **Language-learning focused** - Designed for educational applications
- ✅ **CST preservation** - Maintains all syntactic details for accurate representation

## Development

### Project Structure

```
external/glost/
├── packages/
│   ├── core/              # Core types and nodes
│   ├── common/            # Shared utilities
│   ├── extensions/        # Extension system
│   │   ├── transcription/ # Transcription extension
│   │   └── translation/   # Translation extension
│   ├── utils/             # Utilities
│   └── plugins/           # Plugins
│       └── inkle/         # Inkle integration
├── package.json           # Workspace root
├── pnpm-workspace.yaml    # Workspace config
└── tsconfig.json          # Base TypeScript config
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
cd packages/core && pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Roadmap

- [ ] Publish to npm as public packages
- [ ] Extract to separate repository
- [ ] Add more built-in extensions
- [ ] Improve documentation and examples
- [ ] Add language-specific extension templates

## License

MIT

## Related Projects

- [nlcst](https://github.com/syntax-tree/nlcst) - Natural Language Concrete Syntax Tree
- [unist](https://github.com/syntax-tree/unist) - Universal Syntax Tree
- [remark](https://github.com/remarkjs/remark) - Markdown processor (similar plugin architecture)

---

**GLOST** - Framework-agnostic syntax tree for language learning applications.
