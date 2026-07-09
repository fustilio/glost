# glost-align

## 0.2.2

### Patch Changes

- @glotblocks/glost@0.8.6

## 0.2.1

### Patch Changes

- @glotblocks/glost@0.8.5

## 0.2.0

### Minor Changes

- Add `idStampPlugin` — a processor-plugin wrapper around the existing `idStamp` function. Lets `id-stamp` compose into `glost().use(...)` pipelines instead of being invoked imperatively, alongside other extensions like transcription/dialogue. Future glost-align extensions declare `requires: ["id-stamp"]` for ordering. The standalone `idStamp(tree, options)` continues to work unchanged.

  Closes glost#1.
