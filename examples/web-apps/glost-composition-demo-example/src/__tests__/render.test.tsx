/**
 * Render tests for glost-composition-demo-example
 * Tests the HTML output structure and extension composition
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensions } from "glost-plugins";
import type { GLOSTExtension } from "glost-plugins";
import {
  createSimpleWord,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
} from "glost";
import type { GLOSTRoot, GLOSTWord } from "glost";

// Mock extensions from main.ts
const ipaDict: Record<string, string> = {
  hello: "həˈloʊ",
  world: "wɜːrld",
  thank: "θæŋk",
};

const EnglishIPAExtension: GLOSTExtension = {
  id: "en-ipa",
  name: "English IPA Extension",
  visit: {
    word: (node: GLOSTWord) => {
      const textNode = node.children.find((c) => c.type === "TextNode");
      const text = textNode && "value" in textNode ? textNode.value.toLowerCase() : "";
      
      const ipa = ipaDict[text];
      if (ipa) {
        node.extras = node.extras || {};
        node.extras.transcription = { ipa };
      }
    },
  },
};

const EnglishIPAToPhonemicExtension: GLOSTExtension = {
  id: "en-ipa-to-phonemic",
  name: "English IPA to Phonemic Extension",
  visit: {
    word: (node: GLOSTWord) => {
      const transcription = node.extras?.transcription as { ipa: string } | undefined;
      if (!transcription?.ipa) return;
      
      const respelling = transcription.ipa
        .replace(/ə/g, "uh")
        .replace(/ˈ/g, "")
        .replace(/ˌ/g, "")
        .replace(/θ/g, "th");
      
      node.extras = node.extras || {};
      node.extras.respelling = { text: respelling };
    },
  },
};

function textToGLOST(text: string): GLOSTRoot {
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return createDocumentFromParagraphs([], "en-US", "latin");
  }

  const wordNodes = words.map((word) => createSimpleWord({ text: word, transliteration: word }));

  return createDocumentFromParagraphs(
    [createParagraphFromSentences([createSentenceFromWords(wordNodes, "en-US", "latin")])],
    "en-US",
    "latin"
  );
}

function getWordText(word: GLOSTWord): string {
  const textNode = word.children.find((c) => c.type === "TextNode");
  return textNode && "value" in textNode ? textNode.value : "";
}

function renderWord(word: GLOSTWord, showIPA = true, showRespelling = true): string {
  const text = getWordText(word);
  const transcription = word.extras?.transcription as { ipa: string } | undefined;
  const respelling = word.extras?.respelling as { text: string } | undefined;

  let html = `<div class="word"><span class="word-text">${text}</span>`;
  
  if (showIPA && transcription?.ipa) {
    html += `<span class="word-ipa">${transcription.ipa}</span>`;
  }
  
  if (showRespelling && respelling?.text) {
    html += `<span class="word-respelling">${respelling.text}</span>`;
  }
  
  html += `</div>`;
  return html;
}

describe("Composition Demo Render Tests", () => {
  it("should render word with IPA from first extension", () => {
    const document = textToGLOST("hello");
    const result = processGLOSTWithExtensions(document, [EnglishIPAExtension], { lenient: true });

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        const word = sentence.children.find((n) => n.type === "WordNode") as GLOSTWord;
        if (word) {
          const html = renderWord(word, true, false);
          
          expect(html).toContain("hello");
          expect(html).toContain("həˈloʊ");
        }
      }
    }
  });

  it("should render word with both IPA and respelling from composed extensions", () => {
    const document = textToGLOST("hello");
    const result = processGLOSTWithExtensions(
      document,
      [EnglishIPAExtension, EnglishIPAToPhonemicExtension],
      { lenient: true }
    );

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        const word = sentence.children.find((n) => n.type === "WordNode") as GLOSTWord;
        if (word) {
          const html = renderWord(word, true, true);
          
          expect(html).toContain("hello");
          expect(html).toContain("həˈloʊ");
          expect(html).toContain("word-respelling");
        }
      }
    }
  });

  it("should demonstrate extension dependency (respelling requires IPA)", () => {
    const document = textToGLOST("hello");
    
    // Only respelling extension (should not work without IPA)
    const result1 = processGLOSTWithExtensions(
      document,
      [EnglishIPAToPhonemicExtension],
      { lenient: true }
    );

    const paragraph1 = result1.document.children[0];
    if (paragraph1?.type === "ParagraphNode") {
      const sentence1 = paragraph1.children[0];
      if (sentence1?.type === "SentenceNode") {
        const word1 = sentence1.children.find((n) => n.type === "WordNode") as GLOSTWord;
        if (word1) {
          // Should not have respelling without IPA
          expect(word1.extras?.respelling).toBeUndefined();
        }
      }
    }

    // Both extensions (should work)
    const result2 = processGLOSTWithExtensions(
      document,
      [EnglishIPAExtension, EnglishIPAToPhonemicExtension],
      { lenient: true }
    );

    const paragraph2 = result2.document.children[0];
    if (paragraph2?.type === "ParagraphNode") {
      const sentence2 = paragraph2.children[0];
      if (sentence2?.type === "SentenceNode") {
        const word2 = sentence2.children.find((n) => n.type === "WordNode") as GLOSTWord;
        if (word2) {
          // Should have respelling with IPA
          expect(word2.extras?.respelling).toBeDefined();
        }
      }
    }
  });

  it("should match snapshot for composed extensions output", () => {
    const document = textToGLOST("hello world");
    const result = processGLOSTWithExtensions(
      document,
      [EnglishIPAExtension, EnglishIPAToPhonemicExtension],
      { lenient: true }
    );

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        const words = sentence.children.filter((n) => n.type === "WordNode") as GLOSTWord[];
        const html = words.map((w) => renderWord(w, true, true)).join("");
        
        expect(html).toMatchSnapshot();
      }
    }
  });
});
