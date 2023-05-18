import React from 'react';
import moment from 'moment';

const CurrentWeatherDetails = ({ weatherData, tempType }) => {
  return (
    <table className="current-weather-details">
      <tbody>
        <tr>
          <td>Feels Like</td>
          <td>{tempType === 'f' ? Math.round(weatherData.currentWeather.feelsLikeTemp) : Math.round((weatherData.currentWeather.feelsLikeTemp - 32) * (5/9))}&deg;{tempType.toUpperCase()}</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td>{weatherData.currentWeather.humidity}%</td>
        </tr>
        <tr>
          <td>UV Index</td>
          <td>{weatherData.currentWeather.uvIndex}</td>
        </tr>
        <tr>
          <td>Sunrise</td>
          <td>{moment(weatherData.currentWeather.sunriseTime * 1000).format('h:mm A')}</td>
        </tr>
        <tr>
          <td>Sunset</td>
          <td>{moment(weatherData.currentWeather.sunsetTime * 1000).format('h:mm A')}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default CurrentWeatherDetails;