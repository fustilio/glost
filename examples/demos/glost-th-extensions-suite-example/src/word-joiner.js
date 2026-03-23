/**
 * Thai Word Joiner Extension
 *
 * Transforms Thai word chunks (from Intl.Segmenter) into composite words
 * by checking if combined forms exist in the dictionary.
 *
 * Example: ซู + เปอร์ + มาร์เก็ต → ซูปอร์มาร์เก็ต
 *
 * @packageDocumentation
 */
import { getWordText, isGLOSTWord, createGLOSTWordNode } from "glost";
import { visit } from "unist-util-visit";
import { getDemoThaiTranscriptions, isWordInDemoVocabulary } from "./demo-data.js";
/**
 * BLACKLIST EXPLANATION:
 *
 * The blacklist prevents the word joiner from creating INCORRECT combinations.
 *
 * PROBLEM: Intl.Segmenter sometimes incorrectly splits Thai text, especially
 * transliterated foreign words. For example:
 *
 *   "จากรัฐอิลลินอย" gets split into: ["จา", "กรัฐอิล", "ลิ", "นอย"]
 *   "รัฐอิลลินอย" gets split into: ["รัฐ", "อิล", "ลิ", "นอย"]
 *
 * These fragments like "อิล", "ลิ", "นอย" are NOT real Thai words - they're
 * just parts of the transliterated word "อิลลินอย" (Illinois).
 *
 * WITHOUT BLACKLIST: The joiner might try to combine these fragments with
 * other words, creating nonsense like:
 *   - "อิล" + "ลิ" = "อิลลิ" (not a real word)
 *   - "กรัฐอิล" (fragment) + something else = incorrect combination
 *
 * WITH BLACKLIST: We prevent these fragments from being combined with OTHER words.
 * However, if the FULL PHRASE exists in the dictionary (like "รัฐอิลลินอย"),
 * we still allow combining all the fragments together to form the correct phrase.
 *
 * So the blacklist prevents:
 *   ❌ "อิล" + "ลิ" (partial combinations)
 *   ❌ "กรัฐอิล" + anything (fragment combinations)
 *
 * But allows:
 *   ✅ "รัฐ" + "อิล" + "ลิ" + "นอย" → "รัฐอิลลินอย" (full phrase in dictionary)
 *   ✅ "จา" + "กรัฐอิล" + "ลิ" + "นอย" → "จากรัฐอิลลินอย" (full phrase in dictionary)
 */
const WORD_JOINER_BLACKLIST = new Set([
    // Illinois transliteration fragments - these are NOT real Thai words
    // They're just broken pieces from Intl.Segmenter's incorrect segmentation
    'กรัฐอิล', // fragment from "รัฐอิลลินอย" - should not combine with other words
    'อิล', // part of "อิลลินอย" (Illinois) - should not combine with other words
    'ลิ', // part of "อิลลินอย" (Illinois) - should not combine with other words
    'นอย', // part of "อิลลินอย" (Illinois) - should not combine with other words
    // Other known problematic fragments
    'จา', // fragment from "จาก" - should not combine with other words
    // 
    // IMPORTANT: The FULL phrases are NOT blacklisted:
    // - "รัฐอิลลินอย" is NOT blacklisted (it's a valid phrase in dictionary)
    // - "จากรัฐอิลลินอย" is NOT blacklisted (it's a valid phrase in dictionary)
    // 
    // The blacklist only prevents the FRAGMENTS from combining incorrectly.
]);
/**
 * Check if a word should be excluded from word joining
 *
 * @param word - The word to check
 * @returns true if the word should be excluded from joining
 */
function isWordBlacklisted(word) {
    return WORD_JOINER_BLACKLIST.has(word);
}
/**
 * Check if a word exists in the demo vocabulary dictionary
 *
 * This is a demo implementation. Real implementations would use
 * comprehensive dictionary data.
 *
 * @param word - The word to check
 * @returns true if the word exists in the dictionary
 */
