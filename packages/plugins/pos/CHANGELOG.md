# glost-pos

## 0.4.5

### Patch Changes

- Updated dependencies
  - glost@0.8.3
  - glost-plugins@0.6.4

## 0.4.4

### Patch Changes

- Updated dependencies
  - glost-plugins@0.6.3

## 0.4.3

### Patch Changes

- Updated dependencies
  - glost-common@0.4.2
  - glost@0.8.2
  - glost-plugins@0.6.2

## 0.4.2

### Patch Changes

- Updated dependencies
  - glost-common@0.4.1
  - glost@0.8.1
  - glost-plugins@0.6.1

## 0.4.1

### Patch Changes

- Updated dependencies
  - glost-common@0.4.0
  - glost@0.8.0
  - glost-plugins@0.6.0

## 0.3.0

### Minor Changes

- Fixed critical production issues: ESM imports, BCP-47 language standardization, removed redundant transcription schema fields, renamed translation API parameters
- Added DX improvements: typed extras via declaration merging, comprehensive error classes, standard GLOSTDataProvider interface, migration CLI tool

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages
- Extensions now require explicit data providers instead of fallback data

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- Initial release: Part-of-speech tagging extension
- Separated POS tagging (provider) from formatting (enhancer)
- Support for language-specific POS taggers with Universal POS tag support
