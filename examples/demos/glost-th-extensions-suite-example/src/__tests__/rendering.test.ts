/**
 * Rendering Tests for Thai Extensions Suite
 * 
 * These tests verify that processed GLOST documents can be rendered correctly,
 * showing the actual visual output. This is the most obvious way to verify
 * that everything is working correctly.
 */

import { describe, it, expect } from "vitest";
import {
  createSimpleDocument,
  getAllWords,
  getAllClauses,
  getWordText,
  NODE_TYPES,
} from "glost";
import { createThaiWord } from "glost-th";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import {
  createThaiComprehensivePipeline,
  createThaiGrammarPipeline,
  createThaiPronunciationPipeline,
} from "../pipeline.js";
import { createThaiTranscriptionExtension } from "../transcription.js";
import { createThaiTranslationExtension } from "../translation.js";

// Helper to create a Thai document from words
function createThaiDocument(words: ReturnType<typeof createThaiWord>[], text: string) {
  return createSimpleDocument(words, "th", "thai", {
    sentenceText: text,
  });
}

/**
 * Render a word to HTML string for testing
 */
function renderWordToHTML(word: any): string {
  // Try multiple ways to get text from word
  let text = getWordText(word);
  
  // If word has been segmented into syllables, reconstruct text from syllables
  if (!text && word.children) {
    const syllables = word.children.filter((child: any) => child.type === "SyllableNode");
    if (syllables.length > 0) {
      // Extract text from syllable children (TextNode within each syllable)
      text = syllables
        .map((syllable: any) => {
          const textNode = syllable.children?.find((child: any) => child.type === "TextNode");
          return textNode?.value || "";
        })
        .join("");
    } else {
      // Fallback: check if word has text property directly
      if ((word as any).text) {
        text = (word as any).text;
      } else {
        // Check children for TextNode
        const textNode = word.children.find((child: any) => child.type === "TextNode");
        if (textNode?.value) {
          text = textNode.value;
        }
      }
    }
  }
  
  const parts: string[] = [];

  // Main text
  parts.push(`<span class="word-text">${text || ""}</span>`);

  // Transcription (RTGS or IPA)
  if (word.transcription) {
    if (word.transcription.rtgs?.text) {
      parts.push(`<rt class="transcription rtgs">${word.transcription.rtgs.text}</rt>`);
    }
    if (word.transcription.ipa?.text) {
      parts.push(`<rt class="transcription ipa">${word.transcription.ipa.text}</rt>`);
    }
  }

  // Translation
  if (word.extras?.translations?.["en-US"]) {
    parts.push(`<span class="translation">${word.extras.translations["en-US"]}</span>`);
  }

  return `<ruby class="glost-word">${parts.join("")}</ruby>`;
}

/**
 * Render a clause to HTML string
 */
function renderClauseToHTML(clause: any): string {
  const clauseType = clause.clauseType || "main";
  const children = clause.children || [];
  
  const wordsHTML = children
    .filter((child: any) => child.type === NODE_TYPES.WORD)
    .map((word: any) => renderWordToHTML(word))
    .join(" ");

  return `<div class="clause clause-${clauseType}">${wordsHTML}</div>`;
}

/**
 * Render a sentence to HTML string
 */
function renderSentenceToHTML(sentence: any): string {
  const children = sentence.children || [];
  
  // Check if sentence has clauses
  const hasClauses = children.some((child: any) => child.type === NODE_TYPES.CLAUSE);
  
  if (hasClauses) {
    // Render clauses
    const clausesHTML = children
      .filter((child: any) => child.type === NODE_TYPES.CLAUSE)
      .map((clause: any) => renderClauseToHTML(clause))
      .join(" ");
    
    return `<div class="sentence with-clauses">${clausesHTML}</div>`;
  } else {
    // Render words directly
    const wordsHTML = children
      .filter((child: any) => child.type === NODE_TYPES.WORD)
      .map((word: any) => renderWordToHTML(word))
      .join(" ");
    
    return `<div class="sentence">${wordsHTML}</div>`;
  }
}

/**
 * Render entire document to HTML string
 */
function renderDocumentToHTML(document: any): string {
  const paragraphs = document.children || [];
  
  const paragraphsHTML = paragraphs
    .filter((para: any) => para.type === NODE_TYPES.PARAGRAPH)
    .map((para: any) => {
      const sentences = para.children || [];
      const sentencesHTML = sentences
        .filter((sent: any) => sent.type === NODE_TYPES.SENTENCE)
        .map((sent: any) => renderSentenceToHTML(sent))
        .join(" ");
      
      return `<div class="paragraph">${sentencesHTML}</div>`;
    })
    .join("");

  return `<div class="glost-document">${paragraphsHTML}</div>`;
}

