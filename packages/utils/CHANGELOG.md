# glost-utils

## 0.3.7

### Patch Changes

- @glotblocks/glost@0.8.5

## 0.3.6

### Patch Changes

- Point `main`/`types`/all `exports` subpaths at compiled `dist/*.js` + `dist/*.d.ts` instead of `src/*.ts`, and add `files: ["dist"]` so the published tarball ships only build output. The published `0.3.5` resolved consumers to raw TypeScript source (same defect as `glost-common`). Adds a `publint` `prepublishOnly` gate so this cannot regress.

## 0.3.5

### Patch Changes

- Updated dependencies
  - glost@0.8.4

## 0.3.4

### Patch Changes

- Fix glost-th missing dist folder on npm. Added missing ./logger export to glost-utils package.json. Fixed undefined logger variable in glost-plugins processor.

## 0.3.3

### Patch Changes

- Updated dependencies
  - glost@0.8.3

## 0.3.2

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-common@0.4.2
  - glost@0.8.2

## 0.3.1

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-common@0.4.1
  - glost@0.8.1

## 0.3.0

### Minor Changes

- Minor version bump for npm deployment

### Patch Changes

- Updated dependencies
  - glost-common@0.4.0
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
