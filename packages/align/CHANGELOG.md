# glost-align

## 0.2.0

### Minor Changes

- Add `idStampPlugin` — a processor-plugin wrapper around the existing `idStamp` function. Lets `id-stamp` compose into `glost().use(...)` pipelines instead of being invoked imperatively, alongside other extensions like transcription/dialogue. Future glost-align extensions declare `requires: ["id-stamp"]` for ordering. The standalone `idStamp(tree, options)` continues to work unchanged.

  Closes glost#1.
