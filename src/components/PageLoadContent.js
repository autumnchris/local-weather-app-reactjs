import React from 'react';

const PageLoadContent = ({ setModalVisibility, getGeolocation }) => {
  return (
    <div className="button-group page-load-buttons">
      <button type="button" className="button current-location-button" onClick={() => getGeolocation()}><span className="fa-solid fa-location-dot icon" aria-hidden="true"></span> Get Current Location</button>
      <button type="button" className="button city-search-button" onClick={() => setModalVisibility(true)}><span className="fa-solid fa-magnifying-glass icon" aria-hidden="true"></span> Search By City</button>
    </div>
  );
}

export default PageLoadContent;