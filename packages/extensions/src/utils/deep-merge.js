/**
 * Deep Merge Utility
 *
 * Recursively merges objects with conflict detection and configurable strategies.
 *
 * @packageDocumentation
 */
import { ExtensionConflictError } from "../errors.js";
/**
 * Check if a value is a plain object (not array, null, etc.)
 */
function isPlainObject(value) {
    return (typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        Object.prototype.toString.call(value) === "[object Object]");
}
/**
 * Handle a conflict between existing and incoming values
 *
 * If existingExtensionId is undefined, the existing value came from the
 * original document (not another extension), so we allow the overwrite
 * without treating it as a conflict.
 */
function handleConflict(field, existing, incoming, context) {
    const { options } = context;
    // If existing value came from original document (not an extension),
    // allow the extension to transform/enrich it without conflict
    if (!options.existingExtensionId) {
        return incoming;
    }
    // At this point existingExtensionId is defined (checked above)
    const existingExt = options.existingExtensionId;
    const incomingExt = options.incomingExtensionId ?? "unknown";
    switch (options.conflictStrategy) {
        case "error":
            throw new ExtensionConflictError(field, existingExt, incomingExt, existing, incoming);
        case "warn":
            console.warn(`[glost-extensions] Metadata conflict at "${field}": ` +
                `"${incomingExt}" overwrites value from "${existingExt}". ` +
                `Existing: ${JSON.stringify(existing)}, Incoming: ${JSON.stringify(incoming)}`);
            return incoming;
        case "lastWins":
        default:
            return incoming;
    }
}
/**
 * Merge arrays based on strategy
 */
function mergeArrays(target, source, context) {
    switch (context.options.arrayStrategy) {
        case "concat":
            return [...target, ...source];
        case "unique":
            // Only works well for primitives
            return [...new Set([...target, ...source])];
        case "replace":
        default:
            return source;
    }
}
/**
 * Recursively merge source into target
 */
function mergeRecursive(target, source, context) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        const targetValue = target[key];
        const sourceValue = source[key];
        const fieldPath = [...context.path, key].join(".");
        // Source value is undefined, skip
        if (sourceValue === undefined) {
            continue;
        }
        // Target doesn't have this key, just assign
        if (!(key in target) || targetValue === undefined) {
            result[key] = sourceValue;
            continue;
        }
        // Both are plain objects, recurse
        if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
            result[key] = mergeRecursive(targetValue, sourceValue, { ...context, path: [...context.path, key] });
            continue;
        }
        // Both are arrays, merge based on strategy
        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            result[key] = mergeArrays(targetValue, sourceValue, { ...context, path: [...context.path, key] });
            continue;
        }
        // Leaf conflict - both have values at this key
        result[key] = handleConflict(fieldPath, targetValue, sourceValue, context);
    }
    return result;
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
export function deepMerge(target, source, options = {}) {
    const resolvedOptions = {
        arrayStrategy: options.arrayStrategy ?? "replace",
        conflictStrategy: options.conflictStrategy ?? "error",
        // Keep undefined to indicate original document data (not from an extension)
        existingExtensionId: options.existingExtensionId,
        incomingExtensionId: options.incomingExtensionId,
    };
    const context = {
        path: [],
        options: resolvedOptions,
    };
    return mergeRecursive(target, source, context);
}
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
export function findConflicts(target, source, path = []) {
    const conflicts = [];
    for (const key of Object.keys(source)) {
        const targetValue = target[key];
        const sourceValue = source[key];
        const fieldPath = [...path, key];
        if (sourceValue === undefined) {
            continue;
        }
        if (!(key in target) || targetValue === undefined) {
            continue;
        }
        // Both are plain objects, recurse
        if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
            conflicts.push(...findConflicts(targetValue, sourceValue, fieldPath));
            continue;
        }
        // Both are arrays - not considered a conflict (will merge based on strategy)
        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            continue;
        }
        // Leaf conflict
        conflicts.push(fieldPath.join("."));
    }
    return conflicts;
}
//# sourceMappingURL=deep-merge.js.map