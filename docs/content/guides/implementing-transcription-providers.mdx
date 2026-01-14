# Implementing Transcription Providers

## Overview

This guide shows how to implement transcription/romanization systems for any language. These patterns have been proven across 17+ transcription systems in production.

## What is a Transcription Provider?

A transcription provider converts text in one script to another representation system:

- **Thai** → RTGS, Paiboon+, IPA
- **Japanese** → Romaji (Hepburn, Kunrei), IPA
- **Korean** → Revised Romanization, McCune-Reischauer, IPA
- **Hindi** → IAST, ISO 15919, National romanization, IPA
- **Chinese** → Pinyin, Wade-Giles, IPA

## Standard Interface

All transcription providers should implement this interface:

```typescript
interface TranscriptionProvider {
  // Get transcription for text in specific scheme
  getTranscription(text: string, scheme: string): string | undefined;
  
  // Get the default transcription scheme
  getDefaultScheme(): string;
  
  // Check if scheme is supported
  hasScheme(scheme: string): boolean;
  
  // List all available schemes
  getAvailableSchemes(): string[];
  
  // Get human-readable scheme name
  getSchemeDisplayName(scheme: string): string;
}
```

## Three Proven Approaches

### 1. Mapping-Based (Character-to-Character)

**Best for:** Languages with consistent character mappings (Devanagari, Georgian, Thai consonants)

**How it works:** Map each character/character combination to romanization(s)

**Coverage:** Complete for entire script

**Example: Hindi Devanagari to IAST**

```typescript
const hindiToIAST: Record<string, string> = {
  'अ': 'a',
  'आ': 'ā',
  'इ': 'i',
  'ई': 'ī',
  'उ': 'u',
  'ऊ': 'ū',
  'ऋ': 'ṛ',
  'ए': 'e',
  'ऐ': 'ai',
  'ओ': 'o',
  'औ': 'au',
  'क': 'ka',
  'ख': 'kha',
  'ग': 'ga',
  'घ': 'gha',
  'ङ': 'ṅa',
  // ... complete mapping
};

function transcribeHindiToIAST(text: string): string {
  let result = '';
  for (const char of text) {
    result += hindiToIAST[char] ?? char;
  }
  return result;
}
```

**Supporting multiple systems:**

```typescript
type HindiScheme = 'iast' | 'iso15919' | 'national' | 'ipa';

const schemeMappings: Record<HindiScheme, Record<string, string>> = {
  iast: {
    'अ': 'a', 'आ': 'ā', 'इ': 'i', // ...
  },
  iso15919: {
    'अ': 'a', 'आ': 'ā', 'इ': 'i', // ...
  },
  national: {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', // ...
  },
  ipa: {
    'अ': 'ə', 'आ': 'aː', 'इ': 'ɪ', // ...
  }
};

function transcribeHindi(text: string, scheme: HindiScheme): string {
  const mapping = schemeMappings[scheme];
  let result = '';
  for (const char of text) {
    result += mapping[char] ?? char;
  }
  return result;
}
```

**Provider implementation:**

```typescript
export const HindiTranscriptionProvider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    if (!this.hasScheme(scheme)) return undefined;
    return transcribeHindi(text, scheme as HindiScheme);
  },
  
  getDefaultScheme(): string {
    return 'national';
  },
  
  hasScheme(scheme: string): boolean {
    return ['iast', 'iso15919', 'national', 'ipa'].includes(scheme);
  },
  
  getAvailableSchemes(): string[] {
    return ['iast', 'iso15919', 'national', 'ipa'];
  },
  
  getSchemeDisplayName(scheme: string): string {
    const names: Record<string, string> = {
      'iast': 'IAST',
      'iso15919': 'ISO 15919',
      'national': 'National (India)',
      'ipa': 'IPA'
    };
    return names[scheme] ?? scheme;
  }
};
```

**Pros:**
- ✅ Complete coverage of script
- ✅ Deterministic and predictable
- ✅ Fast (simple lookups)
- ✅ Easy to maintain

**Cons:**
- ❌ Doesn't handle context-dependent rules
- ❌ May not capture phonological changes

