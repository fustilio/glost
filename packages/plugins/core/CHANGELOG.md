# glost-plugins

## 0.6.8

### Patch Changes

- @glotblocks/glost-utils@0.3.8

## 0.6.7

### Patch Changes

- 46619d3: Republish with complete `dist/` output. The copies of these packages on npm are broken for plain-Node consumers: `glost-extensions@0.6.2` shipped a `dist/` containing only `example-data/` (no `index.js`, breaking `@glotblocks/glost-processor` and the `@glotblocks/glost` facade at import time), and `glost-plugins@0.6.6` resolved to raw TypeScript source. The workspace manifests already point at `dist/` with `"files": ["dist"]` — this bump exists purely to get correctly-packed tarballs onto the registry.
  - @glotblocks/glost-utils@0.3.7

## 0.6.6

### Patch Changes

- glost-utils@0.3.5

## 0.6.5

### Patch Changes

- Fix glost-th missing dist folder on npm. Added missing ./logger export to glost-utils package.json. Fixed undefined logger variable in glost-plugins processor.
- Updated dependencies
  - glost-utils@0.3.4

## 0.6.4

### Patch Changes

- glost-utils@0.3.3

## 0.6.3

### Patch Changes

- Bump version to 0.6.3 since 0.6.2 was already published.

## 0.6.2

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-common@0.4.2
  - glost-core@0.6.2
  - glost-utils@0.3.2

## 0.6.1

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-common@0.4.1
  - glost-core@0.6.1
  - glost-utils@0.3.1

## 0.6.0

### Minor Changes

- Minor version bump for npm deployment

### Patch Changes

- Updated dependencies
  - glost-common@0.4.0
  - glost-core@0.6.0
  - glost-utils@0.3.0

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

## 0.1.2

### Patch Changes

- Updated dependencies

## 0.1.1

### Patch Changes

- Fix package names
- Updated dependencies
