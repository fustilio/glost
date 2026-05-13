# GloST

Glossed Syntax Tree — a unified/remark-style framework for processing multilingual text with language-learning annotations. Trees are single-language by default; alignment across languages lives in the sibling `glost-align` package.

## Language

**GLOSTRoot**:
The top of a single-language tree: `Root → Paragraph → Sentence → Word → Text`. Carries `lang` and `script`.

**ParallelDocument**:
A new top-level kind (in `glost-align`) that groups N `GLOSTRoot`s — one per language — together with an alignment graph. Sits *above* `GLOSTRoot`, not inside it.
_Avoid_: "bilingual document" (presumes two languages), "translation pair" (presumes directionality).

**AlignmentEdge**:
An N-ary edge across the trees in a `ParallelDocument`. Carries a `level`, references nodes per language, and optionally records `confidence`, `source` provenance, and a canonical `source` language. One edge per source unit — translations to multiple targets share the edge, not duplicate it.
_Avoid_: "correspondence" (akha-re legacy term, binary-shaped), "translation" (presumes directionality).

**NodeRef**:
A pointer to a node inside one of the trees in a `ParallelDocument`. Shape: `{ lang, id }`. The `id` is the stamped `extras.id`.

**id-stamp**:
A processor plugin that walks a `GLOSTRoot` and writes a deterministic `extras.id` onto every alignable node (Paragraph, Sentence, Word). Ships two strategies: `positional` (overwrite with `p{N}-s{N}-w{N}` from tree position; for generated content) and `preserve` (keep existing ids, fill gaps positionally; for authored content). Hard prerequisite of `glost-align` — an un-stamped document cannot be aligned. See ADR-0005.

**Hydrate**:
The consumer-owned step that attaches ids from an external source of truth (sidecar JSON, in-source markers) onto a parsed tree *before* `id-stamp` runs. Pharos akha-re hydrates from `correspondence-*.json`; polyglot generated content typically skips hydration. Not part of `id-stamp` itself — varies per source format.

**Provenance**:
Where an alignment came from. Two-level: closed `kind` (`lookup | propagated | manual | legacy | auto`) plus optional free-form `detail`.
_Avoid_: "source" (overloaded — also means the canonical source language on an edge).

**Confidence**:
How sure we are an alignment is correct (`high | medium | low`). Orthogonal to provenance — a manual edge can be low-confidence; a lookup edge can be high-confidence.

**Level**:
The granularity of an `AlignmentEdge`: `paragraph | sentence | phrase | word`. Closed union.

## Relationships

- A **ParallelDocument** contains one **GLOSTRoot** per language.
- A **ParallelDocument** contains a flat list of **AlignmentEdge**s.
- An **AlignmentEdge** references one or more nodes per language via **NodeRef**s.
- Edge hierarchy (a word-edge "inside" a sentence-edge) is *derived* from the underlying tree containment, not stored on the edge.
- An **AlignmentEdge** can only resolve against trees that have been **id-stamp**ed.

## Example dialogue

> **Dev**: "Where does the liturgical `role` go — leader, all, shared-response? On the edge or the sentence?"
>
> **Domain expert**: "On the sentence. The role is a property of the utterance, not of any translation. Two target languages don't make two roles."
>
> **Dev**: "So `glost-align` doesn't know what 'leader' means?"
>
> **Domain expert**: "Right. That's `glost-dialogue`'s territory — `extras.dialogue.role` on the sentence. `glost-align` only sees edges."

## Flagged ambiguities

- "source" was used to mean both the **provenance** of an edge and the canonical **source language** of an edge. Resolved: `edge.source` is the language; `edge.provenance` is where the alignment came from.
- "correspondence" (from akha-re) was used where we now say **AlignmentEdge**. Resolved: correspondences in akha-re are binary directional pairs; **AlignmentEdge** is N-ary with optional canonical source.
- Liturgical "role" (`leader | all | shared-response`) and dialogue "role" (speaker id) were both called "role". Resolved: liturgical role lives on the sentence in consumer-local `extras.liturgy.role`, not in `glost-dialogue` (see ADR-0004). Both share the principle that role is a property of the **utterance**, not the **AlignmentEdge**.
