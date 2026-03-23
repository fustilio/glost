/**
 * Content Normalization Utilities
 *
 * Normalize content for GLOST conversion
 */
import { getAllWords } from "glost";
/**
 * Normalize content for GLOST conversion
 */
export function normalizeContentForGLOST(content, options) {
    const { language, trim = true, normalizeWhitespace = true, removeEmptyLines = true, customNormalize, } = options;
    let normalized = content;
    // Apply custom normalization first if provided
    if (customNormalize) {
        normalized = customNormalize(normalized);
    }
    // Trim
    if (trim) {
        normalized = normalized.trim();
    }
    // Normalize whitespace
    if (normalizeWhitespace) {
        normalized = normalized.replace(/\s+/g, " ");
    }
    // Remove empty lines
    if (removeEmptyLines) {
        normalized = normalized.replace(/\n\s*\n/g, "\n");
    }
    // Extract words (simple space-based split for now)
    const words = normalized
        .split(/\s+/)
        .filter((w) => w.length > 0)
        .map((w) => w.trim());
    return {
        text: normalized,
        language,
        words,
    };
}
/**
 * Normalize GLOST document content
 */
export function normalizeGLOSTDocument(document, options = {}) {
    const { normalizeWhitespace = true, removeEmptyWords = true } = options;
    const words = getAllWords(document);
    // Normalize word text
    const normalizedWords = words.map((word) => {
        const textNode = word.children.find((c) => c.type === "TextNode");
        if (!textNode || textNode.type !== "TextNode") {
            return word;
        }
        let normalizedText = textNode.value;
        if (normalizeWhitespace) {
            normalizedText = normalizedText.replace(/\s+/g, " ").trim();
        }
        if (removeEmptyWords && normalizedText.length === 0) {
            return null;
        }
        return {
            ...word,
            children: word.children.map((child) => {
                if (child.type === "TextNode") {
                    return {
                        ...child,
                        value: normalizedText,
                    };
                }
                return child;
            }),
        };
    }).filter((word) => word !== null);
    // Rebuild document with normalized words
    // This is a simplified version - in practice, you'd need to rebuild
    // the full tree structure
    return document;
}
//# sourceMappingURL=normalize-content.js.map