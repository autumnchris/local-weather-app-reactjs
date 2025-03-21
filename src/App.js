import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoadContent from './components/PageLoadContent';
import SearchFormModal from './components/SearchFormModal';
import LoadingSpinner from './components/LoadingSpinner';
import WeatherResults from './components/WeatherResults';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageLoadView, setPageLoadView] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    window.addEventListener('click', event => {
      if (event.target.id === 'modal') setModalVisibility(false);
    });

    window.addEventListener('keydown', event => {
      if (modalVisibility && event.key === 'Escape') setModalVisibility(false);
    });

    modalVisibility ? document.querySelector('body').classList.add('modal-open') : document.querySelector('body').classList.remove('modal-open');
  }, [modalVisibility]);

  function getGeolocation() {
    setWeatherData(null);
    setLoadingStatus(true);
    setPageLoadView(false);
    const options = {
      timeout: 18000
    };

    navigator.geolocation.getCurrentPosition(getGeolocationSuccess, getGeolocationError, options);
  }

  function getGeolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherResults(lat, lon);
  }

  function getGeolocationError(err) {
    setLoadingStatus(false);
    setErrorMessage(`${err.message}`);
  }

  function selectCity(lat, lon) {
    setWeatherData(null);
    setLoadingStatus(true);
    setPageLoadView(false);
    setModalVisibility(false);
    fetchWeatherResults(lat, lon);
  }

  function fetchWeatherResults(lat, lon) {
    axios.get(`https://autumnchris-local-weather-backend-api.onrender.com/api/weather?lat=${lat}&lon=${lon}`).then(response => {
      const newWeatherData = {
        city: response.data.currentWeather.name,
        timezoneOffset: Math.floor(response.data.forecast.timezone_offset / 60),
        currentWeather: {
          temp: response.data.forecast.current.temp,
          weatherSummary: response.data.forecast.current.weather[0].description,
          weatherIcon: response.data.forecast.current.weather[0].id,
          feelsLikeTemp: response.data.forecast.current.feels_like,
          humidity: response.data.forecast.current.humidity,
          uvIndex: response.data.forecast.current.uvi,
          sunriseTime: response.data.forecast.current.sunrise,
          sunsetTime: response.data.forecast.current.sunset,
          isNight: response.data.forecast.current.weather[0].icon.slice(-1) === 'n' ? true : false
        },
        hourlyForecast: response.data.forecast.hourly,
        dailyForecast: response.data.forecast.daily
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

  return (
    <React.Fragment>
      <Header pageLoadView={pageLoadView} setModalVisibility={setModalVisibility} getGeolocation={getGeolocation} />
      <main>
        {pageLoadView ? <PageLoadContent setModalVisibility={setModalVisibility} getGeolocation={getGeolocation} /> : loadingStatus ? <LoadingSpinner /> : weatherData ? <WeatherResults weatherData={weatherData} /> : errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
        {modalVisibility ? <SearchFormModal setModalVisibility={setModalVisibility} selectCity={selectCity} /> : null}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
