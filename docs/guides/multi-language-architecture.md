# Multi-Language Architecture

## Overview

This guide shows how to structure a GLOST implementation that supports multiple languages efficiently. This pattern has been proven with 7 languages in production, achieving 2-3 hour implementation time per language.

## Content Package Pattern

### Structure

Each language gets its own content package following this pattern:

```
glost-[lang]/
├── src/
│   ├── glost/
│   │   ├── convert-to-glost.ts      # Language → GLOST conversion
│   │   └── index.ts                 # Public API
│   ├── transcriptions/
│   │   ├── engine.ts                # Core transcription logic
│   │   └── provider.ts              # TranscriptionProvider implementation
│   ├── data/
│   │   ├── word-lists/              # Structured vocabulary
│   │   │   ├── beginner.json
│   │   │   ├── intermediate.json
│   │   │   └── advanced.json
│   │   └── glost-metadata.json      # Pre-generated metadata
│   └── types/
│       └── index.ts                 # Language-specific types
├── package.json
└── README.md
```

### Package Configuration

```json
{
  "name": "glost-th",
  "version": "1.0.0",
  "description": "Thai language content and GLOST utilities",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./glost": "./dist/glost/index.js",
    "./transcriptions": "./dist/transcriptions/index.js",
    "./data": "./dist/data/index.js"
  },
  "files": ["dist", "README.md"],
  "dependencies": {
    "glost": "^0.2.0",
    "glost-common": "^0.2.0",
    "glost-extensions": "^0.2.0"
  }
}
```

## Shared Utilities Package

Create a shared package for cross-language utilities:

```
glost-content-shared/
├── src/
│   ├── conversion/
│   │   ├── word-adapter.ts          # Generic WordAdapter pattern
│   │   ├── parallel-text.ts         # Bilingual text conversion
│   │   └── definitions.ts           # Dictionary conversion
│   ├── validation/
│   │   ├── metadata.ts              # Metadata validation
│   │   └── transcription.ts         # Transcription validation
│   └── utils/
│       ├── text.ts                  # Text utilities
│       └── normalization.ts         # Text normalization
└── package.json
```

## WordAdapter Pattern

The WordAdapter pattern eliminates duplication across languages:

```typescript
// content-shared/src/conversion/word-adapter.ts
export interface WordAdapter<TWord> {
  getWordText(word: TWord): string;
  getTranslation(word: TWord): string;
  getTransliteration?(word: TWord): string | undefined;
  getMetadata?(word: TWord): Record<string, unknown> | undefined;
  getTranscription(text: string, scheme: string): string;
}

export function convertWordListToMTSTGeneric<TWord>(
  words: TWord[],
  adapter: WordAdapter<TWord>,
  options: GLOSTConversionOptions,
  title?: string
): GLOSTRoot {
  const wordNodes = words.map(word => {
    const text = adapter.getWordText(word);
    const translation = adapter.getTranslation(word);
    
    // Build transcription map
    const transcription: Record<string, { text: string; system: string }> = {};
    for (const scheme of options.transcriptionSchemes || []) {
      const trans = adapter.getTranscription(text, scheme);
      if (trans) {
        transcription[scheme] = { text: trans, system: scheme };
      }
    }
    
    // Create word node
    return createGLOSTWordNode(
      text,
      transcription,
      adapter.getMetadata?.(word) || {},
      "word",
      options.language,
      options.script,
      {
        translations: {
          [options.nativeLanguage]: translation
        },
        metadata: adapter.getMetadata?.(word)
      }
    );
  });
  
  return createGLOSTRootNode(wordNodes, title);
}
```

## Language Implementation

### Step 1: Define Types

```typescript
// glost-th/src/types/index.ts
export interface ThaiWord {
  word: string;           // Thai text
  meaning: string;        // English translation
  pronunciation?: string; // Optional pronunciation guide
  frequency?: "very-common" | "common" | "uncommon" | "rare";
  difficulty?: "beginner" | "intermediate" | "advanced";
  partOfSpeech?: string;
  culturalNotes?: string;
}
```

### Step 2: Implement Transcription Provider

