/**
 * @see https://stackoverflow.com/a/62765924
 *
 * groups array elements into an object with the specified attribute as keys
 *
 * @param arr
 * @param key
 * @param filter
 * @returns
 */
export declare function groupBy<T, K extends keyof any>(arr: T[], key: (i: T) => K, filter?: (k: K) => boolean): Record<K, T[]>;
//# sourceMappingURL=groupBy.d.ts.map