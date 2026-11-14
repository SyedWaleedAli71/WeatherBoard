import { useCallback, useEffect, useRef, useState } from "react";
import {
  CITY_SEARCH_DEBOUNCE_MS,
  searchCities,
} from "../services/cityService";
import { validateCityQuery } from "../utils/validation";

export function useCitySearch({ onSelectCity }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [open, setOpen] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const requestId = useRef(0);
  const abortRef = useRef(null);
  const timerRef = useRef(null);
  const justSelectedRef = useRef(false);

  const runSearch = useCallback(async (value) => {
    clearTimeout(timerRef.current);
    const validation = validateCityQuery(value);

    if (validation) {
      setFieldError(validation);
      setLoading(false);
      return [];
    }

    const currentRequest = ++requestId.current;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError("");
    setFieldError("");

    try {
      const cities = await searchCities(value, { signal: controller.signal });

      if (requestId.current !== currentRequest) return [];

      setResults(cities);
      setSearchedQuery(value.trim());
      setActiveIndex(-1);
      return cities;
    } catch (requestError) {
      if (requestError.name === "AbortError") return [];
      if (requestId.current !== currentRequest) return [];

      setResults([]);
      setSearchedQuery(value.trim());
      setError(
        requestError.message ||
          "City search failed. Check your connection and try again.",
      );
      return [];
    } finally {
      if (requestId.current === currentRequest) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const value = query.trim();

    clearTimeout(timerRef.current);

    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }

    if (!value) {
      abortRef.current?.abort();
      setResults([]);
      setLoading(false);
      setError("");
      setActiveIndex(-1);
      return;
    }

    if (value.length < 2) {
      abortRef.current?.abort();
      setResults([]);
      setLoading(false);
      setError("");
      setActiveIndex(-1);
      return;
    }

    setOpen(true);
    setLoading(true);
    setError("");
    setResults([]);

    timerRef.current = setTimeout(() => {
      runSearch(value);
    }, CITY_SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timerRef.current);
  }, [query, runSearch]);

  const selectCity = useCallback(
    (city) => {
      clearTimeout(timerRef.current);
      abortRef.current?.abort();
      justSelectedRef.current = true;
      setQuery(city.name);
      setResults([]);
      setSearchedQuery("");
      setError("");
      setFieldError("");
      setActiveIndex(-1);
      setOpen(false);
      onSelectCity(city);
    },
    [onSelectCity],
  );

  const handleQueryChange = (value) => {
    setQuery(value);
    setFieldError("");
    setOpen(value.trim().length >= 2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validateCityQuery(query);
    if (validation) {
      setFieldError(validation);
      setOpen(true);
      return;
    }

    if (results.length > 0) {
      selectCity(results[Math.max(activeIndex, 0)]);
      return;
    }

    const cities = await runSearch(query);
    setOpen(true);

    if (cities.length > 0) {
      selectCity(cities[0]);
    }
  };

  const handleBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;

    setOpen(false);

    const validation = validateCityQuery(query);
    if (validation) setFieldError(validation);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(
        (current) => (current - 1 + results.length) % results.length,
      );
    }

    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }

    if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      selectCity(results[activeIndex]);
    }
  };

  const hasSearched =
    query.trim().length >= 2 &&
    searchedQuery === query.trim() &&
    !loading;

  return {
    query,
    results,
    loading,
    error,
    fieldError,
    open,
    hasSearched,
    activeIndex,
    setOpen,
    handleQueryChange,
    handleSubmit,
    handleBlur,
    handleKeyDown,
    selectCity,
  };
}
