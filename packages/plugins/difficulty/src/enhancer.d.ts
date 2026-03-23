/**
 * Difficulty Enhancer Extension
 *
 * Formats and enhances existing difficulty data with display properties.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { DifficultyLevel } from "./types.js";
/**
 * Difficulty enhancer extension options
 */
export interface DifficultyEnhancerOptions {
    /**
     * Whether to normalize difficulty values
     * @default true
     */
    normalize?: boolean;
    /**
     * Custom difficulty mapping (word → difficulty level)
     */
    customMapping?: Record<string, DifficultyLevel>;
}
/**
 * Create difficulty enhancer extension
 *
 * This extension processes existing difficulty metadata and enhances it
 * with display information and UI properties (colors, labels, priorities).
 * It should run after the difficulty generator extension.
 *
 * @param options - Extension configuration options
 * @returns Configured difficulty enhancer extension
 */
export declare function createDifficultyEnhancerExtension(options?: DifficultyEnhancerOptions): GLOSTExtension;
/**
 * Default difficulty enhancer extension
 */
export declare const DifficultyEnhancerExtension: GLOSTExtension;
//# sourceMappingURL=enhancer.d.ts.map