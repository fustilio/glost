# glost-cli

## 0.6.4

### Patch Changes

- b72190c: Add the `repository` field (with `directory`) to these four packages. They were the only publishable packages missing it, which caused npm to reject their OIDC provenance publish with `E422 ... "repository.url" is "", expected to match "https://github.com/fustilio/glost"`. Every other package already carries this field.
- Updated dependencies [b72190c]
  - @glotblocks/glost-registry@1.0.4

## 0.6.3

### Patch Changes

- Updated dependencies [46619d3]
  - @glotblocks/glost-extensions@0.6.3
  - @glotblocks/glost-registry@1.0.3

## 0.6.2

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-core@0.6.2
  - glost-extensions@0.6.2
  - glost-registry@1.0.2

## 0.6.1

### Patch Changes

- Patch version bump for republishing
- Updated dependencies
  - glost-core@0.6.1
  - glost-extensions@0.6.1
  - glost-registry@1.0.1

## 0.6.0

### Minor Changes

- Minor version bump for npm deployment

### Patch Changes

- Updated dependencies
  - glost-core@0.6.0
  - glost-extensions@0.6.0
  - glost-registry@1.0.0