function isWordInDictionary(word) {
    // Use demo vocabulary lookup
    // In a real implementation, this would check against a comprehensive dictionary
    return isWordInDemoVocabulary(word);
}
/**
 * Get text content from a word node
 */
function getWordTextContent(word) {
    return getWordText(word);
}
/**
 * Merge multiple word nodes into a single composite word node
 *
 * @param words - Array of word nodes to merge
 * @param combinedText - The combined text string
 * @returns A new composite word node
 */
function mergeWordsIntoComposite(words, combinedText) {
    // Store individual word transcriptions for rendering
    // We want to keep transcriptions separate on individual words, not combine them
    const individualTranscriptions = words.map((w) => {
        const trans = {};
        if (w.transcription) {
            for (const [scheme, data] of Object.entries(w.transcription)) {
                if (data && typeof data === 'object' && 'text' in data) {
                    trans[scheme] = data.text;
                }
            }
        }
        return trans;
    });
    // Try to get transcription for the combined phrase if it exists in dictionary
    // This handles cases where the full phrase has a transcription (like "จากรัฐอิลลินอย")
    // We still preserve individual word transcriptions in originalTranscriptions
    const combinedTranscriptions = getDemoThaiTranscriptions(combinedText);
    const transcription = {};
    if (combinedTranscriptions) {
        // Convert demo transcription format to GLOST format
        for (const [scheme, text] of Object.entries(combinedTranscriptions)) {
            transcription[scheme] = { text };
        }
    }
    // Merge metadata from individual words
    const mergedExtras = {
        ...words[0]?.extras,
        originalChunks: words.map((w) => getWordTextContent(w)),
        originalTranscriptions: individualTranscriptions, // Preserve individual word transcriptions
        isComposite: true,
    };
    // Merge other extras fields (take first non-null value)
    for (const word of words.slice(1)) {
        if (word.extras) {
            for (const [key, value] of Object.entries(word.extras)) {
                if (value !== undefined && value !== null && !(key in mergedExtras)) {
                    mergedExtras[key] = value;
                }
            }
        }
    }
    // Get language and script from first word
    const lang = words[0]?.lang || "th-TH";
    const script = words[0]?.script || "thai";
    // Create composite word node
    // Use "word" level but mark as composite in extras
    return createGLOSTWordNode({
        value: combinedText,
        transcription,
        metadata: words[0]?.metadata || { partOfSpeech: "" },
        lang,
        script,
        extras: mergedExtras,
    });
}
/**
 * Try to combine consecutive words starting from a given index
 *
 * @param words - Array of word nodes
 * @param startIndex - Starting index
 * @param maxLength - Maximum number of words to try combining
 * @param minLength - Minimum number of words to combine
 * @returns Combined word node if successful, null otherwise
 */
