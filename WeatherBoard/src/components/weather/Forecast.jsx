import { useState } from "react";
import { motion } from "motion/react";
import WeatherIcon from "../ui/WeatherIcon";
import { conditionTone } from "../../utils/weatherTone";

export default function Forecast({ daily }) {
  const [activeDate, setActiveDate] = useState("");
  const selectedDate = daily?.some((item) => item.date === activeDate)
    ? activeDate
    : daily?.[0]?.date || "";

  if (!Array.isArray(daily) || daily.length === 0) {
    return (
      <section className="section-block forecast-section">
        <div className="section-heading">
          <div>
            <h2>5-Day Forecast</h2>
            <p>Upcoming conditions.</p>
          </div>
        </div>
        <div className="state-card state-empty">
          <p>No forecast data is available for this city right now.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block forecast-section">
      <div className="section-heading">
        <div>
          <h2>5-Day Forecast</h2>
          <p>Plan your week with upcoming conditions.</p>
        </div>
        <span className="forecast-unit">Temperature · °C</span>
      </div>

      <div className="forecast-grid">
        {daily.map((item, index) => {
          const active = selectedDate === item.date;
          return (
            <motion.button
              className={`forecast-card ${active ? "forecast-active" : ""}`}
              key={item.date}
              onClick={() => setActiveDate(item.date)}
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.09 }}
              type="button"
              aria-pressed={active}
            >
              <span className="forecast-day">{item.dayLabel}</span>
              <WeatherIcon
                className={`forecast-icon tone-${conditionTone(
                  item.condition.icon,
                )}`}
                name={item.condition.icon}
                size={34}
                strokeWidth={1.5}
              />
              <span className="forecast-condition">
                {item.condition.label}
              </span>
              <div className="forecast-temps">
                <strong>{item.high}°</strong>
                <span>{item.low}°</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
