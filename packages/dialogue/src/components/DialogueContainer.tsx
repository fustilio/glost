import React from "react";
import type { GLOSTDialogue, DialogueParticipant } from "../types/dialogue.js";
import { getDialogueParticipants, getDialogueContext, getDialogueTitle } from "../utils/factories.js";

/**
 * Props for DialogueContainer component
 */
export interface DialogueContainerProps {
  /** The dialogue node to render */
  dialogue: GLOSTDialogue;
  /** Children (typically rendered sentences) */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Render function for header (title, context) */
  renderHeader?: (title?: string, context?: string) => React.ReactNode;
  /** Render function for participants list */
  renderParticipants?: (participants: DialogueParticipant[]) => React.ReactNode;
  /** Show participants list */
  showParticipants?: boolean;
}

/**
 * Default inline styles for the dialogue container
 */
const defaultContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  borderRadius: "0.5rem",
  border: "1px solid #e5e7eb",
  backgroundColor: "#f9fafb",
};

const defaultHeaderStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontStyle: "italic",
  color: "#6b7280",
};

const defaultParticipantsStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
  fontSize: "0.75rem",
  color: "#9ca3af",
};

/**
 * Container component for rendering GloST dialogues
 *
 * This is a headless component that wraps dialogue content with
 * optional header (title, context) and participants list.
 *
 * @example
 * ```tsx
 * <DialogueContainer dialogue={dialogue} showParticipants>
 *   {dialogue.children.map((sentence, i) => (
 *     <DialogueTurn key={i} sentence={sentence} />
 *   ))}
 * </DialogueContainer>
 * ```
 */
export function DialogueContainer({
  dialogue,
  children,
  className,
  renderHeader,
  renderParticipants,
  showParticipants = false,
}: DialogueContainerProps): React.ReactElement {
  const participants = getDialogueParticipants(dialogue);
  const context = getDialogueContext(dialogue);
  const title = getDialogueTitle(dialogue);

  const defaultRenderHeader = (t?: string, c?: string) => {
    if (!t && !c) return null;
    return (
      <div style={defaultHeaderStyle}>
        {t && <strong>{t}</strong>}
        {t && c && " — "}
        {c}
      </div>
    );
  };

  const defaultRenderParticipants = (parts: DialogueParticipant[]) => {
    if (parts.length === 0) return null;
    return (
      <div style={defaultParticipantsStyle}>
        <span>Participants:</span>
        {parts.map((p, i) => (
          <span key={p.id}>
            {p.name || p.id}
            {p.role && ` (${p.role})`}
            {i < parts.length - 1 && ","}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={className} style={defaultContainerStyle}>
      {(renderHeader ?? defaultRenderHeader)(title, context)}
      {showParticipants &&
        (renderParticipants ?? defaultRenderParticipants)(participants)}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {children}
      </div>
    </div>
  );
}
