# glost-ja

## 0.4.4

### Patch Changes

- glost-difficulty@0.4.4
- glost-frequency@0.4.4
- glost-pos@0.4.4
- glost-transcription@0.4.4
- glost-translation@0.4.4

## 0.4.3

### Patch Changes

- Updated dependencies
  - glost-common@0.4.2
  - glost@0.8.2
  - glost-difficulty@0.4.3
  - glost-frequency@0.4.3
  - glost-pos@0.4.3
  - glost-transcription@0.4.3
  - glost-translation@0.4.3

## 0.4.2

### Patch Changes

- Updated dependencies
  - glost-common@0.4.1
  - glost@0.8.1
  - glost-difficulty@0.4.2
  - glost-frequency@0.4.2
  - glost-pos@0.4.2
  - glost-transcription@0.4.2
  - glost-translation@0.4.2

## 0.4.1

### Patch Changes

- Updated dependencies
  - glost-common@0.4.0
  - glost@0.8.0
  - glost-difficulty@0.4.1
  - glost-frequency@0.4.1
  - glost-pos@0.4.1
  - glost-transcription@0.4.1
  - glost-translation@0.4.1

## 0.4.0

### Minor Changes

- Fixed critical production issues: ESM imports, BCP-47 language standardization, removed redundant transcription schema fields, renamed translation API parameters
- Added DX improvements: typed extras via declaration merging, comprehensive error classes, standard GLOSTDataProvider interface, migration CLI tool

### Patch Changes

- Updated dependencies

## 0.3.0

### Minor Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages
- Extensions now require explicit data providers instead of fallback data

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- Initial release: Japanese language support externalized from core `glost` package

### Features

- `createJapaneseWord()` helper with romaji and furigana support
- Japanese transcription provider interfaces
- Support for Romaji (Hepburn, Kunrei, Nihon), Furigana, Hiragana, Katakana, and IPA schemes
