// ============================================
// MODAL — confirmation dialogs
// ============================================

export default function Modal({ isOpen, title, message, onConfirm, onCancel }) {
  // Don't render if not open
  if (!isOpen) return null;

  return (
    // Dark overlay background
    <div className="modal-overlay" onClick={onCancel}>
      {/* Modal box — stop click from closing */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <p className="modal__message">{message}</p>

        <div className="modal__buttons">
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}