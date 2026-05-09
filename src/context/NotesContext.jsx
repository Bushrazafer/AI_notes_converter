// ============================================
// GLOBAL STATE - NOTES CONTEXT
// Manages all notes data across the app
// ============================================

import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveNotes, loadNotes } from "../utils/storage";

// Create the context
const NotesContext = createContext(null);

// ============================================
// CONTEXT PROVIDER COMPONENT
// ============================================
export function NotesProvider({ children }) {
  // All notes array - loaded from localStorage on start
  const [notes, setNotes] = useState(() => {
    const saved = loadNotes();
    // If no saved notes, create a welcome note
    if (saved.length === 0) {
      const welcomeNote = {
        id: uuidv4(),
        title: "Welcome to AI Notes! 🎉",
        content:
          "This is your first note. Try writing something and use the AI panel to summarize, improve, or translate it!\n\nFeatures:\n- Auto-save as you type\n- AI-powered actions\n- Tags & search\n- Pin important notes",
        tags: ["welcome", "getting-started"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isPinned: true,
      };
      return [welcomeNote];
    }
    return saved;
  });

  // Currently selected/open note
  const [activeNoteId, setActiveNoteId] = useState(() => {
    const saved = loadNotes();
    return saved.length > 0 ? saved[0].id : null;
  });

  // Search filter string
  const [searchQuery, setSearchQuery] = useState("");

  // Save to localStorage whenever notes change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // ============================================
  // GET ACTIVE NOTE OBJECT
  // ============================================
  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  // ============================================
  // CREATE NEW NOTE
  // ============================================
  const createNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      content: "",
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false,
    };

    // Add new note at the beginning of the array
    setNotes((prev) => [newNote, ...prev]);
    // Immediately set it as active
    setActiveNoteId(newNote.id);
    return newNote;
  };

  // ============================================
  // UPDATE EXISTING NOTE
  // ============================================
  const updateNote = (id, changes) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...changes, updatedAt: Date.now() }
          : note
      )
    );
  };

  // ============================================
  // DELETE NOTE
  // ============================================
  const deleteNote = (id) => {
    setNotes((prev) => {
      const updated = prev.filter((note) => note.id !== id);

      // After deleting, select the next available note
      if (id === activeNoteId) {
        const nextNote = updated[0] || null;
        setActiveNoteId(nextNote ? nextNote.id : null);
      }

      return updated;
    });
  };

  // ============================================
  // TOGGLE PIN NOTE
  // ============================================
  const pinNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  // ============================================
  // ADD TAG TO NOTE
  // ============================================
  const addTag = (id, tag) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    // Don't add duplicate tags
    if (note.tags.includes(tag)) return;

    updateNote(id, { tags: [...note.tags, tag] });
  };

  // ============================================
  // REMOVE TAG FROM NOTE
  // ============================================
  const removeTag = (id, tagToRemove) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    updateNote(id, {
      tags: note.tags.filter((t) => t !== tagToRemove),
    });
  };

  // ============================================
  // CONTEXT VALUE — everything exported
  // ============================================
  const value = {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    pinNote,
    addTag,
    removeTag,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK — easy access to context
// ============================================
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used inside NotesProvider");
  }
  return context;
}