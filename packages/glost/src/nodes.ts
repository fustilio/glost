/**
 * Node factory exports
 *
 * Re-exports node creation functions from glost-core for convenient access via glost/nodes.
 */

export {
  createGLOSTRootNode,
  createGLOSTParagraphNode,
  createGLOSTSentenceNode,
  createGLOSTWordNode,
  createGLOSTTextNode,
  createGLOSTWhiteSpaceNode,
  createGLOSTPunctuationNode,
  createGLOSTSymbolNode,
  createSimpleDocument,
  createDocumentFromSentences,
  createDocumentFromParagraphs,
  createSentenceFromWords,
  createParagraphFromSentences,
  createSimpleWord,
  NODE_TYPES,
} from "glost-core";
