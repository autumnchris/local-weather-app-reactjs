import React from 'react';
import Hour from './hour';

const HourlyForecast = ({ hours, fTempStyle, cTempStyle }) => {

  const Hours = hours.map((hour, index) => {

    while(index < 24) {
      return <Hour key={index} hour={hour} fTempStyle={fTempStyle} cTempStyle={cTempStyle} />;
    }
  });

  return (
    <table className="hourly-forecast">
      <tbody>{Hours}</tbody>
    </table>
  );
}

export default HourlyForecast;
