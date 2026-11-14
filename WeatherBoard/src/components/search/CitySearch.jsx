import { useRef } from "react";
import { LoaderCircle, Search, X } from "lucide-react";
import { useCitySearch } from "../../hooks/useCitySearch";

const LIST_ID = "city-search-results";
const ERROR_ID = "city-search-error";

export default function CitySearch({ onSelectCity }) {
  const {
    query,
    results,
    loading,
    error,
    fieldError,
    open,
    hasSearched,
    activeIndex,
    handleQueryChange,
    handleSubmit,
    handleBlur,
    handleKeyDown,
    selectCity,
  } = useCitySearch({ onSelectCity });

  const inputRef = useRef(null);
  const showPanel =
    open && query.trim().length >= 2 && Boolean(loading || error || hasSearched);

  const clearQuery = () => {
    handleQueryChange("");
    inputRef.current?.focus();
  };

  return (
    <form
      className="search-wrapper"
      role="search"
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      noValidate
    >
      <div className={`search-box ${fieldError ? "search-box-error" : ""}`}>
        <Search size={19} aria-hidden="true" />
        <input
          ref={inputRef}
          id="city-search-input"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search a city..."
          aria-label="Search city"
          aria-invalid={Boolean(fieldError)}
          aria-describedby={fieldError ? ERROR_ID : undefined}
          aria-autocomplete="list"
          aria-expanded={showPanel}
          aria-haspopup="listbox"
          aria-controls={LIST_ID}
          aria-activedescendant={
            activeIndex >= 0 ? `city-option-${activeIndex}` : undefined
          }
          role="combobox"
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            className="search-clear"
            onClick={clearQuery}
            aria-label="Clear city search"
            type="button"
          >
            <X size={15} />
          </button>
        )}
        <button
          className="search-submit"
          type="submit"
          disabled={loading}
          aria-label={loading ? "Searching cities" : "Search"}
        >
          {loading ? (
            <LoaderCircle className="spin" size={15} />
          ) : (
            "Search"
          )}
        </button>
      </div>

      {fieldError && (
        <p className="field-error" id={ERROR_ID} role="alert">
          {fieldError}
        </p>
      )}

      <div
        className="search-results"
        id={LIST_ID}
        role="listbox"
        aria-label="City suggestions"
        hidden={!showPanel}
      >
        {showPanel && (
          <>
            {loading && (
              <div className="search-status">
                <LoaderCircle className="spin" size={16} /> Searching cities…
              </div>
            )}

            {!loading && error && (
              <div className="search-status search-status-error" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <ul className="suggestion-list">
                {results.map((city, index) => (
                  <li key={city.id}>
                    <button
                      className={`suggestion ${
                        activeIndex === index ? "suggestion-active" : ""
                      }`}
                      id={`city-option-${index}`}
                      role="option"
                      aria-selected={activeIndex === index}
                      onClick={() => selectCity(city)}
                      type="button"
                    >
                      <span className="suggestion-main">
                        <strong>{city.name}</strong>
                        <span>
                          {[city.region, city.country]
                            .filter(Boolean)
                            .join(", ") || "Location"}
                        </span>
                      </span>
                      {city.countryCode && (
                        <span className="suggestion-code">
                          {city.countryCode}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!loading && !error && hasSearched && results.length === 0 && (
              <div className="search-status">
                No cities found for “{query.trim()}”. Check the spelling or try
                a nearby larger city.
              </div>
            )}
          </>
        )}
      </div>
    </form>
  );
}
