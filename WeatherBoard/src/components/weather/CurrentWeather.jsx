import { motion } from "motion/react";
import { Droplets, Heart, MapPin, Sunrise, Sunset, Wind } from "lucide-react";
import WeatherIcon from "../ui/WeatherIcon";
import { conditionTone } from "../../utils/weatherTone";
import { formatUpdatedAt } from "../../utils/format";
import { getCityLabel } from "../../utils/cities";

export default function CurrentWeather({
  city,
  weather,
  date,
  isFavorite,
  onFavoriteClick,
  isStale,
  savedAt,
}) {
  const current = weather.current;
  const locationLabel = getCityLabel(city);
  const favouriteLabel = isFavorite
    ? `Remove ${city.name} from favourite cities`
    : `Add ${city.name} to favourite cities`;

  return (
    <motion.section
      className="hero-weather"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="hero-glow" />

      <div className="hero-top">
        <div>
          <div className="location-tag">
            <MapPin size={15} /> {isStale ? "SAVED WEATHER" : "LIVE WEATHER"}
          </div>
          <h2>{city.name}</h2>
          <p className="hero-date">
            {date}
            {locationLabel ? ` · ${locationLabel}` : ""}
          </p>
          <p className={`hero-data-status ${isStale ? "is-stale" : ""}`}>
            {isStale
              ? `Not live · saved ${formatUpdatedAt(savedAt)}`
              : `Updated ${formatUpdatedAt(savedAt)} · ${weather.source}`}
          </p>
        </div>
        <button
          className={`hero-favorite ${isFavorite ? "is-favorite" : ""}`}
          onClick={onFavoriteClick}
          aria-label={favouriteLabel}
          aria-pressed={isFavorite}
          title={favouriteLabel}
          type="button"
        >
          <Heart size={21} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="hero-weather-main">
        <div className="temperature-block">
          <div className="temperature">
            {current.temperature}
            <span>°</span>
          </div>
          <div className="weather-description">
            <h3>{current.condition.label}</h3>
            <p>Feels like {current.feelsLike}</p>
          </div>
        </div>

        <motion.div
          className={`sun-illustration tone-${conditionTone(current.condition.icon)}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <WeatherIcon
            name={current.condition.icon}
            size={112}
            strokeWidth={1.2}
          />
        </motion.div>
      </div>

      <div className="hero-bottom">
        <div>
          <Droplets size={18} />
          <span>Humidity</span>
          <strong>{current.humidity}</strong>
        </div>
        <div>
          <Wind size={18} />
          <span>Wind</span>
          <strong>{current.windSpeed}</strong>
        </div>
        <div>
          <Sunrise size={18} />
          <span>Sunrise</span>
          <strong>{current.sunrise}</strong>
        </div>
        <div>
          <Sunset size={18} />
          <span>Sunset</span>
          <strong>{current.sunset}</strong>
        </div>
      </div>
    </motion.section>
  );
}
