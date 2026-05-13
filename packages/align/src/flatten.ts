import type { LangCode, ParallelDocument } from "./types.js";
import { buildNodeIndex, getEdgeById } from "./walk.js";

export interface FlattenedPair {
  source: string;
  target: string;
}

export interface FlattenOptions {
  sourceLang: LangCode;
  targetLang: LangCode;
  /** Joiner between multiple words/sentences in the same edge ref. Defaults to " ". */
  joiner?: string;
}

/**
 * Reduce a single edge to the flat `{ source, target }` shape that legacy
 * consumers expect (see ADR-0006).
 *
 * Concatenates the textual content of every node referenced by the edge in the
 * given source/target languages, joined by `joiner`.
 *
 * Throws if the edge or its refs can't be resolved.
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

function textOf(node: {
  children?: unknown[];
  originalText?: string;
}): string {
  const children = node.children;
  if (Array.isArray(children) && children.length > 0) {
    let out = "";
    for (const child of children as Array<{
      type?: string;
      value?: string;
      children?: unknown[];
    }>) {
      if (typeof child.value === "string") {
        out += child.value;
      } else if (Array.isArray(child.children)) {
        out += textOf(child);
      }
    }
    if (out.length > 0) return out;
  }
  // Fallback: leaf-shaped sentences carry their text in `originalText`
  // when not word-tokenized (sentence-level alignment without word breakdown).
  if (typeof node.originalText === "string") return node.originalText;
  return "";
}
