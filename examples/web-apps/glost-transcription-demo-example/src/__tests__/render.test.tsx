/**
 * Render tests for glost-transcription-demo-example
 * Tests the HTML output structure
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

function renderWord(word: GLOSTWord, showIPA = true): string {
  const text = getWordText(word);
  const transcription = word.extras?.transcription as { ipa: string } | undefined;

  let html = `<div class="word"><span class="word-text">${text}</span>`;
  
  if (showIPA && transcription?.ipa) {
    html += `<span class="word-ipa">${transcription.ipa}</span>`;
  }
  
  html += `</div>`;
  return html;
}

describe("Transcription Demo Render Tests", () => {
  it("should render word with IPA transcription", () => {
    const document = textToGLOST("hello");
    const result = processGLOSTWithExtensions(document, [EnglishIPAExtension], { lenient: true });

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        const word = sentence.children.find((n) => n.type === "WordNode") as GLOSTWord;
        if (word) {
          const html = renderWord(word, true);
          
          expect(html).toContain("hello");
          expect(html).toContain("həˈloʊ");
          expect(html).toContain("word-text");
          expect(html).toContain("word-ipa");
        }
      }
    }
  });

  it("should render multiple words", () => {
    const document = textToGLOST("hello world");
    const result = processGLOSTWithExtensions(document, [EnglishIPAExtension], { lenient: true });

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        const words = sentence.children.filter((n) => n.type === "WordNode") as GLOSTWord[];
        
        expect(words.length).toBe(2);
        
        const html1 = renderWord(words[0], true);
        const html2 = renderWord(words[1], true);
        
        expect(html1).toContain("hello");
        expect(html2).toContain("world");
      }
    }
  });

  it("should handle words without IPA gracefully", () => {
    const document = textToGLOST("unknownword");
    const result = processGLOSTWithExtensions(document, [EnglishIPAExtension], { lenient: true });

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        const word = sentence.children.find((n) => n.type === "WordNode") as GLOSTWord;
        if (word) {
          const html = renderWord(word, true);
          
          expect(html).toContain("unknownword");
          expect(html).not.toContain("word-ipa");
        }
      }
    }
  });

  it("should match snapshot for rendered output", () => {
    const document = textToGLOST("hello world");
    const result = processGLOSTWithExtensions(document, [EnglishIPAExtension], { lenient: true });

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        const words = sentence.children.filter((n) => n.type === "WordNode") as GLOSTWord[];
        const html = words.map((w) => renderWord(w, true)).join("");
        
        expect(html).toMatchSnapshot();
      }
    }
  });
});
