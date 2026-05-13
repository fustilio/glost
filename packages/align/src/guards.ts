import type { AlignmentEdge, ParallelDocument } from "./types.js";

export function isParallelDocument(value: unknown): value is ParallelDocument {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { type?: unknown }).type === "ParallelDocument" &&
    typeof (value as { trees?: unknown }).trees === "object" &&
    Array.isArray((value as { alignments?: unknown }).alignments)
  );
}

export function isAlignmentEdge(value: unknown): value is AlignmentEdge {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Partial<AlignmentEdge>;
  return (
    typeof v.id === "string" &&
    typeof v.level === "string" &&
    typeof v.refs === "object" &&
    v.refs !== null
  );
}
