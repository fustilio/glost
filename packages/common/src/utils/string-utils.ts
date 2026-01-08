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
export function slugify(text: string, maxLength = 50): string {
  if (!text) {
    return "untitled";
  }

  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_") // Replace spaces with _
    .replace(/[^\w_]+/g, "_") // Replace all non-word chars with _ (allows underscores)
    .replace(/__+/g, "_") // Replace multiple _ with single _
    .replace(/^_+/, "") // Trim _ from start of text
    .replace(/_+$/, ""); // Trim _ from end of text

  const truncatedSlug = slug.substring(0, maxLength);

  // Ensure it's not empty after truncation or if original was all special chars
  if (!truncatedSlug) {
    return "untitled";
  }

  return truncatedSlug;
}
