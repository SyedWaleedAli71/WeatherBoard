export default function Loading({ cityName }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="sr-only">
        Loading live weather{cityName ? ` for ${cityName}` : ""}…
      </span>

      <div className="skeleton hero-skeleton" aria-hidden="true">
        <div className="skeleton-line skeleton-line-sm" />
        <div className="skeleton-line skeleton-line-lg" />
        <div className="skeleton-line skeleton-line-md" />
        <div className="skeleton-temp" />
      </div>

      <div className="skeleton-grid" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="skeleton skeleton-card" key={index} />
        ))}
      </div>

      <div className="skeleton-grid skeleton-grid-forecast" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="skeleton skeleton-card" key={index} />
        ))}
      </div>

      <p className="loading-caption">
        Fetching live weather{cityName ? ` for ${cityName}` : ""}…
      </p>
    </div>
  );
}
