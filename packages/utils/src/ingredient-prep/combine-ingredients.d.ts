/**
 * Ingredient Combination Utilities
 *
 * Combine multiple GLOST documents or content sources
 */
import type { GLOSTRoot, LanguageCode, ScriptSystem } from "glost";
/**
 * Combination strategy
 */
export type CombinationStrategy = "append" | "merge-paragraphs" | "merge-sentences" | "merge-words" | "interleave" | "custom";
/**
 * Options for combining ingredients
 */
export interface CombineIngredientsOptions {
    /**
     * Combination strategy
     */
    strategy?: CombinationStrategy;
    /**
     * Custom combination function
     */
    customCombine?: (documents: GLOSTRoot[]) => GLOSTRoot;
    /**
     * Target language (defaults to first document's language)
     */
    language?: LanguageCode;
    /**
     * Target script (defaults to first document's script)
     */
    script?: ScriptSystem;
    /**
     * Title for combined document
     */
    title?: string;
    /**
     * Description for combined document
     */
    description?: string;
}
/**
 * Combine multiple GLOST documents
 */
export declare function combineIngredients(ingredients: GLOSTRoot[], options?: CombineIngredientsOptions): GLOSTRoot;
//# sourceMappingURL=combine-ingredients.d.ts.map