/**
 * Content Transformation Utilities
 *
 * Transform content format (e.g., script conversion, filtering)
 */
import { getAllWords } from "glost";
/**
 * Transform GLOST document content
 */
export function transformContent(document, options = {}) {
    const { filter, transformLanguage, transformScript, customTransform, } = options;
    // Use custom transform if provided
    if (customTransform) {
        return customTransform(document);
    }
    let transformed = document;
    // Transform language
    if (transformLanguage) {
        transformed = {
            ...transformed,
            lang: transformLanguage(transformed.lang),
        };
    }
    // Transform script
    if (transformScript) {
        transformed = {
            ...transformed,
            script: transformScript(transformed.script),
        };
    }
    // Filter words
    if (filter) {
        const words = getAllWords(transformed);
        const filteredWords = words.filter(filter);
        // Rebuild document with filtered words
        // This is a simplified version - in practice, you'd need to rebuild
        // the full tree structure maintaining parent-child relationships
        // For now, we'll just return the document as-is since filtering
        // requires rebuilding the entire tree structure
        transformed = document; // Placeholder - would need full tree rebuild
    }
    return transformed;
}
/**
 * Filter words by text
 */
export function filterWordsByText(document, predicate) {
    return transformContent(document, {
        filter: (word) => {
            const text = word.children.find((c) => c.type === "TextNode")?.value || "";
            return predicate(text);
        },
    });
}
/**
 * Filter words by metadata
 */
export function filterWordsByMetadata(document, predicate) {
    return transformContent(document, {
        filter: (word) => {
            const metadata = word.extras?.metadata || {};
            return predicate(metadata);
        },
    });
}
/**
 * Map words to new format
 */
export function mapWords(document, mapper) {
    return transformContent(document, {
        customTransform: (doc) => {
            const words = getAllWords(doc);
            const mappedWords = words.map(mapper);
            // Rebuild document with mapped words
            // This is a simplified version - in practice, you'd need to rebuild
            // the full tree structure
            return doc; // Placeholder - would need full tree rebuild
        },
    });
}
//# sourceMappingURL=transform-content.js.map