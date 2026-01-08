/**
 * Cultural Notes Extension
 * 
 * Processes and enhances cultural context metadata.
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "../types";
import type { GLOSTWord } from "glost";

/**
 * Cultural notes metadata structure
 * 
 * @since 0.0.1
 */
export interface CulturalNotesMetadata {
  notes: string;
  formatted: string;
  preview?: string;
  hasNotes: boolean;
}

/**
 * Cultural notes extension options
 * 
 * @since 0.0.1
 */
export interface CulturalNotesExtensionOptions {
  /**
   * Whether to format notes (e.g., add line breaks)
   * @default true
   */
  format?: boolean;

  /**
   * Maximum length for preview
   */
  maxPreviewLength?: number;
}

/**
 * Format cultural notes
 * 
 * @internal
 */
function formatCulturalNotes(notes: string): string {
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
export function createCulturalNotesExtension(
  options: CulturalNotesExtensionOptions = {},
): GLOSTExtension {
  const { format = true, maxPreviewLength } = options;

  return {
    id: "cultural-notes",
    name: "Cultural Notes",
    description: "Processes and enhances cultural context metadata",

    enhanceMetadata: (node: GLOSTWord) => {
      // Get cultural notes from various possible locations
      const notes =
        node.extras?.metadata?.culturalNotes ||
        node.extras?.culturalNotes ||
        (node as any).culturalNotes;

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
      let preview: string | undefined;
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

