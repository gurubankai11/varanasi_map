import { useState, useEffect } from 'react';

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: 'clear' | 'cloudy' | 'rainy' | 'foggy' | 'thunderstorm';
  conditionLabel: string;
  sunrise: string;
  sunset: string;
  aqi: number; // Air Quality Index
  loading: boolean;
  error: boolean;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 32,
    humidity: 65,
    windSpeed: 8,
    condition: 'clear',
    conditionLabel: 'Clear Sky',
    sunrise: '05:12 AM',
    sunset: '06:48 PM',
    aqi: 142, // Typical Varanasi AQI (moderate to poor)
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=25.3176&longitude=83.0062&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover&daily=sunrise,sunset&timezone=Asia%2FKolkata'
        );
        if (!response.ok) throw new Error('Weather API failed');
        const data = await response.json();
        
        const temp = Math.round(data.current.temperature_2m);
        const humidity = Math.round(data.current.relative_humidity_2m);
        const windSpeed = Math.round(data.current.wind_speed_10m);
        const code = data.current.weather_code;
        
        let condition: WeatherData['condition'] = 'clear';
        let conditionLabel = 'Clear Sky';
        
        if (code === 0) {
          condition = 'clear';
          conditionLabel = 'Clear Sky';
        } else if (code >= 1 && code <= 3) {
          condition = 'cloudy';
          conditionLabel = data.current.cloud_cover > 75 ? 'Overcast' : 'Partly Cloudy';
        } else if (code === 45 || code === 48) {
          condition = 'foggy';
          conditionLabel = 'Mist & Fog';
        } else if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) {
          condition = 'rainy';
          conditionLabel = code >= 65 ? 'Heavy Rain' : 'Showers';
        } else if (code >= 95) {
          condition = 'thunderstorm';
          conditionLabel = 'Thunderstorm';
        }

        // Format sunrise/sunset times
        const formatTime = (isoString: string) => {
          try {
            return new Date(isoString).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Asia/Kolkata'
            });
          } catch {
            return '05:15 AM';
          }
        };

        const sunrise = data.daily?.sunrise?.[0] ? formatTime(data.daily.sunrise[0]) : '05:12 AM';
        const sunset = data.daily?.sunset?.[0] ? formatTime(data.daily.sunset[0]) : '06:48 PM';

        // Compute simulated AQI based on humidity and temp (adds real vibe)
        const computedAqi = Math.round(110 + (humidity * 0.5) + (temp * 0.4) + Math.random() * 20);

        setWeather({
          temp,
          humidity,
          windSpeed,
          condition,
          conditionLabel,
          sunrise,
          sunset,
          aqi: Math.min(computedAqi, 350),
          loading: false,
          error: false
        });
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setWeather(prev => ({
          ...prev,
          loading: false,
          error: true
        }));
      }
    };

    fetchWeather();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return weather;
};
