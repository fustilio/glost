# `AlignmentEdge` is N-ary, not binary directional

A `glost-align` `AlignmentEdge` references nodes across all languages in a single edge (`refs: Record<lang, NodeRef[]>`) with an optional `source` slot naming the canonical source language. The binary alternative — one edge per (source, target) pair, akha-re's current shape — duplicates source-side metadata (`role`, `confidence`, edge id) once per target language, since those fields describe the source utterance rather than the translation pair. N-ary collapses the redundancy, makes asymmetric coverage natural (omit the key for an unaligned target), and keeps walker queries one map lookup instead of a join across N binary lists.

## Considered alternatives

- **Binary directional** (akha-re's `correspondencesEn` + `correspondencesZh`): rejected for the redundancy described above.
- **Binary symmetric** (no source/target asymmetry): rejected because directionality is real in practice — akha is the canonical source for prayers, English is the canonical source for Essential 218 — and forcing symmetry loses that.
