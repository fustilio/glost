# Polyglot's parallel-text capability emits `ParallelDocument`; flat pairs are a caller-side helper

`@polyglot-bundles/parallel-text-base`'s `createEssential218Utils` / `createGSFAUtils` factories return a `ParallelDocument` (one per corpus per target language) instead of a flat `{ english, translation }` pair API. The legacy flat shape is reproducible via a standalone `flattenAlignedPair(doc, edgeId, { sourceLang, targetLang })` helper exported from `glost-align`. Consumers that only need the flat pair add one line at the call site; the factory has one job.

This is a breaking change to `parallel-text-base` and every `{lang}-parallel-text` package. The packages are pre-1.0, so the change ships as a **0.x → 0.(x+1).0 minor bump** following the pre-1.0 convention that minors may break. Migration is mechanical (one line per call site) and the new shape is strictly more capable: word-level alignment, multi-target translation, and confidence/provenance metadata all become possible without further schema changes. The 1.0 boundary is deferred until the polyglot ↔ glost-align integration stabilizes across consumers.

## Considered alternatives

- **Augment, dual API**: rejected — two states to keep in sync, no single source of truth, factory interface bloated.
- **Layered, derived (legacy method preserved on the doc)**: rejected — the legacy method becomes a permanent backwards-compatibility shim that nobody can delete without churn. Pre-1.0 versioning lets us avoid the shim entirely.
