import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './Loading-Spinner';
import ResultsContainer from './Results-Container';

const App = () => {
  const options = {
    timeout: 18000
  };

  const [weatherData, setWeatherData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getSuccess, getError, options);
  }, []);

  function getSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    function fetchCurrentWeatherData() {
      return axios.get(`https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`);
    }
  
    function fetchForecastData() {
      return axios.get(`https://api.openweathermap.org/data/2.5/onecall?&lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`);
    }

    Promise.all([
      fetchCurrentWeatherData(),
      fetchForecastData()
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

  function getError(err) {
    setLoadingStatus(false);
    setErrorMessage(`${err.message}`);
  }

  return (
    <React.Fragment>
      <header>
        <h1>View your local weather</h1>
      </header>
      <main>
        {loadingStatus ? <LoadingSpinner /> : <ResultsContainer weatherData={weatherData} errorMessage={errorMessage} />}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
