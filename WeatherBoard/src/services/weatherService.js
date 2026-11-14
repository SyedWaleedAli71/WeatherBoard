import { describeOpenWeather, describeWeather } from "../utils/weatherCodes";
import {
  formatClock,
  formatDayLabel,
  formatVisibility,
} from "../utils/format";

const OPEN_METEO_BASE_URL =
  import.meta.env.VITE_OPEN_METEO_BASE_URL || "https://api.open-meteo.com/v1/forecast";
const OPEN_WEATHER_BASE_URL = (
  import.meta.env.VITE_OPENWEATHER_BASE_URL ||
  "https://api.openweathermap.org/data/2.5"
).replace(/\/$/, "");
const OPEN_WEATHER_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY?.trim() || "";

const OPEN_METEO_SOURCE = "Open-Meteo";
const OPEN_METEO_FALLBACK_SOURCE = "Open-Meteo (backup)";
const OPEN_WEATHER_SOURCE = "OpenWeatherMap";

const CURRENT_FIELDS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "is_day",
  "weather_code",
  "wind_speed_10m",
  "visibility",
];

const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
];

export class WeatherError extends Error {
  constructor(message, code = "weather_error") {
    super(message);
    this.name = "WeatherError";
    this.code = code;
  }
}

function createRequestSignal(signal) {
  if (typeof AbortSignal === "undefined" || !AbortSignal.timeout) return signal;

  const timeoutSignal = AbortSignal.timeout(15000);
  if (!signal) return timeoutSignal;

  if (AbortSignal.any) return AbortSignal.any([signal, timeoutSignal]);
  return signal;
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function assertCoordinates(city) {
  if (
    !city ||
    !Number.isFinite(city.latitude) ||
    !Number.isFinite(city.longitude)
  ) {
    throw new WeatherError(
      "This city is missing its coordinates. Search for the city again and select a suggestion.",
      "invalid_city",
    );
  }
}

async function fetchJson(url, { signal, provider }) {
  let response;

  try {
    response = await fetch(url, { signal: createRequestSignal(signal) });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    if (error.name === "TimeoutError") {
      throw new WeatherError(
        `${provider} took too long to respond. Check your connection and try again.`,
        "timeout",
      );
    }
    throw new WeatherError(
      `We could not reach ${provider}. Check your internet connection and try again.`,
      "network_error",
    );
  }

  if (!response.ok) {
    throw new WeatherError(
      response.status === 429
        ? `${provider} is busy right now. Please wait a moment and try again.`
        : `${provider} is unavailable right now. Please try again in a moment.`,
      response.status === 429 ? "rate_limited" : "weather_unavailable",
    );
  }

  try {
    return await response.json();
  } catch {
    throw new WeatherError(
      `${provider} returned an unreadable response. Please try again.`,
      "invalid_response",
    );
  }
}

function formatSunTime(unixSeconds, offsetSeconds = 0) {
  const seconds = toNumber(unixSeconds);
  if (seconds === null) return "—";

  const local = new Date((seconds + offsetSeconds) * 1000);
  const hours = String(local.getUTCHours()).padStart(2, "0");
  const minutes = String(local.getUTCMinutes()).padStart(2, "0");

  return formatClock(`${hours}:${minutes}`);
}

function localDateKey(unixSeconds, offsetSeconds) {
  const local = new Date((unixSeconds + offsetSeconds) * 1000);

  return [
    local.getUTCFullYear(),
    String(local.getUTCMonth() + 1).padStart(2, "0"),
    String(local.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function groupForecastByDay(list, offsetSeconds) {
  const days = new Map();

  for (const entry of list) {
    const dt = toNumber(entry?.dt);
    const temperature = toNumber(entry?.main?.temp);
    if (dt === null || temperature === null) continue;

    const key = localDateKey(dt, offsetSeconds);
    const existing = days.get(key);

    if (!existing) {
      days.set(key, {
        date: key,
        high: temperature,
        low: temperature,
        entries: [entry],
      });
      continue;
    }

    existing.high = Math.max(existing.high, temperature);
    existing.low = Math.min(existing.low, temperature);
    existing.entries.push(entry);
  }

  return [...days.values()];
}

function pickDaytimeEntry(entries, offsetSeconds) {
  return entries.reduce((best, entry) => {
    const local = new Date((toNumber(entry.dt) + offsetSeconds) * 1000);
    const distance = Math.abs(local.getUTCHours() - 12);
    const bestLocal = new Date((toNumber(best.dt) + offsetSeconds) * 1000);
    const bestDistance = Math.abs(bestLocal.getUTCHours() - 12);

    return distance < bestDistance ? entry : best;
  });
}

function normalizeOpenMeteo(payload, city, { fallback = false } = {}) {
  if (payload?.error) {
    throw new WeatherError(
      "The weather service could not find data for this location. Try another city.",
      "invalid_location",
    );
  }

  if (
    !payload?.current ||
    !payload?.daily ||
    !Array.isArray(payload.daily.time) ||
    payload.daily.time.length === 0
  ) {
    throw new WeatherError(
      "The weather service returned incomplete data. Please try again.",
      "invalid_response",
    );
  }

  const { current, daily } = payload;
  const temperature = toNumber(current.temperature_2m);
  const feelsLike = toNumber(current.apparent_temperature);
  const humidity = toNumber(current.relative_humidity_2m);
  const windSpeed = toNumber(current.wind_speed_10m);
  const visibility = toNumber(current.visibility);
  const weatherCode = toNumber(current.weather_code);
  const isDay = current.is_day !== 0;

  if (temperature === null || weatherCode === null) {
    throw new WeatherError(
      "The weather service returned incomplete current conditions. Please try again.",
      "invalid_response",
    );
  }

  const dailyItems = daily.time.slice(0, 5).map((date, index) => {
    const high = toNumber(daily.temperature_2m_max?.[index]);
    const low = toNumber(daily.temperature_2m_min?.[index]);
    const code = toNumber(daily.weather_code?.[index]);

    if (high === null || low === null || code === null) {
      throw new WeatherError(
        "The forecast data is incomplete. Please try again.",
        "invalid_response",
      );
    }

    return {
      date,
      dayLabel: formatDayLabel(date, index),
      high: Math.round(high),
      low: Math.round(low),
      condition: describeWeather(code, true),
    };
  });

  return {
    source: fallback ? OPEN_METEO_FALLBACK_SOURCE : OPEN_METEO_SOURCE,
    fetchedAt: Date.now(),
    timezone: payload.timezone || "",
    city,
    current: {
      temperature: Math.round(temperature),
      feelsLike: feelsLike === null ? "—" : `${Math.round(feelsLike)}°`,
      humidity: humidity === null ? "—" : `${Math.round(humidity)}%`,
      windSpeed: windSpeed === null ? "—" : `${Math.round(windSpeed)} km/h`,
      visibility: formatVisibility(visibility),
      condition: describeWeather(weatherCode, isDay),
      isDay,
      observedAt: current.time || "",
      sunrise: formatClock(daily.sunrise?.[0]),
      sunset: formatClock(daily.sunset?.[0]),
    },
    daily: dailyItems,
  };
}

function buildOpenMeteoUrl(city) {
  const url = new URL(OPEN_METEO_BASE_URL);
  url.searchParams.set("latitude", String(city.latitude));
  url.searchParams.set("longitude", String(city.longitude));
  url.searchParams.set("current", CURRENT_FIELDS.join(","));
  url.searchParams.set("daily", DAILY_FIELDS.join(","));
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "5");

  return url;
}

function normalizeOpenWeather(current, forecast, city) {
  const weatherEntry = Array.isArray(current?.weather)
    ? current.weather[0]
    : null;
  const conditionId = toNumber(weatherEntry?.id);
  const temperature = toNumber(current?.main?.temp);
  const offsetSeconds = toNumber(current?.timezone) ?? 0;

  if (conditionId === null || temperature === null) {
    throw new WeatherError(
      "OpenWeatherMap returned incomplete current conditions. Please try again.",
      "invalid_response",
    );
  }

  const feelsLike = toNumber(current.main?.feels_like);
  const humidity = toNumber(current.main?.humidity);
  const windSpeed = toNumber(current.wind?.speed);
  const visibility = toNumber(current.visibility);
  const icon = String(weatherEntry.icon || "");
  const isDay = icon
    ? !icon.endsWith("n")
    : toNumber(current.dt) !== null &&
      toNumber(current.sys?.sunrise) !== null &&
      toNumber(current.sys?.sunset) !== null
      ? toNumber(current.dt) >= toNumber(current.sys.sunrise) &&
        toNumber(current.dt) <= toNumber(current.sys.sunset)
      : true;

  const dailyItems = groupForecastByDay(
    Array.isArray(forecast?.list) ? forecast.list : [],
    offsetSeconds,
  )
    .slice(0, 5)
    .map((day, index) => {
      const entry = pickDaytimeEntry(day.entries, offsetSeconds);
      const code = toNumber(entry?.weather?.[0]?.id);

      if (!entry || code === null) {
        throw new WeatherError(
          "The forecast data is incomplete. Please try again.",
          "invalid_response",
        );
      }

      return {
        date: day.date,
        dayLabel: formatDayLabel(day.date, index),
        high: Math.round(day.high),
        low: Math.round(day.low),
        condition: describeOpenWeather(code, true),
      };
    });

  if (dailyItems.length === 0) {
    throw new WeatherError(
      "OpenWeatherMap returned no forecast data for this city. Please try again.",
      "invalid_response",
    );
  }

  return {
    source: OPEN_WEATHER_SOURCE,
    fetchedAt: Date.now(),
    timezone: current?.name || "",
    city,
    current: {
      temperature: Math.round(temperature),
      feelsLike: feelsLike === null ? "—" : `${Math.round(feelsLike)}°`,
      humidity: humidity === null ? "—" : `${Math.round(humidity)}%`,
      windSpeed:
        windSpeed === null ? "—" : `${Math.round(windSpeed * 3.6)} km/h`,
      visibility: formatVisibility(visibility),
      condition: describeOpenWeather(conditionId, isDay),
      isDay,
      observedAt:
        toNumber(current.dt) === null
          ? ""
          : new Date(toNumber(current.dt) * 1000).toISOString(),
      sunrise: formatSunTime(current?.sys?.sunrise, offsetSeconds),
      sunset: formatSunTime(current?.sys?.sunset, offsetSeconds),
    },
    daily: dailyItems,
  };
}

async function fetchOpenWeather(city, signal) {
  const createUrl = (endpoint) => {
    const url = new URL(`${OPEN_WEATHER_BASE_URL}/${endpoint}`);
    url.searchParams.set("lat", String(city.latitude));
    url.searchParams.set("lon", String(city.longitude));
    url.searchParams.set("appid", OPEN_WEATHER_KEY);
    url.searchParams.set("units", "metric");
    return url;
  };

  const [current, forecast] = await Promise.all([
    fetchJson(createUrl("weather"), {
      signal,
      provider: OPEN_WEATHER_SOURCE,
    }),
    fetchJson(createUrl("forecast"), {
      signal,
      provider: OPEN_WEATHER_SOURCE,
    }),
  ]);

  if (current?.cod && Number(current.cod) !== 200) {
    throw new WeatherError(
      "OpenWeatherMap could not find data for this location. Try another city.",
      "invalid_location",
    );
  }

  return normalizeOpenWeather(current, forecast, city);
}

function describeFallbackFailure(primaryError, fallbackError) {
  if (
    primaryError?.code === "rate_limited" ||
    fallbackError?.code === "rate_limited"
  ) {
    return "Both weather services are busy right now. Please wait a moment and try again.";
  }

  if (fallbackError?.code === "timeout") {
    return "The weather services took too long to respond. Check your connection and try again.";
  }

  return "We could not load live weather from OpenWeatherMap or the Open-Meteo backup. Check your internet connection and try again.";
}

export function isOpenWeatherConfigured() {
  return Boolean(OPEN_WEATHER_KEY);
}

export async function getWeather(city, { signal } = {}) {
  assertCoordinates(city);

  if (!OPEN_WEATHER_KEY) {
    const payload = await fetchJson(buildOpenMeteoUrl(city), {
      signal,
      provider: OPEN_METEO_SOURCE,
    });

    return normalizeOpenMeteo(payload, city);
  }

  let primaryError = null;

  try {
    return await fetchOpenWeather(city, signal);
  } catch (error) {
    if (error.name === "AbortError") throw error;
    primaryError = error;
  }

  try {
    const payload = await fetchJson(buildOpenMeteoUrl(city), {
      signal,
      provider: OPEN_METEO_FALLBACK_SOURCE,
    });

    return normalizeOpenMeteo(payload, city, { fallback: true });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new WeatherError(
      describeFallbackFailure(primaryError, error),
      "all_providers_failed",
    );
  }
}
