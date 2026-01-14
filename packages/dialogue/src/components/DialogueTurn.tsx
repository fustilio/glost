import React from "react";
import type { GLOSTSentence } from "glost";
import type {
  GLOSTSentenceWithDialogue,
  DialogueParticipant,
  SentenceDialogueInfo,
} from "../types/dialogue.js";
import { hasSentenceDialogueInfo, getSentenceSpeaker } from "../types/dialogue.js";

/**
 * Props for DialogueTurn component
 */
export interface DialogueTurnProps {
  /** The sentence to render */
  sentence: GLOSTSentence;
  /** List of participants (for speaker lookup) */
  participants?: DialogueParticipant[];
  /** Children (the rendered sentence content) */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Alignment based on speaker */
  align?: "left" | "right" | "auto";
  /** Show speaker label */
  showSpeaker?: boolean;
  /** Custom render for speaker label */
  renderSpeaker?: (speaker: string, info: SentenceDialogueInfo) => React.ReactNode;
  /** Custom render for the turn container */
  renderContainer?: (
    children: React.ReactNode,
    info: SentenceDialogueInfo | undefined,
    alignment: "left" | "right"
  ) => React.ReactNode;
}

/**
 * Default styles for dialogue turns
 */
const turnContainerStyle = (align: "left" | "right"): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: align === "right" ? "flex-end" : "flex-start",
  maxWidth: "80%",
  alignSelf: align === "right" ? "flex-end" : "flex-start",
});

const speakerStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "#6b7280",
  marginBottom: "0.25rem",
};

const bubbleStyle = (align: "left" | "right"): React.CSSProperties => ({
  padding: "0.75rem 1rem",
  borderRadius: "1rem",
  backgroundColor: align === "right" ? "#3b82f6" : "#e5e7eb",
  color: align === "right" ? "white" : "inherit",
  borderTopLeftRadius: align === "left" ? "0.25rem" : "1rem",
  borderTopRightRadius: align === "right" ? "0.25rem" : "1rem",
});

/**
 * Component for rendering a single turn in a dialogue
 *
 * Displays the speaker label and content with chat-bubble styling.
 * Supports automatic alignment based on speaker role.
 *
 * @example
 * ```tsx
 * <DialogueTurn
 *   sentence={sentence}
 *   participants={participants}
 *   align="auto"
 *   showSpeaker
 * >
 *   <GloSTSentence sentence={sentence} displayLevel={2} />
 * </DialogueTurn>
 * ```
 */
export function DialogueTurn({
  sentence,
  participants,
  children,
  className,
  align = "auto",
  showSpeaker = true,
  renderSpeaker,
  renderContainer,
}: DialogueTurnProps): React.ReactElement {
  const dialogueInfo = hasSentenceDialogueInfo(sentence)
    ? (sentence as GLOSTSentenceWithDialogue).extras?.dialogue
    : undefined;

  const speaker = getSentenceSpeaker(sentence, participants);

  // Determine alignment
  let resolvedAlign: "left" | "right" = "left";
  if (align === "auto" && dialogueInfo) {
    // Common patterns: "me", "you", "customer", "learner" on the right
    const rightRoles = ["me", "you", "customer", "learner", "student", "user"];
    resolvedAlign = rightRoles.includes(dialogueInfo.role.toLowerCase())
      ? "right"
      : "left";
  } else if (align !== "auto") {
    resolvedAlign = align;
  }

  const defaultRenderSpeaker = (name: string) => (
    <div style={speakerStyle}>{name}</div>
  );

  const defaultRenderContainer = (
    content: React.ReactNode,
    _info: SentenceDialogueInfo | undefined,
    alignment: "left" | "right"
  ) => (
    <div style={turnContainerStyle(alignment)}>
      {showSpeaker && speaker && defaultRenderSpeaker(speaker)}
      <div style={bubbleStyle(alignment)}>{content}</div>
    </div>
  );

  if (renderContainer) {
    return (
      <div className={className}>
        {renderContainer(children, dialogueInfo, resolvedAlign)}
      </div>
    );
  }

  return (
    <div className={className}>
      {defaultRenderContainer(
        <>
          {renderSpeaker && speaker && dialogueInfo
            ? renderSpeaker(speaker, dialogueInfo)
            : null}
          {children}
        </>,
        dialogueInfo,
        resolvedAlign
      )}
    </div>
  );
}
