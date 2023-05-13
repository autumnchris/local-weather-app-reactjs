import React from 'react';

const Header = ({ pageLoadView, setModalVisibility, getGeolocation }) => {

  if (pageLoadView) {
    return (
      <header className="page-load-view">
        <h1>View the local weather</h1>
      </header>
    );
  }
  else {
    return (
      <header className="results-view">
        <div className="item">
          <h1>View the local weather</h1>
        </div>
        <div className="item button-group">
          <button type="button" className="button city-search-button" onClick={() => setModalVisibility(true)} aria-label="Search By City" title="Search By City">
            <span className="fas fa-search icon"></span>
          </button>
          <button type="button" className="button current-location-button" onClick={() => getGeolocation()} aria-label="Get Current Location" title="Get Current Location">
            <span className="fas fa-map-marker-alt icon"></span>
          </button>
        </div>
      </header>
    );
  }
}

export default Header;