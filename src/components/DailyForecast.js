import React from 'react';
import moment from 'moment';

const DailyForecast = ({ day, tempType, timezoneOffset }) => {
  const dailyHighF = Math.round(day.temp.max);
  const dailyLowF = Math.round(day.temp.min);
  const dailyHighC = Math.round((day.temp.max - 32) * (5/9));
  const dailyLowC = Math.round((day.temp.min - 32) * (5/9));

  return (
    <tr>
      <td>{moment(day.dt * 1000).utcOffset(timezoneOffset).format('ddd')}</td>
      <td>{tempType === 'f' ? dailyHighF : dailyHighC}&deg;/{tempType === 'f' ? dailyLowF : dailyLowC}&deg;</td>
      <td className="weather-description"><span className={`wi wi-owm-${day.weather[0].id} weather-icon`} aria-hidden="true"></span> {day.weather[0].description}</td>
    </tr>
  );
}

export default DailyForecast;
