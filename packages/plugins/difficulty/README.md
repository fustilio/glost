# glost-difficulty

Word difficulty extension for GLOST - generates and formats difficulty data.

## Overview

This package provides difficulty assessment for GLOST documents. It separates difficulty **generation** (determining word difficulty) from difficulty **enhancement** (formatting for display).

### Philosophy: No Data > Bad Data

This package **intentionally does NOT include heuristic difficulty scorers**. Inaccurate difficulty levels are worse than no levels. You must provide a real difficulty provider based on:
- CEFR word lists (for European languages)
- JLPT word lists (for Japanese)
- HSK word lists (for Chinese)
- Other validated learner resources

### Difficulty Levels

- `beginner` - Basic, easy words for beginners
- `intermediate` - Moderate difficulty words
- `advanced` - Difficult words for advanced learners

## Installation

```bash
pnpm add glost-difficulty
```

## Usage

### With Language-Specific Provider (Required)

```typescript
import { createDifficultyGeneratorExtension, createDifficultyEnhancerExtension } from "glost-difficulty";
import { createJapaneseDifficultyProvider } from "glost-ja/extensions";

// Create JLPT-based provider
const provider = createJapaneseDifficultyProvider({
  jlptLevel: "N3"
});

const generator = createDifficultyGeneratorExtension({
  targetLanguage: "ja",
  provider
});

const enhancer = createDifficultyEnhancerExtension();

const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

## API

### createDifficultyGeneratorExtension(options)

Creates extension that assesses word difficulty.

**Options:**
- `targetLanguage` - ISO-639-1 language code
- `provider` - DifficultyProvider instance
- `skipExisting` - Skip words with existing difficulty (default: true)

### createDifficultyEnhancerExtension(options)

Creates extension that formats difficulty data.

**Options:**
- `normalize` - Normalize difficulty values (default: true)
- `customMapping` - Word → difficulty mappings

### Creating Custom Providers

Implement the `DifficultyProvider` interface with real word lists:

```typescript
import type { DifficultyProvider, DifficultyLevel } from "glost-difficulty";

export function createMyDifficultyProvider(
  cefrLists: { A1: Set<string>, A2: Set<string>, B1: Set<string>, ... }
): DifficultyProvider {
  return {
    async getDifficulty(word, language) {
      if (cefrLists.A1.has(word) || cefrLists.A2.has(word)) return "beginner";
      if (cefrLists.B1.has(word) || cefrLists.B2.has(word)) return "intermediate";
      if (cefrLists.C1.has(word) || cefrLists.C2.has(word)) return "advanced";
      return undefined; // No data? Return undefined, don't guess!
    }
  };
}
```

### createDifficultyExtension(options)

Convenience function that creates both generator and enhancer.

Returns: `[generator, enhancer]`

## License

MIT
