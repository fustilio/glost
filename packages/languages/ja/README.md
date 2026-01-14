# glost-ja

Japanese language support for GLOST (Glossed Syntax Tree).

## Overview

This package provides Japanese-specific helper functions and transcription provider interfaces for the GLOST framework. It has been externalized from the core `glost` package to keep the core lightweight and language-agnostic.

## Installation

```bash
npm install glost-ja glost glost-common
# or
pnpm add glost-ja glost glost-common
```

## Features

- **Helper Functions**: Convenience functions for creating Japanese GLOST word nodes
- **Transcription Interfaces**: Standard interfaces for Japanese transcription providers
- **Romaji Support**: Built-in support for romaji romanization
- **Furigana Support**: Support for furigana reading aids
- **Multiple Systems**: Interfaces for Hepburn, Kunrei-shiki, and Nihon-shiki romanization

## Usage

### Creating Japanese Words

```typescript
import { createJapaneseWord } from 'glost-ja';

const word = createJapaneseWord({
  text: 'こんにちは',
  romaji: 'konnichiwa',
  partOfSpeech: 'interjection',
  furigana: 'こんにちは'
});
```

### Japanese Transcription Schemes

This package defines interfaces for common Japanese transcription schemes:

- **Romaji** (generic romanization)
- **Hepburn** romanization (most common)
- **Kunrei-shiki** romanization
- **Nihon-shiki** romanization
- **Furigana** (reading aid in kana)
- **Hiragana** reading
- **Katakana** reading
- **IPA** (International Phonetic Alphabet)

### Implementing a Transcription Provider

```typescript
import type { JapaneseTranscriptionProvider } from 'glost-ja/transcription';

const myJapaneseProvider: JapaneseTranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    // Your implementation here
    return transcription;
  },
  
  getDefaultScheme(): string {
    return 'hepburn';
  },
  
  hasScheme(scheme: string): boolean {
    return ['hepburn', 'furigana', 'ipa'].includes(scheme);
  },
  
  getAvailableSchemes(): string[] {
    return ['romaji', 'hepburn', 'kunrei', 'furigana', 'ipa'];
  },
  
  getSchemeDisplayName(scheme: string): string {
    const names: Record<string, string> = {
      'romaji': 'Romaji',
      'hepburn': 'Hepburn',
      'kunrei': 'Kunrei-shiki',
      'nihon': 'Nihon-shiki',
      'furigana': 'Furigana',
      'ipa': 'IPA'
    };
    return names[scheme] ?? scheme;
  }
};
```

## API Reference

### Helpers

#### `createJapaneseWord(options: CreateJapaneseWordOptions): GLOSTWord`

Creates a Japanese word node with romaji and optional furigana.

**Options:**
- `text` (string): Japanese text (hiragana, katakana, or kanji)
- `romaji` (string): Romaji romanization
- `partOfSpeech` (string, optional): Part of speech (default: "unknown")
- `furigana` (string, optional): Furigana reading

### Transcription

#### `JapaneseTranscriptionProvider`

Interface for Japanese transcription providers. See `glost-common` for the base `TranscriptionProvider` interface.

#### `JapaneseTranscriptionScheme`

Type definition for Japanese transcription schemes: `'romaji' | 'hepburn' | 'kunrei' | 'nihon' | 'furigana' | 'hiragana' | 'katakana' | 'ipa'`

#### `isValidJapaneseScheme(scheme: string): boolean`

Validates if a string is a valid Japanese transcription scheme.

#### `getJapaneseSchemeDisplayName(scheme: string): string`

Gets the display name for a Japanese transcription scheme.

## Architecture

This package follows the [GLOST Multi-Language Architecture](https://github.com/fustilio/glost/blob/main/docs/guides/multi-language-architecture.md) pattern:

- **Focused**: Contains only Japanese-specific code
- **Composable**: Works seamlessly with core GLOST packages
- **Extensible**: Easy to add new transcription providers
- **Type-safe**: Full TypeScript support

## Related Packages

- [`glost`](../core) - Core GLOST types and node factories
- [`glost-common`](../common) - Common language utilities
- [`glost-plugins`](../extensions/extensions) - Extension system
- [`glost-th`](../th) - Thai language support

## Documentation

- [Implementing Transcription Providers](../../docs/guides/implementing-transcription-providers.md)
- [Multi-Language Architecture](../../docs/guides/multi-language-architecture.md)
- [Standard Metadata Schema](../../docs/standards/metadata-schema.md)

## License

MIT

## Contributing

Contributions are welcome! Please see the main GLOST repository for contribution guidelines.
