export function validateCityQuery(value) {
  const query = value.trim();

  if (!query) {
    return "Enter a city name to search.";
  }

  if (query.length < 2) {
    return "Enter at least 2 characters so we can find matching cities.";
  }

  if (query.length > 80) {
    return "That city name is too long. Try a shorter search.";
  }

  return "";
}

export function validateReminderTime(value) {
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
    return "Choose a valid reminder time, for example 07:00.";
  }

  return "";
}
