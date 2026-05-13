import type {
  GLOSTParagraph,
  GLOSTRoot,
  GLOSTSentence,
  GLOSTWord,
} from "glost";
import type {
  AlignmentEdge,
  AlignmentLevel,
  LangCode,
  NodeRef,
  ParallelDocument,
} from "./types.js";

type AlignableNode = GLOSTParagraph | GLOSTSentence | GLOSTWord;

/**
 * Build a `lang -> id -> node` lookup table for fast `NodeRef` resolution.
 *
 * Constructed once per query session; not persisted on the document since the
 * trees may be re-stamped.
 */
export function buildNodeIndex(
  doc: ParallelDocument,
): Map<LangCode, Map<string, AlignableNode>> {
  const out = new Map<LangCode, Map<string, AlignableNode>>();
  for (const [lang, root] of Object.entries(doc.trees)) {
    if (!root) continue;
    const inner = new Map<string, AlignableNode>();
    walkAlignable(root, (node) => {
      const id = nodeId(node);
      if (id !== undefined) inner.set(id, node);
    });
    out.set(lang, inner);
  }
  return out;
}

/**
 * Visit every alignable node (Paragraph, Sentence, Word) in a tree.
 *
 * Skips Text/Punctuation/WhiteSpace/Symbol — leaves under Word with no
 * independent identity (per Q13.1).
 */
export function walkAlignable(
  root: GLOSTRoot,
  visit: (node: AlignableNode) => void,
): void {
  for (const child of root.children ?? []) {
    if (child.type !== "ParagraphNode") continue;
    const para = child as GLOSTParagraph;
    visit(para);
    for (const sent of para.children ?? []) {
      if (sent.type !== "SentenceNode") continue;
      const sentence = sent as GLOSTSentence;
      visit(sentence);
      for (const c of sentence.children ?? []) {
        if (c.type === "WordNode") visit(c);
      }
    }
  }
}

/**
 * Read the stamped id from a node, if present.
 */
export function nodeId(node: AlignableNode): string | undefined {
  const id = node.extras?.id;
  return typeof id === "string" ? id : undefined;
}

/**
 * Resolve a `NodeRef` to an actual node, throwing if it can't be found.
 *
 * Use the index variant for hot paths; this is convenient for one-shot lookups.
 */
export function resolveRef(
  doc: ParallelDocument,
  ref: NodeRef,
  index?: Map<LangCode, Map<string, AlignableNode>>,
): AlignableNode {
  const idx = index ?? buildNodeIndex(doc);
  const tree = idx.get(ref.lang);
  if (!tree) {
    throw new Error(
      `glost-align: no tree for lang '${ref.lang}' in ParallelDocument`,
    );
  }
  const node = tree.get(ref.id);
  if (!node) {
    throw new Error(
      `glost-align: no node with id '${ref.id}' in ${ref.lang} tree`,
    );
  }
  return node;
}

/**
 * Find the edge with the given id, or undefined.
 */
export function getEdgeById(
  doc: ParallelDocument,
  edgeId: string,
): AlignmentEdge | undefined {
  return doc.alignments.find((e) => e.id === edgeId);
}

/**
 * Find every edge that references a given node.
 *
 * Linear in `doc.alignments`. For repeated queries, consider caching by
 * (lang, id) → edges externally.
 */
export function getEdgesForNode(
  doc: ParallelDocument,
  ref: NodeRef,
  level?: AlignmentLevel,
): AlignmentEdge[] {
  return doc.alignments.filter((edge) => {
    if (level !== undefined && edge.level !== level) return false;
    const refs = edge.refs[ref.lang];
    return refs?.some((r) => r.id === ref.id) ?? false;
  });
}
