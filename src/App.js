import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import WeatherResults from './components/WeatherResults';
import ErrorMessage from './components/ErrorMessage';
import fetchCurrentWeatherData from './utils/fetchCurrentWeatherData';
import fetchForecastData from './utils/fetchForecastData';
import getGeolocation from './utils/getGeolocation';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getGeolocation(getGeolocationSuccess, getGeolocationError);
  }, []);

  function getGeolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    Promise.all([
      fetchCurrentWeatherData(lat, lon),
      fetchForecastData(lat, lon)
    ]).then(([
      currentWeatherResponse,
      forecastResponse
    ]) => {
        const newWeatherData = {
          city: currentWeatherResponse.data.name,
          currentWeather: {
            temp: currentWeatherResponse.data.main.temp,
            weatherSummary: currentWeatherResponse.data.weather[0].description,
            weatherIcon: currentWeatherResponse.data.weather[0].id,
            isNight: currentWeatherResponse.data.weather[0].icon.slice(-1) === 'n' ? true : false
          },
          sunriseTime: currentWeatherResponse.data.sys.sunrise,
          sunsetTime: currentWeatherResponse.data.sys.sunset,
          hourlyForecast: forecastResponse.data.hourly,
          dailyForecast: forecastResponse.data.daily
        };
        setWeatherData({ ...newWeatherData });
        setLoadingStatus(false);
        setErrorMessage('');
      }).catch(() => {
        setWeatherData(null);
        setLoadingStatus(false);
        setErrorMessage('Unable to load current weather at this time.');
      });
  }

  function getGeolocationError(err) {
    setLoadingStatus(false);
    setErrorMessage(`${err.message}`);
  }

  return (
    <React.Fragment>
      <Header />
      <main>
        {loadingStatus && !weatherData ? <LoadingSpinner /> : weatherData ? <WeatherResults weatherData={weatherData} /> : <ErrorMessage errorMessage={errorMessage} />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
