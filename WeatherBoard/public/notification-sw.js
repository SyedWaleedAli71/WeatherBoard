/* global self, caches, clients */

const SETTINGS_CACHE = "weatherboard-reminder-settings";
const SETTINGS_KEY = "/__weatherboard_reminder_settings__";
const REMINDER_TAG = "weatherboard-daily-reminder";
const MAX_TIMEOUT = 2147483647;

let reminderTimer = null;

function parseTime(time) {
  const [hours, minutes] = String(time || "07:00").split(":").map(Number);
  return { hours, minutes };
}

function nextOccurrence(time) {
  const { hours, minutes } = parseTime(time);
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);
  if (next.getTime() <= Date.now()) next.setDate(next.getDate() + 1);
  return next;
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function readSettings() {
  try {
    const cache = await caches.open(SETTINGS_CACHE);
    const response = await cache.match(SETTINGS_KEY);
    return response ? await response.json() : null;
  } catch {
    return null;
  }
}

async function writeSettings(settings) {
  try {
    const cache = await caches.open(SETTINGS_CACHE);
    await cache.put(
      SETTINGS_KEY,
      new Response(JSON.stringify(settings), {
        headers: { "Content-Type": "application/json" },
      }),
    );
  } catch {
    // The reminder remains best-effort if storage is unavailable.
  }
}

function reminderBody(cityName) {
  return `Good morning! Open WeatherBoard to check today's weather${
    cityName ? ` in ${cityName}` : ""
  }.`;
}

async function markNotified(settings) {
  const next = { ...settings, lastNotifiedDate: dateKey(new Date()) };
  await writeSettings(next);
  return next;
}

async function showReminder(settings) {
  await self.registration.showNotification("WeatherBoard daily reminder", {
    body: reminderBody(settings.cityName),
    icon: "/icons/pwa-192.png",
    badge: "/icons/pwa-192.png",
    tag: REMINDER_TAG,
    data: { url: "/" },
  });
}

async function scheduleReminder(settings) {
  if (!settings?.enabled) return;

  if (reminderTimer) {
    clearTimeout(reminderTimer);
    reminderTimer = null;
  }

  const next = nextOccurrence(settings.time);
  const delay = Math.max(1000, next.getTime() - Date.now());

  reminderTimer = setTimeout(async () => {
    reminderTimer = null;
    try {
      await showReminder(settings);
      const updated = await markNotified(settings);
      scheduleReminder(updated);
    } catch {
      scheduleReminder(settings);
    }
  }, Math.min(delay, MAX_TIMEOUT));
}

async function checkScheduledReminder() {
  const settings = await readSettings();
  if (!settings?.enabled) return;

  const { hours, minutes } = parseTime(settings.time);
  const now = new Date();
  const scheduled = new Date(now);
  scheduled.setHours(hours, minutes, 0, 0);

  const elapsed = now.getTime() - scheduled.getTime();
  const alreadyNotified = settings.lastNotifiedDate === dateKey(now);

  if (elapsed >= 0 && elapsed < 60 * 60 * 1000 && !alreadyNotified) {
    try {
      await showReminder(settings);
      await markNotified(settings);
    } catch {
      // The next periodic sync can retry.
    }
  }

  scheduleReminder(settings);
}

self.addEventListener("message", (event) => {
  const data = event.data;

  if (data?.type === "WEATHERBOARD_SCHEDULE_REMINDER") {
    readSettings().then((existing) => {
      const settings = {
        enabled: true,
        time: data.time || "07:00",
        cityName: data.cityName || "",
        lastNotifiedDate: existing?.lastNotifiedDate || "",
      };

      writeSettings(settings).then(() => scheduleReminder(settings));
    });
  }

  if (data?.type === "WEATHERBOARD_CANCEL_REMINDER") {
    if (reminderTimer) {
      clearTimeout(reminderTimer);
      reminderTimer = null;
    }
    writeSettings({ enabled: false, time: "07:00", cityName: "" });
  }
});

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "weatherboard-reminder") {
    event.waitUntil(checkScheduledReminder());
  }
});

self.addEventListener("activate", () => {
  readSettings().then((settings) => {
    if (settings?.enabled) scheduleReminder(settings);
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.navigate("/");
            return client.focus();
          }
        }
        return clients.openWindow("/");
      }),
  );
});
