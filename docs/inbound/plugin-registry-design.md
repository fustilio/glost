# Plugin Registry Pattern Design

**Status:** Concept / Not Yet Implemented  
**Priority:** Medium  
**Location:** Moved to `docs/inbound/` for future consideration

## 🔌 What is a Plugin Registry?

A **plugin registry** is a centralized system that tracks all available language packages and feature frameworks, enabling:

1. **Discovery** - Find what's available
2. **Validation** - Verify combinations work
3. **Metadata** - Access package capabilities
4. **Type Safety** - Autocomplete valid combinations

## 🎯 The Problem It Solves

### Current State (Without Registry)

Developers need to manually:
- Know which language packages exist
- Know which feature frameworks exist
- Guess if a combination will work
- Read docs to find capabilities
- Hope the types match up

```typescript
// How do I know what's available?
import { ??? } from 'glost-???';
```

### Desired State (With Registry)

```typescript
import { registry } from 'glost-registry';

// Discover what's available
registry.getLanguages();
// → ['th', 'ja', 'ko', 'en']

registry.getFeatures();
// → ['transcription', 'translation', 'frequency', 'difficulty', 'pos']

// Check if a combination is supported
registry.isSupported('th', 'transcription');
// → true

// Get metadata about a language
registry.getLanguageMetadata('th');
// → { 
//     name: 'Thai',
//     script: 'Thai',
//     direction: 'ltr',
//     features: ['tones', 'no-spaces'],
//     availableSchemes: ['rtgs', 'paiboon', 'ipa']
//   }

// Get all supported combinations
registry.getCombinations();
// → [
//     { language: 'th', feature: 'transcription', status: 'example' },
//     { language: 'ja', feature: 'transcription', status: 'example' },
//     { language: 'ko', feature: 'transcription', status: 'example' },
//     ...
//   ]
```

## 📊 Registry Structure

```typescript
interface LanguageRegistryEntry {
  code: string;                    // 'th', 'ja', 'ko'
  name: string;                    // 'Thai', 'Japanese', 'Korean'
  nameNative: string;              // 'ภาษาไทย', '日本語', '한국어'
  script: string | string[];       // 'Thai' or ['Hiragana', 'Katakana', 'Kanji']
  direction: 'ltr' | 'rtl';        // Text direction
  features: string[];              // ['tones', 'no-spaces', 'complex-script']
  transcriptionSchemes: string[];  // ['rtgs', 'ipa', 'paiboon']
  packageName: string;             // 'glost-th'
  version: string;                 // '0.4.0'
  status: 'stable' | 'beta' | 'alpha';
}

interface FeatureRegistryEntry {
  name: string;                    // 'transcription'
  displayName: string;             // 'Transcription'
  description: string;             // 'Add romanization metadata'
  packageName: string;             // 'glost-transcription'
  providerInterface: string;       // 'TranscriptionProvider'
  version: string;                 // '0.4.0'
  status: 'stable' | 'beta' | 'alpha';
}

interface CombinationEntry {
  language: string;                // 'th'
  feature: string;                 // 'transcription'
  status: 'example' | 'production' | 'possible' | 'not-applicable';
  exampleUrl?: string;             // Link to example if available
  productionPackage?: string;      // Package if production-ready
}
```

## 🎨 API Design

### Core Registry Operations

```typescript
class GlostRegistry {
  // Language operations
  getLanguages(): string[];
  getLanguage(code: string): LanguageRegistryEntry | undefined;
  hasLanguage(code: string): boolean;
  registerLanguage(entry: LanguageRegistryEntry): void;
  
  // Feature operations
  getFeatures(): string[];
  getFeature(name: string): FeatureRegistryEntry | undefined;
  hasFeature(name: string): boolean;
  registerFeature(entry: FeatureRegistryEntry): void;
  
  // Combination operations
  isSupported(language: string, feature: string): boolean;
  getCombination(language: string, feature: string): CombinationEntry | undefined;
  getCombinations(filter?: { language?: string; feature?: string; status?: string }): CombinationEntry[];
  registerCombination(entry: CombinationEntry): void;
  
  // Query operations
  getLanguagesForFeature(feature: string): string[];
  getFeaturesForLanguage(language: string): string[];
  searchLanguages(query: { script?: string; direction?: string; features?: string[] }): LanguageRegistryEntry[];
  
  // Metadata operations
  getLanguageMetadata(code: string): Record<string, any>;
  getFeatureMetadata(name: string): Record<string, any>;
  
  // Type safety operations
  getProviderInterface(feature: string): string;
  getTranscriptionSchemes(language: string): string[];
}

// Global registry instance
export const registry = new GlostRegistry();
```

