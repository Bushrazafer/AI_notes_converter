// ============================================
// EDITOR — main note writing area
// With auto-save + tag management
// ============================================

import { useState, useEffect, useCallback } from "react";
import { useNotes } from "../context/NotesContext";
import Modal from "./Modal";
import toast from "react-hot-toast";

export default function Editor() {
  const {
    activeNote,
    updateNote,
    deleteNote,
    pinNote,
    addTag,
    removeTag,
  } = useNotes();

  // Local state for the editor fields
  const [title, setTitle]           = useState("");
  const [content, setContent]       = useState("");
  const [tagInput, setTagInput]     = useState("");
  const [isSaved, setIsSaved]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [wordCount, setWordCount]   = useState(0);

  // ============================================
  // SYNC LOCAL STATE WHEN ACTIVE NOTE CHANGES
  // ============================================
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setIsSaved(true);
    }
  }, [activeNote?.id]); // Only re-run when the NOTE ID changes

  // ============================================
  // WORD COUNT
  // ============================================
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [content]);

  // ============================================
  // AUTO-SAVE WITH DEBOUNCE
  // Waits 800ms after user stops typing
  // ============================================
  useEffect(() => {
    if (!activeNote) return;

    // Mark as unsaved immediately
    setIsSaved(false);

    // Set timer to save after 800ms of no typing
    const timer = setTimeout(() => {
      updateNote(activeNote.id, {
        title: title || "Untitled Note",
        content: content,
      });

      // Show saved indicator
      setIsSaved(true);
      toast.success("Saved!", {
        duration: 1000,
        position: "bottom-right",
        style: { fontSize: "12px", padding: "6px 12px" },
      });
    }, 800);

    // Cleanup: cancel timer if user types again
    return () => clearTimeout(timer);
  }, [title, content]); // Run when title or content changes

  // ============================================
  // HANDLE TAG INPUT — add tag on Enter key
  // ============================================
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newTag = tagInput.trim().toLowerCase();

      if (!newTag) return;
      if (activeNote.tags.includes(newTag)) {
        toast.error("Tag already exists!");
        return;
      }

      addTag(activeNote.id, newTag);
      setTagInput(""); // Clear input
      toast.success(`Tag "${newTag}" added`);
    }
  };

  // ============================================
  // HANDLE DELETE NOTE
  // ============================================
  const handleDeleteConfirm = () => {
    deleteNote(activeNote.id);
    setShowModal(false);
    toast.success("Note deleted");
  };

  // ============================================
  // FORMAT DATE
  // ============================================
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============================================
  // EMPTY STATE — No note selected
  // ============================================
  if (!activeNote) {
    return (
      <div className="editor editor--empty">
        <div className="editor__empty-state">
          <p className="empty-icon">📝</p>
          <h2>No note selected</h2>
          <p>Select a note from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER EDITOR
  // ============================================
  return (
    <div className="editor">
      {/* ── TOOLBAR ── */}
      <div className="editor__toolbar">
        {/* Left: save status */}
        <div className="toolbar__left">
          <span className={`save-status ${isSaved ? "save-status--saved" : "save-status--saving"}`}>
            {isSaved ? "✅ Saved" : "⏳ Saving..."}
          </span>
          <span className="word-count">{wordCount} words</span>
          <span className="char-count">{content.length} chars</span>
        </div>

        {/* Right: note actions */}
        <div className="toolbar__right">
          {/* Last edited */}
          <span className="last-edited">
            Edited {formatDate(activeNote.updatedAt)}
          </span>

          {/* Pin button */}
          <button
            className={`toolbar-btn ${activeNote.isPinned ? "toolbar-btn--active" : ""}`}
            onClick={() => pinNote(activeNote.id)}
            title={activeNote.isPinned ? "Unpin note" : "Pin note"}
          >
            {activeNote.isPinned ? "📌 Pinned" : "📌 Pin"}
          </button>

          {/* Delete button */}
          <button
            className="toolbar-btn toolbar-btn--danger"
            onClick={() => setShowModal(true)}
            title="Delete note"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* ── TITLE INPUT ── */}
      <input
        type="text"
        className="editor__title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
        maxLength={100}
      />

      {/* ── CONTENT TEXTAREA ── */}
      <textarea
        className="editor__content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your note here...

Tip: Use the AI panel on the right to summarize, improve, or translate your notes!"
      />

      {/* ── TAGS SECTION ── */}
      <div className="editor__tags">
        <div className="tags-list">
          {/* Existing tags */}
          {activeNote.tags.map((tag) => (
            <span key={tag} className="tag tag--removable">
              #{tag}
              <button
                className="tag__remove"
                onClick={() => removeTag(activeNote.id, tag)}
                title={`Remove #${tag}`}
              >
                ✕
              </button>
            </span>
          ))}

          {/* Tag input */}
          <input
            type="text"
            className="tag-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="+ Add tag (press Enter)"
            maxLength={20}
          />
        </div>
      </div>

      {/* ── DELETE MODAL ── */}
      <Modal
        isOpen={showModal}
        title="Delete Note"
        message={`Are you sure you want to delete "${activeNote.title}"? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}