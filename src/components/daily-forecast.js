import React from 'react';
import moment from 'moment';

const DailyForecast = ({ day, tempType }) => {
  const dailyHighF = Math.round(day.temp.max);
  const dailyLowF = Math.round(day.temp.min);
  const dailyHighC = Math.round((day.temp.max - 32) * (5/9));
  const dailyLowC = Math.round((day.temp.min - 32) * (5/9));

  return (
    <tr>
      <td>{moment(day.dt * 1000).format('ddd')}</td>
      <td>{tempType === 'f' ? dailyHighF : dailyHighC}&deg;/{tempType === 'f' ? dailyLowF : dailyLowC}&deg;</td>
      <td><span className={`wi wi-owm-${day.weather[0].id} weather-icon`}></span><span className="weather-description"> {day.weather[0].description}</span></td>
    </tr>
  );
}

export default DailyForecast;
