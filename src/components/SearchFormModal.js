import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySearchResult from './CitySearchResult';
import ErrorMessage from './ErrorMessage';

const SearchForm = ({ setModalVisibility, selectCity }) => {
  const [searchInput, setSearchInput] = useState('');
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {

    if (searchInput.trim()) {
      const timer = setTimeout(() => {
        fetchCitySearchResults();
      }, 1300);
      return () => clearTimeout(timer);
    }
    else {
      setCitySearchResults([]);
      setErrorMessage('');
    }
  }, [searchInput]);

  function fetchCitySearchResults() {
    const options = {
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=20000&namePrefix=${searchInput}`,
      headers: {
        'X-RapidAPI-Key': process.env.GEO_DB_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    axios.request(options)
    .then(response => {

      if (response.data.data.length === 0 && searchInput) {
        setCitySearchResults([]);
        setErrorMessage('No cities match your search.');
      }
      else {
        setCitySearchResults(response.data.data);
        setErrorMessage('');
      }
    }).catch(() => {
      setCitySearchResults([]);
      setErrorMessage('Unable to load city search results at this time.');
    });
  }

  function handleChange(event) {
    setSearchInput(event.target.value);
  }

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="button-group">
            <button type="button" className="button close-button" onClick={() => setModalVisibility(false)} aria-label="Close Search Form" title="Close Search Form">
              <span className="material-icons icon">close</span>
            </button>
          </div>
        </div>
        <div className="modal-body">
          <form role="search" className="search-form" onSubmit={(event) => { event.preventDefault(); }}>
            <div className="form-group">
              <span className="fas fa-search fa-sm search-icon" aria-hidden="true"></span>
              <input type="text" className="search-input" aria-label="Search by city..." placeholder="Search by city..." onChange={(event) => handleChange(event)} value={searchInput} required autoFocus />
            </div>
          </form>
          {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : searchInput ? <div className="search-options">{citySearchResults.sort((a, b) => b.population - a.population).map(city => <CitySearchResult key={city.id} city={city} selectCity={selectCity} />)}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;