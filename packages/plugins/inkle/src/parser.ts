import {
  createGLOSTRootNode,
  createGLOSTParagraphNode,
  createGLOSTSentenceNode,
  createGLOSTWordNode,
  createGLOSTTextNode,
} from "glost";
import type {
  GLOSTRoot,
  GLOSTParagraph,
  GLOSTSentence,
  GLOSTWord,
  LanguageCode,
  ScriptSystem,
} from "glost";

type InkJSON = Record<string, unknown>;

interface ParseOptions {
  language?: LanguageCode;
  script?: ScriptSystem;
  defaultSpeaker?: string;
  // If provided, only these sections will be parsed in order (after the root preamble).
  // Otherwise, the entire document structure is traversed.
  sections?: string[]; 
}

export function parseInkJSON(
  json: InkJSON,
  options: ParseOptions = {}
): GLOSTRoot {
  const language = options.language || "en";
  const script = options.script || "latin";
  const paragraphs: GLOSTParagraph[] = [];

  const addLine = (text: string, type: "text" | "choice") => {
    if (!text.trim()) return;

    // Simple tokenization by space
    const words: GLOSTWord[] = text.split(/\s+/).map((w) => {
      // Create a basic word node
      return createGLOSTWordNode(
        w,
        {}, // No transcription
        { partOfSpeech: "" }, // Empty metadata
        "word",
        language,
        script
      );
    });

    const sentence = createGLOSTSentenceNode(text, language, script, words);
    
    // Add extra metadata for choices
    const extras = type === 'choice' ? { type: 'choice' } : {};
    
    const paragraph = createGLOSTParagraphNode([sentence], { ...extras });
    paragraphs.push(paragraph);
  };

  if (options.sections) {
     // Sections mode: explicit order
     
     // 1. Process root preamble (usually index 0)
     if (Array.isArray(json.root) && json.root.length > 0) {
        traverseContent(json.root[0], addLine);
     }
     
     // 2. Find container for named sections
     let container = json;
     if (Array.isArray(json.root)) {
         // Look for the main container object in root (usually the last object)
         for (let i = json.root.length - 1; i >= 0; i--) {
             const item = json.root[i];
             if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                 // Check if this object contains any of our requested sections
                 // This helps distinguish it from other metadata objects
                 const keys = Object.keys(item);
                 if (options.sections.some(s => keys.includes(s))) {
                     container = item as InkJSON;
                     break;
                 }
             }
         }
     }

     // 3. Process requested sections
     for (const sectionKey of options.sections) {
         if (container[sectionKey]) {
             traverseContent(container[sectionKey], addLine);
         }
     }

  } else {
    // Generic mode: traverse everything
    // Ink JSON root is usually an array.
    if (Array.isArray(json.root)) {
        traverseContent(json.root, addLine);
    } else {
        // Fallback for non-array root or other structures
        for (const key in json) {
            if (key === 'inkVersion' || key === 'listDefs') continue;
            traverseContent(json[key], addLine);
        }
    }
  }

  return createGLOSTRootNode(language, script, paragraphs);
}

function traverseContent(
  node: unknown,
  callback: (text: string, type: "text" | "choice") => void
) {
  if (Array.isArray(node)) {
    let i = 0;
    while (i < node.length) {
      const item = node[i];

      // Dialogue text: "^Text"
      if (typeof item === "string" && item.startsWith("^")) {
        callback(item.substring(1), "text");
      }
      // Choice: ev str ^Text /str /ev
      else if (item === "ev" && i + 4 < node.length) {
        if (
          node[i + 1] === "str" &&
          typeof node[i + 2] === "string" &&
          (node[i + 2] as string).startsWith("^") &&
          node[i + 3] === "/str" &&
          node[i + 4] === "/ev"
        ) {
          const choiceText = (node[i + 2] as string).substring(1);
          callback(choiceText, "choice");
          // Skip choice block
          i += 4;
        }
      } 
      // Nested arrays (e.g. within a section)
      else if (Array.isArray(item)) {
        traverseContent(item, callback);
      }
      // Objects (sub-containers/stitches)
      else if (typeof item === 'object' && item !== null) {
          for (const key in item) {
              // @ts-ignore
              traverseContent(item[key], callback);
          }
      }

      i++;
    }
  } else if (typeof node === 'object' && node !== null) {
       for (const key in node) {
          // @ts-ignore
          traverseContent(node[key], callback);
       }
  }
}
