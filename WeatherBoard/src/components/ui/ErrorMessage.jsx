import { CircleX, RefreshCw, WifiOff } from "lucide-react";

export default function ErrorMessage({
  title = "Weather unavailable",
  message,
  onRetry,
  offline = false,
}) {
  return (
    <section className="state-card state-error" role="alert">
      <div className="state-icon">
        {offline ? <WifiOff size={24} /> : <CircleX size={24} />}
      </div>
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="primary-button" onClick={onRetry} type="button">
          <RefreshCw size={15} /> Try again
        </button>
      )}
      <p className="state-hint">
        Your favourite cities and saved settings are still available.
      </p>
    </section>
  );
}
