/**
 * Factory functions for creating dialogue nodes and sentences
 */
/**
 * Create a GloST Dialogue Node
 *
 * @example
 * ```ts
 * const dialogue = createDialogueNode({
 *   children: [sentence1, sentence2],
 *   lang: "th-TH",
 *   participants: [
 *     { id: "customer", name: "You" },
 *     { id: "shopkeeper", name: "Shopkeeper" }
 *   ],
 *   context: "Ordering coffee"
 * });
 * ```
 */
export function createDialogueNode(options) {
    const { children, lang, script, participants, context, title, difficulty } = options;
    const dialogueMetadata = {};
    if (participants)
        dialogueMetadata.participants = participants;
    if (context)
        dialogueMetadata.context = context;
    if (title)
        dialogueMetadata.title = title;
    if (difficulty)
        dialogueMetadata.difficulty = difficulty;
    return {
        type: "DialogueNode",
        children,
        lang,
        script,
        extras: Object.keys(dialogueMetadata).length > 0
            ? { dialogue: dialogueMetadata }
            : undefined,
    };
}
/**
 * Add dialogue info to a sentence
 *
 * @example
 * ```ts
 * const sentenceWithDialogue = addDialogueInfoToSentence(sentence, {
 *   role: "customer",
 *   speaker: "You",
 *   turnIndex: 0
 * });
 * ```
 */
export function addDialogueInfoToSentence(sentence, dialogueInfo) {
    return {
        ...sentence,
        extras: {
            ...sentence.extras,
            dialogue: {
                role: dialogueInfo.role,
                speaker: dialogueInfo.speaker,
                turnIndex: dialogueInfo.turnIndex,
                emotion: dialogueInfo.emotion,
            },
        },
    };
}
/**
 * Create a complete dialogue from a list of turns
 *
 * @example
 * ```ts
 * const dialogue = createDialogueFromTurns({
 *   lang: "th-TH",
 *   participants: [
 *     { id: "A", name: "Customer" },
 *     { id: "B", name: "Shopkeeper" }
 *   ],
 *   context: "Buying fruit at the market",
 *   turns: [
 *     { role: "A", sentence: sentence1 },
 *     { role: "B", sentence: sentence2 },
 *     { role: "A", sentence: sentence3 },
 *   ]
 * });
 * ```
 */
export function createDialogueFromTurns(options) {
    const { lang, script, participants, context, title, difficulty, turns } = options;
    // Add dialogue info to each sentence
    const sentencesWithDialogue = turns.map((turn, index) => {
        const participant = participants.find((p) => p.id === turn.role);
        return addDialogueInfoToSentence(turn.sentence, {
            role: turn.role,
            speaker: participant?.name,
            turnIndex: index,
            emotion: turn.emotion,
        });
    });
    return createDialogueNode({
        children: sentencesWithDialogue,
        lang,
        script,
        participants,
        context,
        title,
        difficulty,
    });
}
/**
 * Get all participants from a dialogue
 */
export function getDialogueParticipants(dialogue) {
    return dialogue.extras?.dialogue?.participants ?? [];
}
/**
 * Get dialogue context
 */
export function getDialogueContext(dialogue) {
    return dialogue.extras?.dialogue?.context;
}
/**
 * Get dialogue title
 */
export function getDialogueTitle(dialogue) {
    return dialogue.extras?.dialogue?.title;
}
//# sourceMappingURL=factories.js.map