```typescript
// glost-th/src/transcriptions/provider.ts
import { TranscriptionProvider } from 'glost-extensions';

export const ThaiTranscriptionProvider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    // Implement transcription logic
    // See: Implementing Transcription Providers guide
  },
  
  getDefaultScheme(): string {
    return 'paiboon+';
  },
  
  hasScheme(scheme: string): boolean {
    return ['paiboon+', 'rtgs', 'ipa', 'aua'].includes(scheme);
  },
  
  getAvailableSchemes(): string[] {
    return ['paiboon+', 'rtgs', 'ipa', 'aua'];
  },
  
  getSchemeDisplayName(scheme: string): string {
    const names: Record<string, string> = {
      'paiboon+': 'Paiboon+',
      'rtgs': 'RTGS',
      'ipa': 'IPA',
      'aua': 'AUA'
    };
    return names[scheme] ?? scheme;
  }
};
```

### Step 3: Create WordAdapter

```typescript
// glost-th/src/glost/adapter.ts
import { WordAdapter } from 'glost-content-shared';
import { ThaiWord } from '../types';
import { ThaiTranscriptionProvider } from '../transcriptions/provider';

export const thaiWordAdapter: WordAdapter<ThaiWord> = {
  getWordText: (word) => word.word,
  getTranslation: (word) => word.meaning,
  getTransliteration: (word) => word.pronunciation,
  
  getMetadata: (word) => ({
    frequency: word.frequency,
    difficulty: word.difficulty,
    partOfSpeech: word.partOfSpeech,
    culturalNotes: word.culturalNotes
  }),
  
  getTranscription: (text, scheme) => {
    return ThaiTranscriptionProvider.getTranscription(text, scheme) || '';
  }
};
```

### Step 4: Implement Conversion

```typescript
// glost-th/src/glost/convert-to-glost.ts
import { convertWordListToMTSTGeneric } from 'glost-content-shared';
import { thaiWordAdapter } from './adapter';
import type { ThaiWord } from '../types';

export function convertThaiWordsToGLOST(
  words: ThaiWord[],
  options?: {
    transcriptionSchemes?: string[];
    title?: string;
  }
): GLOSTRoot {
  return convertWordListToMTSTGeneric(
    words,
    thaiWordAdapter,
    {
      language: 'th',
      script: 'thai',
      nativeLanguage: 'en',
      transcriptionSchemes: options?.transcriptionSchemes || ['paiboon+', 'ipa']
    },
    options?.title
  );
}
```

### Step 5: Public API

```typescript
// glost-th/src/glost/index.ts
export { convertThaiWordsToGLOST } from './convert-to-glost';
export { thaiWordAdapter } from './adapter';
export * from '../types';
```

## Data Management

### Word Lists

Organize vocabulary by level:

```json
// glost-th/src/data/word-lists/beginner.json
[
  {
    "word": "สวัสดี",
    "meaning": "hello",
    "frequency": "very-common",
    "difficulty": "beginner",
    "partOfSpeech": "interjection",
    "culturalNotes": "Standard Thai greeting used any time of day"
  },
  {
    "word": "ขอบคุณ",
    "meaning": "thank you",
    "frequency": "very-common",
    "difficulty": "beginner",
    "partOfSpeech": "verb"
  }
]
```

### Pre-generated Metadata

```json
// glost-th/src/data/glost-metadata.json
{
  "generatedAt": "2025-01-08T00:00:00.000Z",
  "version": "1.0.0",
  "language": "th",
  "description": "Thai vocabulary metadata",
  "sources": ["word-lists", "corpus-analysis"],
  "frequency": {
    "very-common": ["สวัสดี", "ขอบคุณ"],
    "common": ["ร้านอาหาร", "โรงแรม"],
    "uncommon": ["ภาษาศาสตร์"],
    "rare": ["นิรุกติศาสตร์"]
  },
  "difficulty": {
    "beginner": ["สวัสดี", "ขอบคุณ"],
    "intermediate": ["แม้ว่า", "อย่างไรก็ตาม"],
    "advanced": ["ยกเว้น", "ดังนั้น"]
  }
}
```

## Workspace Configuration

