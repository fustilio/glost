/**
 * Render tests for glost-thai-extensions-demo
 * Tests the HTML output structure for Thai extensions
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import { createTestDocument, createThaiTestWord } from "../../../../../demos/glost-th-extensions-suite-example/src/test-helpers.js";
import { getAllWords } from "glost";
// Import from the demo extensions suite
import { createThaiTranscriptionExtension, createThaiTranslationExtension } from "../../../../demos/glost-th-extensions-suite-example/src/index.js";

function renderWordToHTML(word: any, transcriptionScheme = "rtgs", showTranscription = true, showTranslation = true): string {
  const text = word.children?.[0]?.value || "";
  const transcription = word.transcription?.[transcriptionScheme]?.text;
  const translation = word.extras?.translations?.["en-US"] || word.extras?.translations?.["en"];

  let html = `<span class="ruby-container"`;
  if (translation && showTranslation) {
    html += ` title="${translation}"`;
  }
  html += `>`;

  if (transcription && showTranscription) {
    html += `<span class="ruby-annotation">${transcription}</span>`;
  }
  
  html += `<span class="ruby-base">${text}</span>`;

  if (translation && showTranslation) {
    html += `<span class="translation">${translation}</span>`;
  }

  html += `</span>`;
  return html;
}

describe("Thai Extensions Demo Render Tests", () => {
  it("should render Thai word with transcription", async () => {
    const words = [createThaiTestWord("สวัสดี")];
    const document = createTestDocument(words, "th", "thai", "สวัสดี");

    const extensions = [createThaiTranscriptionExtension()];
    const result = await processGLOSTWithExtensionsAsync(document, extensions);

    const processedWords = getAllWords(result.document);
    expect(processedWords.length).toBeGreaterThan(0);

    const word = processedWords[0];
    const html = renderWordToHTML(word, "rtgs", true, false);

    expect(html).toContain("สวัสดี");
    expect(html).toContain("ruby-container");
    expect(html).toContain("ruby-base");
  });

  it("should render Thai word with translation", async () => {
    const words = [createThaiTestWord("สวัสดี")];
    const document = createTestDocument(words, "th", "thai", "สวัสดี");

    const extensions = [createThaiTranslationExtension("en-US")];
    const result = await processGLOSTWithExtensionsAsync(document, extensions);

    const processedWords = getAllWords(result.document);
    const word = processedWords[0];
    const html = renderWordToHTML(word, "rtgs", false, true);

    expect(html).toContain("สวัสดี");
    expect(html).toContain("ruby-container");
  });

  it("should render Thai word with both transcription and translation", async () => {
    const words = [createThaiTestWord("สวัสดี")];
    const document = createTestDocument(words, "th", "thai", "สวัสดี");

    const extensions = [
      createThaiTranscriptionExtension(),
      createThaiTranslationExtension("en-US"),
    ];
    const result = await processGLOSTWithExtensionsAsync(document, extensions);

    const processedWords = getAllWords(result.document);
    const word = processedWords[0];
    const html = renderWordToHTML(word, "rtgs", true, true);

    expect(html).toContain("สวัสดี");
    expect(html).toContain("ruby-container");
    expect(html).toContain("ruby-base");
  });

  it("should render multiple Thai words", async () => {
    const words = [
      createThaiTestWord("สวัสดี"),
      createThaiTestWord("ครับ"),
    ];
    const document = createTestDocument(words, "th", "thai", "สวัสดีครับ");

    const extensions = [
      createThaiTranscriptionExtension(),
      createThaiTranslationExtension("en-US"),
    ];
    const result = await processGLOSTWithExtensionsAsync(document, extensions);

    const processedWords = getAllWords(result.document);
    expect(processedWords.length).toBe(2);

    const html = processedWords.map((w) => renderWordToHTML(w, "rtgs", true, true)).join(" ");

    expect(html).toContain("สวัสดี");
    expect(html).toContain("ครับ");
  });

  it("should match snapshot for rendered Thai output", async () => {
    const words = [createThaiTestWord("สวัสดี")];
    const document = createTestDocument(words, "th", "thai", "สวัสดี");

    const extensions = [
      createThaiTranscriptionExtension(),
      createThaiTranslationExtension("en-US"),
    ];
    const result = await processGLOSTWithExtensionsAsync(document, extensions);

    const processedWords = getAllWords(result.document);
    const html = processedWords.map((w) => renderWordToHTML(w, "rtgs", true, true)).join(" ");

    expect(html).toMatchSnapshot();
  });
});
