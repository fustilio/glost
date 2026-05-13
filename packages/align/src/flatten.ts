import { toString as nlcstToString } from "nlcst-to-string";

import type { LangCode, ParallelDocument } from "./types.js";
import { buildNodeIndex, getEdgeById } from "./walk.js";

export interface FlattenedPair {
  source: string;
  target: string;
}

export interface FlattenOptions {
  sourceLang: LangCode;
  targetLang: LangCode;
  /** Joiner between multiple node refs in the same edge. Defaults to " ". */
  joiner?: string;
}

/**
 * Reduce a single edge to the flat `{ source, target }` shape that legacy
 * consumers expect (see ADR-0006 in glost).
 *
 * For each side, joins the textual content of every referenced node using
 * `nlcst-to-string` (which correctly handles Word/Punctuation/WhiteSpace/Symbol
 * leaves). Falls back to a node's `originalText` for leaf-shaped Sentence
 * nodes that have no Word children (sentence-level alignment without
 * tokenization).
 *
 * Throws if the edge can't be found. Missing tree refs collapse to "".
 */
export function flattenAlignedPair(
  doc: ParallelDocument,
  edgeId: string,
  options: FlattenOptions,
): FlattenedPair {
  const edge = getEdgeById(doc, edgeId);
  if (!edge) {
    throw new Error(`glost-align: no edge with id '${edgeId}'`);
  }
  const index = buildNodeIndex(doc);
  const joiner = options.joiner ?? " ";
  return {
    source: collect(edge.refs[options.sourceLang], index, options.sourceLang, joiner),
    target: collect(edge.refs[options.targetLang], index, options.targetLang, joiner),
  };
}

function collect(
  refs:
    | { lang: LangCode; id: string }[]
    | undefined,
  index: ReturnType<typeof buildNodeIndex>,
  lang: LangCode,
  joiner: string,
): string {
  if (!refs || refs.length === 0) return "";
  const tree = index.get(lang);
  if (!tree) return "";
  const parts: string[] = [];
  for (const ref of refs) {
    const node = tree.get(ref.id);
    if (!node) continue;
    parts.push(textOf(node));
  }
  return parts.join(joiner);
}

/**
 * Extract text from a GLOST/NLCST node.
 *
 * Delegates to `nlcst-to-string` for word/punctuation/whitespace/symbol
 * leaves. Falls back to a Sentence's `originalText` when the node has no
 * children (leaf-shaped sentence used for sentence-level alignment).
 */
function textOf(node: unknown): string {
  const n = node as {
    children?: unknown[];
    originalText?: string;
  };
  if (Array.isArray(n.children) && n.children.length > 0) {
    const out = nlcstToString(n as never);
    if (out.length > 0) return out;
  }
  if (typeof n.originalText === "string") return n.originalText;
  return "";
}
