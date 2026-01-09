# glost-clause-segmenter

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

- Initial release of glost-clause-segmenter package
- Extracted from glost-extensions core
- Modular language rules system
- Built-in English and Thai rules
- Universal punctuation-based rules
