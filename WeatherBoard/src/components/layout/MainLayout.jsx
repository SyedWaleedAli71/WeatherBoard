import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
  favorites,
  activeCity,
  onSelectCity,
  onRemoveFavorite,
  onOpenNotifications,
  isOnline,
  isStale,
  loading,
  reminderEnabled,
  storageAvailable,
  limit,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const selectCity = (city) => {
    onSelectCity(city);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <Sidebar
        favorites={favorites}
        activeCity={activeCity}
        onSelectCity={selectCity}
        onRemoveFavorite={onRemoveFavorite}
        onOpenNotifications={onOpenNotifications}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        reminderEnabled={reminderEnabled}
        storageAvailable={storageAvailable}
        limit={limit}
      />

      {menuOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
          type="button"
        />
      )}

      <main className="main-content">
        <Header
          onOpenMenu={() => setMenuOpen(true)}
          onOpenNotifications={onOpenNotifications}
          isOnline={isOnline}
          isStale={isStale}
          loading={loading}
          reminderEnabled={reminderEnabled}
        />
        {children}
      </main>
    </div>
  );
}
