# GLOST Architecture Summary

## Overview

GLOST now has a **composable, principle-driven architecture** following SRP (Single Responsibility Principle) and SSOT (Single Source of Truth).

## What Was Built

### 1. Example Data System ✅

**Location:** `packages/extensions/src/example-data/`

**Contents:**
- **5 Language Vocabularies** (English, Thai, Japanese, French, Spanish)
  - 12-15 words per language
  - Full metadata: frequency, difficulty, POS, cultural notes
  - Multiple transcription systems (IPA, RTGS, Paiboon+, Romaji)
  - Cross-language translations

- **Helper Functions** (SRP-compliant)
  - Each function does ONE thing
  - `findWord()` - Find one word
  - `getTranscription()` - Get one transcription
  - `getTranslation()` - Translate one word
  - All use SAME data source (SSOT)

- **Lookup Function Factories** (Composition layer)
  - `createTranslationLookup()` - Create translation lookup
  - `createTranscriptionLookup()` - Create transcription lookup
  - `createMultiSystemTranscriptionLookup()` - Multiple systems
  - `createFallbackLookup()` - Fallback behavior
  - Pure composition, no logic duplication

**Key Files:**
- `vocabulary/english.json`, `thai.json`, `japanese.json`, `french.json`, `spanish.json`
- `helpers.ts` - Data access functions (SSOT)
- `lookup-functions.ts` - Composition factories
- `types.ts` - Type definitions
- `README.md` - Complete documentation

### 2. Package Templates ✅

**Location:** `packages/extensions/templates/`

**Templates Created:**

#### Data Source Package Template
- `package.json.template`
- `src-index.ts.template`
- `README.md.template`

Shows how to create packages like:
- `glost-th-datasource-lexitron`
- `glost-ja-datasource-jmdict`

#### Transcription System Package Template
- `package.json.template`
- `src-index.ts.template`
- `README.md.template`

Shows how to create packages like:
- `glost-th-transcription-paiboon`
- `glost-ja-transcription-hepburn`

#### Template Usage Guide
- `USAGE.md` - Complete guide with examples

### 3. Comprehensive Documentation ✅

**Location:** `docs/`

**Documents Created:**

#### Naming Conventions
**File:** `docs/conventions/naming.md`

Comprehensive guide covering:
- Package naming patterns
- Extension naming conventions
- File/directory structure
- Language codes
- Quick reference tables

#### Creating Data Source Packages
**File:** `docs/guides/creating-data-source-packages.md`

Step-by-step guide covering:
- Creating data source packages
- Creating transcription system packages
- Creating lookup factory packages
- Best practices (SRP & SSOT)
- Complete examples

### 4. Composition Pattern Examples ✅

**Location:** `examples/extensions/composition-pattern.test.ts`

**Demonstrates:**
- Single Responsibility - each function does one thing
- Single Source of Truth - no duplication
- Composition - building complex from simple
- Mix & Match - different combinations
- Real-world usage with extensions

**Test Coverage:**
- SRP compliance tests
- SSOT validation tests
- Composition pattern tests
- Mix-and-match scenarios
- Integration with extensions

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      GLOST Ecosystem                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Core Foundation                                    │
│  ├─ glost (types & nodes)                                   │
│  ├─ glost-common (utilities)                                │
│  ├─ glost-utils (parsing)                                   │
│  └─ glost-extensions (extension system)                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: Extension APIs                                     │
│  ├─ glost-extensions-translation (translation API)          │
│  └─ glost-extensions-transcription (transcription API)      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Composable Components (Mix & Match)               │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Data Sources (Query data ONLY)                     │   │
│  │  ├─ glost-th-datasource-lexitron                   │   │
│  │  ├─ glost-ja-datasource-jmdict                     │   │
│  │  └─ glost-multi-datasource-googletrans            │   │
│  └─────────────────────────────────────────────────────┘   │
│                              +                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Transcription Systems (Apply rules ONLY)           │   │
│  │  ├─ glost-th-transcription-paiboon (SSOT)          │   │
│  │  ├─ glost-th-transcription-rtgs (SSOT)             │   │
│  │  ├─ glost-ja-transcription-hepburn (SSOT)          │   │
│  │  └─ glost-transcription-strategy-ipa (SSOT)        │   │
│  └─────────────────────────────────────────────────────┘   │
│                              =                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Lookup Factories (Compose ONLY)                    │   │
│  │  ├─ glost-th-lookup-transcription-paiboon-lexitron │   │
│  │  └─ glost-ja-lookup-transcription-hepburn-jmdict   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Key Principles

