/**
 * Converts a string into a URL-friendly slug.
 * - Converts to lowercase.
 * - Replaces spaces and non-alphanumeric characters (excluding underscores) with underscores.
 * - Removes duplicate underscores.
 * - Removes leading/trailing underscores.
 * - Truncates to a specified maximum length.
 * - Ensures the slug is not empty, defaulting to "untitled" if it would be.
 *
 * @param text The string to slugify.
 * @param maxLength The maximum length of the slug (default: 50).
 * @returns The generated slug.
 */
export declare function slugify(text: string, maxLength?: number): string;
//# sourceMappingURL=string-utils.d.ts.map