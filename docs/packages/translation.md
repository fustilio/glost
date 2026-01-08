# glost-translation

Translation extension for GLOST documents.

## Installation

```bash
pnpm add glost-translation
```

## Usage

### createTranslationExtension

Create an extension that adds translations to words.

```typescript
import { createTranslationExtension } from 'glost-translation';

const translationExt = createTranslationExtension({
  targetLanguage: "th",
  nativeLanguage: "en",
  lookupTranslation: async (word, language) => {
    // Return translation for the word
    return "hello";
  }
});
```

### Options

```typescript
interface TranslationExtensionOptions {
  targetLanguage: GlostLanguage;
  nativeLanguage?: GlostLanguage;
  lookupTranslation?: (
    word: string,
    language: GlostLanguage
  ) => Promise<string | undefined>;
}
```

- `targetLanguage` - The language of the text being processed
- `nativeLanguage` - The language to translate into (default: "en")
- `lookupTranslation` - Async function to fetch translations

### Processing

Use with the async processor:

```typescript
import { processGLOSTWithExtensionsAsync } from 'glost-extensions';
import { createTranslationExtension } from 'glost-translation';

const translationExt = createTranslationExtension({
  targetLanguage: "th",
  nativeLanguage: "en",
  lookupTranslation: async (word, lang) => {
    const response = await fetch(
      `/api/dictionary/${lang}/${encodeURIComponent(word)}`
    );
    if (!response.ok) return undefined;
    const data = await response.json();
    return data.translation;
  }
});

const result = await processGLOSTWithExtensionsAsync(document, [
  translationExt
]);
```

### What It Does

The extension:

1. Visits each word node in the document
2. Calls the `lookupTranslation` function with the word text
3. Adds the translation to `word.extras.translations[nativeLanguage]`

### Result Structure

After processing, words will have translations in extras:

```typescript
{
  type: "WordNode",
  children: [{ type: "TextNode", value: "สวัสดี" }],
  extras: {
    translations: {
      en: "hello"
    }
  }
}
```

### Multiple Languages

You can add translations for multiple languages by running the extension multiple times:

```typescript
const toEnglish = createTranslationExtension({
  targetLanguage: "th",
  nativeLanguage: "en",
  lookupTranslation: lookupEnglish
});

const toJapanese = createTranslationExtension({
  targetLanguage: "th",
  nativeLanguage: "ja",
  lookupTranslation: lookupJapanese
});

const result = await processGLOSTWithExtensionsAsync(document, [
  toEnglish,
  toJapanese
]);

// Result: word.extras.translations = { en: "hello", ja: "こんにちは" }
```

### Combining with Other Extensions

```typescript
const result = await processGLOSTWithExtensionsAsync(document, [
  createTranslationExtension({ targetLanguage: "th", lookupTranslation }),
  createTranscriptionExtension({ targetLanguage: "th", lookupTranscription }),
  FrequencyExtension,
  DifficultyExtension
]);
```
