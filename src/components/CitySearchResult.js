import React from 'react';

const CitySearchResult = ({ city, selectCity }) => {
  return (
    <button className="button city-search-result" onClick={() => selectCity(city.latitude, city.longitude)}>
      <p className="city result-text">{city.city}, {city.region}</p>
      <p className="country result-text">{city.country}</p>
    </button>
  );
}

export default CitySearchResult;