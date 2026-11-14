import { cityKey, isValidCity } from "../utils/cities";

const GEODB_BASE_URL =
  import.meta.env.VITE_GEODB_BASE_URL || "https://wft-geo-db.p.rapidapi.com/v1/geo";
const GEODB_KEY = import.meta.env.VITE_RAPIDAPI_KEY?.trim() || "";
const OPEN_METEO_GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const CITY_SEARCH_DEBOUNCE_MS = 300;

export class CitySearchError extends Error {
  constructor(message, code = "city_search_failed") {
    super(message);
    this.name = "CitySearchError";
    this.code = code;
  }
}

function normalizeGeoDbCity(city) {
  return {
    id: `geodb-${city.id}`,
    name: city.city,
    region: city.region || "",
    country: city.country || "",
    countryCode: city.countryCode || "",
    latitude: Number(city.latitude),
    longitude: Number(city.longitude),
    population: Number(city.population) || 0,
    label: [city.city, city.region, city.country].filter(Boolean).join(", "),
  };
}

function normalizeOpenMeteoCity(city) {
  return {
    id: `openmeteo-${city.id}`,
    name: city.name,
    region: city.admin1 || "",
    country: city.country || "",
    countryCode: city.country_code || "",
    latitude: Number(city.latitude),
    longitude: Number(city.longitude),
    population: Number(city.population) || 0,
    label: [city.name, city.admin1, city.country].filter(Boolean).join(", "),
  };
}

function dedupeAndLimit(cities, limit) {
  const seen = new Set();

  return cities
    .filter(isValidCity)
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .filter((city) => {
      const key = cityKey(city);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

async function searchWithGeoDb(query, signal, limit) {
  const url = new URL(`${GEODB_BASE_URL.replace(/\/$/, "")}/cities`);
  url.searchParams.set("namePrefix", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("sort", "-population");
  url.searchParams.set("languageCode", "en");
  url.searchParams.set("types", "CITY");

  const response = await fetch(url, {
    signal,
    headers: {
      "X-RapidAPI-Key": GEODB_KEY,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new CitySearchError(
      response.status === 429
        ? "City search is busy right now. Please wait a moment and try again."
        : "City suggestions could not be loaded from the city service.",
      response.status === 429 ? "rate_limited" : "geodb_error",
    );
  }

  const payload = await response.json();
  return Array.isArray(payload.data)
    ? payload.data.map(normalizeGeoDbCity)
    : [];
}

async function searchWithOpenMeteo(query, signal, limit) {
  const url = new URL(OPEN_METEO_GEOCODING_URL);
  url.searchParams.set("name", query);
  url.searchParams.set("count", String(limit));
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new CitySearchError(
      "City suggestions are unavailable right now. Check your connection and try again.",
      "geocoding_error",
    );
  }

  const payload = await response.json();
  return Array.isArray(payload.results)
    ? payload.results.map(normalizeOpenMeteoCity)
    : [];
}

export async function searchCities(query, { signal, limit = 8 } = {}) {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  let primaryError = null;

  if (GEODB_KEY) {
    try {
      const results = await searchWithGeoDb(trimmed, signal, limit);
      if (results.length > 0) return dedupeAndLimit(results, limit);
    } catch (error) {
      if (error.name === "AbortError") throw error;
      primaryError = error;
    }
  }

  try {
    const results = await searchWithOpenMeteo(trimmed, signal, limit);
    return dedupeAndLimit(results, limit);
  } catch (error) {
    if (error.name === "AbortError") throw error;

    if (error instanceof CitySearchError) throw error;
    if (primaryError) throw primaryError;

    throw new CitySearchError(
      "City search failed. Check your network connection and try again.",
      "network_error",
    );
  }
}

export function isGeoDbConfigured() {
  return Boolean(GEODB_KEY);
}
