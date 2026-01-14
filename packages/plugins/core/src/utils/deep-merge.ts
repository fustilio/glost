/**
 * Deep Merge Utility
 *
 * Recursively merges objects with conflict detection and configurable strategies.
 *
 * @packageDocumentation
 */

import { ExtensionConflictError } from "../errors.js";

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
 * Internal options with resolved defaults
 * Note: existingExtensionId can be undefined to indicate original document data
 */
interface ResolvedMergeOptions {
  arrayStrategy: "concat" | "replace" | "unique";
  conflictStrategy: "error" | "warn" | "lastWins";
  existingExtensionId: string | undefined;
  incomingExtensionId: string | undefined;
}

/**
 * Context passed through recursive merge calls
 */
interface MergeContext {
  path: string[];
  options: ResolvedMergeOptions;
}

/**
 * Check if a value is a plain object (not array, null, etc.)
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * Handle a conflict between existing and incoming values
 *
 * If existingExtensionId is undefined, the existing value came from the
 * original document (not another extension), so we allow the overwrite
 * without treating it as a conflict.
 */
function handleConflict(
  field: string,
  existing: unknown,
  incoming: unknown,
  context: MergeContext,
): unknown {
  const { options } = context;

  // If existing value came from original document (not an extension),
  // allow the extension to transform/enrich it without conflict
  if (!options.existingExtensionId) {
    return incoming;
  }

  // At this point existingExtensionId is defined (checked above)
  const existingExt = options.existingExtensionId!;
  const incomingExt = options.incomingExtensionId ?? "unknown";

  switch (options.conflictStrategy) {
    case "error":
      throw new ExtensionConflictError(
        field,
        existingExt,
        incomingExt,
        existing,
        incoming,
      );

    case "warn":
      console.warn(
        `[glost-plugins] Metadata conflict at "${field}": ` +
          `"${incomingExt}" overwrites value from "${existingExt}". ` +
          `Existing: ${JSON.stringify(existing)}, Incoming: ${JSON.stringify(incoming)}`,
      );
      return incoming;

    case "lastWins":
    default:
      return incoming;
  }
}

/**
 * Merge arrays based on strategy
 */
function mergeArrays(
  target: unknown[],
  source: unknown[],
  context: MergeContext,
): unknown[] {
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
function mergeRecursive<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
  context: MergeContext,
): T {
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
      (result as Record<string, unknown>)[key] = sourceValue;
      continue;
    }

    // Both are plain objects, recurse
    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      (result as Record<string, unknown>)[key] = mergeRecursive(
        targetValue,
        sourceValue,
        { ...context, path: [...context.path, key] },
      );
      continue;
    }

    // Both are arrays, merge based on strategy
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      (result as Record<string, unknown>)[key] = mergeArrays(
        targetValue,
        sourceValue,
        { ...context, path: [...context.path, key] },
      );
      continue;
    }

    // Leaf conflict - both have values at this key
    (result as Record<string, unknown>)[key] = handleConflict(
      fieldPath,
      targetValue,
      sourceValue,
      context,
    );
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
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
  options: DeepMergeOptions = {},
): T {
  const resolvedOptions: ResolvedMergeOptions = {
    arrayStrategy: options.arrayStrategy ?? "replace",
    conflictStrategy: options.conflictStrategy ?? "error",
    // Keep undefined to indicate original document data (not from an extension)
    existingExtensionId: options.existingExtensionId,
    incomingExtensionId: options.incomingExtensionId,
  };

  const context: MergeContext = {
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
export function findConflicts(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  path: string[] = [],
): string[] {
  const conflicts: string[] = [];

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
