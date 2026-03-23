/**
 * Deep Merge Utility
 *
 * Recursively merges objects with conflict detection and configurable strategies.
 *
 * @packageDocumentation
 */
/**
 * Options for deep merge behavior
 */
export interface DeepMergeOptions {
    /**
     * How to handle array merging
     * - "concat": Concatenate arrays
     * - "replace": Replace target array with source array
     * - "unique": Concatenate and remove duplicates (primitives only)
     */
    arrayStrategy?: "concat" | "replace" | "unique";
    /**
     * How to handle conflicts when both target and source have the same leaf key
     * - "error": Throw ExtensionConflictError
     * - "warn": Log warning and use source value
     * - "lastWins": Silently use source value
     */
    conflictStrategy?: "error" | "warn" | "lastWins";
    /**
     * Extension ID that set the existing (target) values
     * Used for conflict error messages.
     * If undefined, the existing value came from the original document
     * and overwrites are allowed (not considered a conflict).
     */
    existingExtensionId?: string;
    /**
     * Extension ID that is providing the incoming (source) values
     * Used for conflict error messages
     */
    incomingExtensionId?: string;
}
/**
 * Deep merge two objects with conflict detection
 *
 * Recursively merges source into target, with configurable handling for
 * conflicts, arrays, and nested objects.
 *
 * @param target - The base object to merge into
 * @param source - The object to merge from
 * @param options - Merge options
 * @returns A new merged object (does not mutate inputs)
 *
 * @example
 * ```typescript
 * const result = deepMerge(
 *   { a: 1, nested: { b: 2 } },
 *   { a: 10, nested: { c: 3 } },
 *   {
 *     conflictStrategy: "error",
 *     existingExtensionId: "ext-a",
 *     incomingExtensionId: "ext-b",
 *   }
 * );
 * // Throws ExtensionConflictError because both have 'a'
 * ```
 *
 * @example
 * ```typescript
 * const result = deepMerge(
 *   { nested: { a: 1 } },
 *   { nested: { b: 2 } },
 *   { conflictStrategy: "lastWins" }
 * );
 * // { nested: { a: 1, b: 2 } }
 * ```
 *
 * @since 0.0.2
 */
export declare function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>, options?: DeepMergeOptions): T;
/**
 * Check if merging would cause any conflicts
 *
 * Useful for pre-validation before attempting a merge.
 *
 * @param target - The base object
 * @param source - The object to merge
 * @returns Array of conflicting field paths, empty if no conflicts
 *
 * @example
 * ```typescript
 * const conflicts = findConflicts(
 *   { a: 1, nested: { b: 2 } },
 *   { a: 10, nested: { c: 3 } }
 * );
 * // ["a"]
 * ```
 *
 * @since 0.0.2
 */
export declare function findConflicts(target: Record<string, unknown>, source: Record<string, unknown>, path?: string[]): string[];
//# sourceMappingURL=deep-merge.d.ts.map