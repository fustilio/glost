/**
 * Ingredient Combination Utilities
 *
 * Combine multiple GLOST documents or content sources
 */
import { createGLOSTRootNode, createGLOSTParagraphNode, createGLOSTSentenceNode, } from "glost/nodes";
import { getAllWords, getAllSentences, isGLOSTParagraph } from "glost";
/**
 * Combine multiple GLOST documents
 */
export function combineIngredients(ingredients, options = {}) {
    if (ingredients.length === 0) {
        throw new Error("Cannot combine empty ingredients array");
    }
    const { strategy = "append", customCombine, language, script, title, description, } = options;
    // Use custom combine if provided
    if (customCombine) {
        return customCombine(ingredients);
    }
    // Get target language and script
    const targetLanguage = language || ingredients[0].lang;
    const targetScript = script || ingredients[0].script;
    // Apply strategy
    switch (strategy) {
        case "append":
            return combineAppend(ingredients, targetLanguage, targetScript, title, description);
        case "merge-paragraphs":
            return combineMergeParagraphs(ingredients, targetLanguage, targetScript, title, description);
        case "merge-sentences":
            return combineMergeSentences(ingredients, targetLanguage, targetScript, title, description);
        case "merge-words":
            return combineMergeWords(ingredients, targetLanguage, targetScript, title, description);
        case "interleave":
            return combineInterleave(ingredients, targetLanguage, targetScript, title, description);
        default:
            return combineAppend(ingredients, targetLanguage, targetScript, title, description);
    }
}
/**
 * Append strategy: Combine all paragraphs sequentially
 */
function combineAppend(ingredients, language, script, title, description) {
    const allParagraphs = [];
    for (const doc of ingredients) {
        const paragraphs = doc.children.filter(isGLOSTParagraph);
        allParagraphs.push(...paragraphs);
    }
    return createGLOSTRootNode({
        lang: language,
        script,
        children: allParagraphs,
        metadata: {
            title: title || "Combined Document",
            description: description || `Combined from ${ingredients.length} sources`,
        },
    });
}
/**
 * Merge paragraphs strategy: Combine all paragraphs into one document
 */
function combineMergeParagraphs(ingredients, language, script, title, description) {
    const allParagraphs = [];
    for (const doc of ingredients) {
        const paragraphs = doc.children.filter(isGLOSTParagraph);
        allParagraphs.push(...paragraphs);
    }
    return createGLOSTRootNode({
        lang: language,
        script,
        children: allParagraphs,
        metadata: {
            title: title || "Merged Paragraphs",
            description: description || `Merged ${allParagraphs.length} paragraphs`,
        },
    });
}
/**
 * Merge sentences strategy: Combine all sentences into a single paragraph
 */
function combineMergeSentences(ingredients, language, script, title, description) {
    const allSentences = [];
    for (const doc of ingredients) {
        const sentences = getAllSentences(doc);
        allSentences.push(...sentences);
    }
    const paragraph = createGLOSTParagraphNode(allSentences);
    return createGLOSTRootNode({
        lang: language,
        script,
        children: [paragraph],
        metadata: {
            title: title || "Merged Sentences",
            description: description || `Merged ${allSentences.length} sentences`,
        },
    });
}
/**
 * Merge words strategy: Combine all words into a single sentence
 */
function combineMergeWords(ingredients, language, script, title, description) {
    const allWords = [];
    for (const doc of ingredients) {
        const words = getAllWords(doc);
        allWords.push(...words);
    }
    const sentence = createGLOSTSentenceNode({
        originalText: allWords.map((w) => w.children.find((c) => c.type === "TextNode")?.value || "").join(" "),
        lang: language,
        script,
        children: allWords,
    });
    const paragraph = createGLOSTParagraphNode([sentence]);
    return createGLOSTRootNode({
        lang: language,
        script,
        children: [paragraph],
        metadata: {
            title: title || "Merged Words",
            description: description || `Merged ${allWords.length} words`,
        },
    });
}
/**
 * Interleave strategy: Interleave content from different sources
 */
function combineInterleave(ingredients, language, script, title, description) {
    const allParagraphs = [];
    const paragraphArrays = ingredients.map((doc) => doc.children.filter(isGLOSTParagraph));
    const maxLength = Math.max(...paragraphArrays.map((paragraphs) => paragraphs.length));
    for (let i = 0; i < maxLength; i++) {
        for (const paragraphs of paragraphArrays) {
            if (i < paragraphs.length) {
                allParagraphs.push(paragraphs[i]);
            }
        }
    }
    return createGLOSTRootNode({
        lang: language,
        script,
        children: allParagraphs,
        metadata: {
            title: title || "Interleaved Document",
            description: description || `Interleaved from ${ingredients.length} sources`,
        },
    });
}
//# sourceMappingURL=combine-ingredients.js.map