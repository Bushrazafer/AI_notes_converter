// ============================================
// AI RESULT MODAL — Full screen AI result display
// ============================================

import { useState } from "react";
import toast from "react-hot-toast";

export default function AIResultModal({ 
  isOpen, 
  result, 
  actionLabel, 
  onClose, 
  onApply 
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success("📋 Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  // Format result with proper line breaks and styling
  const formatResult = (text) => {
    return text.split('\n').map((line, i) => {
      // Check if line is a bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={i} className="result-bullet">
            {line}
          </div>
        );
      }
      // Check if line is a heading (starts with #)
      if (line.trim().startsWith('#')) {
        return (
          <div key={i} className="result-heading">
            {line.replace(/^#+\s*/, '')}
          </div>
        );
      }
      // Regular paragraph
      return line.trim() ? (
        <p key={i} className="result-paragraph">
          {line}
        </p>
      ) : (
        <br key={i} />
      );
    });
  };

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal__header">
          <div className="ai-modal__title">
            <span className="ai-modal__icon">✨</span>
            <span>{actionLabel} Result</span>
          </div>
          <button 
            className="ai-modal__close" 
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="ai-modal__content">
          <div className="ai-modal__result">
            {formatResult(result)}
          </div>
        </div>

        {/* Footer with actions */}
        <div className="ai-modal__footer">
          <button
            className="btn-modal btn-modal--copy"
            onClick={handleCopy}
          >
            {copied ? "✓ Copied!" : "📋 Copy Text"}
          </button>
          <button
            className="btn-modal btn-modal--apply"
            onClick={() => {
              onApply();
              onClose();
            }}
          >
            ✅ Apply to Note
          </button>
          <button
            className="btn-modal btn-modal--close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
