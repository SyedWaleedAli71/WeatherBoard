import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BellOff,
  BellRing,
  CircleCheck,
  Info,
  Timer,
  TriangleExclamationPoint,
  X,
} from "lucide-react";
import { nextReminderDate } from "../../services/notificationService";

const PERMISSION_COPY = {
  granted: "Notification permission is granted.",
  denied:
    "Notifications are blocked for this site. You can allow them again in your browser's site settings.",
  default: "Notification permission has not been requested yet.",
  unsupported: "This browser does not support notifications.",
};

function formatNextReminder(time) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    }).format(nextReminderDate(time));
  } catch {
    return time;
  }
}

export default function NotificationSettings({
  open,
  onClose,
  notifications,
  cityName,
}) {
  const {
    settings,
    permission,
    supported,
    message,
    enableReminder,
    disableReminder,
    updateReminderTime,
    sendTestNotification,
    isEnabled,
  } = notifications;

  const [time, setTime] = useState(settings.time);
  const [busy, setBusy] = useState(false);
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const run = async (action) => {
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  };

  const PermissionIcon =
    permission === "granted"
      ? CircleCheck
      : permission === "unsupported" || permission === "denied"
        ? TriangleExclamationPoint
        : Info;

  return createPortal(
    <div className="dialog-layer" role="presentation">
      <div className="dialog-backdrop" onClick={onClose} />
      <div
        className="settings-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="settings-header">
          <div className="settings-title">
            <div className="settings-icon">
              <BellRing size={21} />
            </div>
            <div>
              <h2 id={titleId}>Daily weather reminder</h2>
              <p>One quiet morning nudge to check the forecast.</p>
            </div>
          </div>
          <button
            className="dialog-close settings-close"
            onClick={onClose}
            aria-label="Close notification settings"
            ref={closeRef}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="settings-body">
          <p className="settings-explainer">
            WeatherBoard can send one reminder each morning. When you turn
            reminders on, your browser will ask for notification permission —
            nothing is requested until then. No marketing or extra messages are
            sent.
          </p>

          <div className={`permission-note permission-${permission}`}>
            <PermissionIcon size={16} />
            <span>{PERMISSION_COPY[permission]}</span>
          </div>

          <label className="settings-field">
            <span>
              <Timer size={15} /> Reminder time
            </span>
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              disabled={!supported}
              aria-label="Daily reminder time"
            />
          </label>

          <div className="settings-actions">
            {isEnabled ? (
              <button
                className="secondary-button"
                onClick={() => run(disableReminder)}
                disabled={busy}
                type="button"
              >
                <BellOff size={15} /> Turn off reminder
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={() => run(() => enableReminder(time))}
                disabled={busy || !supported}
                type="button"
              >
                <BellRing size={15} /> Enable daily reminder
              </button>
            )}

            <button
              className="secondary-button"
              onClick={() => run(() => updateReminderTime(time))}
              disabled={!supported || busy}
              type="button"
            >
              Save time
            </button>

            <button
              className="secondary-button"
              onClick={() => run(sendTestNotification)}
              disabled={permission !== "granted" || busy}
              type="button"
            >
              Send test
            </button>
          </div>

          <div className="settings-status" role="status" aria-live="polite">
            {message ||
              (isEnabled
                ? `Reminder is on for ${settings.time}${
                    cityName ? ` · ${cityName}` : ""
                  }. Next reminder: ${formatNextReminder(settings.time)}.`
                : "Reminders are currently off.")}
          </div>

          <div className="settings-limit">
            <Info size={16} />
            <div>
              <strong>Closed-tab limitation</strong>
              <p>
                A local timer or service worker cannot guarantee a notification
                when the browser or installed app is fully closed. Reliable
                closed-tab delivery needs a Web Push sender (a server or
                third-party push service), which this client-only project does
                not include. The reminder fires while WeatherBoard is open, and
                some browsers may deliver it from the service worker in the
                background — but that is not guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
