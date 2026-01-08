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
export function groupBy<T, K extends keyof any>(
  arr: T[],
  key: (i: T) => K,
  filter?: (k: K) => boolean,
) {
  return arr.reduce(
    (groups, item) => {
      const index = key(item);

      if (filter && !filter(index)) {
        return groups;
      }

      (groups[index] ||= []).push(item);
      return groups;
    },
    {} as Record<K, T[]>,
  );
}
