# Language × Feature Matrix

Visual guide showing how GLOST's modular architecture enables combining any language package with any feature framework.

## The X × Y Pattern

```
Language Package (X) × Feature Framework (Y) = Specific Extension
```

This modular pattern enables:

- **Reusability**: Each component can be used across multiple combinations
- **Modularity**: Language and feature logic are separate
- **Scalability**: Easy to add new languages or features
- **Consistency**: Uniform API across all combinations

## Current Implementation Status

### Language + Transcription

| Language | Package | Example | Status |
|----------|---------|---------|--------|
| **Thai** | `@glotblocks/glost-th` | [`glost-th-transcription-example`](./demos/glost-th-transcription-example/) | ✓ Implemented |
| **Japanese** | `@glotblocks/glost-ja` | [`glost-ja-transcription-example`](./demos/glost-ja-transcription-example/) | ✓ Implemented |
| **Korean** | `@glotblocks/glost-ko` | [`glost-ko-transcription-example`](./demos/glost-ko-transcription-example/) | ✓ Implemented |
| **English** | `@glotblocks/glost-en` | — | Not yet implemented |

### Full Extension Suites

Comprehensive examples showing multiple extensions working together:

| Language | Example | Extensions Included | Status |
|----------|---------|---------------------|--------|
| **Thai** | [`glost-th-extensions-suite-example`](./demos/glost-th-extensions-suite-example/) | Transcription, Translation, Word Joiner, Syllable Segmenter | ✓ Implemented |
| **Thai** | [`glost-th-multi-extension-pipeline-example`](./demos/glost-th-multi-extension-pipeline-example/) | Full pipeline with all Thai extensions | ✓ Implemented |

## Available Language Packages (X)

| Package | Description | Script Systems |
|---------|-------------|----------------|
| [`@glotblocks/glost-th`](../packages/languages/th/) | Thai language support | Thai script, RTGS romanization |
| [`@glotblocks/glost-ja`](../packages/languages/ja/) | Japanese language support | Hiragana, Katakana, Kanji, Romaji |
| [`@glotblocks/glost-ko`](../packages/languages/ko/) | Korean language support | Hangul, Romanization |
| [`@glotblocks/glost-en`](../packages/languages/en/) | English language support | Latin script, IPA |

## Available Feature Frameworks (Y)

| Package | Description | Use Cases |
|---------|-------------|-----------|
| [`@glotblocks/glost-transcription`](../packages/plugins/transcription/) | Add transcription/transliteration | Romanization, phonetic notation |
| [`@glotblocks/glost-translation`](../packages/plugins/translation/) | Add translations | Glosses, definitions |
| [`@glotblocks/glost-frequency`](../packages/plugins/frequency/) | Word frequency analysis | Difficulty assessment |
| [`@glotblocks/glost-pos`](../packages/plugins/pos/) | Part-of-speech tagging | Grammar analysis |
| [`@glotblocks/glost-difficulty`](../packages/plugins/difficulty/) | Difficulty scoring | Learning materials |
| [`@glotblocks/glost-gender`](../packages/plugins/gender/) | Grammatical gender | Language learning |
| [`@glotblocks/glost-clause-segmenter`](../packages/plugins/clause-segmenter/) | Clause segmentation | Syntax analysis |

## Possible Combinations

Any language can be combined with any feature:

```
4 Languages × 7 Features = 28 Possible Combinations
```

### Example Combinations (Not Yet Implemented)

- Thai + Translation
- Japanese + Frequency
- Korean + Part-of-Speech
- English + Difficulty
- Thai + Gender
- ... and many more!

## How It Works

Each combination is created by:

1. **Language Package** provides:
   - Language-specific tokenization
   - Script system definitions
   - Language metadata helpers

2. **Feature Framework** provides:
   - Generic extension interface
   - Processing logic
   - Data structures

3. **Combination** creates:
   - Language-specific implementation
   - Provider integration
   - Complete working extension

### Example Code

```typescript
// 1. Import language support
import { createThaiProcessor } from "@glotblocks/glost-th";

// 2. Import feature framework
import { createTranscriptionExtension } from "@glotblocks/glost-transcription";

// 3. Create provider
const provider = {
  async transcribe(text: string) {
    // Language-specific implementation
    return transcribeThaiToRTGS(text);
  }
};

// 4. Combine them
export function createThaiTranscriptionExtension() {
  return createTranscriptionExtension({
    targetLanguage: "th",
    provider,
  });
}
```

## Adding New Combinations

To add a new language + feature combination:

1. Create a new example directory: `demos/glost-{lang}-{feature}-example/`
2. Implement the provider interface for that feature
3. Combine the language package with the feature framework
4. Add tests to verify functionality

See [Creating Custom Extensions](../docs/content/guides/custom-plugins.mdx) for detailed instructions.

## Benefits

### For Library Users

- **Consistency**: Same API across all languages
- **Flexibility**: Mix and match as needed
- **Discoverability**: Clear naming patterns

### For Contributors

- **Clarity**: Separate concerns for language vs. feature
- **Maintainability**: Changes to one don't affect others
- **Testability**: Test language and feature logic independently

## See Also

- [Examples README](./README.md) - Full list of examples
- [GLOST Architecture](../docs/content/architecture-summary.mdx) - System overview
- [Extension Guide](../docs/content/guides/custom-plugins.mdx) - Creating extensions
- [Multi-Language Architecture](../docs/content/guides/multi-language-architecture.mdx) - Design patterns
