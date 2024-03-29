import React from 'react';
import moment from 'moment';

const HourlyForecast = ({ hour, tempType, timezoneOffset }) => {
  const hourlyF = Math.round(hour.temp);
  const hourlyC = Math.round((hour.temp - 32) * (5/9));

  return (
    <tr>
      <td>{moment(hour.dt * 1000).utcOffset(timezoneOffset).format('hA')}</td>
      <td className={`wi wi-owm${hour.weather[0].icon.slice(-1) === 'n' ? '-night' : ''}-${hour.weather[0].id} weather-icon`} aria-label={hour.weather[0].description}></td>
      <td>{tempType === 'f' ? hourlyF : hourlyC}&deg;</td>
    </tr>
  );
}

export default HourlyForecast;