**Languages:** Hindi, Tamil, Georgian, Arabic, Hebrew

### 2. Lookup-Based (Dictionary)

**Best for:** Languages where pronunciation varies by word (English, Thai, French)

**How it works:** Dictionary lookup for whole words

**Coverage:** Common vocabulary (~500-5000 words)

**Example: Thai Dictionary Lookup**

```typescript
const thaiTranscriptions: Record<string, Record<string, string>> = {
  'สวัสดี': {
    'paiboon+': 'sà-wàt-dii',
    'rtgs': 'sawatdi',
    'ipa': 'sàwàtdiː'
  },
  'ขอบคุณ': {
    'paiboon+': 'kòp-kun',
    'rtgs': 'khop khun',
    'ipa': 'kʰɔ̀ːp.kʰun'
  },
  'สบายดี': {
    'paiboon+': 'sà-baai-dii',
    'rtgs': 'sabai di',
    'ipa': 'sàbaːjdiː'
  }
  // ... 500+ words
};

function lookupThaiTranscription(
  word: string, 
  scheme: string
): string | undefined {
  return thaiTranscriptions[word]?.[scheme];
}
```

**Provider implementation:**

```typescript
export const ThaiTranscriptionProvider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    if (!this.hasScheme(scheme)) return undefined;
    
    // Try exact lookup first
    const result = lookupThaiTranscription(text, scheme);
    if (result) return result;
    
    // Optional: Try fuzzy matching or word boundaries
    return undefined;
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

**Loading from JSON:**

```typescript
import transcriptionData from './thai-transcriptions.json';

export const ThaiTranscriptionProvider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    return transcriptionData[text]?.[scheme];
  },
  // ... rest of implementation
};
```

**Pros:**
- ✅ Accurate for known words
- ✅ Handles irregular pronunciations
- ✅ Easy to extend vocabulary
- ✅ Can include tone marks, syllable breaks

**Cons:**
- ❌ Limited to dictionary entries
- ❌ Returns undefined for unknown words
- ❌ Requires maintenance

**Languages:** Thai, French, Spanish, English, Mandarin Chinese

### 3. Algorithmic (Rule-Based)

**Best for:** Languages with systematic phonological rules (Korean Hangul, Japanese Kana)

**How it works:** Decompose characters and apply phonological rules

**Coverage:** 100% of writing system

**Example: Korean Hangul to Revised Romanization**

```typescript
// Hangul jamo components
const INITIAL_CONSONANTS = [
  'g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp',
  's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'
];

const MEDIAL_VOWELS = [
  'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o',
  'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'
];

const FINAL_CONSONANTS = [
  '', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'l', 'l', 'l',
  'l', 'l', 'l', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'
];

function decomposeHangul(char: string): [string, string, string] | null {
  const code = char.charCodeAt(0) - 0xAC00;
  
  if (code < 0 || code > 11171) return null;
  
  const initial = Math.floor(code / 588);
  const medial = Math.floor((code % 588) / 28);
  const final = code % 28;
  
  return [
    INITIAL_CONSONANTS[initial],
    MEDIAL_VOWELS[medial],
    FINAL_CONSONANTS[final]
  ];
}

function transcribeKoreanToRR(text: string): string {
  let result = '';
  
  for (const char of text) {
    const decomposed = decomposeHangul(char);
    
    if (!decomposed) {
      result += char;
      continue;
    }
    
    const [initial, medial, final] = decomposed;
    
    // Basic romanization
    result += initial + medial + final;
  }
  
  return result;
}

