/**
 * `id-stamp` — write deterministic ids onto alignable nodes (Paragraph, Sentence, Word).
 *
 * Hard prerequisite of `@glotblocks/glost-align`. See ADR-0005 for strategy rationale.
 *
 * Two strategies ship today:
 *   - `positional`: overwrite unconditionally with `p{N}-s{N}-w{N}` from tree position.
 *     Default for generated/parsed content where regeneration is exact.
 *   - `preserve`: keep existing `extras.id`, fill gaps positionally. Default for
 *     authored content where ids are pinned by an external source-of-truth
 *     (sidecar JSON, in-source markers) and a separate Hydrate step has run first.
 *
 * Bootstrap (attaching ids from sidecars before this plugin runs) is the
 * consumer's concern — varies per source format.
 */

import type {
  GLOSTParagraph,
  GLOSTRoot,
  GLOSTSentence,
  GLOSTWord,
} from "@glotblocks/glost";

export type IdStampStrategy = "positional" | "preserve";

export interface IdStampOptions {
  /** Default `positional`. */
  strategy?: IdStampStrategy;
}

/**
 * Stamp every Paragraph/Sentence/Word in `tree` with `extras.id`.
 *
 * Mutates the tree in place and returns it for chaining. Idempotent under the
 * same strategy: `positional` regenerates; `preserve` only fills gaps.
 *
 * Asserts uniqueness within the tree at the end.
 */
export function idStamp(
  tree: GLOSTRoot,
  options: IdStampOptions = {},
): GLOSTRoot {
  const strategy = options.strategy ?? "positional";
  const seen = new Set<string>();

  const paragraphs = (tree.children ?? []).filter(
    (c): c is GLOSTParagraph => c.type === "ParagraphNode",
  );
  paragraphs.forEach((para, pIdx) => {
    stampNode(para, `p${pIdx + 1}`, strategy, seen);
    const sentences = (para.children ?? []).filter(
      (c): c is GLOSTSentence => c.type === "SentenceNode",
    );
    sentences.forEach((sent, sIdx) => {
      stampNode(sent, `p${pIdx + 1}-s${sIdx + 1}`, strategy, seen);
      const children = sent.children ?? [];
      let wIdx = 0;
      for (const child of children) {
        if (child.type === "WordNode") {
          wIdx += 1;
          stampNode(child, `p${pIdx + 1}-s${sIdx + 1}-w${wIdx}`, strategy, seen);
        }
      }
    });
  });

  return tree;
}

/**
 * Processor-plugin wrapper around `idStamp`.
 *
 * Lets `id-stamp` compose into a `glost().use(...)` pipeline alongside other
 * extensions instead of being invoked imperatively. Other glost-align
 * extensions can declare `requires: ["id-stamp"]` to enforce ordering.
 *
 * @example
 * ```ts
 * import { glost } from "@glotblocks/glost";
 * import { idStampPlugin } from "@glotblocks/glost-align/id-stamp";
 *
 * const processor = glost()
 *   .use(idStampPlugin, { strategy: "preserve" })
 *   .freeze();
 *
 * const result = await processor.process(document);
 * ```
 */
export function idStampPlugin(options: IdStampOptions = {}) {
  return {
    id: "id-stamp",
    name: "ID Stamp",
    description:
      "Writes deterministic ids onto Paragraph/Sentence/Word nodes. Hard prerequisite of glost-align.",
    transform: (tree: GLOSTRoot) => idStamp(tree, options),
  };
}

function stampNode(
  node: GLOSTParagraph | GLOSTSentence | GLOSTWord,
  positionalId: string,
  strategy: IdStampStrategy,
  seen: Set<string>,
): void {
  const extras = (node.extras ??= {});
  const existing = typeof extras.id === "string" ? extras.id : undefined;

  let id: string;
  if (strategy === "preserve" && existing !== undefined) {
    id = existing;
  } else {
    id = positionalId;
    extras.id = id;
  }

  if (seen.has(id)) {
    throw new Error(
      `id-stamp: duplicate id '${id}' — preserve strategy received colliding pre-existing ids`,
    );
  }
  seen.add(id);
}
