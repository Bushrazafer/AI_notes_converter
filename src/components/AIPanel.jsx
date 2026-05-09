// ============================================
// AI PANEL — AI action buttons + results
// ============================================

import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { runAIAction } from "../services/aiService";
import toast from "react-hot-toast";
import AIResultModal from "./AIResultModal";

// Available AI actions config
const AI_ACTIONS = [
  { id: "summarize", label: "📋 Summarize", color: "#4f46e5" },
  { id: "improve",   label: "✨ Improve",   color: "#059669" },
  { id: "explain",   label: "💡 Explain",   color: "#d97706" },
  { id: "expand",    label: "📝 Expand",    color: "#7c3aed" },
  { id: "translate", label: "🌍 Translate", color: "#dc2626" },
];

// Language options for translate
const LANGUAGES = [
  "English",
  "Urdu",
  "Arabic",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Hindi",
  "Bengali",
  "Punjabi",
  "Russian",
  "Korean",
  "Turkish",
  "Persian (Farsi)",
  "Dutch",
  "Indonesian",
  "Malay",
  "Thai",
  "Vietnamese",
  "Polish",
  "Ukrainian",
  "Romanian",
  "Greek",
  "Swedish",
  "Czech",
  "Hungarian",
];

export default function AIPanel() {
  const { activeNote, updateNote } = useNotes();

  // AI result state
  const [aiResult, setAiResult]         = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [targetLang, setTargetLang]     = useState("English");
  const [showModal, setShowModal]       = useState(false);

  // ============================================
  // HANDLE AI ACTION CLICK
  // ============================================
  const handleAction = async (actionId) => {
    // Guard: need an active note with content
    if (!activeNote) {
      toast.error("Please select a note first");
      return;
    }
    if (!activeNote.content.trim()) {
      toast.error("Note is empty. Write something first!");
      return;
    }

    // Set loading state
    setIsLoading(true);
    setActiveAction(actionId);
    setAiResult(""); // Clear previous result

    try {
      // Call AI service
      const result = await runAIAction(
        actionId,
        activeNote.content,
        { language: targetLang }
      );

      setAiResult(result);
      setShowModal(true); // Open modal with result
      toast.success("✨ AI response ready!");

    } catch (error) {
      toast.error(error.message || "AI failed. Try again.");
      setAiResult("");
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // APPLY RESULT TO NOTE
  // Replaces note content with AI result
  // ============================================
  const handleApplyToNote = () => {
    if (!activeNote || !aiResult) return;

    updateNote(activeNote.id, { content: aiResult });
    toast.success("✅ Applied to note!");
    setAiResult("");
    setActiveAction("");
    setShowModal(false);
  };

  // ============================================
  // CLOSE MODAL
  // ============================================
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      <div className="ai-panel">
        <h2 className="ai-panel__title">🤖 AI Assistant</h2>

        {/* No note selected message */}
        {!activeNote && (
          <p className="ai-panel__hint">
            Select or create a note to use AI features
          </p>
        )}

        {/* Action Buttons */}
        <div className="ai-panel__actions">
          {AI_ACTIONS.map((action) => (
            <button
              key={action.id}
              className={`ai-btn ${activeAction === action.id ? "ai-btn--active" : ""}`}
              style={{ "--btn-color": action.color }}
              onClick={() => handleAction(action.id)}
              disabled={isLoading || !activeNote}
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Language selector (only show for translate) */}
        <div className="ai-panel__translate">
          <label className="translate-label">
            🌍 Translate to:
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="translate-select"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="ai-loading">
            <div className="spinner"></div>
            <p>AI is thinking...</p>
          </div>
        )}

        {/* Tips when no result */}
        {!isLoading && activeNote && (
          <div className="ai-panel__tips">
            <p>💡 Tips:</p>
            <ul>
              <li>📋 <strong>Summarize</strong> → 3 bullet points</li>
              <li>✨ <strong>Improve</strong> → Fix grammar & clarity</li>
              <li>💡 <strong>Explain</strong> → Simple language</li>
              <li>📝 <strong>Expand</strong> → Add more detail</li>
              <li>🌍 <strong>Translate</strong> → Any language</li>
            </ul>
          </div>
        )}
      </div>

      {/* AI Result Modal */}
      <AIResultModal
        isOpen={showModal}
        result={aiResult}
        actionLabel={AI_ACTIONS.find((a) => a.id === activeAction)?.label || "AI"}
        onClose={handleCloseModal}
        onApply={handleApplyToNote}
      />
    </>
  );
}