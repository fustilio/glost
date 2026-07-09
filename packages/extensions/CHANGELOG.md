# glost-extensions

## 0.6.3

### Patch Changes

- 46619d3: Republish with complete `dist/` output. The copies of these packages on npm are broken for plain-Node consumers: `glost-extensions@0.6.2` shipped a `dist/` containing only `example-data/` (no `index.js`, breaking `@glotblocks/glost-processor` and the `@glotblocks/glost` facade at import time), and `glost-plugins@0.6.6` resolved to raw TypeScript source. The workspace manifests already point at `dist/` with `"files": ["dist"]` — this bump exists purely to get correctly-packed tarballs onto the registry.

## 0.6.2

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-common@0.4.2
  - glost-core@0.6.2

## 0.6.1

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-common@0.4.1
  - glost-core@0.6.1

## 0.6.0

### Minor Changes

- Minor version bump for npm deployment

### Patch Changes

- Updated dependencies
  - glost-common@0.4.0
  - glost-core@0.6.0
