# `id-stamp` ships `positional` + `preserve`; bootstrap is the consumer's responsibility

The `id-stamp` plugin ships two strategies: `positional` (overwrite unconditionally with deterministic positional ids; default for generated/parsed content) and `preserve` (keep existing `extras.id`, fill gaps positionally; default for authored content). `content-hash` and `UUID` strategies are deliberately deferred — content-hash silently breaks on value edits and collides on duplicate text; UUID makes regeneration of generated content (e.g., polyglot Essential 218 across 80 target languages) catastrophic.

The consumer owns the **hydrate** step that runs *before* `id-stamp` to attach ids from external sources of truth (sidecar JSON, in-source comments). For pharos akha-re, the source-of-truth for ids `c1, c1-w1, c3...` is `correspondence-*.json`, not `akha.md` — the parsed tree carries no ids until hydration. Hydration varies per source format and would couple `id-stamp` to every authoring convention if pulled into the plugin. `id-stamp` only owns the deterministic gap-fill.

## Considered alternatives

- **`content-hash`**: rejected — silent break on any value edit (e.g., diacritic typo fix) and collision on duplicate text (`"Amen."` repeated).
- **`UUID`**: rejected — incompatible with content regeneration; one re-run breaks every downstream alignment edge.
- **Hydration inside the plugin**: rejected — coupling `id-stamp` to every consumer's source format and id-bearing sidecar shape would invert pluggability.
