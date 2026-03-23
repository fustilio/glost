/**
 * Script Conversion Utilities
 *
 * Utilities for converting between different script formats (string, RubySegment arrays)
 * and normalizing script representations.
 */
/**
 * Ruby segment type - represents text with ruby annotation
 */
export type RubySegment = {
    base: string;
    ruby: string;
};
/**
 * Check if a value is a RubySegment
 */
export declare function isRubySegment(value: unknown): value is RubySegment;
/**
 * Convert a script (string or RubySegment array) to plain text string
 */
export declare function convertScriptToString(script: string | (string | RubySegment)[]): string;
/**
 * Check if script is in array format (RubySegment array)
 */
export declare function isRubyScript(script: string | (string | RubySegment)[]): script is (string | RubySegment)[];
/**
 * Check if script is plain text (string)
 */
export declare function isPlainTextScript(script: string | (string | RubySegment)[]): script is string;
/**
 * Ensure script is in array format
 * If it's a string, converts it to an array of string segments
 */
export declare function ensureArrayFormat(script: string | (string | RubySegment)[]): (string | RubySegment)[];
/**
 * Ensure script is in string format
 * If it's an array, converts it to plain text
 */
export declare function ensureStringFormat(script: string | (string | RubySegment)[]): string;
/**
 * Get plain text from a script
 * Alias for convertScriptToString for consistency
 */
export declare function getPlainText(script: string | (string | RubySegment)[]): string;
//# sourceMappingURL=script-conversion.d.ts.map