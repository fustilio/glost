/**
 * GLOST Extension Composition Demo
 *
 * This demo showcases how GLOST extensions compose together:
 *
 * 1. EnglishIPAExtension (GENERATOR)
 *    - Provides IPA transcription for English words
 *    - Standalone: Can be used alone to just show IPA
 *
 * 2. EnglishIPAToPhonemic Extension (ENHANCER)
 *    - Requires IPA from step 1
 *    - Converts IPA to user-friendly phonemic respelling
 *    - Cannot work alone - needs IPA data
 *
 * Key Concepts Demonstrated:
 * - Extension dependencies
 * - Data flow between extensions
 * - Modular, composable architecture
 * - Toggle extensions on/off to see composition
 */
import { processGLOSTWithExtensions } from "glost-plugins";
import { createSimpleWord, createSentenceFromWords, createParagraphFromSentences, createDocumentFromParagraphs, } from "glost";
// =============================================================================
// Inline Extensions
// =============================================================================
// Simple IPA dictionary for demo
const ipaDict = {
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
    ecclesiastical: "ɪˌkliːziˈæstɪkəl",
    worcestershire: "ˈwʊstərʃər",
    colonel: "ˈkɜːrnəl",
    queue: "kjuː",
    knight: "naɪt",
};
// Extension 1: Add IPA transcription (GENERATOR)
const EnglishIPAExtension = {
    id: "en-ipa",
    name: "English IPA Extension",
    visit: {
        word: (node) => {
            const textNode = node.children.find((c) => c.type === "TextNode");
            const text = textNode && "value" in textNode ? textNode.value.toLowerCase() : "";
            const ipa = ipaDict[text];
            if (ipa) {
                node.extras = node.extras || {};
                node.extras.transcription = { ipa, source: "dictionary" };
            }
        },
    },
};
// Extension 2: Convert IPA to phonemic respelling (ENHANCER)
const EnglishIPAToPhonemicExtension = {
    id: "en-ipa-to-phonemic",
    name: "English IPA to Phonemic Extension",
    visit: {
        word: (node) => {
            const transcription = node.extras?.transcription;
            if (!transcription?.ipa)
                return;
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
            node.extras.respelling = { text: respelling, fromIPA: transcription.ipa };
        },
    },
};
// =============================================================================
// DOM Elements
// =============================================================================
const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");
const toggleIPAButton = document.getElementById("toggle-ipa");
const toggleRespellingButton = document.getElementById("toggle-respelling");
const extIPABox = document.getElementById("ext-ipa");
const extPhonemicBox = document.getElementById("ext-phonemic");
const arrow1 = document.getElementById("arrow-1");
// =============================================================================
// State
// =============================================================================
let showIPA = true;
let showRespelling = true;
// =============================================================================
// Helper Functions
// =============================================================================
/**
 * Convert plain text to GLOST document
 */
function textToGLOST(text) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return createDocumentFromParagraphs([], "en-US", "latin");
    }
    const wordNodes = words.map((word) => createSimpleWord({ text: word, transliteration: word }));
    return createDocumentFromParagraphs([createParagraphFromSentences([createSentenceFromWords(wordNodes, "en-US", "latin")])], "en-US", "latin");
}
/**
 * Extract word text from GLOST node
 */
function getWordText(word) {
    const textNode = word.children.find((c) => c.type === "TextNode");
    return textNode && "value" in textNode ? textNode.value : "";
}
/**
 * Render a single word with its transcription data
 */
function renderWord(word) {
    const container = document.createElement("div");
    container.className = "word-card";
    const text = getWordText(word);
    const transcription = word.extras?.transcription;
    const respelling = word.extras?.respelling;
    // Word text
    const textSpan = document.createElement("div");
    textSpan.className = "word-text";
    textSpan.textContent = text;
    container.appendChild(textSpan);
    // IPA (if available and toggled on)
    if (showIPA && transcription?.ipa) {
        const ipaSpan = document.createElement("div");
        ipaSpan.className = "word-ipa";
        ipaSpan.textContent = `IPA: ${transcription.ipa}`;
        ipaSpan.title = "International Phonetic Alphabet";
        container.appendChild(ipaSpan);
    }
    // Phonemic respelling (if available and toggled on)
    if (showRespelling && respelling?.text) {
        const respellingSpan = document.createElement("div");
        respellingSpan.className = "word-respelling";
        respellingSpan.textContent = `→ ${respelling.text}`;
        respellingSpan.title = "Phonemic Respelling (uppercase = stressed)";
        container.appendChild(respellingSpan);
    }
    // Info about data sources
    if (transcription || respelling) {
        const infoSpan = document.createElement("div");
        infoSpan.className = "word-info";
        const sources = [];
        if (transcription)
            sources.push("✓ IPA");
        if (respelling)
            sources.push("✓ Phonemic");
        infoSpan.textContent = sources.join(" • ");
        container.appendChild(infoSpan);
    }
    return container;
}
/**
 * Update extension pipeline visualization
 */
