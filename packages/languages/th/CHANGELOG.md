# glost-th

## 0.4.8

### Patch Changes

- Updated dependencies
  - glost@0.8.3
  - glost-clause-segmenter@0.2.6
  - glost-difficulty@0.4.5
  - glost-frequency@0.4.5
  - glost-pos@0.4.5
  - glost-transcription@0.4.7
  - glost-translation@0.4.5
  - glost-plugins@0.6.4

## 0.4.7

### Patch Changes

- Updated dependencies
  - glost-transcription@0.4.6

## 0.4.6

### Patch Changes

- Updated dependencies
  - glost-transcription@0.4.5

## 0.4.5

### Patch Changes

- Updated dependencies
  - glost-plugins@0.6.3
  - glost-clause-segmenter@0.2.5
  - glost-difficulty@0.4.4
  - glost-frequency@0.4.4
  - glost-pos@0.4.4
  - glost-transcription@0.4.4
  - glost-translation@0.4.4

## 0.4.4

### Patch Changes

- Updated dependencies
  - glost-common@0.4.2
  - glost@0.8.2
  - glost-plugins@0.6.2
  - glost-clause-segmenter@0.2.4
  - glost-difficulty@0.4.3
  - glost-frequency@0.4.3
  - glost-pos@0.4.3
  - glost-transcription@0.4.3
  - glost-translation@0.4.3

## 0.4.3

### Patch Changes

- Updated dependencies
  - glost-common@0.4.1
  - glost@0.8.1
  - glost-plugins@0.6.1
  - glost-clause-segmenter@0.2.3
  - glost-difficulty@0.4.2
  - glost-frequency@0.4.2
  - glost-pos@0.4.2
  - glost-transcription@0.4.2
  - glost-translation@0.4.2

## 0.4.2

### Patch Changes

- Updated dependencies
  - glost-common@0.4.0
  - glost@0.8.0
  - glost-plugins@0.6.0
  - glost-clause-segmenter@0.2.2
  - glost-difficulty@0.4.1
  - glost-frequency@0.4.1
  - glost-pos@0.4.1
  - glost-transcription@0.4.1
  - glost-translation@0.4.1

## 0.4.1

### Patch Changes

- Add transcription schemes

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

- Initial release: Thai language support externalized from core `glost` package

### Features

- `createThaiWord()` helper with RTGS transcription support
- Thai transcription provider interfaces
- Support for RTGS, Paiboon, Paiboon+, AUA, and IPA schemes
