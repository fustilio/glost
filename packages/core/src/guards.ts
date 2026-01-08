// ============================================================================
// GLOST Type Guards for Better Developer Experience
// ============================================================================

import type {
  GLOSTParagraph,
  GLOSTPunctuation,
  GLOSTRoot,
  GLOSTSentence,
  GLOSTSource,
  GLOSTSymbol,
  GLOSTText,
  GLOSTWhiteSpace,
  GLOSTWord,
  GLOSTNode,
} from "./types";

// ============================================================================
// Core Node Type Guards
// ============================================================================

/**
 * Type guard to check if a node is an GLOSTWord
 */
export function isGLOSTWord(node: unknown): node is GLOSTWord {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "WordNode" &&
    "children" in node &&
    "lang" in node &&
    "script" in node &&
    "level" in node &&
    "metadata" in node &&
    "transcription" in node &&
    "extras" in node
  );
}

/**
 * Type guard to check if a node is an GLOSTSentence
 */
export function isGLOSTSentence(node: unknown): node is GLOSTSentence {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "SentenceNode" &&
    "children" in node &&
    "lang" in node &&
    "script" in node &&
    "level" in node &&
    "metadata" in node
  );
}

/**
 * Type guard to check if a node is an GLOSTParagraph
 */
export function isGLOSTParagraph(node: unknown): node is GLOSTParagraph {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "ParagraphNode" &&
    "children" in node &&
    "lang" in node &&
    "script" in node &&
    "level" in node &&
    "metadata" in node
  );
}

/**
 * Type guard to check if a node is an GLOSTRoot
 */
export function isGLOSTRoot(node: unknown): node is GLOSTRoot {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "RootNode" &&
    "children" in node &&
    "lang" in node &&
    "script" in node &&
    "level" in node &&
    "metadata" in node
  );
}

/**
 * Type guard to check if a node is an GLOSTText
 */
export function isGLOSTText(node: unknown): node is GLOSTText {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "TextNode" &&
    "value" in node &&
    typeof node.value === "string"
  );
}

/**
 * Type guard to check if a node is an GLOSTPunctuation
 */
export function isGLOSTPunctuation(node: unknown): node is GLOSTPunctuation {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "PunctuationNode" &&
    "value" in node &&
    typeof node.value === "string"
  );
}

/**
 * Type guard to check if a node is an GLOSTSymbol
 */
export function isGLOSTSymbol(node: unknown): node is GLOSTSymbol {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "SymbolNode" &&
    "value" in node &&
    typeof node.value === "string"
  );
}

/**
 * Type guard to check if a node is an GLOSTWhiteSpace
 */
export function isGLOSTWhiteSpace(node: unknown): node is GLOSTWhiteSpace {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "WhiteSpaceNode" &&
    "value" in node &&
    typeof node.value === "string"
  );
}

/**
 * Type guard to check if a node is an GLOSTSource
 */
export function isGLOSTSource(node: unknown): node is GLOSTSource {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "SourceNode" &&
    "value" in node &&
    typeof node.value === "string"
  );
}

// ============================================================================
// Content Type Guards
// ============================================================================

/**
 * Type guard to check if a node is GLOSTNode (any GLOST node)
 */
export function isGLOSTNode(node: unknown): node is GLOSTNode {
  return (
    isGLOSTWord(node) ||
    isGLOSTSentence(node) ||
    isGLOSTParagraph(node) ||
    isGLOSTText(node) ||
    isGLOSTPunctuation(node) ||
    isGLOSTSymbol(node) ||
    isGLOSTWhiteSpace(node) ||
    isGLOSTSource(node) ||
    isGLOSTRoot(node)
  );
}

// ============================================================================
// Document Type Guards
// ============================================================================

/**
 * Type guard to check if a node is an GLOSTDocument (Root or Content)
 */
export function isGLOSTDocument(node: unknown): node is GLOSTRoot {
  return isGLOSTRoot(node);
}

// ============================================================================
// Array Type Guards
// ============================================================================

