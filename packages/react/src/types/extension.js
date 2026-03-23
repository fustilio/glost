/**
 * Filter extensions that should apply for the current context
 */
export function getActiveExtensions(extensions, node, displayLevel, transcriptionSystem) {
    return extensions.filter((ext) => !ext.shouldApply ||
        ext.shouldApply(node, displayLevel, transcriptionSystem));
}
/**
 * Combine class names from multiple extensions
 */
export function combineExtensionClassNames(extensions, node, displayLevel, transcriptionSystem, languageStrategy) {
    return extensions
        .map((ext) => ext.getClassName?.(node, displayLevel, transcriptionSystem, languageStrategy) ?? "")
        .filter(Boolean)
        .join(" ");
}
//# sourceMappingURL=extension.js.map