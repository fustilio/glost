# glost-transcription

**Language-agnostic** transcription extension for GLOST.

## Architecture

This package provides the **core transcription logic**. Language-specific implementations are provided by **language packages**:

- `glost-th/extensions` - Thai RTGS, IPA, Paiboon
- `glost-ja/extensions` - Japanese romaji, furigana
- `glost-zh/extensions` - Chinese pinyin (coming soon)
- etc.

## Installation

```bash
# Core transcription extension (required)
npm install glost-transcription

# Language-specific provider (pick your language)
npm install glost-th      # Thai
npm install glost-ja      # Japanese
```

## Usage

### Basic Usage

```typescript
import { createTranscriptionExtension } from "glost-transcription";
import { thaiTranscriptionProvider } from "glost-th/extensions";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

const extension = createTranscriptionExtension({
  targetLanguage: "th",
  provider: thaiTranscriptionProvider
});

const result = await processGLOSTWithExtensionsAsync(document, [extension]);
```

### Japanese Example

```typescript
import { createTranscriptionExtension } from "glost-transcription";
import { japaneseTranscriptionProvider } from "glost-ja/extensions";

const extension = createTranscriptionExtension({
  targetLanguage: "ja",
  provider: japaneseTranscriptionProvider
});

const result = await processGLOSTWithExtensionsAsync(document, [extension]);
```

## Provider Interface

Language packages implement the `TranscriptionProvider` interface:

```typescript
interface TranscriptionProvider {
  getTranscriptions(
    word: string,
    language: string
  ): Promise<Record<string, string> | undefined>;
}
```

### Creating a Custom Provider

```typescript
import type { TranscriptionProvider } from "glost-transcription";

const myProvider: TranscriptionProvider = {
  async getTranscriptions(word, language) {
    // Your transcription logic here
    // Could call an API, lookup in a dictionary, etc.
    
    return {
      ipa: "həˈloʊ",
      custom: "heh-LOH"
    };
  }
};
```

## API

### `createTranscriptionExtension(options)`

Creates a transcription extension.

**Options:**
- `targetLanguage` (required): Language code (e.g., "th", "ja")
- `provider` (required): Language-specific transcription provider

**Returns:** `GLOSTExtension`

## Behavior

- Only adds transcription if none exists (doesn't overwrite)
- Removes trailing punctuation before lookup
- Fails silently if provider can't transcribe a word
- Supports multiple transcription schemes per word

## Philosophy

### Language Agnostic Core

The transcription extension is **language agnostic**:
- ✅ Defines the provider interface
- ✅ Implements the transformation logic
- ✅ Handles document traversal
- ❌ **NO** language-specific transcription data

### Language-Specific Providers

Language packages provide **language-specific implementations**:
- ✅ Transcription algorithms or APIs
- ✅ Multiple transcription schemes
- ✅ Language-specific rules
- ✅ Dictionary lookups

**Benefits:**
- Single extension works for all languages
- Data stays in language packages (single source of truth)
- Easy to add new languages
- Clear separation of concerns

## Implementation Guide

### For Language Package Maintainers

To add transcription support for your language:

1. **Create extensions module** in your language package:

```
glost-[lang]/
  src/
    extensions/
      transcription.ts    # Your provider implementation
      index.ts
```

2. **Implement the provider**:

```typescript
import type { TranscriptionProvider } from "glost-transcription";

export const myLanguageTranscriptionProvider: TranscriptionProvider = {
  async getTranscriptions(word, language) {
    // Your transcription logic
    return {
      ipa: "...",
      romanization: "..."
    };
  }
};
```

3. **Export from package.json**:

```json
{
  "exports": {
    "./extensions": {
      "types": "./dist/extensions/index.d.ts",
      "default": "./dist/extensions/index.js"
    }
  }
}
```

4. **Add dependency**:

```json
{
  "dependencies": {
    "glost-transcription": "workspace:*"
  }
}
```

## Related Packages

- `glost` - Core GLOST types
- `glost-extensions` - Extension system
- `glost-th` - Thai language support
- `glost-ja` - Japanese language support

## Documentation

- [Implementing Transcription Providers](../../../docs/guides/implementing-transcription-providers.md)

## License

MIT
