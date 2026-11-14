import { useEffect } from "react";
import { CircleCheck, CircleX, Info, X } from "lucide-react";

const ICONS = {
  success: CircleCheck,
  error: CircleX,
  info: Info,
};

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(onDismiss, 4500);
    return () => window.clearTimeout(timeout);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const Icon = ICONS[toast.tone] || Info;

  return (
    <div
      className={`toast toast-${toast.tone || "info"}`}
      role={toast.tone === "error" ? "alert" : "status"}
    >
      <Icon size={18} />
      <p>{toast.message}</p>
      <button onClick={onDismiss} aria-label="Dismiss message" type="button">
        <X size={15} />
      </button>
    </div>
  );
}
