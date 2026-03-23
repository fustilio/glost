/**
 * GLOST Error Classes
 *
 * Comprehensive error handling with context, suggestions, and helpful messages
 *
 * @packageDocumentation
 */
import type { GLOSTNode } from './types.js';
/**
 * Context information for GLOST errors
 */
export interface GLOSTErrorContext {
    /** The node where the error occurred */
    node?: GLOSTNode;
    /** Path to the node in the document tree */
    path?: string[];
    /** Source file path (if known) */
    file?: string;
    /** Suggestion for fixing the error */
    suggestion?: string;
    /** URL to relevant documentation */
    docsUrl?: string;
    /** Additional context data */
    [key: string]: any;
}
/**
 * Base class for all GLOST errors
 */
export declare class GLOSTError extends Error {
    readonly context: GLOSTErrorContext;
    constructor(message: string, context?: GLOSTErrorContext);
    /**
     * Format error message with context
     */
    toString(): string;
    /**
     * Get a concise error summary
     */
    toSummary(): string;
}
/**
 * Validation error for schema violations
 */
export declare class GLOSTValidationError extends GLOSTError {
    constructor(message: string, context?: GLOSTErrorContext);
    toString(): string;
}
/**
 * Error for missing required fields
 */
export declare class GLOSTMissingFieldError extends GLOSTValidationError {
    constructor(fieldName: string, nodeType: string, context?: GLOSTErrorContext);
}
/**
 * Error for invalid field types
 */
export declare class GLOSTInvalidTypeError extends GLOSTValidationError {
    constructor(fieldName: string, expectedType: string, receivedType: string, context?: GLOSTErrorContext);
}
/**
 * Error for invalid language codes
 */
export declare class GLOSTInvalidLanguageCodeError extends GLOSTValidationError {
    constructor(code: string, context?: GLOSTErrorContext);
}
/**
 * Error for extension processing
 */
export declare class GLOSTExtensionError extends GLOSTError {
    constructor(extensionName: string, message: string, context?: GLOSTErrorContext);
}
/**
 * Error for provider issues
 */
export declare class GLOSTProviderError extends GLOSTError {
    constructor(providerName: string, message: string, context?: GLOSTErrorContext);
}
/**
 * Error for document parsing
 */
export declare class GLOSTParseError extends GLOSTError {
    constructor(message: string, context?: GLOSTErrorContext);
}
/**
 * Error for serialization issues
 */
export declare class GLOSTSerializationError extends GLOSTError {
    constructor(message: string, context?: GLOSTErrorContext);
}
/**
 * Create a validation error with helpful context
 *
 * @param message - Error message
 * @param options - Error options
 * @returns GLOSTValidationError instance
 *
 * @example
 * ```typescript
 * throw createValidationError('Invalid word node', {
 *   node: wordNode,
 *   path: ['document', 'children', '0'],
 *   suggestion: 'Add a "text" field to the word node',
 *   docsUrl: 'https://glost.dev/docs/node-types#word'
 * });
 * ```
 */
export declare function createValidationError(message: string, options?: {
    node?: GLOSTNode;
    path?: string[];
    file?: string;
    suggestion?: string;
    docsUrl?: string;
    expected?: any;
    received?: any;
    problem?: string;
}): GLOSTValidationError;
/**
 * Format a path array as a readable string
 *
 * @param path - Path array
 * @returns Formatted path string
 *
 * @example
 * ```typescript
 * formatPath(['document', 'children', '0', 'text'])
 * // Returns: "document.children[0].text"
 * ```
 */
export declare function formatPath(path: Array<string | number>): string;
/**
 * Assert that a condition is true, throw validation error if not
 *
 * @param condition - Condition to check
 * @param message - Error message if condition is false
 * @param context - Error context
 *
 * @example
 * ```typescript
 * glostAssert(
 *   node.type === 'word',
 *   'Node must be a word node',
 *   { node, path: ['document', 'children', '0'] }
 * );
 * ```
 */
export declare function glostAssert(condition: any, message: string, context?: GLOSTErrorContext): asserts condition;
/**
 * Wrap an error with additional GLOST context
 *
 * @param error - Original error
 * @param context - Additional context
 * @returns GLOST error
 *
 * @example
 * ```typescript
 * try {
 *   await processNode(node);
 * } catch (error) {
 *   throw wrapError(error, {
 *     node,
 *     path: ['document', 'children', '0'],
 *     suggestion: 'Check that the node has all required fields'
 *   });
 * }
 * ```
 */
export declare function wrapError(error: Error, context: GLOSTErrorContext): GLOSTError;
//# sourceMappingURL=errors.d.ts.map