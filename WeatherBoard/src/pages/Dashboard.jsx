import { useCallback, useEffect, useState } from "react";
import { Sun } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import CitySearch from "../components/search/CitySearch";
import CurrentWeather from "../components/weather/CurrentWeather";
import WeatherHighlights from "../components/weather/WeatherHighlights";
import Forecast from "../components/weather/Forecast";
import NotificationSettings from "../components/notifications/NotificationSettings";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loading from "../components/ui/Loading";
import OfflineBanner from "../components/ui/OfflineBanner";
import Toast from "../components/ui/Toast";
import { useFavorites } from "../hooks/useFavorites";
import { useNotifications } from "../hooks/useNotifications";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useWeather } from "../hooks/useWeather";
import { DEFAULT_CITY, isValidCity } from "../utils/cities";
import { formatFullDate, formatUpdatedAt } from "../utils/format";
import {
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from "../utils/storage";

function loadInitialCity() {
  const savedCity = readStorage(STORAGE_KEYS.lastCity, null);
  if (isValidCity(savedCity)) return savedCity;

  const cachedWeather = readStorage(STORAGE_KEYS.lastWeather, null);
  if (isValidCity(cachedWeather?.city)) return cachedWeather.city;

  return DEFAULT_CITY;
}

export default function Dashboard() {
  const [activeCity, setActiveCity] = useState(loadInitialCity);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [pendingRemoval, setPendingRemoval] = useState(null);
  const [toast, setToast] = useState(null);

  const isOnline = useOnlineStatus();
  const { data, loading, error, isStale, savedAt, retry } =
    useWeather(activeCity);
  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    storageAvailable,
    limit,
  } = useFavorites();
  const notifications = useNotifications(activeCity?.name);
  const { setMessage: setNotificationMessage } = notifications;

  useEffect(() => {
    if (activeCity) writeStorage(STORAGE_KEYS.lastCity, activeCity);
  }, [activeCity]);

  const openNotifications = useCallback(() => {
    setNotificationMessage("");
    setNotificationOpen(true);
  }, [setNotificationMessage]);

  const closeNotifications = useCallback(() => {
    setNotificationOpen(false);
  }, []);

  const showToast = useCallback((message, tone = "info") => {
    setToast({ message, tone, id: Date.now() });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const handleSelectCity = useCallback((city) => {
    if (isValidCity(city)) setActiveCity(city);
  }, []);

  const handleFavoriteClick = useCallback(() => {
    if (!activeCity) return;

    if (isFavorite(activeCity)) {
      setPendingRemoval(activeCity);
      return;
    }

    const result = addFavorite(activeCity);
    showToast(result.message, result.ok ? "success" : "error");
  }, [activeCity, addFavorite, isFavorite, showToast]);

  const handleConfirmRemoval = useCallback(() => {
    if (!pendingRemoval) return;

    removeFavorite(pendingRemoval);
    showToast(
      `${pendingRemoval.name} was removed from your favourite cities.`,
      "success",
    );
    setPendingRemoval(null);
  }, [pendingRemoval, removeFavorite, showToast]);

  const showLoading = loading && !data;
  const showError = Boolean(error) && !data;

  return (
    <>
      <MainLayout
        favorites={favorites}
        activeCity={activeCity}
        onSelectCity={handleSelectCity}
        onRemoveFavorite={setPendingRemoval}
        onOpenNotifications={openNotifications}
        isOnline={isOnline}
        isStale={isStale}
        loading={loading}
        reminderEnabled={notifications.isEnabled}
        storageAvailable={storageAvailable}
        limit={limit}
      >
        {!isOnline && (
          <OfflineBanner
            hasSavedWeather={Boolean(data)}
            cityName={activeCity?.name}
          />
        )}

        <section className="welcome-row">
          <div>
            <h1>Weather Dashboard</h1>
            <p>Track the weather. Plan your day. Stay prepared.</p>
          </div>

          <CitySearch onSelectCity={handleSelectCity} />
        </section>

        {showLoading && <Loading cityName={activeCity?.name} />}

        {showError && (
          <ErrorMessage
            title={isOnline ? "Live weather unavailable" : "You are offline"}
            message={error}
            onRetry={retry}
            offline={!isOnline}
          />
        )}

        {data && (
          <>
            {isStale && (
              <div className="stale-notice" role="status">
                <p>{error || "Showing the last saved weather for this city."}</p>
                <button
                  className="secondary-button"
                  onClick={retry}
                  type="button"
                >
                  Retry live weather
                </button>
              </div>
            )}

            <CurrentWeather
              city={data.city}
              weather={data}
              date={formatFullDate()}
              isFavorite={isFavorite(data.city)}
              onFavoriteClick={handleFavoriteClick}
              isStale={isStale}
              savedAt={savedAt}
            />

            <WeatherHighlights weather={data} />

            <Forecast daily={data.daily} />
          </>
        )}

        <footer className="app-footer">
          <div>
            <Sun size={17} /> <strong>WeatherBoard</strong>
            <span>
              · Weather data from{" "}
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noreferrer"
              >
                OpenWeatherMap
              </a>
              {" "}and{" "}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
              >
                Open-Meteo
              </a>
            </span>
          </div>
          <span className="footer-meta">
            {data
              ? `${isStale ? "Saved" : "Updated"} ${formatUpdatedAt(
                  savedAt,
                )} · ${data.source} · ${data.city.name}`
              : "Waiting for weather data"}
          </span>
        </footer>
      </MainLayout>

      <ConfirmDialog
        open={Boolean(pendingRemoval)}
        title="Remove favourite city?"
        message={
          pendingRemoval
            ? `${pendingRemoval.name} will be removed from your favourite cities. You can add it again at any time.`
            : ""
        }
        confirmLabel="Remove city"
        onConfirm={handleConfirmRemoval}
        onCancel={() => setPendingRemoval(null)}
      />

      {notificationOpen && (
        <NotificationSettings
          open
          onClose={closeNotifications}
          notifications={notifications}
          cityName={activeCity?.name}
        />
      )}

      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  );
}
