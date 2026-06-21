import type { GLOSTRoot } from "@glotblocks/glost";
import type { ParallelDocument } from "./types.js";
import { nodeId, walkAlignable } from "./walk.js";

/**
 * Assert that every alignable node in every tree of `doc` carries a stamped
 * `extras.id`, and that ids are unique within each tree.
 *
 * `@glotblocks/glost-align` requires this invariant before resolving any edge — see ADRs
 * 0003 and 0005. Callers typically run this once after composing a document.
 *
 * Throws on the first violation with a message naming the offending tree.
 */
export function assertStamped(doc: ParallelDocument): void {
  for (const [lang, tree] of Object.entries(doc.trees)) {
    if (!tree) continue;
    assertTreeStamped(tree, lang);
  }
}

export function assertTreeStamped(tree: GLOSTRoot, lang: string): void {
  const seen = new Set<string>();
  walkAlignable(tree, (node) => {
    const id = nodeId(node);
    if (id === undefined) {
      throw new Error(
        `glost-align: ${lang} tree has un-stamped ${node.type} — run id-stamp before alignment`,
      );
    }
    if (seen.has(id)) {
      throw new Error(
        `glost-align: ${lang} tree has duplicate id '${id}' — id-stamp invariant violated`,
      );
    }
    seen.add(id);
  });
}
