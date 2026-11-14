export const DEFAULT_CITY = {
  id: "default-karachi",
  name: "Karachi",
  region: "Sindh",
  country: "Pakistan",
  countryCode: "PK",
  latitude: 24.8608,
  longitude: 67.0104,
  label: "Karachi, Sindh, Pakistan",
};

export const DEFAULT_FAVORITES = [
  {
    id: "default-london",
    name: "London",
    region: "England",
    country: "United Kingdom",
    countryCode: "GB",
    latitude: 51.5074,
    longitude: -0.1278,
    label: "London, England, United Kingdom",
  },
  {
    id: "default-dubai",
    name: "Dubai",
    region: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    latitude: 25.2048,
    longitude: 55.2708,
    label: "Dubai, United Arab Emirates",
  },
  {
    id: "default-new-york",
    name: "New York",
    region: "New York",
    country: "United States",
    countryCode: "US",
    latitude: 40.7128,
    longitude: -74.006,
    label: "New York, New York, United States",
  },
];

export function getCityLabel(city) {
  if (!city) return "";
  return [city.name, city.region, city.country].filter(Boolean).join(", ");
}

export function cityKey(city) {
  if (!city) return "";

  if (Number.isFinite(city.latitude) && Number.isFinite(city.longitude)) {
    return `${Number(city.latitude).toFixed(3)},${Number(city.longitude).toFixed(3)}`;
  }

  return `${city.name || ""}|${city.countryCode || city.country || ""}`.toLowerCase();
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isSameCity(first, second) {
  if (!first || !second) return false;
  if (first.id && second.id && first.id === second.id) return true;
  if (cityKey(first) === cityKey(second)) return true;

  const firstName = normalizeText(first.name);
  const secondName = normalizeText(second.name);

  if (!firstName || firstName !== secondName) return false;

  const firstCountry = normalizeText(first.countryCode || first.country);
  const secondCountry = normalizeText(second.countryCode || second.country);

  if (firstCountry && secondCountry && firstCountry !== secondCountry) {
    return false;
  }

  if (
    Number.isFinite(first.latitude) &&
    Number.isFinite(first.longitude) &&
    Number.isFinite(second.latitude) &&
    Number.isFinite(second.longitude)
  ) {
    return (
      Math.abs(first.latitude - second.latitude) < 0.25 &&
      Math.abs(first.longitude - second.longitude) < 0.25
    );
  }

  return Boolean(firstCountry && firstCountry === secondCountry);
}

export function isValidCity(city) {
  return Boolean(
    city &&
      typeof city.name === "string" &&
      city.name.trim() &&
      Number.isFinite(city.latitude) &&
      Number.isFinite(city.longitude),
  );
}
