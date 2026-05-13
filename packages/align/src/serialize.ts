import type { ParallelDocument } from "./types.js";
import { isParallelDocument } from "./guards.js";

/**
 * Canonical wire format: serialize a `ParallelDocument` to JSON.
 *
 * Trees are inlined (per Q2). The document is round-trip safe — `parseParallelDocument`
 * on the output reproduces the input.
 */
export function serializeParallelDocument(
  doc: ParallelDocument,
  options: { pretty?: boolean } = {},
): string {
  return JSON.stringify(doc, null, options.pretty ? 2 : 0);
}

/**
 * Parse a `ParallelDocument` from JSON, validating the top-level shape.
 *
 * Does *not* run `assertStamped` — call that separately if you need the
 * id-stamp invariant. Does *not* validate every edge's refs against the trees;
 * that's `resolveRef`'s job at lookup time.
 */
export function parseParallelDocument(input: string): ParallelDocument {
  const value: unknown = JSON.parse(input);
  if (!isParallelDocument(value)) {
    throw new Error(
      "glost-align: parsed value is not a ParallelDocument (missing type/trees/alignments)",
    );
  }
  return value;
}