### Usage Examples

#### 1. Discovery

```typescript
// Find all languages with tone systems
const tonalLanguages = registry.searchLanguages({ 
  features: ['tones'] 
});
// → [{ code: 'th', name: 'Thai', ... }, ...]

// Find all features available for Thai
const thaiFeatures = registry.getFeaturesForLanguage('th');
// → ['transcription', 'translation', 'frequency', ...]
```

#### 2. Validation

```typescript
// Check before attempting to create an extension
if (registry.isSupported('zh', 'transcription')) {
  // Create the extension
} else {
  console.warn('Chinese transcription not yet supported');
}
```

#### 3. Auto-completion

```typescript
// TypeScript can now autocomplete!
type AvailableLanguage = keyof typeof registry.languages;
// → 'th' | 'ja' | 'ko' | 'en'

type AvailableFeature = keyof typeof registry.features;
// → 'transcription' | 'translation' | 'frequency' | ...
```

#### 4. Documentation Generation

```typescript
// Generate matrix documentation automatically
function generateMatrix() {
  const languages = registry.getLanguages();
  const features = registry.getFeatures();
  
  const matrix = languages.map(lang => 
    features.map(feat => ({
      lang,
      feat,
      status: registry.getCombination(lang, feat)?.status || 'possible'
    }))
  );
  
  return renderMarkdownTable(matrix);
}
```

## 🚀 Implementation Strategy

### Phase 1: Static Registry (Simplest)

```typescript
// packages/registry/src/languages.ts
export const languages = {
  th: {
    code: 'th',
    name: 'Thai',
    nameNative: 'ภาษาไทย',
    // ... metadata
  },
  ja: { /* ... */ },
  ko: { /* ... */ },
};

// packages/registry/src/features.ts
export const features = {
  transcription: {
    name: 'transcription',
    displayName: 'Transcription',
    // ... metadata
  },
  // ...
};

// packages/registry/src/combinations.ts
export const combinations = [
  { language: 'th', feature: 'transcription', status: 'example' },
  // ...
];

// packages/registry/src/index.ts
export { languages, features, combinations };
```

**Pros:**
- Simple to implement
- No runtime overhead
- Type-safe by default

**Cons:**
- Must manually update when adding packages
- No dynamic discovery

### Phase 2: Dynamic Registry (More Complex)

```typescript
// Each language package registers itself
// packages/languages/th/src/index.ts
import { registry } from 'glost-registry';

registry.registerLanguage({
  code: 'th',
  name: 'Thai',
  // ... metadata from THAI_LANGUAGE_INFO
  transcriptionSchemes: Object.values(THAI_TRANSCRIPTION_SCHEMES),
});

// Each feature package registers itself
// packages/extensions/transcription/src/index.ts
import { registry } from 'glost-registry';

registry.registerFeature({
  name: 'transcription',
  displayName: 'Transcription',
  providerInterface: 'TranscriptionProvider',
});

// Examples register combinations
// examples/glost-th-transcription-example/src/index.ts
registry.registerCombination({
  language: 'th',
  feature: 'transcription',
  status: 'example',
  exampleUrl: 'https://github.com/.../glost-th-transcription-example',
});
```

**Pros:**
- Self-documenting
- Automatically stays in sync
- Can discover at runtime

**Cons:**
- More complex
- Side effects at import time
- Requires coordination

### Phase 3: Build-Time Registry (Best of Both)

