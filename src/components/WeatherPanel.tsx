import React from 'react';
import { Sun, Cloud, CloudRain, CloudFog, CloudLightning, Wind, Droplets, ShieldAlert } from 'lucide-react';
import type { WeatherData } from '../hooks/useWeather';

interface WeatherPanelProps {
  weather: WeatherData;
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({ weather }) => {
  const { temp, humidity, windSpeed, condition, conditionLabel, sunrise, sunset, aqi, loading } = weather;

  const WeatherIcon = () => {
    const size = "w-8 h-8 text-orange-400 animate-pulse";
    if (condition === 'cloudy') return <Cloud className={size} />;
    if (condition === 'rainy') return <CloudRain className={size} />;
    if (condition === 'foggy') return <CloudFog className={size} />;
    if (condition === 'thunderstorm') return <CloudLightning className={size} />;
    return <Sun className={size} />;
  };

  const getAqiColor = (aqiVal: number) => {
    if (aqiVal <= 50) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (aqiVal <= 100) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    if (aqiVal <= 150) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  const getAqiLabel = (aqiVal: number) => {
    if (aqiVal <= 50) return 'Good';
    if (aqiVal <= 100) return 'Moderate';
    if (aqiVal <= 150) return 'Sensitive';
    return 'Poor';
  };

  if (loading) {
    return (
      <div className="glass-panel p-4 rounded-2xl w-64 animate-pulse flex items-center justify-between">
        <div className="h-6 w-24 bg-white/10 rounded"></div>
        <div className="h-8 w-8 bg-white/10 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 rounded-2xl w-72 shadow-glass relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Varanasi Live telemetry</span>
          <h4 className="font-display font-extrabold text-white text-lg leading-tight mt-0.5">{temp}°C</h4>
        </div>
        <div className="flex flex-col items-end">
          <WeatherIcon />
          <span className="text-[10px] text-orange-200/80 font-bold mt-1 text-right">{conditionLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 text-xs">
        <div className="flex items-center gap-2 text-gray-300">
          <Droplets className="w-4 h-4 text-sky-400" />
          <div>
            <p className="text-[10px] text-gray-400">Humidity</p>
            <p className="font-mono font-semibold">{humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Wind className="w-4 h-4 text-teal-400" />
          <div>
            <p className="text-[10px] text-gray-400">Wind</p>
            <p className="font-mono font-semibold">{windSpeed} km/h</p>
          </div>
        </div>

        <div className="col-span-2 flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-3 py-2 mt-1">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] text-gray-300">AQI Index</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getAqiColor(aqi)}`}>
            {aqi} — {getAqiLabel(aqi)}
          </span>
        </div>
      </div>

      <div className="flex justify-between border-t border-white/5 mt-3 pt-3 text-[10px] text-gray-400">
        <div>
          <span>Sunrise</span>
          <p className="font-mono font-bold text-gray-300 mt-0.5">{sunrise}</p>
        </div>
        <div className="text-right">
          <span>Sunset</span>
          <p className="font-mono font-bold text-gray-300 mt-0.5">{sunset}</p>
        </div>
      </div>
    </div>
  );
};
export default WeatherPanel;
