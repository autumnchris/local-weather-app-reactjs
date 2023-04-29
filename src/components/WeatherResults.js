import React, { useState } from 'react';
import SunriseSunsetTimes from './SunriseSunsetTimes';
import SwitchButton from './SwitchButton';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import getTempType from '../utils/getTempType';

const WeatherResults = ({ weatherData }) => {
  const [tempType, setTempType] = useState(getTempType());
  
  return (
    <div className="weather-content">
      <div className="col">
        <div className="location">{weatherData.city}</div>
        <div className="current-weather">
          <div className="temp">{tempType === 'f' ? Math.round(weatherData.currentWeather.temp) : Math.round((weatherData.currentWeather.temp - 32) * (5/9))}&deg;{tempType.toUpperCase()}</div>
          <div className={`wi wi-owm${weatherData.currentWeather.isNight ? '-night' : ''}-${weatherData.currentWeather.weatherIcon} weather-icon`} aria-hidden="true"></div>
          <div className="weather-summary weather-description">{weatherData.currentWeather.weatherSummary}</div>
        </div>
        <SunriseSunsetTimes weatherData={weatherData} />
        <SwitchButton tempType={tempType} setTempType={setTempType} />
      </div>
      <div className="col">
        <table className="hourly-forecast">
          <tbody>{weatherData.hourlyForecast.slice(0, 24).map((hour, index) => <HourlyForecast key={index} hour={hour} tempType={tempType} />)}</tbody>
        </table>
        <table className="daily-forecast">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">High/Low</th>
              <th scope="col">Weather</th>
            </tr>
          </thead>
          <tbody>{weatherData.dailyForecast.slice(0, 5).map((day, index) => <DailyForecast key={index} day={day} tempType={tempType} />)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default WeatherResults;