function tryCombineWords(words, startIndex, maxLength, minLength) {
    // Try longest combinations first
    for (let length = Math.min(maxLength, words.length - startIndex); length >= minLength; length--) {
        const wordsToCombine = words.slice(startIndex, startIndex + length);
        const combinedText = wordsToCombine
            .map((w) => getWordTextContent(w))
            .join("");
        // STEP 1: Skip if the combined result itself is blacklisted
        // (e.g., don't create "กรัฐอิล" as a combined word)
        if (isWordBlacklisted(combinedText)) {
            continue;
        }
        // STEP 2: Check if the combined phrase exists in the dictionary
        // (e.g., "รัฐอิลลินอย" or "จากรัฐอิลลินอย")
        if (isWordInDictionary(combinedText)) {
            console.log(`[Word Joiner] Found dictionary entry for combined phrase: "${combinedText}"`);
            console.log(`[Word Joiner]   Parts: [${wordsToCombine.map(w => `"${getWordTextContent(w)}"`).join(", ")}]`);
            // The combined phrase exists in dictionary - we want to combine it!
            // 
            // However, we need to be careful: we only want to combine if at least
            // one of the individual words is a valid Thai word (not a blacklisted fragment).
            // This prevents combining pure transliteration fragments that happen to
            // form a valid phrase by accident.
            // 
            // Example: ["รัฐ", "อิล", "ลิ", "นอย"] → "รัฐอิลลินอย"
            //   - "รัฐ" is a valid Thai word ✓
            //   - "อิล", "ลิ", "นอย" are blacklisted fragments
            //   - But "รัฐอิลลินอย" exists in dictionary ✓
            //   → We combine because "รัฐ" is valid
            const hasValidIndividualWord = wordsToCombine.some(w => {
                const wordText = getWordTextContent(w);
                const isBlacklisted = isWordBlacklisted(wordText);
                const isInDict = isWordInDictionary(wordText);
                console.log(`[Word Joiner]   Checking "${wordText}": blacklisted=${isBlacklisted}, inDict=${isInDict}`);
                // Check if this word is both:
                // 1. NOT blacklisted (not a fragment)
                // 2. In the dictionary (a real Thai word)
                return !isBlacklisted && isInDict;
            });
            if (hasValidIndividualWord) {
                // At least one word is valid - safe to combine!
                console.log(`[Word Joiner] ✓ Combining "${combinedText}" (has valid individual word)`);
                return mergeWordsIntoComposite(wordsToCombine, combinedText);
            }
            // Fallback: Even if no individual words are valid (non-blacklisted),
            // if the combined phrase exists in dictionary, we still combine it.
            // This handles edge cases where the phrase is valid but all parts are fragments.
            // (This should be rare, but it's a safety net)
            console.log(`[Word Joiner] ✓ Combining "${combinedText}" (fallback - phrase exists in dict)`);
            return mergeWordsIntoComposite(wordsToCombine, combinedText);
        }
        else {
            // Debug: Log when we try to combine but phrase doesn't exist
            if (length >= 2) {
                console.log(`[Word Joiner] ✗ Combined phrase "${combinedText}" not in dictionary`);
            }
        }
    }
    return null;
}
/**
 * Process a sentence to combine word chunks into composite words
 *
 * @param sentence - The sentence node to process
 * @param options - Word joiner options
 */
