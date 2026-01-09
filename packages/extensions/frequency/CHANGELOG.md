# glost-frequency

## 0.3.0

### Minor Changes

- Fixed critical production issues (ESM imports, BCP-47 language standardization, removed redundant transcription schema fields, renamed translation API sourceLanguage/targetLanguage → from/to) and added major DX improvements (typed extras via declaration merging, comprehensive error classes with suggestions, standard GLOSTDataProvider interface, built-in migration CLI tool npx glost migrate).

### Patch Changes

- Updated dependencies
  - glost-extensions@0.3.0
  - glost-common@0.2.0
  - glost@0.4.0

## 0.2.0

### Minor Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages. Language helpers (`createThaiWord`, `createJapaneseWord`) moved to `glost-th` and `glost-ja`. Extensions (frequency, difficulty, POS, gender, clause-segmenter, transcription, translation) now require explicit data providers instead of fallback data. See `MIGRATION_EXTENSIONS.md` for migration guide.

### Patch Changes

- Updated dependencies
  - glost@0.3.0
  - glost-extensions@0.2.0
  - glost-common@0.1.3

## 0.1.0

### Minor Changes

- Initial release of glost-frequency package
- Extracted from glost-extensions core
- Separated frequency generation (provider) from formatting (enhancer)
- Support for language-specific frequency providers
- Fallback provider for simple frequency detection
