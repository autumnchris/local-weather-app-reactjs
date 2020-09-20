import React from 'react';
import moment from 'moment';

const DailyForecast = ({ day, tempType }) => {
  const dailyHighF = Math.round(day.temperatureMax);
  const dailyLowF = Math.round(day.temperatureMin);
  const dailyHighC = Math.round((day.temperatureMax - 32) * (5/9));
  const dailyLowC = Math.round((day.temperatureMin - 32) * (5/9));

  return (
    <tr>
      <td>{moment(day.time * 1000).format('ddd')}</td>
      <td>{tempType === 'f' ? dailyHighF : dailyHighC}&deg;/{tempType === 'f' ? dailyLowF : dailyLowC}&deg;</td>
      <td className={`wi wi-forecast-io-${day.icon} weather-icon`}></td>
      <td>{day.summary}</td>
    </tr>
  );
}

export default DailyForecast;