// With phonological rules
function applyPhonologicalRules(
  syllables: Array<[string, string, string]>
): string {
  // Apply liaison, assimilation, etc.
  // Example: 한국 → han-guk (not han-gug)
  
  // This is where the complexity lives
  // Each language has different rules
  
  return syllables
    .map(([i, m, f]) => i + m + f)
    .join('-');
}
```

**Provider implementation:**

```typescript
export const KoreanTranscriptionProvider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    switch (scheme) {
      case 'rr':
        return transcribeKoreanToRR(text);
      case 'mrr':
        return transcribeKoreanToMRR(text);
      case 'ipa':
        return transcribeKoreanToIPA(text);
      default:
        return undefined;
    }
  },
  
  getDefaultScheme(): string {
    return 'rr';
  },
  
  hasScheme(scheme: string): boolean {
    return ['rr', 'mrr', 'ipa'].includes(scheme);
  },
  
  getAvailableSchemes(): string[] {
    return ['rr', 'mrr', 'ipa'];
  },
  
  getSchemeDisplayName(scheme: string): string {
    const names: Record<string, string> = {
      'rr': 'Revised Romanization',
      'mrr': 'McCune-Reischauer',
      'ipa': 'IPA'
    };
    return names[scheme] ?? scheme;
  }
};
```

**Pros:**
- ✅ 100% coverage
- ✅ No dictionary needed
- ✅ Handles any input
- ✅ Consistent results

**Cons:**
- ❌ Complex to implement
- ❌ May not capture all irregularities
- ❌ Requires phonological expertise

**Languages:** Korean, Japanese (kana), potentially Georgian

## Hybrid Approaches

Combine multiple approaches for best results:

### Lookup with Fallback to Mapping

```typescript
export const ThaiHybridProvider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    // Try dictionary lookup first (for accuracy)
    const lookup = lookupThaiTranscription(text, scheme);
    if (lookup) return lookup;
    
    // Fallback to character mapping (for coverage)
    return mapThaiCharacters(text, scheme);
  }
  // ... rest
};
```

### Algorithmic with Dictionary Overrides

```typescript
export const KoreanHybridProvider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    // Check for irregular words first
    const override = irregularKorean[text]?.[scheme];
    if (override) return override;
    
    // Use algorithmic approach for regular words
    return transcribeKoreanToRR(text);
  }
  // ... rest
};
```

## Integration with GLOST Extensions

Create a transcription generation extension:

```typescript
import { createTranscriptionGeneratorExtension } from 'glost-extensions-transcription';
import { ThaiTranscriptionProvider } from './thai-provider';

export const ThaiTranscriptionExtension = createTranscriptionGeneratorExtension({
  targetLanguage: 'th',
  lookupTranscription: (word: string, lang: string) => {
    const schemes = ThaiTranscriptionProvider.getAvailableSchemes();
    const result: Record<string, string> = {};
    
    for (const scheme of schemes) {
      const transcription = ThaiTranscriptionProvider.getTranscription(word, scheme);
      if (transcription) {
        result[scheme] = transcription;
      }
    }
    
    return result;
  }
});
```

## Helper Utility: Creating Providers

For mapping-based providers, use this helper:

```typescript
function createMappingProvider<T extends string>(config: {
  transliterate: (text: string, scheme: T) => string;
  availableSchemes: T[];
  defaultScheme: T;
  schemeDisplayNames: Record<T, string>;
}): TranscriptionProvider {
  return {
    getTranscription(text: string, scheme: string): string | undefined {
      if (!this.hasScheme(scheme)) return undefined;
      return config.transliterate(text, scheme as T);
    },
    
    getDefaultScheme(): string {
      return config.defaultScheme;
    },
    
    hasScheme(scheme: string): boolean {
      return config.availableSchemes.includes(scheme as T);
    },
    
    getAvailableSchemes(): string[] {
      return [...config.availableSchemes];
    },
    
    getSchemeDisplayName(scheme: string): string {
      return config.schemeDisplayNames[scheme as T] ?? scheme;
    }
  };
}

// Usage
export const HindiTranscriptionProvider = createMappingProvider({
  transliterate: transliterateHindiText,
  availableSchemes: ['iast', 'iso15919', 'national', 'ipa'] as const,
  defaultScheme: 'national' as const,
  schemeDisplayNames: {
    'iast': 'IAST',
    'iso15919': 'ISO 15919',
    'national': 'National (India)',
    'ipa': 'IPA'
  }
});
```

## Data Source Packages

For lookup-based providers, separate data from logic:

**Package:** `glost-th-datasource-lexitron`

```typescript
export interface ThaiDictionaryEntry {
  word: string;
  reading: {
    paiboon?: string;
    rtgs?: string;
    ipa?: string;
  };
  definitions: string[];
}

