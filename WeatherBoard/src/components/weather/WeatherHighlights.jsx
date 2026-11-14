import { motion } from "motion/react";
import { Droplets, Eye, Thermometer, Wind } from "lucide-react";

export default function WeatherHighlights({ weather }) {
  const current = weather.current;
  const highlights = [
    {
      label: "Feels Like",
      value: current.feelsLike,
      icon: Thermometer,
      description: "Apparent temperature",
    },
    {
      label: "Humidity",
      value: current.humidity,
      icon: Droplets,
      description: "Relative humidity",
    },
    {
      label: "Wind Speed",
      value: current.windSpeed,
      icon: Wind,
      description: "Wind at 10 m",
    },
    {
      label: "Visibility",
      value: current.visibility,
      icon: Eye,
      description: "Horizontal visibility",
    },
  ];

  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <h2>Weather Highlights</h2>
          <p>Current conditions at {weather.city.name}.</p>
        </div>
      </div>

      <div className="details-grid">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              className="detail-card"
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="detail-top">
                <span>{item.label}</span>
                <div className="detail-icon">
                  <Icon size={19} />
                </div>
              </div>
              <h3>{item.value}</h3>
              <p>{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
