import { useEffect, useMemo, useState } from 'react';
import { getWeatherCodeDetails } from './weatherCodes';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/reverse';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const NEARBY_CITY_URL = 'https://secure.geonames.org/findNearbyPlaceNameJSON';

const themeMap = {
  clear: 'from-[#fef3c7] via-[#fed7aa] to-[#fdba74]',
  cloudy: 'from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]',
  fog: 'from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af]',
  rain: 'from-[#bfdbfe] via-[#7dd3fc] to-[#0284c7]',
  snow: 'from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]',
  storm: 'from-[#c4b5fd] via-[#818cf8] to-[#334155]',
};

function App() {
  const [query, setQuery] = useState('Hyderabad');
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [nearbyCitiesWeather, setNearbyCitiesWeather] = useState([]);

  const weatherTheme = useMemo(() => {
    if (!weather) return themeMap.cloudy;
    const details = getWeatherCodeDetails(weather.current.weather_code);
    return themeMap[details.theme] ?? themeMap.cloudy;
  }, [weather]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapWithUserLocation() {
      if (!navigator.geolocation) {
        await searchAndLoadWeather('Hyderabad');
        if (isMounted) setIsInitializing(false);
        return;
      }

      await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const reverseRes = await fetch(
                `${REVERSE_GEO_URL}?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
              );

              if (!reverseRes.ok) throw new Error('Could not determine your nearest city.');

              const reverseData = await reverseRes.json();
              const place = reverseData.results?.[0];

              if (!place) throw new Error('Could not determine your nearest city.');

              const city = {
                id: place.id ?? `${place.name}-${place.latitude}-${place.longitude}`,
                name: place.name,
                country: place.country,
                latitude: place.latitude,
                longitude: place.longitude,
              };

              if (isMounted) {
                setQuery(city.name);
                setCityOptions([city]);
              }

              await searchAndLoadWeather(city.name, city);
            } catch {
              await searchAndLoadWeather('Hyderabad');
            } finally {
              resolve();
            }
          },
          async () => {
            await searchAndLoadWeather('Hyderabad');
            resolve();
          },
          { timeout: 10000 }
        );
      });

      if (isMounted) setIsInitializing(false);
    }

    bootstrapWithUserLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  async function loadNearbyCitiesWeather(latitude, longitude, excludeName = '') {
    try {
      const nearbyRes = await fetch(
        `${NEARBY_CITY_URL}?lat=${latitude}&lng=${longitude}&cities=cities15000&radius=250&maxRows=6&username=demo`
      );

      if (!nearbyRes.ok) throw new Error('Unable to fetch nearby cities right now.');

      const nearbyData = await nearbyRes.json();
      const nearbyCities = (nearbyData.geonames ?? [])
        .map((city) => ({
          name: city.name,
          country: city.countryName,
          latitude: Number(city.lat),
          longitude: Number(city.lng),
        }))
        .filter((city) => city.name && Number.isFinite(city.latitude) && Number.isFinite(city.longitude))
        .filter((city) => city.name.toLowerCase() !== excludeName.toLowerCase())
        .slice(0, 4);

      const nearbyWithWeather = await Promise.all(
        nearbyCities.map(async (city) => {
          const cityForecastRes = await fetch(
            `${FORECAST_URL}?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
          );

          if (!cityForecastRes.ok) {
            return null;
          }

          const cityForecast = await cityForecastRes.json();

          return {
            ...city,
            temperature: cityForecast.current?.temperature_2m,
            weatherCode: cityForecast.current?.weather_code,
            wind: cityForecast.current?.wind_speed_10m,
          };
        })
      );

      setNearbyCitiesWeather(nearbyWithWeather.filter(Boolean));
    } catch {
      setNearbyCitiesWeather([]);
    }
  }

  async function searchAndLoadWeather(searchTerm, option = null) {
    const cleanTerm = searchTerm.trim();
    if (!cleanTerm) {
      setError('Type a location to get weather data.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let city = option;

      if (!city) {
        const geoRes = await fetch(
          `${GEO_URL}?name=${encodeURIComponent(cleanTerm)}&count=5&language=en&format=json`
        );

        if (!geoRes.ok) throw new Error('Could not reach geocoding service.');

        const geoData = await geoRes.json();
        const places = geoData.results ?? [];

        if (places.length === 0) throw new Error('No location found. Try a different name.');

        setCityOptions(places);
        city = places[0];
      }

      setSelectedCity(city);

      const forecastRes = await fetch(
        `${FORECAST_URL}?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
      );

      if (!forecastRes.ok) throw new Error('Could not fetch forecast data.');

      const forecastData = await forecastRes.json();
      setWeather(forecastData);
      await loadNearbyCitiesWeather(city.latitude, city.longitude, city.name);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading weather.');
    } finally {
      setLoading(false);
    }
  }

  function formatDay(dateString) {
    return new Date(dateString).toLocaleDateString(undefined, { weekday: 'short' });
  }

  const currentDetails = weather ? getWeatherCodeDetails(weather.current.weather_code) : null;

  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${weatherTheme} p-5 text-slate-900 sm:p-8`}>
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-5">
        <header className="animate-riseIn rounded-3xl border border-white/45 bg-white/55 p-5 shadow-glow backdrop-blur-lg sm:p-7">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Weather Pulse</p>
          <h1 className="text-3xl font-black leading-tight text-night sm:text-5xl">Search any city and watch the forecast come alive.</h1>

          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              searchAndLoadWeather(query);
            }}
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter city name"
              className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 text-base text-slate-900 outline-none ring-0 transition focus:border-sea"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-night px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </form>

          {cityOptions.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {cityOptions.slice(0, 5).map((option) => (
                <button
                  key={`${option.id}-${option.latitude}-${option.longitude}`}
                  type="button"
                  onClick={() => searchAndLoadWeather(option.name, option)}
                  className="rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-sm text-slate-700 transition hover:border-slate-500"
                >
                  {option.name}, {option.country}
                </button>
              ))}
            </div>
          )}

          {error && <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        </header>

        {isInitializing && (
          <section className="animate-riseIn rounded-3xl border border-white/45 bg-white/60 p-5 text-sm text-slate-700 shadow-glow backdrop-blur-lg">
            Detecting your location and loading nearby weather...
          </section>
        )}

        {weather && selectedCity && (
          <section className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <article className="animate-riseIn rounded-3xl border border-white/45 bg-white/65 p-5 shadow-glow backdrop-blur-lg [animation-delay:130ms] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Now in {selectedCity.name}</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <h2 className="text-5xl font-black text-night sm:text-6xl">{Math.round(weather.current.temperature_2m)} degC</h2>
                  <p className="text-base text-slate-700">{currentDetails?.label}</p>
                </div>
                <div className="hidden rounded-2xl bg-white/70 px-4 py-3 text-right sm:block">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-600">Feels like</p>
                  <p className="text-2xl font-bold text-night">{Math.round(weather.current.apparent_temperature)} degC</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MetricCard label="Humidity" value={`${weather.current.relative_humidity_2m}%`} />
                <MetricCard label="Wind" value={`${Math.round(weather.current.wind_speed_10m)} km/h`} />
                <MetricCard label="Rain" value={`${weather.current.precipitation} mm`} />
                <MetricCard label="Daylight" value={weather.current.is_day ? 'Day' : 'Night'} />
              </div>
            </article>

            <article className="animate-riseIn rounded-3xl border border-white/45 bg-white/65 p-5 shadow-glow backdrop-blur-lg [animation-delay:240ms] sm:p-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">5 Day Outlook</p>
              <div className="space-y-2">
                {weather.daily.time.map((date, idx) => {
                  const dayCode = weather.daily.weather_code[idx];
                  const details = getWeatherCodeDetails(dayCode);
                  return (
                    <div key={date} className="flex items-center justify-between rounded-xl bg-white/75 px-3 py-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">{formatDay(date)}</span>
                      <span>{details.label}</span>
                      <span className="font-semibold text-night">
                        {Math.round(weather.daily.temperature_2m_min[idx])}/{Math.round(weather.daily.temperature_2m_max[idx])} degC
                      </span>
                    </div>
                  );
                })}
              </div>
            </article>
          </section>
        )}

        {nearbyCitiesWeather.length > 0 && (
          <section className="animate-riseIn rounded-3xl border border-white/45 bg-white/60 p-5 shadow-glow backdrop-blur-lg [animation-delay:320ms] sm:p-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">Nearby Cities Right Now</p>
              <span className="text-xs text-slate-600">Tap any city to explore it</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyCitiesWeather.map((city) => {
                const details = getWeatherCodeDetails(city.weatherCode);
                return (
                  <button
                    key={`${city.name}-${city.latitude}-${city.longitude}`}
                    type="button"
                    onClick={() =>
                      searchAndLoadWeather(city.name, {
                        id: `${city.name}-${city.latitude}-${city.longitude}`,
                        name: city.name,
                        country: city.country,
                        latitude: city.latitude,
                        longitude: city.longitude,
                      })
                    }
                    className="rounded-2xl bg-white/75 p-4 text-left transition hover:-translate-y-1"
                  >
                    <p className="text-sm font-semibold text-slate-900">{city.name}</p>
                    <p className="text-xs text-slate-600">{city.country}</p>
                    <p className="mt-3 text-2xl font-black text-night">{Math.round(city.temperature)} degC</p>
                    <p className="text-xs text-slate-700">{details.label}</p>
                    <p className="mt-1 text-xs text-slate-600">Wind {Math.round(city.wind)} km/h</p>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="animate-float rounded-2xl bg-white/75 p-3 [animation-duration:10s]">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default App;
