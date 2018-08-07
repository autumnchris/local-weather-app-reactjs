import React from 'react';
import Day from './day';

const DailyForecast = ({ days, fTempStyle, cTempStyle }) => {

  const Days = days.map((day, index) => {

    while(index < 5) {
      return <Day key={index} day={day} fTempStyle={fTempStyle} cTempStyle={cTempStyle} />;
    }
  });

  return (
    <table className="daily-forecast">
      <thead>
        <tr>
          <th>Day</th>
          <th>High/Low</th>
          <th colSpan="2">Weather</th>
        </tr>
      </thead>
      <tbody>{Days}</tbody>
    </table>
  );
}

export default DailyForecast;
