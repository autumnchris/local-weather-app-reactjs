import React from 'react';
import moment from 'moment';
import HourlyForecast from './hourly-forecast'
import DailyForecast from './daily-forecast';

const ResultsContainer = ({ weatherData, tempType, toggleTempType, loadingError, errorMessage }) => {

  if (loadingError) {
    return <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {errorMessage}</p>;
  }
  else {
    return (
      <div className="weather-content">
        <div className="col">
          <div className="location">{weatherData.city}</div>
          <div className="current-weather">
            <div className="temp">{tempType === 'f' ? Math.round(weatherData.currentWeather.temp) : Math.round((weatherData.currentWeather.temp - 32) * (5/9))}&deg;{tempType.toUpperCase()}</div>
            <div className={`wi wi-owm${weatherData.currentWeather.isNight ? '-night' : ''}-${weatherData.currentWeather.weatherIcon} weather-icon`}></div>
            <div className="weather-summary weather-description">{weatherData.currentWeather.weatherSummary}</div>
          </div>
          <table className="sunrise-sunset">
            <thead>
              <tr>
                <th>Sunrise</th>
                <th>Sunset</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{moment(weatherData.sunriseTime * 1000).format('h:mm A')}</td>
                <td>{moment(weatherData.sunsetTime * 1000).format('h:mm A')}</td>
              </tr>
            </tbody>
          </table>
          <button type="button" className={`button switch-button ${tempType}`} onClick={(event) => toggleTempType(event)}>&deg;{tempType.toUpperCase()}</button>
        </div>
        <div className="col">
          <table className="hourly-forecast">
            <tbody>{weatherData.hourlyForecast.slice(0, 24).map((hour, index) => <HourlyForecast key={index} hour={hour} tempType={tempType} />)}</tbody>
          </table>
          <table className="daily-forecast">
            <thead>
              <tr>
                <th>Day</th>
                <th>High/Low</th>
                <th colSpan="2">Weather</th>
              </tr>
            </thead>
            <tbody>{weatherData.dailyForecast.slice(0, 5).map((day, index) => <DailyForecast key={index} day={day} tempType={tempType} />)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
