import React, { useState } from 'react';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import SwitchButton from './SwitchButton';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import getTempType from '../utils/getTempType';

const WeatherResults = ({ weatherData }) => {
  const [tempType, setTempType] = useState(getTempType());
  
  return (
    <React.Fragment>
      <div className="location">{weatherData.city}</div>
      <SwitchButton tempType={tempType} setTempType={setTempType} />
      <div className="weather-content">
        <div className="col">
          <div className="current-weather">
            <div className="temp">{tempType === 'f' ? Math.round(weatherData.currentWeather.temp) : Math.round((weatherData.currentWeather.temp - 32) * (5/9))}&deg;{tempType.toUpperCase()}</div>
            <div className={`wi wi-owm${weatherData.currentWeather.isNight ? '-night' : ''}-${weatherData.currentWeather.weatherIcon} weather-icon`} aria-hidden="true"></div>
            <div className="weather-summary weather-description">{weatherData.currentWeather.weatherSummary}</div>
          </div>
          <CurrentWeatherDetails weatherData={weatherData} tempType={tempType} />
        </div>
        <div className="col">
          <table className="hourly-forecast">
            <tbody>{weatherData.hourlyForecast.slice(0, 24).map((hour, index) => <HourlyForecast key={index} hour={hour} tempType={tempType} timezoneOffset={weatherData.timezoneOffset} />)}</tbody>
          </table>
          <table className="daily-forecast">
            <tbody>{weatherData.dailyForecast.slice(0, 5).map((day, index) => <DailyForecast key={index} day={day} tempType={tempType} timezoneOffset={weatherData.timezoneOffset} />)}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WeatherResults;
