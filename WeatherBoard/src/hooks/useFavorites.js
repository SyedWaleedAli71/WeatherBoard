import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_FAVORITES,
  isSameCity,
  isValidCity,
} from "../utils/cities";
import {
  isStorageAvailable,
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from "../utils/storage";

export const FAVORITES_LIMIT = 5;

function loadFavorites() {
  const stored = readStorage(STORAGE_KEYS.favorites, null);

  if (!Array.isArray(stored)) {
    return DEFAULT_FAVORITES;
  }

  return stored.filter(isValidCity).slice(0, FAVORITES_LIMIT);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);
  const storageAvailable = isStorageAvailable();

  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  const findFavorite = useCallback(
    (city) => favorites.find((favorite) => isSameCity(favorite, city)) || null,
    [favorites],
  );

  const isFavorite = useCallback(
    (city) => Boolean(findFavorite(city)),
    [findFavorite],
  );

  const addFavorite = useCallback(
    (city) => {
      if (!isValidCity(city)) {
        return {
          ok: false,
          reason: "invalid",
          message: "This city cannot be saved. Search for it again and retry.",
        };
      }

      if (favorites.some((favorite) => isSameCity(favorite, city))) {
        return {
          ok: false,
          reason: "duplicate",
          message: `${city.name} is already in your favourite cities.`,
        };
      }

      if (favorites.length >= FAVORITES_LIMIT) {
        return {
          ok: false,
          reason: "limit",
          message: `You can save up to ${FAVORITES_LIMIT} favourite cities. Remove one before adding another.`,
        };
      }

      setFavorites((current) => [...current, city]);
      return {
        ok: true,
        reason: "added",
        message: `${city.name} was added to your favourite cities.`,
      };
    },
    [favorites],
  );

  const removeFavorite = useCallback((city) => {
    setFavorites((current) =>
      current.filter((favorite) => !isSameCity(favorite, city)),
    );
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    findFavorite,
    storageAvailable,
    limit: FAVORITES_LIMIT,
  };
}
