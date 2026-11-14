import { Bell, CloudSun, Heart, Sun, X } from "lucide-react";
import FavoriteCities from "../favorites/FavoriteCities";

export default function Sidebar({
  favorites,
  activeCity,
  onSelectCity,
  onRemoveFavorite,
  onOpenNotifications,
  isOpen,
  onClose,
  reminderEnabled,
  storageAvailable,
  limit,
}) {
  const focusFavourites = () => {
    document
      .querySelector("#favourite-cities .favorite-city")
      ?.focus();
  };

  const openNotifications = () => {
    onClose();
    onOpenNotifications();
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">
          <Sun size={25} />
        </div>
        <span>
          Weather<span className="brand-light">Board</span>
        </span>
        <button
          className="mobile-close"
          onClick={onClose}
          aria-label="Close navigation menu"
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <div className="sidebar-label">MENU</div>

      <nav className="side-nav" aria-label="Main navigation">
        <button
          className="nav-item active"
          type="button"
          aria-current="page"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <CloudSun size={19} /> Weather Dashboard
        </button>
        <button className="nav-item" type="button" onClick={focusFavourites}>
          <Heart size={19} /> Favourite Cities
        </button>
        <button className="nav-item" type="button" onClick={openNotifications}>
          <Bell size={19} /> Notifications
          {reminderEnabled && <span className="nav-dot" aria-label="on" />}
        </button>
      </nav>

      <div className="sidebar-label favorites-heading">
        <span>FAVOURITE LOCATIONS</span>
        <span className="favorites-count">
          {favorites.length}
          {limit ? `/${limit}` : ""}
        </span>
      </div>

      <div id="favourite-cities">
        <FavoriteCities
          favorites={favorites}
          activeCity={activeCity}
          onSelectCity={(city) => {
            onSelectCity(city);
            onClose();
          }}
          onRemoveFavorite={onRemoveFavorite}
        />
      </div>

      {!storageAvailable && (
        <p className="storage-warning" role="status">
          Browser storage is unavailable, so favourites cannot be saved after
          you close this tab.
        </p>
      )}

      <div className="sidebar-bottom">
        <div className="sidebar-info">
          <div className="sidebar-info-head">
            <CloudSun size={17} />
            <h4>Quick daily check</h4>
          </div>
          <p>
            Search any city, save up to five favourites, and keep the last
            reading available when you go offline.
          </p>
          <span>Live data from public weather APIs</span>
        </div>
        <p className="sidebar-footer">© 2026 WeatherBoard</p>
      </div>
    </aside>
  );
}
