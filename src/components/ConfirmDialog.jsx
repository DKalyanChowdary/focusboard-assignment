import { useEffect, useRef } from "react";

export default function ConfirmDialog({ title, message, confirmLabel = "Confirm", danger = true, onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onCancel();
    cancelRef.current?.focus(); // safest default: Cancel
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onCancel]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal-sm" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-desc">
        <h2 id="confirm-title">{title}</h2>
        <p className="modal-sub" id="confirm-desc">{message}</p>
        <div className="modal-actions">
          <button ref={cancelRef} type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button type="button" className={danger ? "btn btn-danger" : "btn btn-primary"} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}