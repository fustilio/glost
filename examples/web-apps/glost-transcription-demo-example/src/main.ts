/**
 * GLOST Transcription Demo
 *
 * Demonstrates extension composition using inline extensions:
 * - EnglishIPAExtension (adds IPA)
 * - EnglishIPAToPhonemicExtension (converts IPA to user-friendly format)
 * 
 * NOTE: For a more comprehensive demo, see examples/composition-demo
 */

import { processGLOSTWithExtensions } from "glost-plugins";
import type { GLOSTExtension } from "glost-plugins";
import {
  createSimpleWord,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
} from "glost";
import type { GLOSTRoot, GLOSTWord } from "glost";

// Simple IPA dictionary for demo
const ipaDict: Record<string, string> = {
  hello: "həˈloʊ",
  world: "wɜːrld",
  goodbye: "ˌɡʊdˈbaɪ",
  thank: "θæŋk",
  you: "juː",
  please: "pliːz",
  sorry: "ˈsɒri",
  yes: "jɛs",
  no: "noʊ",
  water: "ˈwɔːtər",
};

// Extension 1: Add IPA transcription
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

// Extension 2: Convert IPA to phonemic respelling
const EnglishIPAToPhonemicExtension: GLOSTExtension = {
  id: "en-ipa-to-phonemic",
  name: "English IPA to Phonemic Extension",
  visit: {
    word: (node: GLOSTWord) => {
      const transcription = node.extras?.transcription as { ipa: string } | undefined;
      if (!transcription?.ipa) return;
      
      // Simple IPA to respelling conversion
      const respelling = transcription.ipa
        .replace(/ə/g, "uh")
        .replace(/ˈ/g, "")
        .replace(/ˌ/g, "")
        .replace(/θ/g, "th")
        .replace(/ð/g, "th")
        .replace(/ʃ/g, "sh")
        .replace(/ʒ/g, "zh")
        .replace(/tʃ/g, "ch")
        .replace(/dʒ/g, "j")
        .replace(/ŋ/g, "ng")
        .replace(/j/g, "y")
        .replace(/w/g, "w")
        .replace(/uː/g, "oo")
        .replace(/iː/g, "ee")
        .replace(/ɔː/g, "aw")
        .replace(/ɜː/g, "er")
        .replace(/æ/g, "a")
        .replace(/ɒ/g, "o")
        .replace(/ɛ/g, "e")
        .replace(/ɪ/g, "i")
        .replace(/ʊ/g, "u")
        .replace(/aɪ/g, "eye")
        .replace(/eɪ/g, "ay")
        .replace(/ɔɪ/g, "oy")
        .replace(/aʊ/g, "ow")
        .replace(/oʊ/g, "oh");
      
      node.extras = node.extras || {};
      node.extras.respelling = { text: respelling };
    },
  },
};

// DOM elements
const inputElement = document.getElementById("input") as HTMLTextAreaElement;
const outputElement = document.getElementById("output") as HTMLDivElement;
const toggleIPAButton = document.getElementById("toggle-ipa") as HTMLButtonElement;
const toggleRespellingButton = document.getElementById("toggle-respelling") as HTMLButtonElement;

// State
let showIPA = true;
let showRespelling = true;

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

function renderWord(word: GLOSTWord): HTMLElement {
  const container = document.createElement("div");
  container.className = "word";

  const text = getWordText(word);
  const transcription = word.extras?.transcription as { ipa: string } | undefined;
  const respelling = word.extras?.respelling as { text: string } | undefined;

  const textSpan = document.createElement("span");
  textSpan.className = "word-text";
  textSpan.textContent = text;
  container.appendChild(textSpan);

  if (showIPA && transcription?.ipa) {
    const ipaSpan = document.createElement("span");
    ipaSpan.className = "word-ipa";
    ipaSpan.textContent = transcription.ipa;
    container.appendChild(ipaSpan);
  }

  if (showRespelling && respelling?.text) {
    const respellingSpan = document.createElement("span");
    respellingSpan.className = "word-respelling";
    respellingSpan.textContent = respelling.text;
    container.appendChild(respellingSpan);
  }

  return container;
}

function processAndRender() {
  const text = inputElement.value;

  if (!text.trim()) {
    outputElement.innerHTML = '<span class="empty-state">Output will appear here...</span>';
    return;
  }

  try {
    const document = textToGLOST(text);

    // Process with composed extensions
    // EnglishIPAExtension provides IPA
    // EnglishIPAToPhonemicExtension requires IPA and converts to respelling
    const result = processGLOSTWithExtensions(
      document,
      [EnglishIPAExtension, EnglishIPAToPhonemicExtension],
      { lenient: true } // Skip words without dictionary entries
    );

    outputElement.innerHTML = "";

    const paragraph = result.document.children[0];
    if (paragraph?.type === "ParagraphNode") {
      const sentence = paragraph.children[0];
      if (sentence?.type === "SentenceNode") {
        for (const node of sentence.children) {
          if (node.type === "WordNode") {
            outputElement.appendChild(renderWord(node));
          }
        }
      }
    }

    if (outputElement.children.length === 0) {
      outputElement.innerHTML = '<span class="empty-state">No words to display</span>';
    }
  } catch (error) {
    console.error("Error:", error);
    outputElement.innerHTML = `<span class="empty-state" style="color: #c00;">Error: ${error instanceof Error ? error.message : String(error)}</span>`;
  }
}

function updateToggleButtons() {
  toggleIPAButton.classList.toggle("active", showIPA);
  toggleRespellingButton.classList.toggle("active", showRespelling);
}

// Event listeners
inputElement.addEventListener("input", processAndRender);

toggleIPAButton.addEventListener("click", () => {
  showIPA = !showIPA;
  updateToggleButtons();
  processAndRender();
});

toggleRespellingButton.addEventListener("click", () => {
  showRespelling = !showRespelling;
  updateToggleButtons();
  processAndRender();
});

// Initial render
processAndRender();

console.log("GLOST Transcription Demo loaded!");
console.log("Try words: ecclesiastical, phenomenon, worcestershire, queue, knight");
