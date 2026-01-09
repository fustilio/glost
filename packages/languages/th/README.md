# glost-th

Thai language support for GLOST (Glossed Syntax Tree).

## Overview

This package provides Thai-specific helper functions and transcription provider interfaces for the GLOST framework. It has been externalized from the core `glost` package to keep the core lightweight and language-agnostic.

## Installation

```bash
npm install glost-th glost glost-common
# or
pnpm add glost-th glost glost-common
```

## Features

- **Helper Functions**: Convenience functions for creating Thai GLOST word nodes
- **Transcription Interfaces**: Standard interfaces for Thai transcription providers
- **RTGS Support**: Built-in support for Royal Thai General System of Transcription
- **Tone Marking**: Support for Thai tones and syllable breakdowns

## Usage

### Creating Thai Words

```typescript
import { createThaiWord } from 'glost-th';

const word = createThaiWord({
  text: 'สวัสดี',
  rtgs: 'sawatdi',
  partOfSpeech: 'interjection',
  tone: 2,
  syllables: ['sa', 'wat', 'di']
});
```

### Thai Transcription Schemes

This package defines interfaces for common Thai transcription schemes:

- **RTGS** (Royal Thai General System of Transcription)
- **Paiboon** romanization
- **Paiboon+** with tone marks
- **AUA** (American University Alumni system)
- **IPA** (International Phonetic Alphabet)

### Implementing a Transcription Provider

```typescript
import type { ThaiTranscriptionProvider } from 'glost-th/transcription';

const myThaiProvider: ThaiTranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    // Your implementation here
    return transcription;
  },
  
  getDefaultScheme(): string {
    return 'paiboon+';
  },
  
  hasScheme(scheme: string): boolean {
    return ['rtgs', 'paiboon+', 'ipa'].includes(scheme);
  },
  
  getAvailableSchemes(): string[] {
    return ['rtgs', 'paiboon', 'paiboon+', 'aua', 'ipa'];
  },
  
  getSchemeDisplayName(scheme: string): string {
    const names: Record<string, string> = {
      'rtgs': 'RTGS',
      'paiboon': 'Paiboon',
      'paiboon+': 'Paiboon+',
      'aua': 'AUA',
      'ipa': 'IPA'
    };
    return names[scheme] ?? scheme;
  }
};
```

## API Reference

### Helpers

#### `createThaiWord(options: CreateThaiWordOptions): GLOSTWord`

Creates a Thai word node with RTGS transcription.

**Options:**
- `text` (string): Thai text
- `rtgs` (string): RTGS romanization
- `partOfSpeech` (string, optional): Part of speech (default: "unknown")
- `tone` (number, optional): Tone number (1-5)
- `syllables` (string[], optional): Syllable breakdown

### Transcription

#### `ThaiTranscriptionProvider`

Interface for Thai transcription providers. See `glost-common` for the base `TranscriptionProvider` interface.

#### `ThaiTranscriptionScheme`

Type definition for Thai transcription schemes: `'rtgs' | 'paiboon' | 'paiboon+' | 'aua' | 'ipa'`

#### `isValidThaiScheme(scheme: string): boolean`

Validates if a string is a valid Thai transcription scheme.

#### `getThaiSchemeDisplayName(scheme: string): string`

Gets the display name for a Thai transcription scheme.

## Architecture

This package follows the [GLOST Multi-Language Architecture](https://github.com/fustilio/glost/blob/main/docs/guides/multi-language-architecture.md) pattern:

- **Focused**: Contains only Thai-specific code
- **Composable**: Works seamlessly with core GLOST packages
- **Extensible**: Easy to add new transcription providers
- **Type-safe**: Full TypeScript support

## Related Packages

- [`glost`](../core) - Core GLOST types and node factories
- [`glost-common`](../common) - Common language utilities
- [`glost-extensions`](../extensions/extensions) - Extension system
- [`glost-ja`](../ja) - Japanese language support

## Documentation

- [Implementing Transcription Providers](../../docs/guides/implementing-transcription-providers.md)
- [Multi-Language Architecture](../../docs/guides/multi-language-architecture.md)
- [Standard Metadata Schema](../../docs/standards/metadata-schema.md)

## License

MIT

## Contributing

Contributions are welcome! Please see the main GLOST repository for contribution guidelines.