export async function queryLexitron(word: string): Promise<ThaiDictionaryEntry | null> {
  // Query database/API
}
```

**Package:** `glost-th-transcription-paiboon`

```typescript
export function transcribeToPaiboon(reading: string): string {
  // Apply Paiboon+ rules
}
```

**Package:** `glost-th-lookup-transcription-paiboon-lexitron`

```typescript
import { queryLexitron } from 'glost-th-datasource-lexitron';
import { transcribeToPaiboon } from 'glost-th-transcription-paiboon';

export const ThaiPaiboonProvider: TranscriptionProvider = {
  async getTranscription(text: string): Promise<string | undefined> {
    const entry = await queryLexitron(text);
    if (!entry?.reading.paiboon) return undefined;
    
    return transcribeToPaiboon(entry.reading.paiboon);
  }
  // ... rest
};
```

## Testing

Always test your transcription providers:

```typescript
import { describe, it, expect } from 'vitest';
import { ThaiTranscriptionProvider } from './thai-provider';

describe('ThaiTranscriptionProvider', () => {
  it('transcribes common words', () => {
    const result = ThaiTranscriptionProvider.getTranscription('สวัสดี', 'paiboon+');
    expect(result).toBe('sà-wàt-dii');
  });
  
  it('supports multiple schemes', () => {
    const schemes = ThaiTranscriptionProvider.getAvailableSchemes();
    expect(schemes).toContain('paiboon+');
    expect(schemes).toContain('rtgs');
    expect(schemes).toContain('ipa');
  });
  
  it('returns undefined for unknown words', () => {
    const result = ThaiTranscriptionProvider.getTranscription('ไม่มี', 'paiboon+');
    expect(result).toBeUndefined();
  });
  
  it('validates schemes', () => {
    expect(ThaiTranscriptionProvider.hasScheme('paiboon+')).toBe(true);
    expect(ThaiTranscriptionProvider.hasScheme('invalid')).toBe(false);
  });
});
```

## Best Practices

### 1. Choose the Right Approach

- **Consistent scripts** → Mapping-based
- **Irregular pronunciation** → Lookup-based
- **Systematic rules** → Algorithmic
- **Best accuracy** → Hybrid

### 2. Document Your System

Include in your provider:
- Which transcription system/standard
- Coverage (percentage of words/characters)
- Data sources
- Known limitations

### 3. Handle Edge Cases

```typescript
getTranscription(text: string, scheme: string): string | undefined {
  // Normalize input
  text = text.trim().toLowerCase();
  
  // Handle empty string
  if (!text) return undefined;
  
  // Validate scheme
  if (!this.hasScheme(scheme)) return undefined;
  
  // Try transcription
  try {
    return this.transcribe(text, scheme);
  } catch (error) {
    console.error('Transcription error:', error);
    return undefined;
  }
}
```

### 4. Performance

For large vocabularies:

```typescript
// Lazy load data
let transcriptionData: Record<string, Record<string, string>> | null = null;

function loadData() {
  if (!transcriptionData) {
    transcriptionData = require('./data.json');
  }
  return transcriptionData;
}

export const Provider: TranscriptionProvider = {
  getTranscription(text: string, scheme: string): string | undefined {
    const data = loadData();
    return data[text]?.[scheme];
  }
};
```

### 5. Versioning

Track transcription data versions:

```typescript
export const ThaiTranscriptionProvider: TranscriptionProvider = {
  version: '1.2.0',
  dataVersion: '2024-01-08',
  coverage: 'Top 1000 Thai words',
  // ... implementation
};
```

## See Also

- [Creating Data Source Packages](./creating-data-source-packages.md)
- [Naming Conventions](../conventions/naming.md)
- [Extension System](../concepts/extensions.md)
- [Standard Metadata Schema](../standards/metadata-schema.md)

## Credits

These patterns have been validated across 17+ transcription systems in production implementations.