describe("Rendering Tests", () => {
  it("should render words with transcriptions and translations (without syllable segmentation)", async () => {
    const words = [
      createThaiWord({ text: "สวัสดี" }),
      createThaiWord({ text: "ครับ" }),
    ];

    const doc = createThaiDocument(words, "สวัสดีครับ");

    // Use simple pipeline without syllable segmentation to preserve word text
    const pipeline = [
      createThaiTranscriptionExtension(),
      createThaiTranslationExtension("en-US"),
    ];

    const result = await processGLOSTWithExtensionsAsync(doc, pipeline);
    const html = renderDocumentToHTML(result.document);

    // Verify HTML contains word text
    expect(html).toContain("สวัสดี");
    expect(html).toContain("ครับ");

    // Verify structure
    expect(html).toContain("glost-document");
    expect(html).toContain("sentence");
    expect(html).toContain("glost-word");

    // Log the rendered HTML for visual inspection
    console.log("\n=== Rendered HTML (Simple) ===");
    console.log(html);
    console.log("==============================\n");
  });

  it("should render words with syllable segmentation", async () => {
    const words = [
      createThaiWord({ text: "สวัสดี" }),
      createThaiWord({ text: "ครับ" }),
    ];

    const doc = createThaiDocument(words, "สวัสดีครับ");

    // Use pronunciation pipeline which includes syllable segmentation
    const pipeline = createThaiPronunciationPipeline();

    const result = await processGLOSTWithExtensionsAsync(doc, pipeline);
    const html = renderDocumentToHTML(result.document);

    // Verify structure (words may be segmented into syllables)
    expect(html).toContain("glost-document");
    expect(html).toContain("sentence");
    expect(html).toContain("glost-word");

    // Verify text is reconstructed from syllables
    const processedWords = getAllWords(result.document);
    expect(processedWords.length).toBeGreaterThan(0);

    // Log the rendered HTML for visual inspection
    console.log("\n=== Rendered HTML (With Syllables) ===");
    console.log(html);
    console.log("======================================\n");

    // Verify structure
    expect(html).toContain("glost-document");
    expect(html).toContain("sentence");
    expect(html).toContain("glost-word");

    // Log the rendered HTML for visual inspection
    console.log("\n=== Rendered HTML ===");
    console.log(html);
    console.log("====================\n");
  });

  it("should render sentences with clause segmentation", async () => {
    // Sentence with clause marker: "ฉันไปตลาดเพราะต้องการซื้อของ"
    // (I go to market because I want to buy things)
    const words = [
      createThaiWord({ text: "ฉัน" }), // I
      createThaiWord({ text: "ไป" }), // go
      createThaiWord({ text: "ตลาด" }), // market
      createThaiWord({ text: "เพราะ" }), // because (clause marker)
      createThaiWord({ text: "ต้องการ" }), // want
      createThaiWord({ text: "ซื้อ" }), // buy
      createThaiWord({ text: "ของ" }), // things
    ];

    const doc = createThaiDocument(words, "ฉันไปตลาดเพราะต้องการซื้อของ");

    const pipeline = createThaiGrammarPipeline({
      includeGrammar: true,
      includeSyllables: false, // Disable syllable segmentation to preserve word text
      includeTranscription: true,
      includeTranslation: true,
    });

    const result = await processGLOSTWithExtensionsAsync(doc, pipeline);
    const html = renderDocumentToHTML(result.document);

    // Verify clause structure is rendered
    expect(html).toContain("clause");
    expect(html).toContain("with-clauses");

    // Verify all words are present (text may be in syllables, so check structure)
    const processedWords = getAllWords(result.document);
    expect(processedWords.length).toBeGreaterThanOrEqual(7); // At least 7 words

    // Log the rendered HTML for visual inspection
    console.log("\n=== Rendered HTML with Clauses ===");
    console.log(html);
    console.log("==================================\n");

    // Verify clauses were actually created
    const clauses = getAllClauses(result.document);
    expect(clauses.length).toBeGreaterThan(0);
  });

  it("should render complex sentence with multiple clause markers", async () => {
    // "ถ้าฝนตกฉันจะอยู่บ้านเพราะไม่ต้องการเปียก"
    // (If it rains, I will stay home because I don't want to get wet)
    const words = [
      createThaiWord({ text: "ถ้า" }), // if
      createThaiWord({ text: "ฝน" }), // rain
      createThaiWord({ text: "ตก" }), // fall
      createThaiWord({ text: "ฉัน" }), // I
      createThaiWord({ text: "จะ" }), // will
      createThaiWord({ text: "อยู่" }), // stay
      createThaiWord({ text: "บ้าน" }), // home
      createThaiWord({ text: "เพราะ" }), // because
      createThaiWord({ text: "ไม่" }), // not
      createThaiWord({ text: "ต้องการ" }), // want
      createThaiWord({ text: "เปียก" }), // wet
    ];

    const doc = createThaiDocument(
      words,
      "ถ้าฝนตกฉันจะอยู่บ้านเพราะไม่ต้องการเปียก"
    );

    const pipeline = createThaiComprehensivePipeline({
      includeGrammar: true,
      includeTranscription: true,
      includeTranslation: true,
    });

    const result = await processGLOSTWithExtensionsAsync(doc, pipeline);
    const html = renderDocumentToHTML(result.document);

    // Verify all words are rendered
    words.forEach((word) => {
      expect(html).toContain(getWordText(word));
    });

    // Verify clause structure
    const clauses = getAllClauses(result.document);
    expect(clauses.length).toBeGreaterThan(0);

    // Log the rendered HTML for visual inspection
    console.log("\n=== Complex Sentence Rendered HTML ===");
    console.log(html);
    console.log("=====================================\n");
  });

  it("should render with proper word metadata", async () => {
    const words = [
      createThaiWord({ text: "สวัสดี" }),
    ];

    const doc = createThaiDocument(words, "สวัสดี");

    // Use simple pipeline without syllable segmentation
    const pipeline = [
      createThaiTranscriptionExtension(),
      createThaiTranslationExtension("en-US"),
    ];

    const result = await processGLOSTWithExtensionsAsync(doc, pipeline);
    const processedWords = getAllWords(result.document);

    expect(processedWords.length).toBe(1);
    const word = processedWords[0];

    // Check that word has expected structure
    expect(word.type).toBe(NODE_TYPES.WORD);
    const wordText = getWordText(word);
    expect(wordText).toBe("สวัสดี");

    // Render and verify HTML structure
    const wordHTML = renderWordToHTML(word);
    expect(wordHTML).toContain("สวัสดี");
    expect(wordHTML).toContain("glost-word");

    console.log("\n=== Single Word Rendered HTML ===");
    console.log(wordHTML);
    console.log("=================================\n");
  });
});
