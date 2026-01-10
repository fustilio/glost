# glost-extensions-thai Example

**Reference implementation** demonstrating how to build Thai language-specific GLOST extensions using `glost-th` and the GLOST extension system.

## What This Is

An example package showing how to create language-specific extensions for augmenting GLOST documents with Thai transcriptions, translations, and transformations.

**Key Points:**
- 🎯 **Demo data only**: 17-word vocabulary in `src/demo-data.ts` is for demonstration purposes
- 🛠️ **Uses glost-th**: Imports Thai language constants and utilities from `glost-th`
- 📚 **Shows patterns**: Demonstrates how to structure your own Thai extensions
- ⚠️ **Not production-ready**: Simplified implementations for learning purposes

## Structure

```
examples/glost-extensions-thai/
├── src/
│   ├── demo-data.ts           # Demo vocabulary (17 words) - FOR EXAMPLE ONLY
│   ├── transcription.ts       # Transcription extension using demo data
│   ├── translation.ts         # Translation extension using demo data
│   ├── word-joiner.ts         # Word joiner transformer using demo data
│   ├── syllable-segmenter.ts  # Syllable segmenter (simplified demo)
│   ├── pipeline.ts            # Pre-configured pipelines
│   └── index.ts               # Main exports
├── __tests__/                 # Test suite
├── README.md                  # This file
└── package.json
```

## What to Learn From This

### 1. How to use glost-th

```typescript
// Import Thai language constants and utilities
import {
  THAI_TRANSCRIPTION_SCHEMES,
  isThaiText,
  getToneMark,
  getToneNumber
} from "glost-th/constants";
import { createThaiWord } from "glost-th";

// Use Thai constants
const scheme = THAI_TRANSCRIPTION_SCHEMES.PAIBOON_PLUS;

// Use Thai utilities
if (isThaiText("สวัสดี")) {
  const toneMark = getToneMark("ก่า");
  const toneNumber = getToneNumber(toneMark);
}

// Create Thai GLOST nodes
const word = createThaiWord({
  text: "สวัสดี",
  rtgs: "sawatdi",
  partOfSpeech: "interjection",
});
```

### 2. How to structure demo data

See `src/demo-data.ts` for vocabulary structure:
- Multiple transcription systems (RTGS, IPA, Paiboon+, AUA)
- English translations
- Part of speech metadata
- Lookup functions

### 3. How to create extensions

```typescript
import { getDemoThaiTranscriptions } from "./demo-data.js";
import { createTranscriptionExtension } from "glost-transcription";

// Transcription extension wraps data provider
const provider = {
  async getTranscriptions(word: string, lang: string) {
    if (!lang.startsWith("th")) return undefined;
    return getDemoThaiTranscriptions(word);
  },
};

export const extension = createTranscriptionExtension({
  targetLanguage: "th",
  provider,
});
```

### 4. How to compose pipelines

Combine extensions for different use cases:
- Pronunciation practice: syllable segmentation + transcriptions + translations
- Dialogue practice: gender transformation + syllables + transcriptions
- Comprehensive: all transformers and enrichers together

## Usage

### Basic Usage

```typescript
import { createThaiExtensions } from "glost-extensions-thai";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

// Create both transcription and translation extensions
const extensions = createThaiExtensions("en-US");

// Process document
const result = await processGLOSTWithExtensionsAsync(document, extensions);
```

### Using Individual Extensions

```typescript
import {
  createThaiTranscriptionExtension,
  createThaiTranslationExtension,
} from "glost-extensions-thai";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

// Use only transcription
const extensions = [createThaiTranscriptionExtension()];

// Or use only translation
const extensions = [createThaiTranslationExtension("en-US")];

// Or compose them
const extensions = [
  createThaiTranscriptionExtension(),
  createThaiTranslationExtension("en-US"),
];

const result = await processGLOSTWithExtensionsAsync(document, extensions);
```

### Using Transformers

