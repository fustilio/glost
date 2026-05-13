import type { GLOSTRoot } from "glost";
import type {
  AlignmentEdge,
  LangCode,
  ParallelDocument,
  ParallelDocumentMetadata,
} from "./types.js";

export interface ComposeParallelDocumentInput {
  trees: Partial<Record<LangCode, GLOSTRoot>>;
  alignments?: AlignmentEdge[];
  metadata?: ParallelDocumentMetadata;
}

/**
 * Assembly seam for `ParallelDocument`.
 *
 * Loaders (read .md, read .ts arrays, read .json) are the consumer's concern;
 * this helper takes already-loaded trees + edges and produces the canonical
 * runtime shape. See ADR-0001.
 */
export function composeParallelDocument(
  input: ComposeParallelDocumentInput,
): ParallelDocument {
  return {
    type: "ParallelDocument",
    trees: input.trees,
    alignments: input.alignments ?? [],
    metadata: input.metadata,
  };
}
