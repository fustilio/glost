# glost-translation

**Language-agnostic** translation extension for GLOST.

## Architecture

This package provides the **core translation logic**. Language-specific implementations are provided by **language packages**:

- `glost-th/extensions` - Thai-English translations
- `glost-ja/extensions` - Japanese-English translations
- `glost-zh/extensions` - Chinese-English translations (coming soon)
- etc.

## Installation

```bash
# Core translation extension (required)
npm install glost-translation

# Language-specific provider (pick your language)
npm install glost-th      # Thai
npm install glost-ja      # Japanese
```

## Usage

### Basic Usage

```typescript
import { createTranslationExtension } from "glost-translation";
import { thaiTranslationProvider } from "glost-th/extensions";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

const extension = createTranslationExtension({
  sourceLanguage: "th",
  targetLanguage: "en",
  provider: thaiTranslationProvider
});

const result = await processGLOSTWithExtensionsAsync(document, [extension]);
```

### Japanese Example

```typescript
import { createTranslationExtension } from "glost-translation";
import { japaneseTranslationProvider } from "glost-ja/extensions";

const extension = createTranslationExtension({
  sourceLanguage: "ja",
  targetLanguage: "en",
  provider: japaneseTranslationProvider
});

const result = await processGLOSTWithExtensionsAsync(document, [extension]);
```

## Provider Interface

Language packages implement the `TranslationProvider` interface:

```typescript
interface TranslationProvider {
  getTranslation(
    word: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | undefined>;
}
```

### Creating a Custom Provider

```typescript
import type { TranslationProvider } from "glost-translation";

const myProvider: TranslationProvider = {
  async getTranslation(word, sourceLang, targetLang) {
    // Your translation logic here
    // Could call an API, lookup in a dictionary, etc.
    
    if (word === "hello" && sourceLang === "en" && targetLang === "es") {
      return "hola";
    }
    
    return undefined;
  }
};
```

## API

### `createTranslationExtension(options)`

Creates a translation extension.

**Options:**
- `sourceLanguage` (required): Source language code (e.g., "th", "ja")
- `targetLanguage` (required): Target language code (usually "en")
- `provider` (required): Language-specific translation provider

**Returns:** `GLOSTExtension`

## Behavior

- Only adds translation if none exists (doesn't overwrite)
- Removes trailing punctuation before lookup
- Fails silently if provider can't translate a word
- Stores translations in `extras.translations[targetLang]` (i18n-friendly)

## Philosophy

### Language Agnostic Core

The translation extension is **language agnostic**:
- ✅ Defines the provider interface
- ✅ Implements the transformation logic
- ✅ Handles document traversal
- ❌ **NO** language-specific translation data

### Language-Specific Providers

Language packages provide **language-specific implementations**:
- ✅ Dictionary lookups or APIs
- ✅ Context-aware translations
- ✅ Multiple definitions
- ✅ Part-of-speech specific translations

**Benefits:**
- Single extension works for all languages
- Data stays in language packages (single source of truth)
- Easy to add new languages
- Clear separation of concerns

## Implementation Guide

### For Language Package Maintainers

To add translation support for your language:

1. **Create extensions module** in your language package:

```
glost-[lang]/
  src/
    extensions/
      translation.ts    # Your provider implementation
      index.ts
```

2. **Implement the provider**:

```typescript
import type { TranslationProvider } from "glost-translation";

export const myLanguageTranslationProvider: TranslationProvider = {
  async getTranslation(word, sourceLang, targetLang) {
    // Your translation logic
    // Dictionary lookup, API call, etc.
    
    return translation || undefined;
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
    "glost-translation": "workspace:*"
  }
}
```

## Related Packages

- `glost` - Core GLOST types
- `glost-extensions` - Extension system
- `glost-th` - Thai language support
- `glost-ja` - Japanese language support

## License

MIT
