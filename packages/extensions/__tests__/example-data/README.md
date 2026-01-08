# GLOST Example Data (Test Utilities)

Example vocabulary and translation data for testing, documentation, and demonstrating the composable architecture.

**⚠️ Important:** This data is located in `__tests__` and is **NOT included in production builds**. It's only for testing and examples.

## Architecture Principles

This example data system demonstrates two core principles:

### 1. Single Responsibility Principle (SRP)

Each function does ONE thing:

- `findWord()` - Finds ONE word
- `getTranscription()` - Gets ONE transcription system
- `getTranslation()` - Translates ONE word
- `createTranscriptionLookup()` - Creates lookup for ONE system

### 2. Single Source of Truth (SSOT)

- Vocabulary data lives in JSON files (ONE place)
- All functions import and use this data (no duplication)
- Update data once, all functions reflect changes

## Usage

### Import from Test Utilities

```typescript
// In test files
import { 
  findWord, 
  getTranscription,
  createTranscriptionLookup 
} from '../__tests__/example-data';
```

### Basic Data Access

```typescript
// Find a word
const entry = findWord("สวัสดี", "th");
console.log(entry.frequency); // "very-common"

// Get transcription
const ipa = getTranscription("สวัสดี", "th", "ipa");
console.log(ipa); // "sà.wàt.diː"
```

### Composition - Mix & Match

```typescript
import { createTranscriptionLookup } from '../__tests__/example-data';
import { createTranscriptionGeneratorExtension } from 'glost-extensions-transcription';

// Create lookup function (pure composition)
const lookupThaiPaiboon = createTranscriptionLookup("th", "paiboon");

// Use with extension
const extension = createTranscriptionGeneratorExtension({
  targetLanguage: "th",
  lookupTranscription: lookupThaiPaiboon
});
```

### Different Combinations

```typescript
// Same data, different systems
const lookupIPA = createTranscriptionLookup("th", "ipa");
const lookupRTGS = createTranscriptionLookup("th", "rtgs");
const lookupPaiboon = createTranscriptionLookup("th", "paiboon");

// Multiple systems at once
const lookupAll = createMultiSystemTranscriptionLookup("th");

// With fallback
const lookupWithFallback = createFallbackLookup(
  lookupPaiboon,  // Try first
  lookupIPA       // Fallback
);
```

## Available Languages

- **English** (en) - 15 words
- **Thai** (th) - 15 words (with IPA, RTGS, Paiboon+, tone marks)
- **Japanese** (ja) - 12 words (with IPA, romaji, furigana)
- **French** (fr) - 12 words (with IPA, gender)
- **Spanish** (es) - 12 words (with IPA, gender)

## Data Structure

Each vocabulary entry contains:

```typescript
{
  word: string;              // Native script
  frequency: FrequencyLevel; // "rare" | "uncommon" | "common" | "very-common"
  difficulty: DifficultyLevel; // "beginner" | "intermediate" | "advanced"
  partOfSpeech: string;      // "noun" | "verb" | "adjective" | etc.
  gender?: string;           // For gendered languages
  culturalNotes?: string;    // Usage context
  transcription: {           // Multiple systems
    ipa?: string;
    rtgs?: string;           // Thai
    paiboon?: string;        // Thai
    romaji?: string;         // Japanese
    furigana?: string;       // Japanese
  };
  translations: {            // To other languages
    en?: string;
    th?: string;
    ja?: string;
    fr?: string;
    es?: string;
  };
  examples?: string[];       // Example sentences
  tone?: {                   // For tonal languages
    syllables: string[];
    description: string;
  };
}
```

## Helper Functions

### Data Access (SSOT)

| Function | Responsibility | Example |
|----------|----------------|---------|
| `loadVocabulary(lang)` | Load dataset for ONE language | `loadVocabulary("th")` |
| `findWord(word, lang)` | Find ONE word | `findWord("สวัสดี", "th")` |
| `getTranscription(word, lang, system)` | Get ONE transcription | `getTranscription("สวัสดี", "th", "ipa")` |
| `getTranslation(word, from, to)` | Translate ONE word | `getTranslation("hello", "en", "th")` |
| `getAllTranscriptions(word, lang)` | Get ALL systems | `getAllTranscriptions("สวัสดี", "th")` |
| `getWordsByProperty(lang, prop, val)` | Filter by property | `getWordsByProperty("th", "difficulty", "beginner")` |

### Lookup Factories (Composition)

| Function | Responsibility | Returns |
|----------|----------------|---------|
| `createTranslationLookup(from, to)` | Translation lookup | `(word, lang) => Promise<string>` |
| `createTranscriptionLookup(lang, system)` | Single system lookup | `(word, lang) => Promise<Record<string, string>>` |
| `createMultiSystemTranscriptionLookup(lang)` | All systems lookup | `(word, lang) => Promise<Record<string, string>>` |
| `createFallbackLookup(primary, fallback)` | Fallback behavior | Combined lookup function |
| `createEnrichedLookup(lang)` | Enriched data | `(word, lang) => Promise<Record<string, unknown>>` |

## Extending the Data

To add more languages or words:

1. Create new JSON file in `vocabulary/`
2. Follow the same structure
3. Import in `helpers.ts`
4. Add to `VOCABULARY_DATA` object

That's it! All functions automatically work with the new data (SSOT).

## Not Included in Production

This data is in the `__tests__` directory and will **NOT** be bundled in production builds:

```json
// tsconfig.json typically excludes __tests__
{
  "exclude": ["**/__tests__", "**/*.test.ts"]
}
```

For production, you should:
- Create separate data source packages (e.g., `glost-th-datasource-lexitron`)
- Use real dictionaries/APIs
- Follow the same SRP/SSOT patterns

## See Also

- [Composition Pattern Examples](../../../../examples/) - Test files using this data
- [SRP/SSOT Architecture](../../../../docs/ARCHITECTURE_SUMMARY.md) - Design principles
- [Creating Data Source Packages](../../../../docs/guides/creating-data-source-packages.md) - Production packages
