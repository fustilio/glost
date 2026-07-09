# glost-inkle

## 0.2.8

### Patch Changes

- @glotblocks/glost@0.8.6

## 0.2.7

### Patch Changes

- @glotblocks/glost@0.8.5

## 0.2.6

### Patch Changes

- 14f0a12: Fix published packaging: `glost-gender`, `glost-inkle`, and `glost-translation` now ship compiled `dist/` output instead of pointing `main`/`exports` at TypeScript source (which failed the publint release gate and was unusable from plain Node). All seven plugin packages now declare `"files": ["dist"]` so tarballs no longer include source, tests, and tsconfig.

## 0.2.5

### Patch Changes

- Updated dependencies
  - glost@0.8.4

## 0.2.4

### Patch Changes

- Updated dependencies
  - glost@0.8.3

## 0.2.3

### Patch Changes

- Updated dependencies
  - glost@0.8.2

## 0.2.2

### Patch Changes

- Updated dependencies
  - glost@0.8.1

## 0.2.1

### Patch Changes

- Updated dependencies
  - glost@0.8.0

## 0.2.0

### Minor Changes

- Fixed critical production issues: ESM imports, BCP-47 language standardization, removed redundant transcription schema fields, renamed translation API parameters
- Added DX improvements: typed extras via declaration merging, comprehensive error classes, standard GLOSTDataProvider interface, migration CLI tool

### Patch Changes

- Updated dependencies

## 0.1.3

### Patch Changes

- Updated dependencies

## 0.1.2

### Patch Changes

- Updated dependencies

## 0.1.1

### Patch Changes

- Fix package names
- Updated dependencies
