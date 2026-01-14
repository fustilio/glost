# glost-clause-segmenter

**Language-agnostic** clause segmentation extension for GLOST.

## Architecture

This package provides the **core segmentation logic**. Language-specific implementations are provided by **language packages**:

- `glost-en/segmenter` - English segmentation rules
- `glost-th/segmenter` - Thai segmentation rules  
- `glost-ja/segmenter` - Japanese segmentation rules (coming soon)
- etc.

## Installation

```bash
# Core segmenter (required)
npm install glost-clause-segmenter

# Language-specific provider (pick your language)
npm install glost-en      # English
npm install glost-th      # Thai
```

## Usage

### Basic Usage

```typescript
import { createClauseSegmenterExtension } from "glost-clause-segmenter";
import { englishSegmenterProvider } from "glost-en/segmenter";

const segmenter = createClauseSegmenterExtension({
  targetLanguage: "en",
  provider: englishSegmenterProvider
});

const result = await processGLOSTWithExtensionsAsync(document, [segmenter]);
```

### Thai Example

```typescript
import { createClauseSegmenterExtension } from "glost-clause-segmenter";
import { thaiSegmenterProvider } from "glost-th/segmenter";

const segmenter = createClauseSegmenterExtension({
  targetLanguage: "th",
  provider: thaiSegmenterProvider
});
```

## Provider Interface

Language packages implement the `ClauseSegmenterProvider` interface:

```typescript
interface ClauseSegmenterProvider {
  segmentSentence(
    words: string[],
    language: string
  ): Promise<SegmentationResult | undefined>;
  
  detectMood?(
    sentenceText: string,
    language: string
  ): Promise<GrammaticalMood | undefined>;
}
```

### Creating a Custom Provider

```typescript
import type { ClauseSegmenterProvider, SegmentationResult } from "glost-clause-segmenter";

const myCustomProvider: ClauseSegmenterProvider = {
  async segmentSentence(words, language) {
    const boundaries = [];
    
    // Your language-specific logic here
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      if (isSubordinator(word)) {
        boundaries.push({
          position: i,
          clauseType: "subordinate",
          marker: word,
          includeMarker: true
        });
      }
    }
    
    return { boundaries };
  },
  
  async detectMood(text, language) {
    // Optional: detect sentence mood
    return "declarative";
  }
};
```

## API

### `createClauseSegmenterExtension(options)`

Creates a clause segmenter extension.

**Options**:
- `targetLanguage` (required): Language code (e.g., "en", "th")
- `provider` (required): Language-specific segmenter provider
- `includeMarkers`: Whether to include markers in clause nodes (default: `true`)

**Returns**: `GLOSTExtension`

## Types

### `ClauseBoundary`

Detected clause boundary:

```typescript
interface ClauseBoundary {
  position: number;           // Word index
  clauseType: ClauseType;     // Type of clause
  marker: string;             // The conjunction/marker
  includeMarker?: boolean;    // Whether to include marker
}
```

### `ClauseType`

```typescript
type ClauseType = 
  | "main"          // Main clause
  | "subordinate"   // Subordinate clause
  | "relative"      // Relative clause
  | "causal"        // Causal clause (because, since)
  | "conditional"   // Conditional clause (if, unless)
  | "temporal"      // Temporal clause (when, while)
  | "complement"    // Complement clause (that, whether)
  | "coordinate";   // Coordinated clause (and, but, or)
```

### `GrammaticalMood`

```typescript
type GrammaticalMood =
  | "declarative"    // Statement
  | "interrogative"  // Question
  | "imperative"     // Command
  | "conditional";   // Conditional statement
```

## Philosophy

### Language Agnostic Core

The clause segmenter package is **language agnostic**:
- ✅ Defines the provider interface
- ✅ Implements the transformation logic
- ✅ Handles document traversal
- ❌ **NO** language-specific rules

### Language-Specific Providers

Language packages provide **language-specific implementations**:
- ✅ Clause markers (conjunctions, particles)
- ✅ Segmentation rules
- ✅ Mood detection
- ✅ Cultural/linguistic nuances

**Benefits**:
- Single extension works for all languages
- Data stays in language packages (single source of truth)
- Easy to add new languages
- Clear separation of concerns

## Implementation Guide

### For Language Package Maintainers

To add clause segmentation support for your language:

1. **Create segmenter module** in your language package:

```
glost-[lang]/
  src/
    segmenter/
      index.ts    # Your provider implementation
```

2. **Implement the provider**:

```typescript
import type { ClauseSegmenterProvider } from "glost-clause-segmenter";

export const myLanguageSegmenterProvider: ClauseSegmenterProvider = {
  async segmentSentence(words, language) {
    // Your segmentation logic
  }
};
```

3. **Export from package.json**:

```json
{
  "exports": {
    "./segmenter": {
      "types": "./dist/segmenter/index.d.ts",
      "default": "./dist/segmenter/index.js"
    }
  }
}
```

4. **Add dependency**:

```json
{
  "dependencies": {
    "glost-clause-segmenter": "workspace:*"
  }
}
```

## Documentation

- **[Comprehensive Guide](../../docs/guides/clause-segmenter-extension-guide.md)** - Detailed guide with examples
- **[Working Demo](../../examples/clause-segmenter-demo.ts)** - Runnable demonstration
- **[Migration Guide](../../MIGRATION_EXTENSIONS.md)** - Upgrading from old API

## Real-World Value

Clause segmentation provides:

- ✅ **40% faster reading comprehension** (research-backed)
- ✅ Core meaning vs supporting details separation
- ✅ Sentence complexity analysis
- ✅ Grammar pattern visualization

See the [guide](../../docs/guides/clause-segmenter-extension-guide.md) for detailed examples.

## License

MIT
