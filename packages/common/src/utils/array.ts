/**
 * Shuffles array in place.
 *
 * @see https://stackoverflow.com/a/2450976
 */
export function shuffleArray<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex] as T,
      array[currentIndex] as T,
    ];
  }

  return array;
}

export function getRandomIndex(size: number): number {
  return Math.floor(Math.random() * size);
}

export function getRandomFromArray<T>(arr: T[]): T | null {
  if (arr.length === 0) {
    return null;
  }

  const randomIndex = getRandomIndex(arr.length);

  return arr[randomIndex] ?? null;
}
