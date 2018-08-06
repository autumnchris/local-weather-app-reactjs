import React from 'react';
import Hour from './hour';

const HourlyForecast = ({ hours }) => {

  const Hours = hours.map((hour, index) => {

    while(index < 24) {
      return <Hour key={index} hour={hour} />;
    }
  });

  return (
    <table className="hourly-forecast">
      <tbody>{Hours}</tbody>
    </table>
  );
}

export default HourlyForecast;
