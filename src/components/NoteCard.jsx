// ============================================
// NOTE CARD — shown in sidebar list
// ============================================

import { useNotes } from "../context/NotesContext";

// Format timestamp to readable date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  // If today, show time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Otherwise show date
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

// Trim content preview to 80 characters
function getPreview(content) {
  if (!content) return "No content yet...";
  const cleaned = content.replace(/\n/g, " ").trim();
  return cleaned.length > 80 ? cleaned.slice(0, 80) + "..." : cleaned;
}

export default function NoteCard({ note }) {
  const { activeNoteId, setActiveNoteId } = useNotes();

  // Check if this card is currently selected
  const isActive = note.id === activeNoteId;

  return (
    <div
      className={`note-card ${isActive ? "note-card--active" : ""}`}
      onClick={() => setActiveNoteId(note.id)}
    >
      {/* Top row: title + pin icon */}
      <div className="note-card__header">
        <h3 className="note-card__title">
          {note.isPinned && <span className="pin-icon">📌 </span>}
          {note.title || "Untitled Note"}
        </h3>
        <span className="note-card__date">{formatDate(note.updatedAt)}</span>
      </div>

      {/* Content preview */}
      <p className="note-card__preview">{getPreview(note.content)}</p>

      {/* Tags row */}
      {note.tags.length > 0 && (
        <div className="note-card__tags">
          {note.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}