import React from 'react';

const CitySearchResult = ({ city, selectCity }) => {
  return (
    <div className="city-search-result" onClick={() => selectCity(city.latitude, city.longitude)}>
      <div className="city">{city.city}, {city.region}</div>
      <div className="country">{city.country}</div>
    </div>
  );
}

export default CitySearchResult;