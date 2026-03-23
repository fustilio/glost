/**
 * GLOST Extension Errors
 *
 * Custom error classes for extension processing with clear, actionable messages.
 *
 * @packageDocumentation
 */

/**
 * Error thrown when an extension's dependency requirements are not met
 *
 * This error provides clear, actionable information about what's missing
 * and how to fix it.
 *
 * @example
 * ```typescript
 * throw new ExtensionDependencyError(
 *   "reading-score",
 *   "frequency",
 *   "extras.frequency",
 *   "Frequency extension did not provide 'frequency' field. " +
 *   "Ensure frequency generator runs before ReadingScoreExtension."
 * );
 * ```
 *
 * @since 0.0.2
 */
export class ExtensionDependencyError extends Error {
  /**
   * Creates a new ExtensionDependencyError
   *
   * @param extensionId - The ID of the extension that has unmet dependencies
   * @param dependencyId - The ID of the dependency extension that should provide the missing field
   * @param missingField - Description of the missing field (e.g., "extras.frequency", "ClauseNode nodes")
   * @param suggestion - Actionable suggestion for how to fix the issue
   */
  constructor(
    public readonly extensionId: string,
    public readonly dependencyId: string,
    public readonly missingField: string,
    public readonly suggestion: string,
  ) {
    super(
      `Extension "${extensionId}" requires "${missingField}" from "${dependencyId}".\n${suggestion}`,
    );
    this.name = "ExtensionDependencyError";

    // Maintains proper stack trace for where error was thrown (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ExtensionDependencyError);
    }
  }
}

/**
 * Error thrown when multiple extensions write to the same field
 *
 * This error is thrown when conflictStrategy is set to "error" (default)
 * and a conflict is detected.
 *
 * @example
 * ```typescript
 * throw new ExtensionConflictError(
 *   "extras.priority",
 *   "frequency",
 *   "difficulty",
 *   { level: "high" },
 *   { level: "medium" }
 * );
 * ```
 *
 * @since 0.0.2
 */
export class ExtensionConflictError extends Error {
  /**
   * Creates a new ExtensionConflictError
   *
   * @param field - The field path where the conflict occurred
   * @param existingExtensionId - The ID of the extension that wrote the existing value
   * @param incomingExtensionId - The ID of the extension trying to overwrite
   * @param existingValue - The existing value
   * @param incomingValue - The incoming value that would overwrite
   */
  constructor(
    public readonly field: string,
    public readonly existingExtensionId: string,
    public readonly incomingExtensionId: string,
    public readonly existingValue: unknown,
    public readonly incomingValue: unknown,
  ) {
    super(
      `Metadata conflict at "${field}": Extension "${incomingExtensionId}" ` +
        `would overwrite value set by "${existingExtensionId}".\n` +
        `Existing: ${JSON.stringify(existingValue)}\n` +
        `Incoming: ${JSON.stringify(incomingValue)}\n` +
        `Use { conflictStrategy: "warn" } or { conflictStrategy: "lastWins" } to allow overwrites.`,
    );
    this.name = "ExtensionConflictError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ExtensionConflictError);
    }
  }
}

/**
 * Error thrown when a required node type is not found in the document
 *
 * @example
 * ```typescript
 * throw new MissingNodeTypeError(
 *   "clause-analysis",
 *   "ClauseNode",
 *   "clause-segmenter"
 * );
 * ```
 *
 * @since 0.0.2
 */
export class MissingNodeTypeError extends Error {
  /**
   * Creates a new MissingNodeTypeError
   *
   * @param extensionId - The ID of the extension that requires the node type
   * @param nodeType - The missing node type
   * @param suggestedExtension - Optional extension that creates this node type
   */
  constructor(
    public readonly extensionId: string,
    public readonly nodeType: string,
    public readonly suggestedExtension?: string,
  ) {
    const suggestion = suggestedExtension
      ? `Add "${suggestedExtension}" to your extension list before "${extensionId}".`
      : `Ensure an extension that creates ${nodeType} nodes runs first.`;

    super(
      `Extension "${extensionId}" requires "${nodeType}" nodes, but none were found.\n${suggestion}`,
    );
    this.name = "MissingNodeTypeError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingNodeTypeError);
    }
  }
}