```typescript
// Use a build script to generate registry from package metadata
// scripts/generate-registry.ts

import { glob } from 'glob';
import { readFile, writeFile } from 'fs/promises';

async function generateRegistry() {
  // Scan all language packages
  const languagePackages = await glob('packages/languages/*/package.json');
  const languages = await Promise.all(
    languagePackages.map(async (path) => {
      const pkg = JSON.parse(await readFile(path, 'utf-8'));
      const constants = await import(pkg.name);
      return extractLanguageMetadata(constants);
    })
  );
  
  // Scan all feature packages
  // ...
  
  // Scan all examples
  // ...
  
  // Generate registry file
  await writeFile(
    'packages/registry/src/generated.ts',
    generateRegistryCode({ languages, features, combinations })
  );
}
```

**Pros:**
- Best of both worlds
- No runtime overhead
- Always up to date
- Type-safe

**Cons:**
- Requires build step
- More infrastructure

## 🎯 Benefits

### For Developers

1. **Discovery** - "What can I build?"
   ```typescript
   registry.getCombinations({ status: 'possible' })
   // Show all possible but not yet implemented combinations
   ```

2. **Validation** - "Will this work?"
   ```typescript
   if (!registry.isSupported('ar', 'transcription')) {
     throw new Error('Arabic transcription not yet available');
   }
   ```

3. **Autocomplete** - Types know what's valid
   ```typescript
   type Lang = AvailableLanguage; // Autocompletes to known languages
   ```

4. **Documentation** - Self-documenting system
   ```typescript
   registry.getLanguageMetadata('th')
   // Returns all Thai-specific info
   ```

### For Maintainers

1. **Tracking** - Know what's implemented
2. **Planning** - See gaps in the matrix
3. **Documentation** - Auto-generate docs
4. **Testing** - Matrix testing becomes possible

### For Users

1. **Exploration** - Browse available combinations
2. **Confidence** - Know what's supported
3. **Migration** - Track package versions

## 📋 Example Use Cases

### 1. IDE Extension

```typescript
// Show autocomplete for available languages
const availableLanguages = registry.getLanguages();
// Display in IDE dropdown
```

### 2. CLI Tool

```bash
$ glost list languages
Available languages:
  - th (Thai): Thai script, 4 transcription schemes
  - ja (Japanese): Hiragana/Katakana/Kanji, 5 transcription schemes
  - ko (Korean): Hangul, 3 transcription schemes

$ glost show th
Thai (ภาษาไทย)
  Script: Thai
  Direction: LTR
  Features: Tones, No spaces, Complex script
  Transcription schemes: RTGS, IPA, Paiboon+, AUA
  Available features: transcription (example), translation (possible)
```

### 3. Web Documentation

Generate interactive matrix that shows:
- ✅ Available (with links to examples)
- 🚧 In Progress
- ⚪ Possible
- ❌ Not Applicable

### 4. Package Manager Integration

```bash
$ npm info glost-th glost-capabilities
{
  "languages": ["th"],
  "transcriptionSchemes": ["rtgs", "ipa", "paiboon+"],
  "compatibleFeatures": ["transcription", "translation", "frequency"]
}
```

## 🤔 Should We Build It?

### Pros
- ✅ Better discoverability
- ✅ Type safety
- ✅ Auto-documentation
- ✅ Validation
- ✅ Planning tool

### Cons
- ❌ Additional maintenance
- ❌ More infrastructure
- ❌ Must stay in sync

### Recommendation

**Start with Phase 1 (Static Registry):**

1. Create `packages/registry/` with simple exports
2. Manually maintain lists (for now)
3. Use in documentation generation
4. Add to examples as helper

**Benefits without overhead:**
- Simple implementation (1-2 hours)
- Immediate value for docs
- Can evolve to Phase 2/3 later

**Example:**
```typescript
// packages/registry/src/index.ts
export const GLOST_LANGUAGES = ['th', 'ja', 'ko', 'en'] as const;
export const GLOST_FEATURES = ['transcription', 'translation', 'frequency'] as const;

export type GlostLanguage = typeof GLOST_LANGUAGES[number];
export type GlostFeature = typeof GLOST_FEATURES[number];

// Use in docs and tools!
```

## 🎉 Conclusion

A plugin registry would provide significant value for GLOST's modular architecture, especially as it scales to more languages and features. Starting with a simple static registry gives immediate benefits with minimal overhead, and can evolve into a more sophisticated system as needs grow.

**Priority: Medium** - Valuable but not urgent. The matrix documentation already provides much of the discovery value manually.
