export default function getGeolocation(success, error) {
  const options = {
    timeout: 18000
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options);
}