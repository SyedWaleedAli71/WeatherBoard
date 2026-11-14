export function formatFullDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatUpdatedAt(timestamp) {
  if (!timestamp) return "just now";

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function formatClock(localDateTime) {
  if (!localDateTime) return "—";

  const timePart = localDateTime.includes("T")
    ? localDateTime.split("T")[1]
    : localDateTime;
  const [hours, minutes] = timePart.split(":").map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return "—";

  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function formatDayLabel(dateString, index) {
  if (index === 0) return "Today";

  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export function formatVisibility(meters) {
  if (!Number.isFinite(meters)) return "—";
  const kilometers = Math.round((meters / 1000) * 10) / 10;
  return `${kilometers} km`;
}
