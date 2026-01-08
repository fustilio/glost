/**
 * Ingredient Combination Utilities
 * 
 * Combine multiple GLOST documents or content sources
 */

import type {
  GLOSTRoot,
  GLOSTParagraph,
  GLOSTSentence,
  GLOSTWord,
  LanguageCode,
  ScriptSystem,
} from "glost";
import {
  createGLOSTRootNode,
  createGLOSTParagraphNode,
  createGLOSTSentenceNode,
} from "glost/nodes";
import { getAllWords, getAllParagraphs, getAllSentences, isGLOSTParagraph } from "glost";

/**
 * Combination strategy
 */
export type CombinationStrategy =
  | "append" // Append all content sequentially
  | "merge-paragraphs" // Merge paragraphs from all documents
  | "merge-sentences" // Merge sentences into single paragraph
  | "merge-words" // Merge words into single sentence
  | "interleave" // Interleave content from different sources
  | "custom"; // Custom combination function

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
export function combineIngredients(
  ingredients: GLOSTRoot[],
  options: CombineIngredientsOptions = {},
): GLOSTRoot {
  if (ingredients.length === 0) {
    throw new Error("Cannot combine empty ingredients array");
  }

  const {
    strategy = "append",
    customCombine,
    language,
    script,
    title,
    description,
  } = options;

  // Use custom combine if provided
  if (customCombine) {
    return customCombine(ingredients);
  }

  // Get target language and script
  const targetLanguage = language || ingredients[0]!.lang;
  const targetScript = script || ingredients[0]!.script;

  // Apply strategy
  switch (strategy) {
    case "append":
      return combineAppend(ingredients, targetLanguage, targetScript, title, description);
    case "merge-paragraphs":
      return combineMergeParagraphs(ingredients, targetLanguage, targetScript, title, description);
    case "merge-sentences":
      return combineMergeSentences(ingredients, targetLanguage, targetScript, title, description);
    case "merge-words":
      return combineMergeWords(ingredients, targetLanguage, targetScript, title, description);
    case "interleave":
      return combineInterleave(ingredients, targetLanguage, targetScript, title, description);
    default:
      return combineAppend(ingredients, targetLanguage, targetScript, title, description);
  }
}

/**
 * Append strategy: Combine all paragraphs sequentially
 */
function combineAppend(
  ingredients: GLOSTRoot[],
  language: LanguageCode,
  script: ScriptSystem,
  title?: string,
  description?: string,
): GLOSTRoot {
  const allParagraphs: GLOSTParagraph[] = [];
  
  for (const doc of ingredients) {
    const paragraphs = doc.children.filter(isGLOSTParagraph) as GLOSTParagraph[];
    allParagraphs.push(...paragraphs);
  }

  return createGLOSTRootNode(
    language,
    script,
    allParagraphs,
    {
      title: title || "Combined Document",
      description: description || `Combined from ${ingredients.length} sources`,
    },
  );
}

/**
 * Merge paragraphs strategy: Combine all paragraphs into one document
 */
function combineMergeParagraphs(
  ingredients: GLOSTRoot[],
  language: LanguageCode,
  script: ScriptSystem,
  title?: string,
  description?: string,
): GLOSTRoot {
  const allParagraphs: GLOSTParagraph[] = [];
  
  for (const doc of ingredients) {
    const paragraphs = doc.children.filter(isGLOSTParagraph) as GLOSTParagraph[];
    allParagraphs.push(...paragraphs);
  }

  return createGLOSTRootNode(
    language,
    script,
    allParagraphs,
    {
      title: title || "Merged Paragraphs",
      description: description || `Merged ${allParagraphs.length} paragraphs`,
    },
  );
}

/**
 * Merge sentences strategy: Combine all sentences into a single paragraph
 */
function combineMergeSentences(
  ingredients: GLOSTRoot[],
  language: LanguageCode,
  script: ScriptSystem,
  title?: string,
  description?: string,
): GLOSTRoot {
  const allSentences: GLOSTSentence[] = [];
  
  for (const doc of ingredients) {
    const sentences = getAllSentences(doc);
    allSentences.push(...sentences);
  }

  const paragraph = createGLOSTParagraphNode(allSentences);

  return createGLOSTRootNode(
    language,
    script,
    [paragraph],
    {
      title: title || "Merged Sentences",
      description: description || `Merged ${allSentences.length} sentences`,
    },
  );
}

/**
 * Merge words strategy: Combine all words into a single sentence
 */
function combineMergeWords(
  ingredients: GLOSTRoot[],
  language: LanguageCode,
  script: ScriptSystem,
  title?: string,
  description?: string,
): GLOSTRoot {
  const allWords: GLOSTWord[] = [];
  
  for (const doc of ingredients) {
    const words = getAllWords(doc);
    allWords.push(...words);
  }

  const sentence = createGLOSTSentenceNode(
    allWords.map((w) => w.children.find((c) => c.type === "TextNode")?.value || "").join(" "),
    language,
    script,
    allWords,
  );

  const paragraph = createGLOSTParagraphNode([sentence]);

  return createGLOSTRootNode(
    language,
    script,
    [paragraph],
    {
      title: title || "Merged Words",
      description: description || `Merged ${allWords.length} words`,
    },
  );
}

/**
 * Interleave strategy: Interleave content from different sources
 */
function combineInterleave(
  ingredients: GLOSTRoot[],
  language: LanguageCode,
  script: ScriptSystem,
  title?: string,
  description?: string,
): GLOSTRoot {
  const allParagraphs: GLOSTParagraph[] = [];
  const paragraphArrays = ingredients.map((doc) => doc.children.filter(isGLOSTParagraph) as GLOSTParagraph[]);
  const maxLength = Math.max(...paragraphArrays.map((paragraphs) => paragraphs.length));

  for (let i = 0; i < maxLength; i++) {
    for (const paragraphs of paragraphArrays) {
      if (i < paragraphs.length) {
        allParagraphs.push(paragraphs[i]!);
      }
    }
  }

  return createGLOSTRootNode(
    language,
    script,
    allParagraphs,
    {
      title: title || "Interleaved Document",
      description: description || `Interleaved from ${ingredients.length} sources`,
    },
  );
}

