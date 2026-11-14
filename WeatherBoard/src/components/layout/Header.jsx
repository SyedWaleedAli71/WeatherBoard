import { Bell, Menu } from "lucide-react";

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

export default function Header({
  onOpenMenu,
  onOpenNotifications,
  isOnline,
  isStale,
  loading,
  reminderEnabled,
}) {
  const status = !isOnline
    ? { label: "Offline", tone: "offline" }
    : loading
      ? { label: "Syncing", tone: "loading" }
      : isStale
        ? { label: "Saved data", tone: "stale" }
        : { label: "Live data", tone: "live" };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          type="button"
        >
          <Menu size={23} />
        </button>
        <div>
          <p className="top-eyebrow">WEATHER OVERVIEW</p>
          <h2>{greetingForNow()}</h2>
        </div>
      </div>

      <div className="topbar-actions">
        <span
          className={`live-status live-status-${status.tone}`}
          role="status"
        >
          <span />
          {status.label}
        </span>
        <button
          className={`icon-button ${reminderEnabled ? "has-reminder" : ""}`}
          onClick={onOpenNotifications}
          aria-label="Open daily reminder settings"
          title="Daily reminder settings"
          type="button"
        >
          <Bell size={19} />
          {reminderEnabled && <span className="icon-dot" />}
        </button>
        <div className="avatar" aria-hidden="true">
          WA
        </div>
      </div>
    </header>
  );
}
