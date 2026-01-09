# glost-common

## 0.1.3

### Patch Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages. Language helpers (`createThaiWord`, `createJapaneseWord`) moved to `glost-th` and `glost-ja`. Extensions (frequency, difficulty, POS, gender, clause-segmenter, transcription, translation) now require explicit data providers instead of fallback data. See `MIGRATION_EXTENSIONS.md` for migration guide.

## 0.1.2

### Patch Changes

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

## 0.1.2

### Patch Changes

- Ecosystem update: Language-specific helpers externalized to `glost-th` and `glost-ja` packages
- No breaking changes in this package

## 0.1.1

### Patch Changes

- fix names