function updatePipelineVisualization() {
    // Update IPA extension box
    if (showIPA) {
        extIPABox.classList.remove("inactive");
        extIPABox.classList.add("generator");
    }
    else {
        extIPABox.classList.add("inactive");
        extIPABox.classList.remove("generator");
    }
    // Update phonemic extension box and arrow
    if (showRespelling) {
        extPhonemicBox.classList.remove("inactive");
        extPhonemicBox.classList.add("enhancer");
        arrow1.style.opacity = "1";
    }
    else {
        extPhonemicBox.classList.add("inactive");
        extPhonemicBox.classList.remove("enhancer");
        arrow1.style.opacity = "0.3";
    }
}
/**
 * Process text with extensions and render output
 */
function processAndRender() {
    const text = inputElement.value;
    if (!text.trim()) {
        outputElement.innerHTML = '<span class="empty-state">Type something to see the magic happen! ✨</span>';
        return;
    }
    try {
        const document = textToGLOST(text);
        // Build extension pipeline based on toggles
        const extensions = [];
        if (showIPA) {
            extensions.push(EnglishIPAExtension);
        }
        if (showRespelling) {
            // Note: This extension REQUIRES IPA
            // If IPA is off but respelling is on, this will show the dependency
            extensions.push(EnglishIPAToPhonemicExtension);
        }
        // Process with the selected extensions
        const result = processGLOSTWithExtensions(document, extensions, { lenient: true } // Skip words not in dictionary
        );
        // Render output
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
            outputElement.innerHTML = '<span class="empty-state">No words in dictionary. Try: hello, world, ecclesiastical</span>';
        }
    }
    catch (error) {
        console.error("Error:", error);
        // Special handling for dependency errors
        if (error instanceof Error && error.message.includes("must run before")) {
            outputElement.innerHTML = `
        <span class="empty-state" style="color: #c00;">
          <strong>❌ Extension Dependency Error</strong><br><br>
          ${error.message}<br><br>
          💡 Turn on "Show IPA" to provide the data that "Show Phonemic" needs!
        </span>
      `;
        }
        else {
            outputElement.innerHTML = `
        <span class="empty-state" style="color: #c00;">
          Error: ${error instanceof Error ? error.message : String(error)}
        </span>
      `;
        }
    }
}
/**
 * Update toggle button states
 */
function updateToggleButtons() {
    toggleIPAButton.classList.toggle("active", showIPA);
    toggleRespellingButton.classList.toggle("active", showRespelling);
}
// =============================================================================
// Event Listeners
// =============================================================================
// Input changes
inputElement.addEventListener("input", processAndRender);
// Toggle IPA
toggleIPAButton.addEventListener("click", () => {
    showIPA = !showIPA;
    updateToggleButtons();
    updatePipelineVisualization();
    processAndRender();
});
// Toggle phonemic respelling
toggleRespellingButton.addEventListener("click", () => {
    showRespelling = !showRespelling;
    updateToggleButtons();
    updatePipelineVisualization();
    processAndRender();
});
// =============================================================================
// Initialize
// =============================================================================
updateToggleButtons();
updatePipelineVisualization();
processAndRender();
console.log("🔗 GLOST Extension Composition Demo loaded!");
console.log("");
console.log("📚 Extensions Available:");
console.log("  1. en-transcription-ipa (GENERATOR) - Provides IPA");
console.log("  2. en-ipa-to-phonemic (ENHANCER) - Requires IPA, provides phonemic respelling");
console.log("");
console.log("💡 Try toggling extensions to see composition in action:");
console.log("  - Turn off IPA → Respelling fails (dependency not met)");
console.log("  - Turn on both → See the data flow");
console.log("");
console.log("🎯 Example words: ecclesiastical, worcestershire, colonel, queue, knight");
//# sourceMappingURL=main.js.map