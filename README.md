# GLOST - Glossed Syntax Tree

[![npm version](https://img.shields.io/npm/v/glost.svg)](https://www.npmjs.com/package/glost)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/glost.svg)](https://www.npmjs.com/package/glost)

**GLOST** (Glossed Syntax Tree) is a Concrete Syntax Tree format that extends [nlcst](https://github.com/syntax-tree/nlcst) for representing multilingual text with language learning annotations.

## Features

- Multi-language support with language-specific packages (Thai, Japanese, Korean, English)
- Rich annotations: transcription, translation, part-of-speech, difficulty levels
- Extensible plugin system for custom processing
- Full TypeScript support with type safety
- Modular architecture

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
- **[glost-th](./packages/languages/th)** - Thai language support [![npm](https://img.shields.io/npm/v/glost-th.svg)](https://www.npmjs.com/package/glost-th)
- **[glost-ja](./packages/languages/ja)** - Japanese language support [![npm](https://img.shields.io/npm/v/glost-ja.svg)](https://www.npmjs.com/package/glost-ja)

### Extensions
- **[glost-extensions-transcription](./packages/extensions/transcription)** - Transcription extension
- **[glost-extensions-translation](./packages/extensions/translation)** - Translation extension

### Plugins
- **[glost-plugin-inkle](./packages/plugins/inkle)** - Inkle/Ink integration

## Documentation

- **[Getting Started](./docs/getting-started.md)** - Installation and first steps
- **[Why GLOST?](./docs/why.md)** - Motivation and use cases
- **[Migration Guide](./MIGRATION_v0.3_to_v0.4.md)** - Upgrading from v0.3.x to v0.4.0
- **[API Reference](./docs/api.md)** - Complete API documentation
- **[Ecosystem](./docs/ecosystem.md)** - GLOST ecosystem and community

### Guides
- [v0.3.x → v0.4.0 Migration](./MIGRATION_v0.3_to_v0.4.md) - Upgrading to latest version
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

GLOST is used for:
- Language learning applications with interactive reading experiences
- Dictionary systems with multiple transcription schemes
- Graded readers adapted to learner proficiency
- Transcription and romanization tools
- Annotated text corpora

## Status

GLOST is used in some production applications. It has been tested with Thai, Japanese, Korean, and English across various transcription systems including IPA and romanization schemes. The library continues to evolve based on real-world use and feedback.

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
