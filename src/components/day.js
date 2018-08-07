import React from 'react';
import moment from 'moment';

const Day = ({ day, fTempStyle, cTempStyle }) => {

  return (
    <tr>
      <td>{moment(day.time * 1000).format('ddd')}</td>
      <td>
        <span style={fTempStyle}>{Math.round(day.temperatureMax)}&deg;/{Math.round(day.temperatureMin)}&deg;</span>
        <span style={cTempStyle}>{Math.round((day.temperatureMax - 32) * (5/9))}&deg;/{Math.round((day.temperatureMin - 32) * (5/9))}&deg;</span>
      </td>
      <td className={`wi wi-forecast-io-${day.icon}`}></td>
      <td>{day.summary}</td>
    </tr>
  );
}

export default Day;
