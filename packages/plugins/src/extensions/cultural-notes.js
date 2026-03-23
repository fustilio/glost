/**
 * Cultural Notes Extension
 *
 * Processes and enhances cultural context metadata.
 *
 * @packageDocumentation
 */
/**
 * Format cultural notes
 *
 * @internal
 */
function formatCulturalNotes(notes) {
    // Add line breaks after periods followed by space
    return notes.replace(/\.\s+/g, ".\n\n");
}
/**
 * Create cultural notes extension
 *
 * @param options - Extension configuration options
 * @returns Configured cultural notes extension
 *
 * @since 0.0.1
 */
export function createCulturalNotesExtension(options = {}) {
    const { format = true, maxPreviewLength } = options;
    return {
        id: "cultural-notes",
        name: "Cultural Notes",
        description: "Processes and enhances cultural context metadata",
        enhanceMetadata: (node) => {
            // Get cultural notes from various possible locations
            const notes = node.extras?.metadata?.culturalNotes ||
                node.extras?.culturalNotes ||
                node.culturalNotes;
            if (!notes) {
                return;
            }
            const notesStr = String(notes).trim();
            if (!notesStr) {
                return;
            }
            // Format notes if requested
            const formatted = format ? formatCulturalNotes(notesStr) : notesStr;
            // Create preview if max length specified
            let preview;
            if (maxPreviewLength && formatted.length > maxPreviewLength) {
                preview = formatted.substring(0, maxPreviewLength) + "...";
            }
            return {
                culturalNotes: {
                    notes: notesStr,
                    formatted,
                    preview,
                    hasNotes: true,
                },
            };
        },
    };
}
/**
 * Default cultural notes extension
 *
 * @since 0.0.1
 */
export const CulturalNotesExtension = createCulturalNotesExtension();
//# sourceMappingURL=cultural-notes.js.map