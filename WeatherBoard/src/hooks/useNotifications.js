import { useCallback, useEffect, useState } from "react";
import {
  cancelServiceWorkerReminder,
  getNotificationPermission,
  isNotificationSupported,
  nextReminderDate,
  requestNotificationPermission,
  scheduleServiceWorkerReminder,
  showReminderNotification,
} from "../services/notificationService";
import { readStorage, STORAGE_KEYS, writeStorage } from "../utils/storage";
import { validateReminderTime } from "../utils/validation";

const DEFAULT_SETTINGS = {
  enabled: false,
  time: "07:00",
};

function loadSettings() {
  const stored = readStorage(STORAGE_KEYS.reminder, null);

  if (!stored || typeof stored !== "object") return DEFAULT_SETTINGS;

  return {
    enabled: Boolean(stored.enabled),
    time:
      typeof stored.time === "string" && !validateReminderTime(stored.time)
        ? stored.time
        : DEFAULT_SETTINGS.time,
  };
}

export function useNotifications(cityName) {
  const [settings, setSettings] = useState(loadSettings);
  const [permission, setPermission] = useState(getNotificationPermission);
  const [message, setMessage] = useState("");
  const supported = isNotificationSupported();

  const persist = useCallback((next) => {
    setSettings(next);
    writeStorage(STORAGE_KEYS.reminder, next);
  }, []);

  useEffect(() => {
    const refreshPermission = () => setPermission(getNotificationPermission());
    document.addEventListener("visibilitychange", refreshPermission);
    window.addEventListener("focus", refreshPermission);

    return () => {
      document.removeEventListener("visibilitychange", refreshPermission);
      window.removeEventListener("focus", refreshPermission);
    };
  }, []);

  useEffect(() => {
    if (!settings.enabled || permission !== "granted") return undefined;

    let cancelled = false;
    let timeoutId;

    const scheduleNext = () => {
      const next = nextReminderDate(settings.time);
      const delay = Math.max(1000, next.getTime() - Date.now());

      timeoutId = window.setTimeout(async () => {
        if (cancelled) return;
        await showReminderNotification({ cityName });
        scheduleNext();
      }, Math.min(delay, 2147483647));
    };

    scheduleNext();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [settings.enabled, settings.time, permission, cityName]);

  useEffect(() => {
    if (!settings.enabled || permission !== "granted") return;

    scheduleServiceWorkerReminder({
      time: settings.time,
      cityName,
    });
  }, [settings.enabled, settings.time, permission, cityName]);

  const enableReminder = useCallback(
    async (time) => {
      const timeError = validateReminderTime(time);
      if (timeError) {
        setMessage(timeError);
        return { ok: false, message: timeError };
      }

      if (!supported) {
        const unsupportedMessage =
          "Notifications are not supported in this browser. WeatherBoard will keep working without reminders.";
        setMessage(unsupportedMessage);
        return { ok: false, message: unsupportedMessage };
      }

      let currentPermission = getNotificationPermission();

      if (currentPermission === "default") {
        currentPermission = await requestNotificationPermission();
        setPermission(currentPermission);
      }

      if (currentPermission !== "granted") {
        const deniedMessage =
          currentPermission === "denied"
            ? "Notifications are blocked. Allow them in your browser's site settings, then try again. The rest of WeatherBoard still works."
            : "Notification permission was not granted. WeatherBoard will keep working without reminders.";
        persist({ enabled: false, time });
        setMessage(deniedMessage);
        return { ok: false, message: deniedMessage };
      }

      persist({ enabled: true, time });
      setMessage(`Daily reminder set for ${time}.`);
      return { ok: true, message: `Daily reminder set for ${time}.` };
    },
    [persist, supported],
  );

  const disableReminder = useCallback(async () => {
    persist({ ...settings, enabled: false });
    await cancelServiceWorkerReminder();
    setMessage("Daily reminders are turned off.");
  }, [persist, settings]);

  const updateReminderTime = useCallback(
    async (time) => {
      const timeError = validateReminderTime(time);
      if (timeError) {
        setMessage(timeError);
        return { ok: false, message: timeError };
      }

      if (settings.enabled) {
        return enableReminder(time);
      }

      persist({ ...settings, time });
      setMessage(`Reminder time saved as ${time}.`);
      return { ok: true, message: `Reminder time saved as ${time}.` };
    },
    [enableReminder, persist, settings],
  );

  const sendTestNotification = useCallback(async () => {
    if (!supported) {
      setMessage(
        "Notifications are not supported in this browser, so a test cannot be sent.",
      );
      return false;
    }

    if (getNotificationPermission() !== "granted") {
      setMessage(
        "Enable notifications first so WeatherBoard can send a test reminder.",
      );
      return false;
    }

    const sent = await showReminderNotification({ cityName });
    setMessage(
      sent
        ? "Test notification sent. If you do not see it, check your system notification settings."
        : "The test notification could not be shown. Check your browser notification settings.",
    );
    return sent;
  }, [cityName, supported]);

  return {
    settings,
    permission,
    supported,
    message,
    setMessage,
    enableReminder,
    disableReminder,
    updateReminderTime,
    sendTestNotification,
    isEnabled: settings.enabled && permission === "granted",
  };
}
