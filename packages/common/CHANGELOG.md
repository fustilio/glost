# glost-common

## 0.4.3

### Patch Changes

- Point `main`/`types`/all `exports` subpaths at compiled `dist/*.js` + `dist/*.d.ts` instead of `src/*.ts`, and add `files: ["dist"]` so the published tarball ships only build output. The published `0.4.2` resolved consumers to raw TypeScript source, which fails any downstream runner that cannot strip types under `node_modules`. Adds a `publint` `prepublishOnly` gate so this cannot regress.

## 0.4.2

### Patch Changes

- Patch version bump for republishing

## 0.4.1

### Patch Changes

- Patch version bump for republishing

## 0.4.0

### Minor Changes

- Minor version bump for npm deployment

## 0.2.0

### Minor Changes

- Fixed critical production issues: ESM imports, BCP-47 language standardization, removed redundant transcription schema fields, renamed translation API parameters
- Added DX improvements: typed extras via declaration merging, comprehensive error classes, standard GLOSTDataProvider interface, migration CLI tool

## 0.1.3

### Patch Changes

- Externalized language-specific helpers and data-dependent extensions into dedicated packages
- Extensions now require explicit data providers

## 0.1.2

### Patch Changes

- Ecosystem update: Language-specific helpers externalized to dedicated packages
- No breaking changes in this package

## 0.1.1

### Patch Changes

- Fix package names
