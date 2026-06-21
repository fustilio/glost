/**
 * Cross-language alignment types for GloST.
 *
 * A `ParallelDocument` groups N single-language `GLOSTRoot`s and a flat
 * `AlignmentEdge[]` graph that references nodes across them by stamped id.
 * See ADRs 0001-0007 in glost/docs/adr/.
 */

import type { GLOSTRoot } from "@glotblocks/glost";

/** BCP-47 language tag, narrowed to a string for shape clarity. */
export type LangCode = string;

/**
 * Granularity of an `AlignmentEdge`.
 *
 * Closed union — additions widen the package's public type and require a
 * minor bump (per ADR-0001).
 */
export type AlignmentLevel = "paragraph" | "sentence" | "phrase" | "word";

/**
 * How sure we are that the alignment is correct. Orthogonal to provenance.
 */
export type Confidence = "high" | "medium" | "low";

/**
 * Where an alignment came from. Two-level: closed `kind`, open `detail`.
 *
 * - `lookup`     — derived from a dictionary or word list
 * - `propagated` — spread from a coarser-grained alignment (e.g. sentence → words)
 * - `manual`     — human-curated
 * - `legacy`     — inherited from an older format with no preserved provenance
 * - `auto`       — produced by a model or generic heuristic
 *
 * `detail` is consumer-specific (e.g. `"bible"`, `"opus-mt"`, `"essential-218-base"`).
 */
export interface Provenance {
  kind: "lookup" | "propagated" | "manual" | "legacy" | "auto";
  detail?: string;
}

/**
 * A pointer to a stamped node inside a `ParallelDocument`'s tree.
 *
 * `lang` is technically derivable from the surrounding `refs` map key, but
 * keeping it on the ref makes the value self-contained for walkers.
 */
export interface NodeRef {
  lang: LangCode;
  id: string;
}

/**
 * One alignment edge across the languages in a `ParallelDocument`.
 *
 * N-ary: `refs` carries node pointers per language; one edge per source unit
 * rather than one per (source, target) pair (see ADR-0002).
 *
 * Hierarchy between edges (e.g. word inside sentence) is *derived* from tree
 * containment, not stored — `parent` is intentionally absent.
 */
export interface AlignmentEdge {
  /** Stable edge id — addressable by review tooling, regeneration pipelines, etc. */
  id: string;
  level: AlignmentLevel;
  /** Node refs per language. Asymmetric coverage = omit the key. */
  refs: Partial<Record<LangCode, NodeRef[]>>;
  /** Canonical source language, when one exists. Optional for symmetric content. */
  source?: LangCode;
  confidence?: Confidence;
  provenance?: Provenance;
  /** Free-form per-edge notes. Avoid putting structured data here. */
  note?: string;
}

/**
 * Optional document-level metadata. Per-language titles live in `titles`.
 */
export interface ParallelDocumentMetadata {
  title?: string;
  titles?: Partial<Record<LangCode, string>>;
  /** Citation, attribution, or upstream URL. */
  source?: string;
  status?: "complete" | "incomplete" | "needs-review";
  /** Free-form extension slot. */
  extras?: Record<string, unknown>;
}

/**
 * Top-level container grouping N parallel single-language trees + edges.
 *
 * Sits *above* `GLOSTRoot` (per ADR-0001). Trees are inlined, never referenced
 * (per the resolved Q2 — referential trees are a deferred concern).
 */
export interface ParallelDocument {
  type: "ParallelDocument";
  /** One tree per language. Keyed by BCP-47 lang code. */
  trees: Partial<Record<LangCode, GLOSTRoot>>;
  /** Flat alignment graph. Hierarchy derived from tree containment. */
  alignments: AlignmentEdge[];
  metadata?: ParallelDocumentMetadata;
}
