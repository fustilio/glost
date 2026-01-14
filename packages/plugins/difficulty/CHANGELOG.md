# glost-difficulty

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

- Initial release: Difficulty scoring extension
- Separated difficulty scoring (provider) from formatting (enhancer)
- Support for language-specific difficulty providers with heuristic-based fallback
