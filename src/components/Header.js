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
        <div className="item">
          <aside>
            <div className="button-group">
              <button type="button" className="button city-search-button" onClick={() => setModalVisibility(true)} aria-label="Search By City" title="Search By City">
                <span className="fa-solid fa-magnifying-glass icon"></span>
              </button>
              <button type="button" className="button current-location-button" onClick={() => getGeolocation()} aria-label="Get Current Location" title="Get Current Location">
                <span className="fa-solid fa-location-dot icon"></span>
              </button>
            </div>
          </aside>
        </div>
      </header>
    );
  }
}

export default Header;