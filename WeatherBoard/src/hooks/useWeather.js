import { useCallback, useEffect, useRef, useState } from "react";
import { getWeather } from "../services/weatherService";
import { isSameCity } from "../utils/cities";
import { readStorage, STORAGE_KEYS, writeStorage } from "../utils/storage";

export function useWeather(city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(city));
  const [error, setError] = useState("");
  const [isStale, setIsStale] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [refreshToken, setRefreshToken] = useState(0);
  const activeRequest = useRef(0);

  const retry = useCallback(() => {
    setRefreshToken((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!city) return undefined;

    const controller = new AbortController();
    const requestNumber = ++activeRequest.current;
    const online =
      typeof navigator === "undefined" ? true : navigator.onLine;
    const cached = readStorage(STORAGE_KEYS.lastWeather, null);
    const cachedForCity =
      cached && isSameCity(cached.city, city) ? cached : null;

    setData(null);
    setError("");
    setIsStale(false);
    setSavedAt(null);

    if (!online) {
      if (cachedForCity) {
        setData(cachedForCity.data);
        setSavedAt(cachedForCity.savedAt);
        setIsStale(true);
        setError(
          `You are offline. Showing the last saved weather for ${city.name}.`,
        );
      } else {
        setError(
          `You are offline and no weather is saved for ${city.name} yet. Reconnect and try again.`,
        );
      }
      setLoading(false);
      return () => controller.abort();
    }

    setLoading(true);

    const loadWeather = async () => {
      try {
        const weather = await getWeather(city, { signal: controller.signal });
        if (activeRequest.current !== requestNumber) return;

        const timestamp = Date.now();
        setData(weather);
        setSavedAt(timestamp);
        setIsStale(false);
        setError("");
        writeStorage(STORAGE_KEYS.lastWeather, {
          city,
          data: weather,
          savedAt: timestamp,
        });
      } catch (requestError) {
        if (requestError.name === "AbortError") return;
        if (activeRequest.current !== requestNumber) return;

        if (cachedForCity) {
          setData(cachedForCity.data);
          setSavedAt(cachedForCity.savedAt);
          setIsStale(true);
          setError(
            `Live weather is unavailable right now. Showing the last saved weather for ${city.name}.`,
          );
        } else {
          setData(null);
          setError(
            requestError.message ||
              "The weather could not be loaded. Check your connection and try again.",
          );
        }
      } finally {
        if (activeRequest.current === requestNumber) setLoading(false);
      }
    };

    loadWeather();

    return () => controller.abort();
  }, [city, refreshToken]);

  useEffect(() => {
    const handleOnline = () => setRefreshToken((current) => current + 1);
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return { data, loading, error, isStale, savedAt, retry };
}
