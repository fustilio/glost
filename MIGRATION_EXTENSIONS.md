# Extension Architecture Migration Guide

## Overview

Starting with v0.2.0, several extensions have been moved from `glost-extensions` core into separate packages. This migration improves modularity, reduces bundle sizes, and enables language-specific implementations.

## What Changed?

### Extensions Moved to Separate Packages

The following extensions now require separate installation:

| Old Location | New Package | Reason |
|--------------|-------------|--------|
| `FrequencyExtension` | `glost-frequency` | Requires language-specific corpus data |
| `DifficultyExtension` | `glost-difficulty` | Requires language-specific word lists |
| `PartOfSpeechExtension` | `glost-pos` | Requires language-specific POS taggers |
| `GenderExtension` | `glost-gender` | Requires language-specific dictionaries |
| `ClauseSegmenterExtension` | `glost-clause-segmenter` | Requires language-specific rules |

### Extensions Remaining in Core

These extensions stay in `glost-extensions` (no changes needed):

- `CulturalNotesExtension` - Formats existing notes
- `GenderTransformerExtension` - Pure text transformation
- `NegationTransformerExtension` - Rule-based, self-contained
- `ReadingScoreExtension` - Analyzer (computes from existing data)
- `LearnerHintsExtension` - Analyzer (computes from existing data)
- `ClauseAnalysisExtension` - Analyzer (analyzes existing structure)

## Migration Steps

### 1. Install New Packages

```bash
# Install the extensions you need
pnpm add glost-frequency glost-difficulty glost-pos glost-gender glost-clause-segmenter

# Or install individually
pnpm add glost-frequency
pnpm add glost-pos
```

### 2. Update Imports

#### Before (v0.1.x)

```typescript
import {
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension,
  GenderExtension,
  ClauseSegmenterExtension
} from "glost-extensions";

const result = processGLOSTWithExtensions(document, [
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension
]);
```

#### After (v0.2.0+)

**Important**: New packages require **real data providers**. No fallback/heuristic providers are included because inaccurate data is worse than no data.

```typescript
// Import from new packages
import { createFrequencyExtension } from "glost-frequency";
import { createDifficultyExtension } from "glost-difficulty";
import { createPOSExtension } from "glost-pos";

// Import language-specific providers (you must have these!)
import { createEnglishFrequencyProvider } from "your-corpus-package";
import { createEnglishDifficultyProvider } from "your-wordlist-package";
import { createEnglishPOSProvider } from "your-nlp-package";

// Create providers with real data
const freqProvider = createEnglishFrequencyProvider({
  corpusData: britishNationalCorpus
});
const diffProvider = createEnglishDifficultyProvider({
  cefrLists: cefrWordLists
});
const posProvider = createEnglishPOSProvider({
  tagger: stanfordNLPTagger
});

// Create extensions with providers
const [freqGen, freqEnh] = createFrequencyExtension({
  targetLanguage: "en",
  provider: freqProvider
});

const [diffGen, diffEnh] = createDifficultyExtension({
  targetLanguage: "en",
  provider: diffProvider
});

const [posGen, posEnh] = createPOSExtension({
  targetLanguage: "en",
  provider: posProvider
});

// Process (note: now async)
const result = await processGLOSTWithExtensionsAsync(document, [
  freqGen, freqEnh,
  diffGen, diffEnh,
  posGen, posEnh
]);
```

### 3. Use Language-Specific Providers

For better results, use language-specific providers from language packages:

```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createThaiFrequencyProvider } from "glost-th/extensions";

// Create Thai-specific provider
const thaiFreqProvider = createThaiFrequencyProvider({
  frequencyData: myThaiCorpusData
});

// Create extension
const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "th",
  provider: thaiFreqProvider
});

const result = await processGLOSTWithExtensionsAsync(document, [generator, enhancer]);
```

## Key Changes

### 1. Generator + Enhancer Pattern

Extensions are now split into two parts:

- **Generator**: Populates data using a provider (async, language-specific)
- **Enhancer**: Formats data for display (sync, language-agnostic)

```typescript
// Generator: Looks up frequency from provider
const generator = createFrequencyGeneratorExtension({
  targetLanguage: "en",
  provider: myProvider
});

// Enhancer: Formats frequency for display
const enhancer = createFrequencyEnhancerExtension();

// Use both together
await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

### 2. Provider Pattern

Extensions now use providers for language-specific data:

```typescript
// Define a provider
const myProvider: FrequencyProvider = {
  async getFrequency(word, language) {
    // Your frequency lookup logic
    return await lookupInCorpus(word, language);
  }
};

// Use with extension
const extension = createFrequencyGeneratorExtension({
  targetLanguage: "en",
  provider: myProvider
});
```

### 3. Async Processing

Since generators fetch external data, use async processor:

```typescript
// Before: Sync processing
const result = processGLOSTWithExtensions(doc, extensions);

