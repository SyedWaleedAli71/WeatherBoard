import { Heart, MapPin, Trash } from "lucide-react";
import { isSameCity } from "../../utils/cities";

export default function FavoriteCities({
  favorites,
  activeCity,
  onSelectCity,
  onRemoveFavorite,
}) {
  if (favorites.length === 0) {
    return (
      <div className="empty-favorites">
        <Heart size={17} />
        <p>No favourite cities yet.</p>
        <span>Search for a city, then use the heart to pin it here.</span>
      </div>
    );
  }

  return (
    <div className="favorite-list">
      {favorites.map((favorite) => {
        const active = isSameCity(activeCity, favorite);
        return (
          <div className="favorite-row" key={favorite.id}>
            <button
              className={`favorite-city ${active ? "selected" : ""}`}
              onClick={() => onSelectCity(favorite)}
              type="button"
              aria-current={active ? "true" : undefined}
            >
              <MapPin size={16} />
              <span className="favorite-text">
                <strong>{favorite.name}</strong>
                <small>
                  {[favorite.region, favorite.country]
                    .filter(Boolean)
                    .join(", ")}
                </small>
              </span>
              <span className="favorite-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
            <button
              className="favorite-remove"
              onClick={() => onRemoveFavorite(favorite)}
              aria-label={`Remove ${favorite.name} from favourite cities`}
              title={`Remove ${favorite.name}`}
              type="button"
            >
              <Trash size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
