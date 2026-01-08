# GLOST - Glossed Syntax Tree

**GLOST** (Glossed Syntax Tree) is a Concrete Syntax Tree format that extends [nlcst](https://github.com/syntax-tree/nlcst) to support rich language learning metadata.

## Features

- 🌍 **Multi-language support** - Aims to handle multiple languages with proper metadata
- 📝 **Rich annotations** - Support for transcription, translation, part-of-speech, difficulty levels
- 🔌 **Extensible** - Plugin system for custom processing
- 🎯 **Type-safe** - Full TypeScript support
- 📦 **Modular** - Use only what you need

## Quick Start

```bash
npm install glost glost-common
# Install language packages as needed
npm install glost-th glost-ja
```

```typescript
import { createSentenceFromWords } from 'glost';
import { createThaiWord } from 'glost-th';
import { getLanguageName } from 'glost-common';

const words = [
  createThaiWord({ 
    text: "สวัสดี", 
    rtgs: "sawatdi", 
    partOfSpeech: "interjection" 
  }),
  createThaiWord({ 
    text: "ครับ", 
    rtgs: "khrap", 
    partOfSpeech: "particle" 
  })
];

const sentence = createSentenceFromWords(words, "th", "thai", "สวัสดีครับ");

console.log(getLanguageName("th")); // "Thai"
```

## Packages

### Core Packages
- **[glost](./packages/core)** - Core types and node factories
- **[glost-common](./packages/common)** - Language utilities and shared code
- **[glost-extensions](./packages/extensions/extensions)** - Extension system
- **[glost-utils](./packages/utils)** - Text utilities

### Language Packages
- **[glost-th](./packages/languages/th)** - Thai language support
- **[glost-ja](./packages/languages/ja)** - Japanese language support

### Extensions
- **[glost-extensions-transcription](./packages/extensions/transcription)** - Transcription extension
- **[glost-extensions-translation](./packages/extensions/translation)** - Translation extension

### Plugins
- **[glost-plugin-inkle](./packages/plugins/inkle)** - Inkle/Ink integration

## Documentation

- **[Getting Started](./docs/getting-started.md)** - Installation and first steps
- **[Why GLOST?](./docs/why.md)** - Motivation and use cases
- **[Migration Guide](./MIGRATION.md)** - Upgrading from v0.1.x to v0.2.0
- **[API Reference](./docs/api.md)** - Complete API documentation
- **[Ecosystem](./docs/ecosystem.md)** - GLOST ecosystem and community

### Guides
- [Creating Documents](./docs/guides/creating-documents.md)
- [Using Extensions](./docs/guides/using-extensions.md)
- [Multi-Language Architecture](./docs/guides/multi-language-architecture.md)
- [Implementing Transcription Providers](./docs/guides/implementing-transcription-providers.md)

### Standards
- [Metadata Schema](./docs/standards/metadata-schema.md)
- [Naming Conventions](./docs/conventions/naming.md)

## Architecture

GLOST follows a modular architecture with clear separation of concerns:

```
glost (core)              - Core types and node factories
  ├── glost-common        - Language utilities
  ├── glost-extensions    - Extension system
  ├── glost-utils         - Text utilities
  │
  ├── glost-th            - Thai language support
  ├── glost-ja            - Japanese language support
  └── glost-*             - Other language packages
```

## Use Cases

GLOST may be useful for:
- **Language Learning Apps** - Building interactive reading experiences
- **Dictionary Systems** - Rich word annotations with multiple transcription schemes
- **Graded Readers** - Content adapted to learner proficiency
- **Transcription Tools** - Converting between scripts and romanization
- **Corpus Linguistics** - Annotated text corpora with metadata

## Status

GLOST is being used in real-world applications and has been tested with:
- Multiple languages across different writing systems
- Various transcription systems (IPA, romanization, phonetic)
- Hundreds of words with metadata
- Performance suitable for interactive applications

We're still learning and improving based on feedback and real-world use.

## Contributing

We'd appreciate contributions! Please see:
- [Architecture Summary](./docs/ARCHITECTURE_SUMMARY.md)
- [Multi-Language Architecture Guide](./docs/guides/multi-language-architecture.md)
- [Implementing Transcription Providers](./docs/guides/implementing-transcription-providers.md)

If you'd like to add a new language package:
1. You can follow the [Multi-Language Architecture](./docs/guides/multi-language-architecture.md) guide
2. Consider using `glost-th` or `glost-ja` as a reference
3. Feel free to submit a PR with your language package

## License

MIT

## Related Projects

- [nlcst](https://github.com/syntax-tree/nlcst) - Natural Language Concrete Syntax Tree
- [unist](https://github.com/syntax-tree/unist) - Universal Syntax Tree

## Links

- [Documentation](./docs/index.md)
- [Examples](./examples/)
- [Changelog](./CHANGELOG.md)