### pnpm Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'packages/languages/*'
```

### Package Layout

```
packages/
├── content-shared/           # Shared utilities (optional)
├── languages/
│   ├── th/                  # glost-th: Thai
│   ├── ja/                  # glost-ja: Japanese
│   ├── ko/                  # glost-ko: Korean
│   ├── hi/                  # glost-hi: Hindi
│   ├── ta/                  # glost-ta: Tamil
│   ├── fr/                  # glost-fr: French
│   └── es/                  # glost-es: Spanish
└── ...
```

## Adding a New Language

With this pattern, adding a new language takes 2-3 hours:

### Checklist

**1. Create package (15 min)**
```bash
mkdir -p packages/languages/hi
cd packages/languages/hi
pnpm init
# Set package name to "glost-hi"
```

**2. Define types (15 min)**
```typescript
export interface HindiWord {
  word: string;
  meaning: string;
  // ... other fields
}
```

**3. Implement transcription (1-2 hours)**
- Choose approach (mapping/lookup/algorithmic)
- Implement TranscriptionProvider
- Add test cases

**4. Create WordAdapter (10 min)**
```typescript
export const hindiWordAdapter: WordAdapter<HindiWord> = {
  getWordText: (word) => word.word,
  getTranslation: (word) => word.meaning,
  getTranscription: (text, scheme) => 
    HindiTranscriptionProvider.getTranscription(text, scheme) || '',
  // ...
};
```

**5. Implement conversion (10 min)**
```typescript
export function convertHindiWordsToGLOST(words: HindiWord[]): GLOSTRoot {
  return convertWordListToMTSTGeneric(words, hindiWordAdapter, options);
}
```

**6. Add word lists (30-60 min)**
- Import existing lists or create new ones
- Validate format
- Add metadata

**7. Test (20 min)**
- Unit tests for transcription
- Integration tests for conversion
- Validate output

**Total: 2-3 hours**

## Best Practices

### 1. Consistent Structure

Every language package follows the same structure. This makes:
- Navigation predictable
- Patterns transferable
- Onboarding faster

### 2. Shared Utilities

Don't duplicate conversion logic. Use:
- `convertWordListToMTSTGeneric()` for vocabulary
- `convertParallelTextToMTSTGeneric()` for bilingual texts
- Shared validation and normalization

### 3. Pre-generate Metadata

Generate metadata once, version control it:
- Faster lookups
- Consistent data
- Easy to review changes
- Offline-capable

### 4. Language Codes

Use ISO 639-1 consistently:
- `th` not `thai`
- `ja` not `japanese`
- `ko` not `korean`

### 5. Script Names

Use consistent script names:
- `thai` not `Thai-script`
- `devanagari` not `Devanagari`
- `hangul` not `Korean`

### 6. Testing

Test each language package independently:
```typescript
describe('Thai Content', () => {
  it('converts words to GLOST', () => {
    const words = [/* ... */];
    const glost = convertThaiWordsToGLOST(words);
    expect(glost.type).toBe('GLOSTRoot');
  });
  
  it('includes transcriptions', () => {
    const glost = convertThaiWordsToGLOST(words, {
      transcriptionSchemes: ['paiboon+', 'ipa']
    });
    const word = glost.children[0] as GLOSTWord;
    expect(word.transcription['paiboon+']).toBeDefined();
    expect(word.transcription['ipa']).toBeDefined();
  });
});
```

## Performance Considerations

### Lazy Loading

Load language packages on demand:

```typescript
const loadLanguage = async (lang: string) => {
  switch (lang) {
    case 'th':
      return await import('glost-th');
    case 'ja':
      return await import('glost-ja');
    // ...
  }
};
```

### Code Splitting

Build separate bundles per language:

```typescript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'thai': ['glost-th'],
          'japanese': ['glost-ja'],
          // ...
        }
      }
    }
  }
};
```

### Metadata Caching

Cache metadata in memory:

```typescript
const metadataCache = new Map<string, GLOSTMetadata>();

export function getMetadata(lang: string): GLOSTMetadata {
  if (!metadataCache.has(lang)) {
    const data = require(`glost-${lang}/data/glost-metadata.json`);
    metadataCache.set(lang, data);
  }
  return metadataCache.get(lang)!;
}
```

## Production Examples

Production implementations have successfully used this pattern with:
- 400+ words per language
- 3-4 transcription systems per language
- Full metadata with cultural notes
- Sub-100ms processing performance
- Battle-tested in real applications

## Scaling Beyond 7 Languages

This pattern scales well:

**7 languages (proven)**
- All packages < 5MB total
- Build time < 2 minutes
- Clear organization

**20+ languages (projected)**
- Use monorepo tools (Turborepo, Nx)
- Implement incremental builds
- Consider CDN for data files
- Cache transcription results

## See Also

- [Implementing Transcription Providers](./implementing-transcription-providers.md)
- [Creating Data Source Packages](./creating-data-source-packages.md)
- [Standard Metadata Schema](../standards/metadata-schema.md)
- [Lalia Case Study](../case-studies/lalia.md)
- [WordAdapter Pattern Example](../../examples/advanced/multi-language-app.test.ts)
