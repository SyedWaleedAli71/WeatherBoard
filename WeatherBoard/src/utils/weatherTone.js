const TONES = {
  sun: "clear",
  moon: "night",
  "cloud-sun": "cloud",
  "cloud-moon": "night",
  cloud: "cloud",
  fog: "fog",
  drizzle: "rain",
  rain: "rain",
  snow: "snow",
  thunder: "storm",
};

export function conditionTone(name) {
  return TONES[name] || "cloud";
}
