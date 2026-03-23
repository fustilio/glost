/**
 * Shuffles array in place.
 *
 * @see https://stackoverflow.com/a/2450976
 */
export function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
export function getRandomIndex(size) {
    return Math.floor(Math.random() * size);
}
export function getRandomFromArray(arr) {
    if (arr.length === 0) {
        return null;
    }
    const randomIndex = getRandomIndex(arr.length);
    return arr[randomIndex] ?? null;
}
//# sourceMappingURL=array.js.map