import React from 'react';
import getTempType from '../utils/getTempType';

const SwitchButton = ({ tempType, setTempType }) => {

  function toggleTempType() {
    let currentTempType = tempType;
    currentTempType === 'f' ? currentTempType = 'c' : currentTempType = 'f';
    setTempType(currentTempType);
    getTempType(currentTempType);
  }

  return <button type="button" className={`button switch-button ${tempType}`} onClick={(event) => toggleTempType(event)}>&deg;{tempType.toUpperCase()}</button>;
}

export default SwitchButton;