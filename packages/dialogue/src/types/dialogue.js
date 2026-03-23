/**
 * GloST Dialogue Types
 *
 * Extended types for dialogue/conversation support in GloST documents.
 * Dialogues allow grouping sentences into conversations with speaker
 * attribution and context.
 */
/**
 * Type guard to check if a node is a DialogueNode
 */
export function isDialogueNode(node) {
    return (typeof node === "object" &&
        node !== null &&
        "type" in node &&
        node.type === "DialogueNode");
}
/**
 * Type guard to check if a sentence has dialogue info
 */
export function hasSentenceDialogueInfo(sentence) {
    return !!sentence.extras?.dialogue;
}
/**
 * Get the speaker name for a sentence
 */
export function getSentenceSpeaker(sentence, participants) {
    const dialogueInfo = sentence.extras?.dialogue;
    if (!dialogueInfo)
        return undefined;
    // Try speaker name first
    if (dialogueInfo.speaker)
        return dialogueInfo.speaker;
    // Look up from participants by role
    if (participants && dialogueInfo.role) {
        const participant = participants.find((p) => p.id === dialogueInfo.role);
        return participant?.name;
    }
    return undefined;
}
//# sourceMappingURL=dialogue.js.map