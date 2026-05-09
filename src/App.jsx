// ============================================
// ROOT APP COMPONENT
// Layout: Sidebar | Editor | AI Panel
// ============================================

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { NotesProvider } from "./context/NotesContext";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import AIPanel from "./components/AIPanel";
import "./App.css";

export default function App() {
  // Dark mode toggle state
  const [darkMode, setDarkMode] = useState(false);

  return (
    // Apply dark mode class to root div
    <div className={`app ${darkMode ? "dark" : ""}`}>
      {/* Wrap everything in context provider */}
      <NotesProvider>
        {/* ── HEADER BAR ── */}
        <header className="app__header">
          <span className="header__brand">✏️ AI Notes</span>

          <div className="header__controls">
            {/* Dark mode toggle */}
            <button
              className="dark-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle dark mode"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* ── MAIN LAYOUT ── */}
        {/* 3-column grid: Sidebar | Editor | AI Panel */}
        <main className="app__layout">
          <Sidebar />
          <Editor />
          <AIPanel />
        </main>
      </NotesProvider>

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "8px",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}