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
export declare class ExtensionDependencyError extends Error {
    readonly extensionId: string;
    readonly dependencyId: string;
    readonly missingField: string;
    readonly suggestion: string;
    /**
     * Creates a new ExtensionDependencyError
     *
     * @param extensionId - The ID of the extension that has unmet dependencies
     * @param dependencyId - The ID of the dependency extension that should provide the missing field
     * @param missingField - Description of the missing field (e.g., "extras.frequency", "ClauseNode nodes")
     * @param suggestion - Actionable suggestion for how to fix the issue
     */
    constructor(extensionId: string, dependencyId: string, missingField: string, suggestion: string);
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
export declare class ExtensionConflictError extends Error {
    readonly field: string;
    readonly existingExtensionId: string;
    readonly incomingExtensionId: string;
    readonly existingValue: unknown;
    readonly incomingValue: unknown;
    /**
     * Creates a new ExtensionConflictError
     *
     * @param field - The field path where the conflict occurred
     * @param existingExtensionId - The ID of the extension that wrote the existing value
     * @param incomingExtensionId - The ID of the extension trying to overwrite
     * @param existingValue - The existing value
     * @param incomingValue - The incoming value that would overwrite
     */
    constructor(field: string, existingExtensionId: string, incomingExtensionId: string, existingValue: unknown, incomingValue: unknown);
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
export declare class MissingNodeTypeError extends Error {
    readonly extensionId: string;
    readonly nodeType: string;
    readonly suggestedExtension?: string | undefined;
    /**
     * Creates a new MissingNodeTypeError
     *
     * @param extensionId - The ID of the extension that requires the node type
     * @param nodeType - The missing node type
     * @param suggestedExtension - Optional extension that creates this node type
     */
    constructor(extensionId: string, nodeType: string, suggestedExtension?: string | undefined);
}
//# sourceMappingURL=errors.d.ts.map