```typescript
import {
  createThaiWordJoinerExtension,
  ThaiSyllableSegmenterExtension,
} from "glost-extensions-thai";
import { processGLOSTWithExtensions } from "glost-extensions";

// Word joiner combines chunks into composite words
// Example: ซู + เปอร์ + มาร์เก็ต → ซูเปอร์มาร์เก็ต
const wordJoiner = createThaiWordJoinerExtension();

// Syllable segmenter breaks words into syllables
const syllableSegmenter = ThaiSyllableSegmenterExtension;

const result = processGLOSTWithExtensions(document, [
  wordJoiner,
  syllableSegmenter,
]);
```

### Using Pipelines

```typescript
import {
  createThaiPronunciationPipeline,
  createThaiDialoguePipeline,
  createThaiComprehensivePipeline,
} from "glost-extensions-thai";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

// Pronunciation-focused pipeline
const pronunciationPipeline = createThaiPronunciationPipeline();

// Dialogue/conversation pipeline with gender variants
const dialoguePipeline = createThaiDialoguePipeline({ gender: "male" });

// Comprehensive pipeline with all features
const comprehensivePipeline = createThaiComprehensivePipeline();

const result = await processGLOSTWithExtensionsAsync(document, dialoguePipeline);
```

## API Reference

### Enrichers (Add Data)

#### `createThaiTranscriptionExtension()`

Creates a transcription extension that augments word nodes with Thai transcriptions (RTGS, IPA, Paiboon+).

**Returns:** GLOST extension for transcriptions

#### `createThaiTranslationExtension(nativeLanguage?)`

Creates a translation extension that augments word nodes with Thai-to-English translations.

**Parameters:**
- `nativeLanguage` (optional): Native language for translations (default: `"en-US"`)

**Returns:** GLOST extension for translations

### Transformers (Modify Structure)

#### `createThaiWordJoinerExtension(options?)`

Creates a transformer that combines consecutive Thai word chunks into composite words.

**Example:** `["ซู", "เปอร์", "มาร์เก็ต"]` → `"ซูเปอร์มาร์เก็ต"`

**Options:**
- `maxCombinationLength`: Maximum words to combine (default: 4)
- `minCombinationLength`: Minimum words to combine (default: 2)

#### `createThaiSyllableSegmenterExtension(options?)`

Creates a transformer that segments Thai words into syllables with phonological structure.

**Options:**
- `includeCharacters`: Include character-level breakdown (default: true)
- `computeTones`: Compute tone numbers (default: true)

### Pipelines

#### `createThaiPronunciationPipeline(options?)`

Optimized for pronunciation practice: syllable segmentation + transcriptions + translations.

#### `createThaiDialoguePipeline(options?)`

Optimized for dialogue practice: gender transformation + syllables + transcriptions.

#### `createThaiComprehensivePipeline(options?)`

Full pipeline with all transformers and enrichers.

## Demo Data

The demo vocabulary in `src/demo-data.ts` includes ~17 common Thai words:

- สวัสดี (hello)
- ขอบคุณ (thank you)
- ครับ/ค่ะ (polite particles)
- ภาษา (language)
- เรียน (study)
- เข้าใจ (understand)
- พูด (speak)
- คำ (word)
- ไทย (Thai)
- ซูเปอร์มาร์เก็ต (supermarket) - for word joiner demo
- And more...

Each word includes:
- Multiple transcription systems (RTGS, IPA, Paiboon+, AUA)
- English translations
- Basic metadata (part of speech)

**Note:** This is demo data for example purposes only. Production applications should use comprehensive dictionary data.

## For Your Own Project

### Replace `src/demo-data.ts` with:
- ✅ Comprehensive dictionary data (e.g., Lexitron, Royal Institute Dictionary)
- ✅ Real database connections
- ✅ API clients to translation services
- ✅ Production-grade data sources
- ✅ Sophisticated syllable segmentation (e.g., DFA-based algorithms)

### Keep using `glost-th` for:
- ✅ Thai language constants (transcription schemes, tones, Unicode ranges)
- ✅ Character classification utilities
- ✅ Tone analysis functions
- ✅ Text utilities (detection, validation)
- ✅ GLOST node helpers

## Dependencies

- `glost` - Core GLOST types and utilities
- `glost-extensions` - Extension system framework
- `glost-th` - Thai language support (constants, utilit
