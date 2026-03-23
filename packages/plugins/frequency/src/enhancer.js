/**
 * Frequency Enhancer Extension
 *
 * Formats and enhances existing frequency data with display properties.
 *
 * @packageDocumentation
 */
/**
 * Get frequency display text
 *
 * @internal
 */
function getFrequencyDisplay(level) {
    const displays = {
        rare: "Rare",
        uncommon: "Uncommon",
        common: "Common",
        "very-common": "Very Common",
    };
    return displays[level] || level;
}
/**
 * Get frequency color (for UI)
 *
 * @internal
 */
function getFrequencyColor(level) {
    const colors = {
        rare: "gray",
        uncommon: "yellow",
        common: "blue",
        "very-common": "green",
    };
    return colors[level] || "gray";
}
/**
 * Get frequency priority (for sorting)
 *
 * @internal
 */
function getFrequencyPriority(level) {
    const priorities = {
        rare: 1,
        uncommon: 2,
        common: 3,
        "very-common": 4,
    };
    return priorities[level] || 0;
}
/**
 * Create frequency enhancer extension
 *
 * This extension processes existing frequency metadata and enhances it
 * with display information and UI properties (colors, labels, priorities).
 * It should run after the frequency generator extension.
 *
 * @param options - Extension configuration options
 * @returns Configured frequency enhancer extension
 *
 * @example
 * ```typescript
 * import { createFrequencyEnhancerExtension } from "glost-frequency";
 *
 * const enhancer = createFrequencyEnhancerExtension({
 *   normalize: true,
 *   customMapping: { "hello": "very-common" }
 * });
 *
 * const result = processGLOSTWithExtensions(document, [enhancer]);
 * ```
 */
export function createFrequencyEnhancerExtension(options = {}) {
    const { normalize = true, customMapping } = options;
    return {
        id: "frequency-enhancer",
        name: "Frequency Enhancer",
        description: "Enhances word frequency metadata with display properties",
        dependencies: ["frequency-generator"],
        provides: {
            extras: ["frequency"],
        },
        enhanceMetadata: (node) => {
            // Get frequency from various possible locations
            const frequency = node.extras?.metadata?.frequency ||
                node.extras?.frequency ||
                (customMapping && node.children[0]?.type === "TextNode"
                    ? customMapping[node.children[0].value]
                    : undefined);
            if (!frequency) {
                return;
            }
            // Normalize frequency value
            let normalizedFrequency;
            if (normalize) {
                const freqStr = String(frequency).toLowerCase();
                // Check for exact matches first
                if (freqStr === "rare" ||
                    freqStr === "uncommon" ||
                    freqStr === "common" ||
                    freqStr === "very-common") {
                    normalizedFrequency = freqStr;
                }
                else if (freqStr.includes("very") || freqStr.includes("most")) {
                    normalizedFrequency = "very-common";
                }
                else if (freqStr.includes("uncommon")) {
                    normalizedFrequency = "uncommon";
                }
                else if (freqStr.includes("rare")) {
                    normalizedFrequency = "rare";
                }
                else if (freqStr.includes("common") || freqStr.includes("frequent")) {
                    normalizedFrequency = "common";
                }
                else {
                    // Try to match exact value
                    normalizedFrequency = freqStr;
                }
            }
            else {
                normalizedFrequency = frequency;
            }
            // Validate frequency level
            const validLevels = [
                "rare",
                "uncommon",
                "common",
                "very-common",
            ];
            if (!validLevels.includes(normalizedFrequency)) {
                return;
            }
            // Build frequency metadata
            const frequencyMetadata = {
                level: normalizedFrequency,
                display: getFrequencyDisplay(normalizedFrequency),
                color: getFrequencyColor(normalizedFrequency),
                priority: getFrequencyPriority(normalizedFrequency),
            };
            return {
                frequency: frequencyMetadata,
            };
        },
    };
}
/**
 * Default frequency enhancer extension
 *
 * Pre-configured frequency enhancer with default options.
 */
export const FrequencyEnhancerExtension = createFrequencyEnhancerExtension();
//# sourceMappingURL=enhancer.js.map