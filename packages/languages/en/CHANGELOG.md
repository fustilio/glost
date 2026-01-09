# glost-en

## 0.2.0

### Minor Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages. Language helpers (`createThaiWord`, `createJapaneseWord`) moved to `glost-th` and `glost-ja`. Extensions (frequency, difficulty, POS, gender, clause-segmenter, transcription, translation) now require explicit data providers instead of fallback data. See `MIGRATION_EXTENSIONS.md` for migration guide.

### Patch Changes

- Updated dependencies
  - glost@0.3.0
  - glost-clause-segmenter@0.2.0
