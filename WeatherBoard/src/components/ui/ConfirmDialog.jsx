import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { TriangleExclamationPoint, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Remove",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    cancelRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="dialog-layer" role="presentation">
      <div className="dialog-backdrop" onClick={onCancel} />
      <div
        className="dialog-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="dialog-icon">
          <TriangleExclamationPoint size={22} />
        </div>
        <h2 id={titleId}>{title}</h2>
        <p id={descriptionId}>{message}</p>
        <div className="dialog-actions">
          <button
            className="secondary-button"
            onClick={onCancel}
            ref={cancelRef}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className="danger-button"
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
        <button
          className="dialog-close"
          onClick={onCancel}
          aria-label="Close dialog"
          type="button"
        >
          <X size={18} />
        </button>
      </div>
    </div>,
    document.body,
  );
}