// After: Async processing
const result = await processGLOSTWithExtensionsAsync(doc, extensions);
```

## Migration Examples

### Example 1: Frequency Extension

**Before:**
```typescript
import { FrequencyExtension } from "glost-extensions";

const result = processGLOSTWithExtensions(doc, [FrequencyExtension]);
```

**After (requires real corpus data):**
```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createEnglishFrequencyProvider } from "your-corpus-package";

// Use real corpus frequency data
const provider = createEnglishFrequencyProvider({
  corpusData: britishNationalCorpusFrequencies
});

const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider
});

const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

### Example 2: Multiple Extensions

**Before:**
```typescript
import {
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension
} from "glost-extensions";

const result = processGLOSTWithExtensions(doc, [
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension
]);
```

**After (requires real data sources):**
```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createDifficultyExtension } from "glost-difficulty";
import { createPOSExtension } from "glost-pos";

// Import your data providers
import { createEnglishFrequencyProvider } from "your-corpus-package";
import { createEnglishDifficultyProvider } from "your-wordlist-package";
import { createEnglishPOSProvider } from "your-nlp-package";

// Create providers with real data
const freqProvider = createEnglishFrequencyProvider({ corpusData });
const diffProvider = createEnglishDifficultyProvider({ cefrLists });
const posProvider = createEnglishPOSProvider({ nlpTagger });

// Create all extensions
const [freqGen, freqEnh] = createFrequencyExtension({
  targetLanguage: "en",
  provider: freqProvider
});

const [diffGen, diffEnh] = createDifficultyExtension({
  targetLanguage: "en",
  provider: diffProvider
});

const [posGen, posEnh] = createPOSExtension({
  targetLanguage: "en",
  provider: posProvider
});

// Process
const result = await processGLOSTWithExtensionsAsync(doc, [
  freqGen, freqEnh,
  diffGen, diffEnh,
  posGen, posEnh
]);
```

### Example 3: With Language Package

**Before:**
```typescript
import { FrequencyExtension } from "glost-extensions";

const result = processGLOSTWithExtensions(thaiDoc, [FrequencyExtension]);
```

**After:**
```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createThaiFrequencyProvider } from "glost-th/extensions";

const provider = createThaiFrequencyProvider({
  frequencyData: thaiCorpusData
});

const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "th",
  provider
});

const result = await processGLOSTWithExtensionsAsync(thaiDoc, [generator, enhancer]);
```

## Benefits of New Architecture

1. **Modularity**: Install only what you need
2. **Smaller Bundles**: Core package is ~30% smaller
3. **Language Support**: Easy to add language-specific providers
4. **Flexibility**: Mix and match generators and enhancers
5. **Explicit Dependencies**: Provider pattern makes data sources clear
6. **Independent Versioning**: Update extensions without core changes
7. **Data Quality**: No fallback/heuristic providers - real data only

## Philosophy: No Data > Bad Data

The new extension packages **intentionally do NOT include fallback or heuristic providers**. 

**Why?** In language learning applications, showing inaccurate data (e.g., wrong frequency levels, incorrect POS tags) is worse than showing no data at all. It misleads learners and undermines trust.

Instead:
- Providers return `undefined` when they don't have data
- Your UI handles missing data gracefully
- You use validated corpus data, NLP models, or expert word lists
- Data gaps are explicit and can be filled properly

See [docs/PROVIDER_PHILOSOPHY.md](docs/PROVIDER_PHILOSOPHY.md) for detailed rationale.

## Troubleshooting

### Error: "Cannot find module 'glost-extensions/extensions'"

**Problem**: Old import path

**Solution**: Update imports to use new packages:
```typescript
// Old
import { FrequencyExtension } from "glost-extensions/extensions";

// New
import { createFrequencyExtension } from "glost-frequency";
```

### Error: "FrequencyExtension is not exported"

**Problem**: Extension moved to separate package

**Solution**: Install the new package:
```bash
pnpm add glost-frequency
```

### Warning: "No provider provided, skipping processing"

**Problem**: Generator extension needs a provider

**Solution**: Create and pass a provider:
```typescript
import { createFallbackFrequencyProvider } from "glost-frequency";

const provider = createFallbackFrequencyProvider();
const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider  // ← Add this
});
```

## Need Help?

- See individual package READMEs for detailed usage
- Review the [Provider Philosophy](docs/PROVIDER_PHILOSOPHY.md) for design principles
- Check the [Extension Guides](docs/guides/README.md) for examples

## Timeline

- **v0.1.x**: Old architecture (all extensions in core)
- **v0.2.0**: New architecture (extensions in separate packages)
- **v0.3.0+**: Old extensions removed from core (breaking change)

We recommend migrating to the new architecture now to prepare for v0.3.0.
