import React from 'react';
import axios from 'axios';
import LoadingSpinner from './loading-spinner';
import ResultsContainer from './results-container';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lon: null,
      tempType: JSON.parse(localStorage.getItem('tempType')) || 'f',
      weatherData: null,
      isLoading: true,
      loadingError: false,
      errorMessage: ''
    };
    this.getSuccess = this.getSuccess.bind(this);
    this.getError = this.getError.bind(this);
    this.toggleTempType = this.toggleTempType.bind(this);
  }

  fetchCurrentWeatherData() {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?&lat=${this.state.lat}&lon=${this.state.lon}&units=imperial&appid=${process.env.API_KEY}`);
  }

  fetchForecastData() {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?&lat=${this.state.lat}&lon=${this.state.lon}&units=imperial&appid=${process.env.API_KEY}`);
  }

  getSuccess(position) {
    this.setState({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });

    axios.all([this.fetchCurrentWeatherData(), this.fetchForecastData()])
      .then(axios.spread((currentWeatherData, forecastData) => {
        this.setState({
          weatherData: {
            city: currentWeatherData.data.name,
            currentWeather: {
              temp: currentWeatherData.data.main.temp,
              weatherSummary: currentWeatherData.data.weather[0].description,
              weatherIcon: currentWeatherData.data.weather[0].id,
              isNight: currentWeatherData.data.weather[0].icon.slice(-1) === 'n' ? true : false
            },
            sunriseTime: currentWeatherData.data.sys.sunrise,
            sunsetTime: currentWeatherData.data.sys.sunset,
            hourlyForecast: forecastData.data.hourly,
            dailyForecast: forecastData.data.daily
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
          {this.state.isLoading ? <LoadingSpinner /> : <ResultsContainer weatherData={this.state.weatherData} tempType={this.state.tempType} toggleTempType={this.toggleTempType} loadingError={this.state.loadingError} errorMessage={this.state.errorMessage} />}
        </main>
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </React.Fragment>
    );
  }
}

export default App;
