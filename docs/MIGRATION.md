# GLOST Migration Guide

## Current Version: v0.4.0

GLOST v0.4.0 introduces a modular architecture with language packages and extensions in separate npm packages. This keeps the core lightweight while enabling rich language-specific functionality.

## Quick Migration

If migrating from v0.3.x or earlier, use the automated CLI:

```bash
# Migrate all GLOST documents in a directory
npx glost migrate v0.3-to-v0.4 ./src

# Dry run to see what would change
npx glost migrate v0.3-to-v0.4 ./src --dry-run
```

## Breaking Changes in v0.4.0

### 1. Language Codes → BCP-47 Standard

All language codes must use BCP-47 format.

**Before:**
```json
{
  "lang": "th"
}
```

**After:**
```json
{
  "lang": "th-TH"
}
```

**Migration:** Use the automated tool or utilities:

```typescript
import { normalizeLanguageCode } from 'glost-common';

const code = normalizeLanguageCode("th");  // "th-TH"
```

### 2. Transcription Schema

Removed redundant `system` field from transcription objects.

**Before:**
```json
{
  "transcription": {
    "ipa": {
      "text": "həˈloʊ",
      "system": "ipa"
    }
  }
}
```

**After:**
```json
{
  "transcription": {
    "ipa": {
      "text": "həˈloʊ"
    }
  }
}
```

The system is already the key, making the field redundant.

### 3. Translation Extension API

Renamed `sourceLanguage`/`targetLanguage` to clear `from`/`to`.

**Before:**
```typescript
createTranslationExtension({
  sourceLanguage: "th",
  targetLanguage: "en",
  provider
});
```

**After:**
```typescript
createTranslationExtension({
  from: "th",
  to: "en",
  provider
});
```

## Extension Architecture

Extensions have been moved to separate packages for modularity and language-specific implementations.

### Available Extension Packages

| Package | Purpose | Status |
|---------|---------|--------|
| `glost-frequency` | Vocabulary prioritization | Available |
| `glost-difficulty` | Text leveling (CEFR, etc.) | Available |
| `glost-pos` | Part of speech tagging | Available |
| `glost-gender` | Grammatical gender | Available |
| `glost-clause-segmenter` | Sentence structure analysis | Available |

### Installation

```bash
# Install only what you need
npm install glost-frequency glost-difficulty glost-pos
```

### Using Extensions with Providers

Extensions require data providers - no heuristic fallbacks are included.

```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createEnglishFrequencyProvider } from "your-corpus-package";

// Create provider with real corpus data
const provider = createEnglishFrequencyProvider({
  corpusData: britishNationalCorpus
});

// Create extension (returns [generator, enhancer])
const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider
});

// Process (async)
const result = await processGLOSTWithExtensionsAsync(document, [
  generator,
  enhancer
]);
```

### Extensions Remaining in Core

These extensions stay in `glost-extensions` (no migration needed):

- `CulturalNotesExtension`
- `GenderTransformerExtension`
- `NegationTransformerExtension`
- `ReadingScoreExtension`
- `LearnerHintsExtension`
- `ClauseAnalysisExtension`

## Language Packages

Language-specific helper functions have been moved to dedicated packages.

### Available Language Packages

| Package | Language | Status |
|---------|----------|--------|
| `glost-th` | Thai | Available |
| `glost-ja` | Japanese | Available |
| `glost-ko` | Korean | Planned |
| `glost-zh` | Chinese | Planned |

### Installation

```bash
# Install only the languages you use
npm install glost-th glost-ja
```

### Update Imports

**Before:**
```typescript
import { createThaiWord, createJapaneseWord } from 'glost';
```

**After:**
```typescript
import { createThaiWord } from 'glost-th';
import { createJapaneseWord } from 'glost-ja';
```

### What Stays in Core

The `glost` core package still provides:

