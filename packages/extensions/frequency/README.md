# glost-frequency

Word frequency extension for GLOST - generates and formats frequency data.

## Overview

This package provides frequency analysis for GLOST documents. It separates frequency **generation** (determining word frequencies) from frequency **enhancement** (formatting for display).

### Philosophy: No Data > Bad Data

This package **intentionally does NOT include fallback/heuristic providers**. Inaccurate frequency data is worse than no data, especially for language learning applications. You must provide a real frequency provider based on:
- Corpus frequency data (e.g., Thai National Corpus, BCCWJ for Japanese)
- Dictionary frequency rankings
- Other validated language resources

### Architecture

- **Generator**: Populates frequency data using a provider (language-specific)
- **Enhancer**: Formats frequency data with colors, labels, priorities (language-agnostic)
- **Provider Pattern**: Pluggable frequency sources (corpus data, word lists)

## Installation

```bash
pnpm add glost-frequency
```

## Usage

### With Language-Specific Provider (Required)

```typescript
import { createFrequencyGeneratorExtension, createFrequencyEnhancerExtension } from "glost-frequency";
import { createThaiFrequencyProvider } from "glost-th/extensions";

// Create language-specific provider
const thaiProvider = createThaiFrequencyProvider(datasource);

// Create extensions
const generator = createFrequencyGeneratorExtension({
  targetLanguage: "th",
  provider: thaiProvider
});

const enhancer = createFrequencyEnhancerExtension({
  normalize: true
});

// Process
const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

### Enhancer Only (Data Already Present)

If your documents already have frequency data, you can use just the enhancer:

```typescript
import { FrequencyEnhancerExtension } from "glost-frequency";
import { processGLOSTWithExtensions } from "glost-extensions";

// Synchronous processing (no generator needed)
const result = processGLOSTWithExtensions(document, [FrequencyEnhancerExtension]);
```

## Frequency Levels

The extension uses four standard frequency levels:

- `rare` - Infrequently used words
- `uncommon` - Less common words
- `common` - Commonly used words
- `very-common` - Very frequently used words

## Provider Pattern Benefits

1. **Data Integrity**: Only real corpus data, no guessing
2. **Language-Specific**: Each language can have optimized providers
3. **Data Source Flexibility**: Use different corpora or validated resources
4. **Composability**: Mix and match providers and enhancers
5. **Testability**: Mock providers for testing
6. **Graceful Degradation**: Returns undefined when no data available

## API

### createFrequencyGeneratorExtension(options)

Creates extension that populates frequency data.

**Options:**
- `targetLanguage` - ISO-639-1 language code
- `provider` - FrequencyProvider instance
- `skipExisting` - Skip words with existing frequency (default: true)

### createFrequencyEnhancerExtension(options)

Creates extension that formats frequency data.

**Options:**
- `normalize` - Normalize frequency values (default: true)
- `customMapping` - Word → frequency mappings

### Creating Custom Providers

Implement the `FrequencyProvider` interface with real corpus data:

```typescript
import type { FrequencyProvider, FrequencyLevel } from "glost-frequency";

export function createMyFrequencyProvider(corpusData: Map<string, number>): FrequencyProvider {
  return {
    async getFrequency(word, language) {
      const count = corpusData.get(word);
      if (!count) return undefined; // No data? Return undefined, don't guess!
      
      // Map corpus counts to frequency levels based on your data
      if (count > 10000) return "very-common";
      if (count > 1000) return "common";
      if (count > 100) return "uncommon";
      return "rare";
    }
  };
}
```

### createFrequencyExtension(options)

Convenience function that creates both generator and enhancer.

Returns: `[generator, enhancer]`

## Migration from glost-extensions

**Before (v0.1.x):**
```typescript
import { FrequencyExtension } from "glost-extensions";
processGLOSTWithExtensions(doc, [FrequencyExtension]);
```

**After (v0.2.0+):**
```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createThaiFrequencyProvider } from "glost-th/extensions";

// Use real corpus data provider
const provider = createThaiFrequencyProvider({
  corpusData: thaiNationalCorpusFrequencies
});

const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "th",
  provider
});

await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

## License

MIT