/**
 * Type guard to check if an array contains only GLOSTWord nodes
 */
export function isGLOSTWordArray(nodes: unknown[]): nodes is GLOSTWord[] {
  return nodes.every(isGLOSTWord);
}

/**
 * Type guard to check if an array contains only GLOSTSentence nodes
 */
export function isGLOSTSentenceArray(nodes: unknown[]): nodes is GLOSTSentence[] {
  return nodes.every(isGLOSTSentence);
}

/**
 * Type guard to check if an array contains only GLOSTParagraph nodes
 */
export function isGLOSTParagraphArray(nodes: unknown[]): nodes is GLOSTParagraph[] {
  return nodes.every(isGLOSTParagraph);
}

/**
 * Type guard to check if an array contains only GLOSTContent nodes
 */
export function isGLOSTContentArray(nodes: unknown[]): nodes is (GLOSTWord | GLOSTSentence | GLOSTParagraph | GLOSTText | GLOSTPunctuation | GLOSTSymbol | GLOSTWhiteSpace | GLOSTSource)[] {
  return nodes.every(node => 
    isGLOSTWord(node) ||
    isGLOSTSentence(node) ||
    isGLOSTParagraph(node) ||
    isGLOSTText(node) ||
    isGLOSTPunctuation(node) ||
    isGLOSTSymbol(node) ||
    isGLOSTWhiteSpace(node) ||
    isGLOSTSource(node)
  );
}

// ============================================================================
// Utility Type Guards
// ============================================================================

/**
 * Type guard to check if a node has children
 */
export function hasChildren(node: unknown): node is { children: unknown[] } {
  return (
    typeof node === "object" &&
    node !== null &&
    "children" in node &&
    Array.isArray(node.children)
  );
}

/**
 * Type guard to check if a node has metadata
 */
export function hasMetadata(node: unknown): node is { metadata: Record<string, unknown> } {
  return (
    typeof node === "object" &&
    node !== null &&
    "metadata" in node &&
    typeof node.metadata === "object" &&
    node.metadata !== null
  );
}

/**
 * Type guard to check if a node has transcription
 */
export function hasTranscription(node: unknown): node is { transcription: Record<string, unknown> } {
  return (
    typeof node === "object" &&
    node !== null &&
    "transcription" in node &&
    typeof node.transcription === "object" &&
    node.transcription !== null
  );
}

/**
 * Type guard to check if a node has extras
 */
export function hasExtras(node: unknown): node is { extras: Record<string, unknown> } {
  return (
    typeof node === "object" &&
    node !== null &&
    "extras" in node &&
    typeof node.extras === "object" &&
    node.extras !== null
  );
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Check if a node has valid GLOST structure (type guard based validation)
 * For schema-based validation, use validateGLOSTNode from validators.ts
 */
export function isGLOSTNodeWithValidChildren(node: unknown): node is GLOSTNode {
  if (!isGLOSTNode(node)) {
    return false;
  }

  // Additional validation for nodes with children
  if (hasChildren(node)) {
    return (node.children as unknown[]).every(isGLOSTNode);
  }

  return true;
}

/**
 * Check if an array contains valid GLOST nodes (type guard based)
 */
export function isGLOSTNodeArrayValid(nodes: unknown[]): nodes is GLOSTNode[] {
  return nodes.every(isGLOSTNodeWithValidChildren);
}

/**
 * Check if a node is a leaf node (no children)
 */
export function isLeafNode(node: GLOSTNode): boolean {
  return (
    isGLOSTText(node) ||
    isGLOSTPunctuation(node) ||
    isGLOSTSymbol(node) ||
    isGLOSTWhiteSpace(node) ||
    isGLOSTSource(node)
  );
}

/**
 * Check if a node is a container node (has children)
 */
export function isContainerNode(node: GLOSTNode): boolean {
  return (
    isGLOSTWord(node) ||
    isGLOSTSentence(node) ||
    isGLOSTParagraph(node) ||
    isGLOSTRoot(node)
  );
}
