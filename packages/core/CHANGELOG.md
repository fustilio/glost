# glost

## 0.4.0

### Minor Changes

- Fixed critical production issues (ESM imports, BCP-47 language standardization, removed redundant transcription schema fields, renamed translation API sourceLanguage/targetLanguage → from/to) and added major DX improvements (typed extras via declaration merging, comprehensive error classes with suggestions, standard GLOSTDataProvider interface, built-in migration CLI tool npx glost migrate).

### Patch Changes

- Updated dependencies
  - glost-common@0.2.0
  - glost-utils@0.2.0

## 0.4.0

### Major Changes

GLOST v0.4.0 brings critical production fixes and developer experience improvements based on 6+ months of real-world usage feedback from the lalia-prism team processing 50+ language learning stories across Thai and French.

#### Breaking Changes

**1. ESM Imports Fixed** 🔧

- Added `.js` extensions to all barrel exports for proper Node.js ESM support
- Updated TypeScript config to `moduleResolution: "node16"`
- **Impact**: Fixes `Cannot find module` errors in Node.js ESM
- **Migration**: Automatic when upgrading packages

**2. BCP-47 Language Code Standard** 🌍

- All language codes now standardized on BCP-47 format (e.g., `en-US`, `th-TH`)
- Added comprehensive language utilities: `normalizeLanguageCode()`, `matchLanguage()`, `parseLanguageCode()`, `findBestMatch()`, `getLanguageFallbacks()`
- **Impact**: Language codes like `"th"` become `"th-TH"`
- **Migration**: Use `npx glost-migrate v0.3-to-v0.4 ./src` or `migrateAllLanguageCodes()` utility

**3. Transcription Schema Cleanup** ✨

- Removed redundant `system` field from `TranscriptionInfo` type
- System name is already the key in the transcription object
- **Before**: `{ ipa: { text: "hello", system: "ipa" } }`
- **After**: `{ ipa: { text: "hello" } }`
- **Migration**: Use `migrateTranscriptionSchema()` utility

**4. Translation API Clarity** 📝

- Renamed confusing `sourceLanguage`/`targetLanguage` to clear `from`/`to`
- **Before**: `createTranslationExtension({ sourceLanguage: "th", targetLanguage: "en", ... })`
- **After**: `createTranslationExtension({ from: "th", to: "en", ... })`
- **Migration**: Manual update of extension calls

#### New Features

**Typed Extras via Declaration Merging** 🎯

- Extensions can now augment `GLOSTExtras` interface for full type safety
- Automatic TypeScript autocomplete for extension fields
- No runtime overhead, pure type-level enhancement

```typescript
// In extension package
declare module "glost" {
  interface GLOSTExtras {
    frequency?: {
      rank: number;
      category: "very-common" | "common" | "uncommon" | "rare";
    };
  }
}

// In user code - full autocomplete!
word.extras.frequency?.rank; // number | undefined
```

**Standard Provider Interface** 🔌

- New `GLOSTDataProvider<TInput, TOutput>` interface for consistency
- Built-in support for batch processing, caching, and cleanup
- Helper utilities: `createSimpleProvider()`, `createCachedProvider()`, `createFallbackProvider()`

**Better Error Messages** 💬

- New error classes with context, suggestions, and documentation links
- Helpful error formatting with file paths and node locations
- Error types: `GLOSTValidationError`, `GLOSTExtensionError`, `GLOSTProviderError`, etc.

```typescript
GLOSTValidationError: Missing required field 'text' on WordNode

  Location: document.children[0]
  Node type: WordNode
  File: stories/test.glost.json:42

  Suggestion: Add a 'text' field containing the word's text content.
  Documentation: https://glost.dev/docs/node-types#wordnode
```

**Language Code Utilities** 🛠️

- `normalizeLanguageCode()` - Convert to BCP-47
- `matchLanguage()` - Flexible matching with options
- `parseLanguageCode()` - Parse into components
- `findBestMatch()` - Find closest match from available codes
- `getLanguageFallbacks()` - Get fallback chain
- `isValidBCP47()` - Validation
- `asBCP47()` - Type-safe casting

**Migration CLI** 🚀

- Built-in migration CLI: `npx glost migrate`
- Automated migration from v0.3.x to v0.4.0
- Commands: `v0.3-to-v0.4`, `analyze`, `help`
- Dry-run support for safe testing
- Programmatic migration utilities in `glost-utils`

### Improvements

- **Bundle Size**: Foundation laid for future optimizations
- **Type Safety**: Changed `GLOSTExtras` from type to interface for declaration merging
- **Documentation**: Comprehensive migration guide and updated language docs
- **Developer Experience**: Better error messages save significant debugging time

### Fixes

- Fixed ESM imports in all language packages
- Fixed TypeScript moduleResolution for proper ESM output
- Removed redundant schema fields reducing JSON size

### Migration Guide

See [MIGRATION_v0.3_to_v0.4.md](../../MIGRATION_v0.3_to_v0.4.md) for complete upgrade instructions.

Quick migration:

```bash
npx glost migrate v0.3-to-v0.4 ./src
```

### Acknowledgments

Special thanks to the lalia-prism team for their comprehensive RFC and 6+ months of production feedback that made this release possible. Their real-world experience with Thai and French language learning content identified critical issues and guided these improvements.

### Dependencies

- glost-common@0.4.0
- glost-utils@0.4.0

## 0.3.0

### Minor Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages. Language helpers (`createThaiWord`, `createJapaneseWord`) moved to `glost-th` and `glost-ja`. Extensions (frequency, difficulty, POS, gender, clause-segmenter, transcription, translation) now require explicit data providers instead of fallback data. See `MIGRATION_EXTENSIONS.md` for migration guide.

### Patch Changes

- Updated dependencies
  - glost-common@0.1.3

## 0.2.0

### Minor Changes

- # Externalize Language-Specific Helpers to Dedicated Packages

  ## Breaking Changes

  Language-specific helper functions have been moved from the core `glost` package into dedicated language packages (`glost-th`, `glost-ja`). This keeps the core lightweight, reduces bundle sizes, and allows for independent language support.

  ### Removed from `glost` (Breaking)
  - `createThaiWord()` → moved to `glost-th` package
  - `createJapaneseWord()` → moved to `glost-ja` package
  - `CreateThaiWordOptions` interface → moved to `glost-th`
  - `CreateJapaneseWordOptions` interface → moved to `glost-ja`

  ### Migration Required

  Install language packages separately:

  ```bash
  npm install glost-th  # Thai language support
  npm install glost-ja  # Japanese language support
  ```

  Update imports in your code:

  ```typescript
  // Before (v0.1.x)
  import { createThaiWord, createJapaneseWord } from "glost";

  // After (v0.2.0+)
  import { createThaiWord } from "glost-th";
  import { createJapaneseWord } from "glost-ja";
  ```

  See [MIGRATION.md](../../MIGRATION.md) for complete upgrade guide.

  ## New Packages

  ### `glost-th` - Thai Language Support

  Initial release providing:
  - `createThaiWord()` helper
  - Thai transcription provider interfaces
  - Support for RTGS, Paiboon, Paiboon+, AUA, and IPA schemes

  ### `glost-ja` - Japanese Language Support

  Initial release providing:
  - `createJapaneseWord()` helper
  - Japanese transcription provider interfaces
  - Support for Romaji (Hepburn, Kunrei, Nihon), Furigana, and IPA schemes

  ## Internal Improvements
  - Fixed circular dependencies in core package (changed `glost/src/*` imports to relative imports)
  - Reduced core package size by ~30%
  - Improved build performance
  - Better modularity and maintainability

  ## What Stays in Core

  All core functionality remains unchanged:
  - ✅ `createGLOSTWordNode()` - Generic word creation
  - ✅ `createGLOSTSentenceNode()` - Sentence creation
  - ✅ `createGLOSTRootNode()` - Document creation
  - ✅ `createSimpleWord()` - Simple word helper
  - ✅ All tree traversal utilities
  - ✅ Type guards and validators
  - ✅ All core types and interfaces

  ## Benefits
  - **Smaller bundles** - Import only languages you use
  - **Independent releases** - Update languages without core changes
  - **Better organization** - All Thai code in `glost-th`, all Japanese in `glost-ja`
  - **Easier contributions** - Add new languages without touching core
  - **Scalability** - Can support 50+ languages without bloating core

### Patch Changes

- Updated dependencies
  - glost-common@0.1.2

## 0.2.0

### Breaking Changes

- **BREAKING:** Removed `createThaiWord()` - moved to `glost-th` package
- **BREAKING:** Removed `createJapaneseWord()` - moved to `glost-ja` package
- **BREAKING:** Removed `CreateThaiWordOptions` interface - moved to `glost-th`
- **BREAKING:** Removed `CreateJapaneseWordOptions` interface - moved to `glost-ja`

### Migration

Install language packages separately:

```bash
npm install glost-th  # Thai language support
npm install glost-ja  # Japanese language support
```

Update imports:

```typescript
// Before (v0.1.x)
import { createThaiWord, createJapaneseWord } from "glost";

// After (v0.2.0+)
import { createThaiWord } from "glost-th";
import { createJapaneseWord } from "glost-ja";
```

See [MIGRATION.md](../../MIGRATION.md) for complete upgrade guide.

### Internal Changes

- Fixed circular dependencies (changed `glost/src/*` imports to relative imports)
- Reduced package size by ~30%
- Improved build performance

### What Stays in Core

All core functionality remains unchanged:

- ✅ `createGLOSTWordNode()` - Generic word creation
- ✅ `createGLOSTSentenceNode()` - Sentence creation
- ✅ `createGLOSTRootNode()` - Document creation
- ✅ `createSimpleWord()` - Simple word helper
- ✅ All tree traversal utilities
- ✅ Type guards and validators

## 0.1.1

### Patch Changes

- fix names
- Updated dependencies
  - glost-common@0.1.1
