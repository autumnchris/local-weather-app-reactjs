import React from 'react';
import moment from 'moment';

const Hour = ({ hour, fTempStyle, cTempStyle }) => {

  return (
    <tr>
      <td>{moment(hour.time * 1000).format('hA')}</td>
      <td className={`wi wi-forecast-io-${hour.icon}`}></td>
      <td>
        <span style={fTempStyle}>{Math.round(hour.temperature)}&deg;</span>
        <span style={cTempStyle}>{Math.round((hour.temperature - 32) * (5/9))}&deg;</span>
      </td>
    </tr>
  );
}

export default Hour;
