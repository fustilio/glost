/**
 * Gender Enhancer Extension
 *
 * Formats and enhances existing gender data with display properties.
 *
 * @packageDocumentation
 */
/**
 * Normalize gender value
 *
 * @internal
 */
function normalizeGender(gender) {
    const normalized = gender.toLowerCase().trim();
    if (normalized.startsWith("m") || normalized === "masculine") {
        return "male";
    }
    if (normalized.startsWith("f") || normalized === "feminine") {
        return "female";
    }
    if (normalized.startsWith("n") || normalized === "neuter") {
        return "neuter";
    }
    return normalized;
}
/**
 * Get gender display text
 *
 * @internal
 */
function getGenderDisplay(type) {
    const displays = {
        male: "Masculine",
        female: "Feminine",
        neuter: "Neuter",
        masculine: "Masculine",
        feminine: "Feminine",
    };
    return displays[type] || type;
}
/**
 * Get gender color (for UI)
 *
 * @internal
 */
function getGenderColor(type) {
    if (type === "male" || type === "masculine") {
        return "blue";
    }
    if (type === "female" || type === "feminine") {
        return "pink";
    }
    return "gray";
}
/**
 * Get gender abbreviation
 *
 * @internal
 */
function getGenderAbbreviation(type) {
    const abbreviations = {
        male: "Masc",
        female: "Fem",
        neuter: "Neut",
        masculine: "Masc",
        feminine: "Fem",
    };
    return abbreviations[type] || type.substring(0, 4);
}
/**
 * Create gender enhancer extension
 */
export function createGenderEnhancerExtension(options = {}) {
    const { normalize = true } = options;
    return {
        id: "gender-enhancer",
        name: "Gender Enhancer",
        description: "Enhances gender metadata with display properties",
        dependencies: ["gender-generator"],
        provides: {
            extras: ["gender"],
        },
        enhanceMetadata: (node) => {
            const gender = node.extras?.gender ||
                node.extras?.metadata?.gender;
            if (!gender) {
                return;
            }
            const genderStr = String(gender);
            const normalizedGender = normalize
                ? normalizeGender(genderStr)
                : genderStr;
            const genderMetadata = {
                type: normalizedGender,
                display: getGenderDisplay(normalizedGender),
                color: getGenderColor(normalizedGender),
                abbreviation: getGenderAbbreviation(normalizedGender),
            };
            return {
                gender: genderMetadata,
            };
        },
    };
}
/**
 * Default gender enhancer extension
 */
export const GenderEnhancerExtension = createGenderEnhancerExtension();
//# sourceMappingURL=enhancer.js.map