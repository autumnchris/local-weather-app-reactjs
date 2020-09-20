import React from 'react';
import moment from 'moment';

const HourlyForecast = ({ hour, tempType }) => {
  const hourlyF = Math.round(hour.temperature);
  const hourlyC = Math.round((hour.temperature - 32) * (5/9));

  return (
    <tr>
      <td>{moment(hour.time * 1000).format('hA')}</td>
      <td className={`wi wi-forecast-io-${hour.icon} weather-icon`}></td>
      <td>{tempType === 'f' ? hourlyF : hourlyC}&deg;</td>
    </tr>
  );
}

export default HourlyForecast;
