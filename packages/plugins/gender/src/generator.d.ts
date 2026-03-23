/**
 * Gender Generator Extension
 *
 * Generates grammatical gender data for words using a provider.
 *
 * @packageDocumentation
 */
import type { GLOSTExtension } from "glost-plugins";
import type { GenderProvider } from "./types.js";
import type { GlostLanguage } from "glost-common";
/**
 * Gender generator extension options
 */
export interface GenderGeneratorOptions {
    /**
     * Target language for gender lookup
     */
    targetLanguage: GlostLanguage;
    /**
     * Gender provider
     */
    provider?: GenderProvider;
    /**
     * Whether to skip words that already have gender data
     * @default true
     */
    skipExisting?: boolean;
}
/**
 * Create gender generator extension
 */
export declare function createGenderGeneratorExtension(options: GenderGeneratorOptions): GLOSTExtension;
//# sourceMappingURL=generator.d.ts.map