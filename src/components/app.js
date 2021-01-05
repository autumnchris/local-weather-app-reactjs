import React from 'react';
import axios from 'axios-jsonp-pro';
import LoadingSpinner from './loading-spinner';
import ResultsContainer from './results-container';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      location: '',
      tempType: JSON.parse(localStorage.getItem('tempType')) || 'f',
      weatherData: {
        city: '',
        currentWeather: {
          temp: '',
          weatherSummary: '',
          weatherIcon: ''
        },
        sunriseTime: '',
        sunsetTime: '',
        hourlyForecast: [],
        dailyForecast: []
      },
      isLoading: true,
      loadingError: false,
      errorMessage: ''
    };
    this.getSuccess = this.getSuccess.bind(this);
    this.getError = this.getError.bind(this);
    this.toggleTempType = this.toggleTempType.bind(this);
  }

  fetchGeocodingAPI() {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&key=${process.env.GEOCODING_API_KEY}`);
  }

  fetchWeatherAPI() {
    return axios.jsonp(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${this.state.lat},${this.state.lng}`);
  }

  getSuccess(position) {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });

    axios.all([this.fetchGeocodingAPI(), this.fetchWeatherAPI()])
      .then(axios.spread((geocodingData, weatherData) => {
        this.setState({
          weatherData: {
            city: geocodingData.data.results[0].address_components[3].long_name,
            currentWeather: {
              temp: weatherData.currently.temperature,
              weatherSummary: weatherData.currently.summary,
              weatherIcon: weatherData.currently.icon
            },
            sunriseTime: weatherData.daily.data[0].sunriseTime,
            sunsetTime: weatherData.daily.data[0].sunsetTime,
            hourlyForecast: weatherData.hourly.data,
            dailyForecast: weatherData.daily.data
          },
          isLoading: false,
          loadingError: false
        });
      })).catch(() => {
        this.setState({
          isLoading: false,
          loadingError: true,
          errorMessage: 'Unable to load current weather at this time.'
        });
      });
  }

  getError(err) {
    this.setState({
      isLoading: false,
      loadingError: true,
      errorMessage: `${err.message}.`
    });
  }

  toggleTempType() {
    let tempType = this.state.tempType;
    tempType === 'f' ? tempType = 'c' : tempType = 'f';
    this.setState({ tempType });
    localStorage.setItem('tempType', JSON.stringify(tempType));
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getSuccess, this.getError);
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>View your local weather</h1>
        </header>
        <main>
          {this.state.isLoading ? <LoadingSpinner /> : null}
          {!this.state.isLoading ? <ResultsContainer weatherData={this.state.weatherData} tempType={this.state.tempType} toggleTempType={this.toggleTempType} loadingError={this.state.loadingError} errorMessage={this.state.errorMessage} /> : null}
        </main>
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()} | Powered by <a href="https://darksky.net/poweredby" target="_blank">Dark Sky</a></footer>
      </React.Fragment>
    );
  }
}

export default App;
