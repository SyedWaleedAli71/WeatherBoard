import { WifiOff } from "lucide-react";

export default function OfflineBanner({ hasSavedWeather, cityName }) {
  return (
    <div className="offline-banner" role="status">
      <WifiOff size={17} />
      <p>
        <strong>You are offline.</strong>{" "}
        {hasSavedWeather
          ? `Showing the last saved weather for ${cityName}. It is not a live reading.`
          : "Reconnect to load live weather. Saved favourites and settings are still available."}
      </p>
    </div>
  );
}
