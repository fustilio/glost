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
export class GLOSTError extends Error {
  public readonly context: GLOSTErrorContext;

  constructor(message: string, context: GLOSTErrorContext = {}) {
    super(message);
    this.name = 'GLOSTError';
    this.context = context;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Format error message with context
   */
  toString(): string {
    const parts: string[] = [];

    // Header
    parts.push(`${this.name}: ${this.message}`);
    parts.push('');

    // Location information
    if (this.context.path) {
      parts.push(`  Location: ${this.context.path.join('.')}`);
    }
    if (this.context.file) {
      parts.push(`  File: ${this.context.file}`);
    }
    if (this.context.node) {
      parts.push(`  Node type: ${(this.context.node as any).type || 'unknown'}`);
    }

    // Suggestion
    if (this.context.suggestion) {
      parts.push('');
      parts.push(`  Suggestion: ${this.context.suggestion}`);
    }

    // Documentation link
    if (this.context.docsUrl) {
      parts.push('');
      parts.push(`  Documentation: ${this.context.docsUrl}`);
    }

    // Stack trace
    if (this.stack) {
      parts.push('');
      parts.push('  Stack trace:');
      const stackLines = this.stack.split('\n').slice(1); // Skip first line (message)
      parts.push(...stackLines.map(line => `  ${line}`));
    }

    return parts.join('\n');
  }

  /**
   * Get a concise error summary
   */
  toSummary(): string {
    let summary = `${this.name}: ${this.message}`;
    if (this.context.path) {
      summary += ` (at ${this.context.path.join('.')})`;
    }
    return summary;
  }
}

/**
 * Validation error for schema violations
 */
export class GLOSTValidationError extends GLOSTError {
  constructor(message: string, context: GLOSTErrorContext = {}) {
    super(message, context);
    this.name = 'GLOSTValidationError';
  }

  toString(): string {
    const parts: string[] = [];

    parts.push(`${this.name}: ${this.message}`);
    parts.push('');

    // Location
    if (this.context.path) {
      const location = this.context.path.length > 0 
        ? this.context.path.join('.')
        : 'root';
      parts.push(`  Location: ${location}`);
    }

    if (this.context.node) {
      const node = this.context.node as any;
      parts.push(`  Node type: ${node.type || 'unknown'}`);
    }

    if (this.context.file) {
      parts.push(`  File: ${this.context.file}`);
    }

    // Expected vs Received
    if (this.context.expected) {
      parts.push('');
      parts.push(`  Expected: ${JSON.stringify(this.context.expected, null, 2)}`);
    }

    if (this.context.received) {
      parts.push(`  Received: ${JSON.stringify(this.context.received, null, 2)}`);
    }

    // Problem explanation
    if (this.context.problem) {
      parts.push('');
      parts.push(`  Problem: ${this.context.problem}`);
    }

    // Suggestion
    if (this.context.suggestion) {
      parts.push('');
      parts.push(`  Suggestion: ${this.context.suggestion}`);
    }

    // Documentation
    if (this.context.docsUrl) {
      parts.push('');
      parts.push(`  Documentation: ${this.context.docsUrl}`);
    }

    return parts.join('\n');
  }
}

/**
 * Error for missing required fields
 */
export class GLOSTMissingFieldError extends GLOSTValidationError {
  constructor(
    fieldName: string,
    nodeType: string,
    context: GLOSTErrorContext = {}
  ) {
    const message = `Missing required field '${fieldName}' on ${nodeType}`;
    super(message, {
      ...context,
      problem: `${nodeType} must have a '${fieldName}' field.`,
      docsUrl: context.docsUrl || `https://glost.dev/docs/node-types#${nodeType.toLowerCase()}`,
    });
    this.name = 'GLOSTMissingFieldError';
  }
}

/**
 * Error for invalid field types
 */
export class GLOSTInvalidTypeError extends GLOSTValidationError {
  constructor(
    fieldName: string,
    expectedType: string,
    receivedType: string,
    context: GLOSTErrorContext = {}
  ) {
    const message = `Invalid type for field '${fieldName}': expected ${expectedType}, got ${receivedType}`;
    super(message, {
      ...context,
      problem: `Field '${fieldName}' must be of type ${expectedType}.`,
      suggestion: `Convert the value to ${expectedType} or check your data source.`,
    });
    this.name = 'GLOSTInvalidTypeError';
  }
}

/**
 * Error for invalid language codes
 */
export class GLOSTInvalidLanguageCodeError extends GLOSTValidationError {
  constructor(
    code: string,
    context: GLOSTErrorContext = {}
  ) {
    const message = `Invalid language code: "${code}"`;
    super(message, {
      ...context,
      problem: `Language codes must follow BCP-47 format (e.g., "en-US", "th-TH").`,
      suggestion: `Use normalizeLanguageCode() from glost-common to convert "${code}" to a valid format.`,
      docsUrl: context.docsUrl || 'https://glost.dev/docs/languages#bcp-47',
    });
    this.name = 'GLOSTInvalidLanguageCodeError';
  }
}

/**
 * Error for extension processing
 */
export class GLOSTExtensionError extends GLOSTError {
  constructor(
    extensionName: string,
    message: string,
    context: GLOSTErrorContext = {}
  ) {
    super(`[${extensionName}] ${message}`, context);
    this.name = 'GLOSTExtensionError';
  }
}

/**
 * Error for provider issues
 */
export class GLOSTProviderError extends GLOSTError {
  constructor(
    providerName: string,
    message: string,
    context: GLOSTErrorContext = {}
  ) {
    super(`[${providerName} Provider] ${message}`, context);
    this.name = 'GLOSTProviderError';
  }
}

/**
 * Error for document parsing
 */
export class GLOSTParseError extends GLOSTError {
  constructor(message: string, context: GLOSTErrorContext = {}) {
    super(message, context);
    this.name = 'GLOSTParseError';
  }
}

/**
 * Error for serialization issues
 */
export class GLOSTSerializationError extends GLOSTError {
  constructor(message: string, context: GLOSTErrorContext = {}) {
    super(message, context);
    this.name = 'GLOSTSerializationError';
  }
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
export function createValidationError(
  message: string,
  options: {
    node?: GLOSTNode;
    path?: string[];
    file?: string;
    suggestion?: string;
    docsUrl?: string;
    expected?: any;
    received?: any;
    problem?: string;
  } = {}
): GLOSTValidationError {
  return new GLOSTValidationError(message, options);
}

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
export function formatPath(path: Array<string | number>): string {
  if (path.length === 0) return 'root';

  return path.reduce<string>((acc, segment, index) => {
    if (index === 0) return String(segment);
    
    if (typeof segment === 'number' || !isNaN(Number(segment))) {
      return `${acc}[${segment}]`;
    }
    
    return `${acc}.${segment}`;
  }, '');
}

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
export function glostAssert(
  condition: any,
  message: string,
  context?: GLOSTErrorContext
): asserts condition {
  if (!condition) {
    throw new GLOSTValidationError(message, context);
  }
}

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
export function wrapError(
  error: Error,
  context: GLOSTErrorContext
): GLOSTError {
  if (error instanceof GLOSTError) {
    // Merge contexts - create new error with merged context
    return new GLOSTError(error.message, {
      ...error.context,
      ...context,
    });
  }

  // Create new GLOST error
  return new GLOSTError(error.message, {
    ...context,
    originalError: error,
  });
}