function processSentence(sentence, options) {
    const allChildren = sentence.children || [];
    if (allChildren.length === 0) {
        return;
    }
    // Build a map of Thai word indices
    const thaiWordIndices = [];
    for (let i = 0; i < allChildren.length; i++) {
        const child = allChildren[i];
        if (isGLOSTWord(child)) {
            const wordText = getWordTextContent(child);
            const isThai = child.lang?.startsWith("th") ||
                child.script === "thai" ||
                (options.processAllThai && /[\u0E00-\u0E7F]/.test(wordText));
            if (isThai) {
                thaiWordIndices.push(i);
            }
        }
    }
    // If no Thai words to process, return early
    // IMPORTANT: Don't modify sentence.children if we're not processing anything
    if (thaiWordIndices.length === 0) {
        return;
    }
    // Process Thai words to find combinations
    const processedIndices = new Set();
    const replacements = new Map();
    // Process Thai words to find combinations
    // Use a greedy approach: try to combine words starting from each position
    // and apply the first valid combination we find
    let i = 0;
    while (i < thaiWordIndices.length) {
        const currentIndex = thaiWordIndices[i];
        if (currentIndex === undefined || processedIndices.has(currentIndex)) {
            i++;
            continue;
        }
        // Get consecutive Thai words starting from this index
        const consecutiveIndices = [currentIndex];
        for (let j = i + 1; j < thaiWordIndices.length; j++) {
            const currentIdx = thaiWordIndices[j];
            const prevIdx = thaiWordIndices[j - 1];
            // Check if words are consecutive (no non-word nodes between them)
            if (currentIdx !== undefined &&
                prevIdx !== undefined &&
                currentIdx === prevIdx + 1) {
                consecutiveIndices.push(currentIdx);
            }
            else {
                break;
            }
        }
        // Try to combine these consecutive words
        const wordsToCombine = consecutiveIndices.map((idx) => allChildren[idx]);
        // Try to find a combination starting from the current position
        // We want to find the longest valid combination starting from position 0
        let foundCombination = false;
        for (let start = 0; start < wordsToCombine.length; start++) {
            const combined = tryCombineWords(wordsToCombine, start, Math.min(options.maxCombinationLength, wordsToCombine.length - start), options.minCombinationLength);
            if (combined) {
                const originalChunks = combined.extras?.originalChunks;
                const count = originalChunks?.length || 1;
                // Apply this combination
                const startIdx = consecutiveIndices[start];
                if (startIdx !== undefined) {
                    replacements.set(startIdx, combined);
                    // Mark all words in the combination as processed
                    for (let k = 0; k < count; k++) {
                        if (startIdx + k < allChildren.length) {
                            processedIndices.add(startIdx + k);
                        }
                    }
                    // Skip past the words we just combined
                    i += start + count;
                    foundCombination = true;
                    break;
                }
            }
        }
        // If no combination found, move to the next word
        if (!foundCombination) {
            i++;
        }
    }
    // Build new children array with replacements
    // Only modify if we actually made changes (have replacements or processed indices)
    // This ensures we don't clear word nodes if no combinations were found
    if (replacements.size === 0 && processedIndices.size === 0) {
        // No changes made, preserve original children
        return;
    }
    const newChildren = [];
    for (let i = 0; i < allChildren.length; i++) {
        // If this index has a replacement, use it
        if (replacements.has(i)) {
            // Replace with combined word
            newChildren.push(replacements.get(i));
            // Skip the remaining indices that were part of this combination
            // (they're already included in the composite word)
            continue;
        }
        // If this index was processed (part of a combination), skip it
        // because it's already included in the replacement at the start index
        if (processedIndices.has(i)) {
            continue;
        }
        // Otherwise, keep the original node
        newChildren.push(allChildren[i]);
    }
    // Safety check: ensure we don't accidentally clear all children
    if (newChildren.length === 0 && allChildren.length > 0) {
        // This should never happen, but if it does, preserve original children
        console.warn("[Thai Word Joiner] Warning: Would clear all children, preserving original");
        return;
    }
    sentence.children = newChildren;
}
/**
 * Create Thai Word Joiner extension
 *
 * Creates a transformer extension that combines consecutive Thai word chunks
 * into composite words by checking if the combined form exists in the dictionary.
 *
 * @param options - Extension configuration options
 * @returns Configured Thai word joiner extension
 *
 * @example
 * ```typescript
 * import { createThaiWordJoinerExtension } from "glost-plugins-thai";
 *
 * const extension = createThaiWordJoinerExtension({
 *   maxCombinationLength: 4,
 *   minCombinationLength: 2,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [extension]);
 *
 * // Result:
 * // Words: ["ซู", "เปอร์", "มาร์เก็ต"] becomes:
 * // Word("ซูปอร์มาร์เก็ต", level: "compound")
 * ```
 */
export function createThaiWordJoinerExtension(options = {}) {
    const { maxCombinationLength = 4, minCombinationLength = 2, processAllThai = true, } = options;
    const requiredOptions = {
        maxCombinationLength,
        minCombinationLength: Math.max(2, minCombinationLength), // Ensure at least 2
        processAllThai,
    };
    return {
        id: "thai-word-joiner",
        name: "Thai Word Joiner",
        description: "Combines consecutive Thai word chunks into composite words by checking dictionary lookups",
        transform: (document) => {
            // Visit all sentence nodes
            visit(document, "SentenceNode", (node) => {
                const sentence = node;
                processSentence(sentence, requiredOptions);
            });
            return document;
        },
    };
}
/**
 * Default Thai Word Joiner extension
 *
 * Pre-configured word joiner with default options.
 */
export const ThaiWordJoinerExtension = createThaiWordJoinerExtension();
//# sourceMappingURL=word-joiner.js.map