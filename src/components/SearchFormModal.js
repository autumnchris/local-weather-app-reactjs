import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import CitySearchResult from './CitySearchResult';
import ErrorMessage from './ErrorMessage';

const SearchForm = ({ setModalVisibility, selectCity }) => {
  const [searchInput, setSearchInput] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoadingStatus(false);

    if (searchInput.trim()) {
      setLoadingStatus(true);
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
    axios.get(`https://autumnchris-local-weather-backend-api.onrender.com/api/cities?searchInput=${searchInput}`).then(response => {
      setLoadingStatus(false);

      if (response.data.cities.data.length === 0 && searchInput) {
        setCitySearchResults([]);
        setErrorMessage('No cities match your search.');
      }
      else {
        setCitySearchResults(response.data.cities.data);
        setErrorMessage('');
      }
    }).catch(() => {
      setLoadingStatus(false);
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
              <span className="fa-solid fa-xmark fa-lg icon"></span>
            </button>
          </div>
        </div>
        <div className="modal-body">
          <form role="search" className="search-form" onSubmit={(event) => { event.preventDefault(); }} noValidate>
            <div className="form-group">
              <span className="fa-solid fa-magnifying-glass fa-sm search-icon" aria-hidden="true"></span>
              <input type="text" name="citySearch" className="search-input" aria-label="Search by city..." placeholder="Search by city..." onChange={(event) => handleChange(event)} value={searchInput}  id="city-search" autoComplete="off" autoCapitalize="off" required autoFocus />
            </div>
          </form>
          {loadingStatus ? <LoadingSpinner /> : errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : searchInput ? <div className="search-options">{citySearchResults.sort((a, b) => b.population - a.population).map(city => <CitySearchResult key={city.id} city={city} selectCity={selectCity} />)}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;