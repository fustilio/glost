# glost

## 0.4.0

### Major Changes

- **ESM Imports Fixed**: Added `.js` extensions to all barrel exports for proper Node.js ESM support
- **BCP-47 Language Standard**: All language codes now use BCP-47 format (e.g., `en-US`, `th-TH`)
- **Transcription Schema Cleanup**: Removed redundant `system` field from TranscriptionInfo type
- **Translation API Renamed**: Changed `sourceLanguage/targetLanguage` to `from/to` for clarity

### Breaking Changes

- Language codes standardized on BCP-47 (use migration CLI: `npx glost migrate v0.3-to-v0.4 ./src`)
- Translation extension API parameter names changed
- Transcription schema simplified

### New Features

- **Typed Extras**: Extensions can augment `GLOSTExtras` interface via declaration merging for full type safety
- **Standard Provider Interface**: New `GLOSTDataProvider<TInput, TOutput>` with batch processing and caching support
- **Better Error Messages**: Comprehensive error classes with context, suggestions, and documentation links
- **Language Utilities**: `normalizeLanguageCode()`, `matchLanguage()`, `parseLanguageCode()`, `findBestMatch()`, etc.
- **Migration CLI**: Built-in `npx glost migrate` tool for automated upgrades

### Patch Changes

- Updated dependencies

## 0.3.0

### Minor Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages
- Extensions now require explicit data providers instead of fallback data

### Patch Changes

- Updated dependencies

## 0.2.0

### Breaking Changes

- Removed `createThaiWord()` and `createJapaneseWord()` - moved to `glost-th` and `glost-ja` packages
- Language-specific helper functions externalized to dedicated packages

### Internal Changes

- Fixed circular dependencies
- Reduced package size by ~30%
- Improved build performance and modularity

### Patch Changes

- Updated dependencies

## 0.1.1

### Patch Changes

- Fix package names
- Updated dependencies
