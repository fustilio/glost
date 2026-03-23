/**
 * Content Normalization Utilities
 *
 * Normalize content for GLOST conversion
 */
import type { GLOSTRoot, LanguageCode } from "glost";
/**
 * Normalized content structure
 */
export interface NormalizedContent {
    text: string;
    language: LanguageCode;
    words: string[];
    metadata?: Record<string, unknown>;
}
/**
 * Options for content normalization
 */
export interface NormalizeContentOptions {
    /**
     * Language code
     */
    language: LanguageCode;
    /**
     * Whether to trim whitespace
     */
    trim?: boolean;
    /**
     * Whether to normalize whitespace
     */
    normalizeWhitespace?: boolean;
    /**
     * Whether to remove empty lines
     */
    removeEmptyLines?: boolean;
    /**
     * Custom normalization function
     */
    customNormalize?: (text: string) => string;
}
/**
 * Normalize content for GLOST conversion
 */
export declare function normalizeContentForGLOST(content: string, options: NormalizeContentOptions): NormalizedContent;
/**
 * Normalize GLOST document content
 */
export declare function normalizeGLOSTDocument(document: GLOSTRoot, options?: {
    normalizeWhitespace?: boolean;
    removeEmptyWords?: boolean;
}): GLOSTRoot;
//# sourceMappingURL=normalize-content.d.ts.map