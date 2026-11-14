const memoryStore = new Map();
let availabilityCache;

export const STORAGE_KEYS = {
  favorites: "weatherboard:favorites",
  lastWeather: "weatherboard:last-weather",
  lastCity: "weatherboard:last-city",
  reminder: "weatherboard:reminder",
};

export function isStorageAvailable() {
  if (availabilityCache !== undefined) return availabilityCache;

  if (typeof window === "undefined" || !window.localStorage) {
    availabilityCache = false;
    return availabilityCache;
  }

  try {
    const testKey = "__weatherboard_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    availabilityCache = true;
  } catch {
    availabilityCache = false;
  }

  return availabilityCache;
}

export function readStorage(key, fallback = null) {
  try {
    const raw = isStorageAvailable()
      ? window.localStorage.getItem(key)
      : memoryStore.get(key);

    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  const serialized = JSON.stringify(value);

  try {
    if (isStorageAvailable()) {
      window.localStorage.setItem(key, serialized);
    } else {
      memoryStore.set(key, serialized);
    }
    return true;
  } catch {
    memoryStore.set(key, serialized);
    return false;
  }
}

export function removeStorage(key) {
  try {
    if (isStorageAvailable()) {
      window.localStorage.removeItem(key);
    } else {
      memoryStore.delete(key);
    }
  } catch {
    memoryStore.delete(key);
  }
}
