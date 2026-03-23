/**
 * Cultural Notes Extension
 *
 * Processes and enhances cultural context metadata.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "../types.js";
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
 * Create cultural notes extension
 *
 * @param options - Extension configuration options
 * @returns Configured cultural notes extension
 *
 * @since 0.0.1
 */
export declare function createCulturalNotesExtension(options?: CulturalNotesExtensionOptions): GLOSTExtension;
/**
 * Default cultural notes extension
 *
 * @since 0.0.1
 */
export declare const CulturalNotesExtension: GLOSTExtension;
//# sourceMappingURL=cultural-notes.d.ts.map