// ============================================
// LOCALSTORAGE HELPER FUNCTIONS
// ============================================

const STORAGE_KEY = "ai_notes_app_data";

// Save notes array to localStorage
export const saveNotes = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to save notes:", error);
  }
};

// Load notes array from localStorage
export const loadNotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    // If no data found, return empty array
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load notes:", error);
    return [];
  }
};

// Clear all notes from localStorage
export const clearAllNotes = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear notes:", error);
  }
};