# glost-th

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
