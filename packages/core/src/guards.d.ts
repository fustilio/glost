import type { GLOSTParagraph, GLOSTPunctuation, GLOSTRoot, GLOSTSentence, GLOSTSource, GLOSTSymbol, GLOSTText, GLOSTWhiteSpace, GLOSTWord, GLOSTNode } from "./types.js";
/**
 * Type guard to check if a node is an GLOSTWord
 */
export declare function isGLOSTWord(node: unknown): node is GLOSTWord;
/**
 * Type guard to check if a node is an GLOSTSentence
 */
export declare function isGLOSTSentence(node: unknown): node is GLOSTSentence;
/**
 * Type guard to check if a node is an GLOSTParagraph
 */
export declare function isGLOSTParagraph(node: unknown): node is GLOSTParagraph;
/**
 * Type guard to check if a node is an GLOSTRoot
 */
export declare function isGLOSTRoot(node: unknown): node is GLOSTRoot;
/**
 * Type guard to check if a node is an GLOSTText
 */
export declare function isGLOSTText(node: unknown): node is GLOSTText;
/**
 * Type guard to check if a node is an GLOSTPunctuation
 */
export declare function isGLOSTPunctuation(node: unknown): node is GLOSTPunctuation;
/**
 * Type guard to check if a node is an GLOSTSymbol
 */
export declare function isGLOSTSymbol(node: unknown): node is GLOSTSymbol;
/**
 * Type guard to check if a node is an GLOSTWhiteSpace
 */
export declare function isGLOSTWhiteSpace(node: unknown): node is GLOSTWhiteSpace;
/**
 * Type guard to check if a node is an GLOSTSource
 */
export declare function isGLOSTSource(node: unknown): node is GLOSTSource;
/**
 * Type guard to check if a node is GLOSTNode (any GLOST node)
 */
export declare function isGLOSTNode(node: unknown): node is GLOSTNode;
/**
 * Type guard to check if a node is an GLOSTDocument (Root or Content)
 */
export declare function isGLOSTDocument(node: unknown): node is GLOSTRoot;
/**
 * Type guard to check if an array contains only GLOSTWord nodes
 */
export declare function isGLOSTWordArray(nodes: unknown[]): nodes is GLOSTWord[];
/**
 * Type guard to check if an array contains only GLOSTSentence nodes
 */
export declare function isGLOSTSentenceArray(nodes: unknown[]): nodes is GLOSTSentence[];
/**
 * Type guard to check if an array contains only GLOSTParagraph nodes
 */
export declare function isGLOSTParagraphArray(nodes: unknown[]): nodes is GLOSTParagraph[];
/**
 * Type guard to check if an array contains only GLOSTContent nodes
 */
export declare function isGLOSTContentArray(nodes: unknown[]): nodes is (GLOSTWord | GLOSTSentence | GLOSTParagraph | GLOSTText | GLOSTPunctuation | GLOSTSymbol | GLOSTWhiteSpace | GLOSTSource)[];
/**
 * Type guard to check if a node has children
 */
export declare function hasChildren(node: unknown): node is {
    children: unknown[];
};
/**
 * Type guard to check if a node has metadata
 */
export declare function hasMetadata(node: unknown): node is {
    metadata: Record<string, unknown>;
};
/**
 * Type guard to check if a node has transcription
 */
export declare function hasTranscription(node: unknown): node is {
    transcription: Record<string, unknown>;
};
/**
 * Type guard to check if a node has extras
 */
export declare function hasExtras(node: unknown): node is {
    extras: Record<string, unknown>;
};
/**
 * Check if a node has valid GLOST structure (type guard based validation)
 * For schema-based validation, use validateGLOSTNode from validators.ts
 */
export declare function isGLOSTNodeWithValidChildren(node: unknown): node is GLOSTNode;
/**
 * Check if an array contains valid GLOST nodes (type guard based)
 */
export declare function isGLOSTNodeArrayValid(nodes: unknown[]): nodes is GLOSTNode[];
/**
 * Check if a node is a leaf node (no children)
 */
export declare function isLeafNode(node: GLOSTNode): boolean;
/**
 * Check if a node is a container node (has children)
 */
export declare function isContainerNode(node: GLOSTNode): boolean;
//# sourceMappingURL=guards.d.ts.map