const REMINDER_TAG = "weatherboard-daily-reminder";

export function isNotificationSupported() {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator
  );
}

export function getNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";

  try {
    return await Notification.requestPermission();
  } catch {
    return "denied";
  }
}

export function nextReminderDate(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);

  if (next.getTime() <= Date.now()) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}

function reminderBody(cityName) {
  return `Good morning! Open WeatherBoard to check today's weather${
    cityName ? ` in ${cityName}` : ""
  }.`;
}

export async function scheduleServiceWorkerReminder({ time, cityName }) {
  if (!isNotificationSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    registration.active?.postMessage({
      type: "WEATHERBOARD_SCHEDULE_REMINDER",
      time,
      cityName,
    });

    if ("periodicSync" in registration) {
      try {
        await registration.periodicSync.register("weatherboard-reminder", {
          minInterval: 6 * 60 * 60 * 1000,
        });
      } catch {
        // Periodic background sync is optional and may be denied by the browser.
      }
    }

    return true;
  } catch {
    return false;
  }
}

export async function cancelServiceWorkerReminder() {
  if (!isNotificationSupported()) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    registration.active?.postMessage({
      type: "WEATHERBOARD_CANCEL_REMINDER",
    });

    if ("periodicSync" in registration) {
      await registration.periodicSync.unregister("weatherboard-reminder");
    }
  } catch {
    // The reminder is already inactive; nothing else to clean up.
  }
}

export async function showReminderNotification({ cityName }) {
  if (
    !isNotificationSupported() ||
    getNotificationPermission() !== "granted"
  ) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification("WeatherBoard daily reminder", {
      body: reminderBody(cityName),
      icon: "/icons/pwa-192.png",
      badge: "/icons/pwa-192.png",
      tag: REMINDER_TAG,
      data: { url: "/" },
    });
    return true;
  } catch {
    return false;
  }
}
