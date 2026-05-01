const WEATHER_CODES = {
  0: { label: 'Clear sky', theme: 'clear' },
  1: { label: 'Mainly clear', theme: 'clear' },
  2: { label: 'Partly cloudy', theme: 'cloudy' },
  3: { label: 'Overcast', theme: 'cloudy' },
  45: { label: 'Fog', theme: 'fog' },
  48: { label: 'Rime fog', theme: 'fog' },
  51: { label: 'Light drizzle', theme: 'rain' },
  53: { label: 'Drizzle', theme: 'rain' },
  55: { label: 'Heavy drizzle', theme: 'rain' },
  56: { label: 'Freezing drizzle', theme: 'rain' },
  57: { label: 'Dense freezing drizzle', theme: 'rain' },
  61: { label: 'Slight rain', theme: 'rain' },
  63: { label: 'Rain', theme: 'rain' },
  65: { label: 'Heavy rain', theme: 'rain' },
  66: { label: 'Freezing rain', theme: 'rain' },
  67: { label: 'Heavy freezing rain', theme: 'rain' },
  71: { label: 'Slight snow', theme: 'snow' },
  73: { label: 'Snow', theme: 'snow' },
  75: { label: 'Heavy snow', theme: 'snow' },
  77: { label: 'Snow grains', theme: 'snow' },
  80: { label: 'Rain showers', theme: 'rain' },
  81: { label: 'Heavy showers', theme: 'rain' },
  82: { label: 'Violent rain showers', theme: 'storm' },
  85: { label: 'Snow showers', theme: 'snow' },
  86: { label: 'Heavy snow showers', theme: 'snow' },
  95: { label: 'Thunderstorm', theme: 'storm' },
  96: { label: 'Thunder with hail', theme: 'storm' },
  99: { label: 'Severe thunder with hail', theme: 'storm' },
};

export function getWeatherCodeDetails(code) {
  return WEATHER_CODES[code] ?? { label: 'Unknown weather', theme: 'cloudy' };
}
