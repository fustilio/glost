# Polyglot factories synthesize sentence-level edges; word-level edges load from an optional file

The polyglot parallel-text factories (`createEssential218ParallelDocument` etc.) generate sentence-level `AlignmentEdge`s automatically from the translation map's by-id pairing — there is no explicit `alignments.json` for sentence-level data. Optional word-level alignment data, when it exists for a (corpus × language) pair, lives in an `alignments.json` next to the translations and is concatenated onto the synthesized edges by the factory.

Symmetric trees, asymmetric edges: a target language missing the translation for sentence 47 still gets an empty placeholder `Sentence` node in the target `GLOSTRoot` (so id stamping stays positional and tree positions align across languages), but the alignment edge for sentence 47 is omitted. Walkers detect missing translations via `getEdgeBySentence(s47) === undefined`.

## Considered alternatives

- **Always-explicit `alignments.json`**: rejected — would generate 30k+ lines of trivial edges across 80 languages × 2 corpora that say nothing the translation map doesn't already say.
- **Asymmetric trees (omit untranslated sentences)**: rejected — breaks tree-position consistency across languages and complicates UIs that walk paired positions.
