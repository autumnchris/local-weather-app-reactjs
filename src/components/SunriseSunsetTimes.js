import React from 'react';
import moment from 'moment';

const SunriseSunsetTimes = ({ weatherData }) => {
  return (
    <table className="sunrise-sunset">
      <thead>
        <tr>
          <th scope="col"><span className="wi wi-sunrise wi-fw" aria-hidden="true"></span> Sunrise</th>
          <th scope="col"><span className="wi wi-sunset wi-fw" aria-hidden="true"></span> Sunset</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{moment(weatherData.sunriseTime * 1000).format('h:mm A')}</td>
          <td>{moment(weatherData.sunsetTime * 1000).format('h:mm A')}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SunriseSunsetTimes;