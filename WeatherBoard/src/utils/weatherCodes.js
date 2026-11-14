const WEATHER_CODES = [
  { codes: [0], label: "Clear sky", dayIcon: "sun", nightIcon: "moon" },
  { codes: [1], label: "Mainly clear", dayIcon: "sun", nightIcon: "moon" },
  { codes: [2], label: "Partly cloudy", dayIcon: "cloud-sun", nightIcon: "cloud-moon" },
  { codes: [3], label: "Overcast", dayIcon: "cloud", nightIcon: "cloud" },
  { codes: [45, 48], label: "Fog", dayIcon: "fog", nightIcon: "fog" },
  { codes: [51, 53, 55], label: "Drizzle", dayIcon: "drizzle", nightIcon: "drizzle" },
  { codes: [56, 57], label: "Freezing drizzle", dayIcon: "drizzle", nightIcon: "drizzle" },
  { codes: [61, 63, 65], label: "Rain", dayIcon: "rain", nightIcon: "rain" },
  { codes: [66, 67], label: "Freezing rain", dayIcon: "rain", nightIcon: "rain" },
  { codes: [71, 73, 75, 77], label: "Snow", dayIcon: "snow", nightIcon: "snow" },
  { codes: [80, 81, 82], label: "Rain showers", dayIcon: "rain", nightIcon: "rain" },
  { codes: [85, 86], label: "Snow showers", dayIcon: "snow", nightIcon: "snow" },
  { codes: [95], label: "Thunderstorm", dayIcon: "thunder", nightIcon: "thunder" },
  { codes: [96, 99], label: "Thunderstorm with hail", dayIcon: "thunder", nightIcon: "thunder" },
];

export function describeWeather(code, isDay = true) {
  const entry = WEATHER_CODES.find((item) => item.codes.includes(code));

  if (!entry) {
    return {
      code,
      label: "Unknown conditions",
      icon: isDay ? "cloud" : "cloud-moon",
    };
  }

  return {
    code,
    label: entry.label,
    icon: isDay ? entry.dayIcon : entry.nightIcon,
  };
}

// OpenWeatherMap groups its condition IDs into broad families. Mapping them to
// the same icon names keeps the UI consistent whichever provider is active.
const OPEN_WEATHER_GROUPS = [
  { matches: (id) => id >= 200 && id < 300, label: "Thunderstorm", icon: "thunder" },
  { matches: (id) => id >= 300 && id < 400, label: "Drizzle", icon: "drizzle" },
  { matches: (id) => id >= 500 && id < 600, label: "Rain", icon: "rain" },
  { matches: (id) => id >= 600 && id < 700, label: "Snow", icon: "snow" },
  { matches: (id) => id >= 700 && id < 800, label: "Fog", icon: "fog" },
  { matches: (id) => id === 800, label: "Clear sky", icon: "sun" },
  { matches: (id) => id === 801, label: "Mainly clear", icon: "sun" },
  { matches: (id) => id === 802, label: "Partly cloudy", icon: "cloud-sun" },
  { matches: (id) => id >= 803, label: "Overcast", icon: "cloud" },
];

const NIGHT_ICONS = {
  sun: "moon",
  "cloud-sun": "cloud-moon",
};

export function describeOpenWeather(code, isDay = true) {
  const entry = OPEN_WEATHER_GROUPS.find((item) => item.matches(code));

  if (!entry) {
    return {
      code,
      label: "Unknown conditions",
      icon: isDay ? "cloud" : "cloud-moon",
    };
  }

  return {
    code,
    label: entry.label,
    icon: isDay ? entry.icon : NIGHT_ICONS[entry.icon] || entry.icon,
  };
}
