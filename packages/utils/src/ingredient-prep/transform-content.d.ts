/**
 * Content Transformation Utilities
 *
 * Transform content format (e.g., script conversion, filtering)
 */
import type { GLOSTRoot, GLOSTWord, LanguageCode, ScriptSystem } from "glost";
/**
 * Transformation function type
 */
export type TransformFunction = (document: GLOSTRoot) => GLOSTRoot;
/**
 * Filter function type
 */
export type FilterFunction = (word: GLOSTWord) => boolean;
/**
 * Options for content transformation
 */
export interface TransformContentOptions {
    /**
     * Filter words
     */
    filter?: FilterFunction;
    /**
     * Transform language
     */
    transformLanguage?: (lang: LanguageCode) => LanguageCode;
    /**
     * Transform script
     */
    transformScript?: (script: ScriptSystem) => ScriptSystem;
    /**
     * Custom transformation function
     */
    customTransform?: TransformFunction;
}
/**
 * Transform GLOST document content
 */
export declare function transformContent(document: GLOSTRoot, options?: TransformContentOptions): GLOSTRoot;
/**
 * Filter words by text
 */
export declare function filterWordsByText(document: GLOSTRoot, predicate: (text: string) => boolean): GLOSTRoot;
/**
 * Filter words by metadata
 */
export declare function filterWordsByMetadata(document: GLOSTRoot, predicate: (metadata: Record<string, unknown>) => boolean): GLOSTRoot;
/**
 * Map words to new format
 */
export declare function mapWords(document: GLOSTRoot, mapper: (word: GLOSTWord) => GLOSTWord): GLOSTRoot;
//# sourceMappingURL=transform-content.d.ts.map