# glost-transcription

Transcription/romanization extension for GLOST documents.

## Installation

```bash
pnpm add glost-transcription
```

## Usage

### createTranscriptionExtension

Create an extension that adds transcription data to words.

```typescript
import { createTranscriptionExtension } from 'glost-transcription';

const transcriptionExt = createTranscriptionExtension({
  targetLanguage: "th",
  lookupTranscription: async (word, language) => {
    // Return transcription data for the word
    return {
      rtgs: "sawatdi",
      ipa: "sa.wàt.diː",
      paiboon: "sa-wat-dii"
    };
  }
});
```

### Options

```typescript
interface TranscriptionExtensionOptions {
  targetLanguage: GlostLanguage;
  lookupTranscription?: (
    word: string,
    language: GlostLanguage
  ) => Promise<Record<string, string> | undefined>;
}
```

### Processing

Use with the async processor:

```typescript
import { processGLOSTWithExtensionsAsync } from 'glost-extensions';
import { createTranscriptionExtension } from 'glost-transcription';

const transcriptionExt = createTranscriptionExtension({
  targetLanguage: "th",
  lookupTranscription: async (word, lang) => {
    const response = await fetch(
      `/api/transcription/${lang}/${encodeURIComponent(word)}`
    );
    if (!response.ok) return undefined;
    return response.json();
  }
});

const result = await processGLOSTWithExtensionsAsync(document, [
  transcriptionExt
]);
```

### What It Does

The extension:

1. Visits each word node in the document
2. Calls the `lookupTranscription` function with the word text
3. Merges returned transcription data into `word.transcription`

### Example API Response

```json
{
  "rtgs": "sawatdi",
  "ipa": "sa.wàt.diː",
  "paiboon": "sa-wat-dii"
}
```

### Supported Transcription Systems

| System | Language | Description |
|--------|----------|-------------|
| `ipa` | Universal | International Phonetic Alphabet |
| `rtgs` | Thai | Royal Thai General System |
| `aua` | Thai | AUA Romanization |
| `paiboon` | Thai | Paiboon+ System |
| `romaji` | Japanese | Roman letters |
| `furigana` | Japanese | Hiragana reading aid |
| `pinyin` | Chinese | Standard romanization |

### Combining with Other Extensions

```typescript
const result = await processGLOSTWithExtensionsAsync(document, [
  createTranscriptionExtension({ targetLanguage: "th", lookupTranscription }),
  createTranslationExtension({ targetLanguage: "th", lookupTranslation }),
  FrequencyExtension,
  DifficultyExtension
]);
```