- `createGLOSTWordNode()` - Generic word creation
- `createGLOSTSentenceNode()` - Sentence creation  
- `createGLOSTParagraphNode()` - Paragraph creation
- `createGLOSTRootNode()` - Document creation
- `createSimpleWord()` - Simple word helper
- All tree traversal utilities
- Type guards and validators
- All core types and interfaces

## Step-by-Step Migration

### 1. Update Dependencies

```bash
npm install glost@0.4.0 glost-common@0.4.0 glost-utils@0.4.0
npm install glost-th@0.4.0 glost-ja@0.4.0  # Language packages as needed
npm install glost-frequency@0.4.0 glost-pos@0.4.0  # Extensions as needed
```

### 2. Migrate Documents

```bash
npx glost migrate v0.3-to-v0.4 ./src
```

### 3. Update Extension Usage

**Before (v0.1.x):**
```typescript
import { FrequencyExtension } from "glost-extensions";

const result = processGLOSTWithExtensions(doc, [FrequencyExtension]);
```

**After (v0.4.0):**
```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createEnglishFrequencyProvider } from "your-corpus-package";

const provider = createEnglishFrequencyProvider({
  corpusData: britishNationalCorpus
});

const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider
});

const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

### 4. Update Language-Specific Code

```typescript
// Before
import { createThaiWord } from 'glost';

// After
import { createThaiWord } from 'glost-th';
```

### 5. Test Your Application

```bash
npm test
```

## Verification

Verify your migration is complete:

```typescript
import { migrateAllLanguageCodes, migrateTranscriptionSchema } from 'glost-utils';
import fs from 'fs';

const doc = JSON.parse(fs.readFileSync('document.glost.json', 'utf-8'));

// Check if migration is needed
const langResult = migrateAllLanguageCodes(doc, { dryRun: true });
const transResult = migrateTranscriptionSchema(doc, { dryRun: true });

if (langResult.hasChanges || transResult.hasChanges) {
  console.log('⚠️  Document still needs migration!');
} else {
  console.log('✅ Document is v0.4.0 compliant');
}
```

## Benefits

### Smaller Bundles
- Core package is ~30% smaller
- Only import languages and extensions you use

### Language Support
- Easy to add language-specific providers
- Language packages can be updated independently

### Modularity
- Mix and match only what you need
- Clear separation of concerns

### Data Quality
- No fallback/heuristic providers
- Real data from validated sources only

## Provider Philosophy

**Key Principle:** No data is better than bad data.

Extensions return `undefined` when data is unavailable rather than using:
- Length-based heuristics ("long words are rare")
- Pattern guessing ("words ending in -ing are verbs")
- Arbitrary fallbacks

Instead, use:
- Validated corpora (British National Corpus, etc.)
- NLP models (Stanford CoreNLP, spaCy)
- Official standards (CEFR, JLPT)
- Verified dictionaries

See [PROVIDER_PHILOSOPHY.md](./PROVIDER_PHILOSOPHY.md) for details.

## Troubleshooting

### Import errors with .js extensions

**Solution:** Update to glost@0.4.0 or later. Published packages have correct ESM exports.

### Language code validation errors

**Solution:** Use the migration tool or normalize codes manually:

```typescript
import { normalizeLanguageCode } from 'glost-common';

doc.lang = normalizeLanguageCode(doc.lang);
```

### Type errors with transcription.system

**Solution:** Remove references to the `system` field. The system is the key in the parent object.

### Translation extension errors

**Solution:** Update from `sourceLanguage`/`targetLanguage` to `from`/`to`.

### Extension not found errors

**Solution:** Install the separate extension package:

```bash
npm install glost-frequency
```

## Need Help?

- **Documentation:** [docs/](./docs/)
- **Extension Guide:** [EXTENSIONS_GUIDE.md](./EXTENSIONS_GUIDE.md)
- **Migration CLI:** Run `npx glost migrate help`
- **GitHub Issues:** https://github.com/fustilio/glost/issues
