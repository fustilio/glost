# glost-pos

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

- Initial release of glost-pos package
- Extracted from glost-extensions core
- Separated POS tagging (provider) from formatting (enhancer)
- Support for language-specific POS taggers
- Universal POS tag support
