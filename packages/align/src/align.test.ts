import { describe, expect, it } from "vitest";
import {
  createGLOSTParagraphNode,
  createGLOSTRootNode,
  createGLOSTSentenceNode,
  createGLOSTWordNode,
} from "glost";
import type { GLOSTRoot } from "glost";

import { composeParallelDocument } from "./compose.js";
import { idStamp, idStampPlugin } from "./id-stamp.js";
import { assertStamped } from "./assert.js";
import { flattenAlignedPair } from "./flatten.js";
import {
  parseParallelDocument,
  serializeParallelDocument,
} from "./serialize.js";
import type { AlignmentEdge } from "./types.js";

function buildTree(lang: string, words: string[][]): GLOSTRoot {
  const sentences = words.map((sentenceWords) =>
    createGLOSTSentenceNode({
      originalText: sentenceWords.join(" "),
      lang,
      script: "latin",
      children: sentenceWords.map((w) =>
        createGLOSTWordNode({ value: w, lang, script: "latin" }),
      ),
    }),
  );
  return createGLOSTRootNode({
    lang,
    script: "latin",
    children: [createGLOSTParagraphNode(sentences)],
  });
}

describe("id-stamp", () => {
  it("positional stamps Paragraph/Sentence/Word with deterministic ids", () => {
    const tree = buildTree("en", [["hello", "world"], ["bye"]]);
    idStamp(tree);
    const para = tree.children[0]!;
    const s1 = para.children[0]!;
    expect(para.extras?.id).toBe("p1");
    expect(s1.extras?.id).toBe("p1-s1");
    expect(s1.children[0]!.extras?.id).toBe("p1-s1-w1");
    expect(s1.children[1]!.extras?.id).toBe("p1-s1-w2");
    expect(para.children[1]!.extras?.id).toBe("p1-s2");
  });

  it("positional regenerates the same ids on a re-run", () => {
    const tree = buildTree("en", [["hello", "world"]]);
    idStamp(tree);
    const before = JSON.stringify(tree);
    idStamp(tree);
    expect(JSON.stringify(tree)).toBe(before);
  });

  it("preserve keeps existing ids and only fills gaps", () => {
    const tree = buildTree("en", [["hello", "world"]]);
    const sent = tree.children[0]!.children[0]!;
    sent.extras = { id: "custom-sentence-id" };
    idStamp(tree, { strategy: "preserve" });
    expect(sent.extras.id).toBe("custom-sentence-id");
    expect(tree.children[0]!.extras?.id).toBe("p1");
    expect(sent.children[0]!.extras?.id).toBe("p1-s1-w1");
  });

  it("idStampPlugin produces a transform that stamps the same ids as the standalone fn", () => {
    const treeA = buildTree("en", [["hello", "world"]]);
    const treeB = buildTree("en", [["hello", "world"]]);
    const plugin = idStampPlugin();
    expect(plugin.id).toBe("id-stamp");
    const standalone = idStamp(treeA);
    const viaPlugin = plugin.transform(treeB);
    expect(JSON.stringify(viaPlugin)).toBe(JSON.stringify(standalone));
  });

  it("idStampPlugin honors the preserve strategy option", () => {
    const tree = buildTree("en", [["a"]]);
    tree.children[0]!.children[0]!.extras = { id: "custom" };
    idStampPlugin({ strategy: "preserve" }).transform(tree);
    expect(tree.children[0]!.children[0]!.extras.id).toBe("custom");
  });

  it("throws on duplicate preserved ids", () => {
    const tree = buildTree("en", [["a"], ["b"]]);
    tree.children[0]!.children[0]!.extras = { id: "dup" };
    tree.children[0]!.children[1]!.extras = { id: "dup" };
    expect(() => idStamp(tree, { strategy: "preserve" })).toThrow(/duplicate/);
  });
});

describe("assertStamped", () => {
  it("passes for a fully stamped document", () => {
    const en = idStamp(buildTree("en", [["hi"]]));
    const es = idStamp(buildTree("es", [["hola"]]));
    const doc = composeParallelDocument({ trees: { en, es }, alignments: [] });
    expect(() => assertStamped(doc)).not.toThrow();
  });

  it("throws when a tree is un-stamped", () => {
    const en = buildTree("en", [["hi"]]);
    const doc = composeParallelDocument({ trees: { en }, alignments: [] });
    expect(() => assertStamped(doc)).toThrow(/un-stamped/);
  });
});

describe("flattenAlignedPair", () => {
  it("collects text from both sides of a sentence-level edge", () => {
    const en = idStamp(buildTree("en", [["hello", "world"]]));
    const es = idStamp(buildTree("es", [["hola", "mundo"]]));
    const edge: AlignmentEdge = {
      id: "e1",
      level: "sentence",
      refs: {
        en: [{ lang: "en", id: "p1-s1" }],
        es: [{ lang: "es", id: "p1-s1" }],
      },
      source: "en",
    };
    const doc = composeParallelDocument({
      trees: { en, es },
      alignments: [edge],
    });
    const pair = flattenAlignedPair(doc, "e1", {
      sourceLang: "en",
      targetLang: "es",
    });
    expect(pair.source).toBe("helloworld");
    expect(pair.target).toBe("holamundo");
  });

  it("collects across multiple word refs at word level", () => {
    const en = idStamp(buildTree("en", [["a", "b", "c"]]));
    const fr = idStamp(buildTree("fr", [["x", "y"]]));
    const edge: AlignmentEdge = {
      id: "w1",
      level: "word",
      refs: {
        en: [
          { lang: "en", id: "p1-s1-w1" },
          { lang: "en", id: "p1-s1-w2" },
        ],
        fr: [{ lang: "fr", id: "p1-s1-w1" }],
      },
    };
    const doc = composeParallelDocument({
      trees: { en, fr },
      alignments: [edge],
    });
    const pair = flattenAlignedPair(doc, "w1", {
      sourceLang: "en",
      targetLang: "fr",
    });
    expect(pair.source).toBe("a b");
    expect(pair.target).toBe("x");
  });

  it("returns empty string for missing target translation (asymmetric coverage)", () => {
    const en = idStamp(buildTree("en", [["hello"]]));
    const es = idStamp(buildTree("es", [[]]));
    const edge: AlignmentEdge = {
      id: "e1",
      level: "sentence",
      refs: {
        en: [{ lang: "en", id: "p1-s1" }],
      },
      source: "en",
    };
    const doc = composeParallelDocument({
      trees: { en, es },
      alignments: [edge],
    });
    const pair = flattenAlignedPair(doc, "e1", {
      sourceLang: "en",
      targetLang: "es",
    });
    expect(pair.source).toBe("hello");
    expect(pair.target).toBe("");
  });
});

describe("serialize/parse", () => {
  it("round-trips a ParallelDocument through JSON", () => {
    const en = idStamp(buildTree("en", [["hi"]]));
    const es = idStamp(buildTree("es", [["hola"]]));
    const doc = composeParallelDocument({
      trees: { en, es },
      alignments: [
        {
          id: "e1",
          level: "sentence",
          refs: {
            en: [{ lang: "en", id: "p1-s1" }],
            es: [{ lang: "es", id: "p1-s1" }],
          },
          source: "en",
          confidence: "high",
          provenance: { kind: "manual" },
        },
      ],
      metadata: { title: "test", status: "complete" },
    });
    const json = serializeParallelDocument(doc);
    const parsed = parseParallelDocument(json);
    expect(parsed).toEqual(doc);
  });

  it("parseParallelDocument throws on malformed input", () => {
    expect(() => parseParallelDocument("{}")).toThrow(/not a ParallelDocument/);
  });
});
