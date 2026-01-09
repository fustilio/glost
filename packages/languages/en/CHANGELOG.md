# glost-en

## 0.3.0

### Minor Changes

- Fixed critical production issues (ESM imports, BCP-47 language standardization, removed redundant transcription schema fields, renamed translation API sourceLanguage/targetLanguage → from/to) and added major DX improvements (typed extras via declaration merging, comprehensive error classes with suggestions, standard GLOSTDataProvider interface, built-in migration CLI tool npx glost migrate).

### Patch Changes

- Updated dependencies
  - glost@0.4.0
  - glost-clause-segmenter@0.2.1

## 0.2.0

### Minor Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages. Language helpers (`createThaiWord`, `createJapaneseWord`) moved to `glost-th` and `glost-ja`. Extensions (frequency, difficulty, POS, gender, clause-segmenter, transcription, translation) now require explicit data providers instead of fallback data. See `MIGRATION_EXTENSIONS.md` for migration guide.

### Patch Changes

- Updated dependencies
  - glost@0.3.0
  - glost-clause-segmenter@0.2.0
