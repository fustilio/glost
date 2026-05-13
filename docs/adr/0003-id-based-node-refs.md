# Alignment edges reference nodes by id only, no path fallback

`AlignmentEdge` `NodeRef`s are id-based (`{ lang, id }`) where the `id` is the stamped `extras.id` written by the `id-stamp` plugin. Path-based references (`{ path: number[] }`) were rejected because every insertion or deletion in the tree silently shifts indices, producing wrong-but-resolvable refs — the worst failure mode for content data. Id-based refs either resolve or throw loudly. The cost is making `id-stamp` a hard prerequisite of `glost-align`: an un-stamped `ParallelDocument` cannot be aligned, and the package validates this at its public seam.

## Considered alternatives

- **Hybrid (prefer id, fall back to path)**: rejected because every walker grows a branch that is dead 95% of the time once consumers adopt `id-stamp` (which they must — edges are useless without stable refs). Two shapes for one concept is shallow growth.
