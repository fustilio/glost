/**
 * Script Conversion Utilities
 *
 * Utilities for converting between different script formats (string, RubySegment arrays)
 * and normalizing script representations.
 */
/**
 * Check if a value is a RubySegment
 */
export function isRubySegment(value) {
    return (typeof value === "object" &&
        value !== null &&
        "base" in value &&
        "ruby" in value &&
        typeof value.base === "string" &&
        typeof value.ruby === "string");
}
/**
 * Convert a script (string or RubySegment array) to plain text string
 */
export function convertScriptToString(script) {
    if (typeof script === "string") {
        return script;
    }
    return script
        .map((segment) => {
        if (typeof segment === "string") {
            return segment;
        }
        return segment.base;
    })
        .join("");
}
/**
 * Check if script is in array format (RubySegment array)
 */
export function isRubyScript(script) {
    return Array.isArray(script);
}
/**
 * Check if script is plain text (string)
 */
export function isPlainTextScript(script) {
    return typeof script === "string";
}
/**
 * Ensure script is in array format
 * If it's a string, converts it to an array of string segments
 */
export function ensureArrayFormat(script) {
    if (Array.isArray(script)) {
        return script;
    }
    return [script];
}
/**
 * Ensure script is in string format
 * If it's an array, converts it to plain text
 */
export function ensureStringFormat(script) {
    return convertScriptToString(script);
}
/**
 * Get plain text from a script
 * Alias for convertScriptToString for consistency
 */
export function getPlainText(script) {
    return convertScriptToString(script);
}
//# sourceMappingURL=script-conversion.js.map