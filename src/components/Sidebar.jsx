// ============================================
// SIDEBAR — notes list + search + new note
// ============================================

import { useMemo } from "react";
import { useNotes } from "../context/NotesContext";
import NoteCard from "./NoteCard";

export default function Sidebar() {
  const { notes, searchQuery, setSearchQuery, createNote } = useNotes();

  // ============================================
  // FILTER + SORT NOTES
  // Pinned notes always on top
  // ============================================
  const filteredNotes = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    // Filter by search query
    const filtered =
      query === ""
        ? notes
        : notes.filter(
            (note) =>
              note.title.toLowerCase().includes(query) ||
              note.content.toLowerCase().includes(query) ||
              note.tags.some((tag) => tag.includes(query))
          );

    // Sort: pinned first, then by updatedAt (newest first)
    const pinned = filtered.filter((n) => n.isPinned);
    const unpinned = filtered
      .filter((n) => !n.isPinned)
      .sort((a, b) => b.updatedAt - a.updatedAt);

    return [...pinned, ...unpinned];
  }, [notes, searchQuery]);

  return (
    <aside className="sidebar">
      {/* App Title */}
      <div className="sidebar__header">
        <h1 className="sidebar__logo">✏️ AI Notes</h1>
        <button className="btn-new" onClick={createNote} title="New Note">
          +
        </button>
      </div>

      {/* Search Input */}
      <div className="sidebar__search">
        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {/* Clear search button */}
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => setSearchQuery("")}
          >
            ✕
          </button>
        )}
      </div>

      {/* Notes Count */}
      <p className="sidebar__count">
        {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""}
      </p>

      {/* Notes List */}
      <div className="sidebar__list">
        {filteredNotes.length === 0 ? (
          <div className="sidebar__empty">
            {searchQuery ? (
              <>
                <p>🔍 No notes found</p>
                <p>Try a different search term</p>
              </>
            ) : (
              <>
                <p>📝 No notes yet</p>
                <button className="btn-create-first" onClick={createNote}>
                  Create your first note
                </button>
              </>
            )}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))
        )}
      </div>
    </aside>
  );
}