# glost-pos

Part-of-speech extension for GLOST - generates and formats POS data.

## Overview

This package provides POS tagging for GLOST documents. It separates POS **generation** (tagging words) from POS **enhancement** (formatting for display).

### Philosophy: No Data > Bad Data

This package **intentionally does NOT include heuristic/rule-based taggers**. Inaccurate POS tags are worse than no tags. You must provide a real POS tagger based on:
- NLP models (e.g., MeCab for Japanese, Stanford NLP)
- Dictionary-based tagging
- Other validated language resources

### Architecture

- **Generator**: Tags words using a provider (language-specific NLP or dictionary)
- **Enhancer**: Formats POS tags with categories and abbreviations (language-agnostic)
- **Provider Pattern**: Pluggable taggers (NLP models, dictionaries)

## Installation

```bash
pnpm add glost-pos
```

## Usage

### With Language-Specific Provider (Required)

```typescript
import { createPOSGeneratorExtension, createPOSEnhancerExtension } from "glost-pos";
import { createThaiPOSProvider } from "glost-th/extensions";

// Create language-specific provider
const thaiProvider = createThaiPOSProvider(datasource);

// Create extensions
const generator = createPOSGeneratorExtension({
  targetLanguage: "th",
  provider: thaiProvider
});

const enhancer = createPOSEnhancerExtension({
  normalize: true,
  customMappings: {
    "n": { category: "Noun", abbreviation: "N" }
  }
});

// Process
const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

### Enhancer Only (Data Already Present)

If your documents already have POS data:

```typescript
import { POSEnhancerExtension } from "glost-pos";
import { processGLOSTWithExtensions } from "glost-plugins";

const result = processGLOSTWithExtensions(document, [POSEnhancerExtension]);
```

## Universal POS Tags

The enhancer uses Universal Dependencies POS categories:

- `noun` - Noun
- `verb` - Verb
- `adjective` - Adjective
- `adverb` - Adverb
- `pronoun` - Pronoun
- `preposition` - Preposition
- `conjunction` - Conjunction
- `interjection` - Interjection
- `article` - Article
- `determiner` - Determiner
- `particle` - Particle
- `numeral` - Numeral
- `auxiliary` - Auxiliary verb
- `punctuation` - Punctuation

## Creating Custom Providers

Implement the `POSProvider` interface:

```typescript
import type { POSProvider } from "glost-pos";

export function createMyPOSProvider(config): POSProvider {
  return {
    async getPOS(word: string, language: string): Promise<string | undefined> {
      // Your POS tagging logic
      const result = await nlpModel.tag(word, language);
      return result.pos;
    }
  };
}
```

## API

### createPOSGeneratorExtension(options)

Creates extension that tags words with POS.

**Options:**
- `targetLanguage` - ISO-639-1 language code
- `provider` - POSProvider instance
- `skipExisting` - Skip words with existing POS (default: true)

### createPOSEnhancerExtension(options)

Creates extension that formats POS data.

**Options:**
- `normalize` - Normalize POS tags (default: true)
- `customMappings` - Tag → POSTagInfo mappings

### Creating Custom Providers

Implement the `POSProvider` interface with a real tagger:

```typescript
import type { POSProvider } from "glost-pos";

export function createMyPOSProvider(tagger: NLPTagger): POSProvider {
  return {
    async getPOS(word, language) {
      const result = await tagger.analyze(word, language);
      return result?.pos; // Return undefined if no data, don't guess!
    }
  };
}
```

### createPOSExtension(options)

Convenience function that creates both generator and enhancer.

Returns: `[generator, enhancer]`

## Migration from glost-plugins

**Before (v0.1.x):**
```typescript
import { PartOfSpeechExtension } from "glost-plugins";
processGLOSTWithExtensions(doc, [PartOfSpeechExtension]);
```

**After (v0.2.0+):**
```typescript
import { createPOSExtension, createSimplePOSProvider } from "glost-pos";

const provider = createSimplePOSProvider();
const [generator, enhancer] = createPOSExtension({
  targetLanguage: "en",
  provider
});

await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

## License

MIT