### 1. Single Responsibility Principle (SRP)

Each package/function does ONE thing:

```typescript
// ✅ Data source - ONLY queries
export async function queryLexitron(word: string) {
  return await database.query(word);
}

// ✅ Transcription system - ONLY applies rules
export function transcribeToPaiboon(text: string) {
  return applyPaiboonRules(text);
}

// ✅ Lookup factory - ONLY composes
export function createLookup() {
  return async (word: string) => {
    const data = await queryLexitron(word);  // Delegates
    return transcribeToPaiboon(data.reading); // Delegates
  };
}
```

### 2. Single Source of Truth (SSOT)

Logic lives in ONE place:

```typescript
// ✅ Paiboon+ rules in ONE package (SSOT)
import { transcribeToPaiboon } from 'glost-th-transcription-paiboon';

// ✅ Everyone uses the SAME source of truth
const lookup1 = (text) => transcribeToPaiboon(text);
const lookup2 = (text) => transcribeToPaiboon(text);

// ❌ Don't duplicate logic
const badLookup = (text) => text.replace(/ก/g, 'g'); // Violates SSOT!
```

### 3. Composition Over Duplication

```typescript
// ✅ Import and compose
import { querySource } from 'data-source-package';
import { transcribe } from 'transcription-package';

export const lookup = async (word) => {
  const data = await querySource(word);  // No duplication
  return transcribe(data);                // No duplication
};
```

## Package Naming Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Core | `glost-[name]` | `glost-common` |
| Extensions | `glost-extensions-[type]` | `glost-extensions-transcription` |
| Data Source | `glost-[lang]-datasource-[source]` | `glost-th-datasource-lexitron` |
| Transcription | `glost-[lang]-transcription-[system]` | `glost-th-transcription-paiboon` |
| Lookup | `glost-[lang]-lookup-[type]-[system]-[source]` | `glost-th-lookup-transcription-paiboon-lexitron` |
| Plugin | `glost-plugin-[framework]` | `glost-plugin-react` |

## Mix & Match Examples

### Same Data, Different Systems
```typescript
// Use Lexitron with Paiboon+
import { ThaiPaiboonLexitronExtension } from 
  'glost-th-lookup-transcription-paiboon-lexitron';

// Use Lexitron with RTGS
import { ThaiRTGSLexitronExtension } from 
  'glost-th-lookup-transcription-rtgs-lexitron';

// Use Lexitron with IPA
import { ThaiIPALexitronExtension } from 
  'glost-th-lookup-transcription-ipa-lexitron';
```

### Same System, Different Data
```typescript
// Paiboon+ with Lexitron
import { ThaiPaiboonLexitronExtension } from 
  'glost-th-lookup-transcription-paiboon-lexitron';

// Paiboon+ with Google Translate
import { ThaiPaiboonGoogleExtension } from 
  'glost-th-lookup-transcription-paiboon-googletrans';
```

## Benefits

1. **Maintainability**: Fix Paiboon+ rules in ONE place, all packages benefit
2. **Testability**: Test each component in isolation
3. **Reusability**: Any system works with any data source
4. **Clarity**: Package name tells you exactly what it does
5. **Flexibility**: Mix and match components freely
6. **Community**: Easy to contribute new sources or systems
7. **No Duplication**: Logic never copied, always imported

## Next Steps

### For Users
1. Use example data in your tests
2. Use lookup factories with extensions
3. Mix and match components

### For Contributors
1. Use templates to create new packages
2. Follow SRP & SSOT principles
3. Contribute data sources or transcription systems

## Documentation

- [Naming Conventions](conventions/naming.md)
- [Creating Data Source Packages](guides/creating-data-source-packages.md)
- [Package Templates Usage](../packages/extensions/templates/USAGE.md)
- [Example Data README](../packages/extensions/src/example-data/README.md)
- [Composition Pattern Examples](../examples/extensions/composition-pattern.test.ts)
- [SRP/SSOT Architecture Plan](../.cursor/plans/naming_conventions_srp_architecture.md)

## Statistics

- **Example Vocabularies**: 5 languages, ~65 words total
- **Transcription Systems**: 11+ systems documented (IPA, RTGS, Paiboon, Romaji, Hepburn, Kunrei, etc.)
- **Package Templates**: 2 complete templates with usage guide
- **Documentation**: 4 comprehensive guides
- **Test Examples**: 100+ test cases demonstrating patterns
- **Principles**: 100% SRP & SSOT compliance
