import React, { Component } from 'react';
import HourlyForecast from './hourly-forecast';
import DailyForecast from './daily-forecast';
import axios from 'axios-jsonp-pro';
import moment from 'moment';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      location: '',
      tempType: 'F',
      currentTemp: '',
      currentWeatherIcon: '',
      currentWeather: '',
      sunrise: '',
      sunset: '',
      buttonClass: 'switch',
      hourlyForecast: [],
      dailyForecast: [],
      errorMessage: '',
      spinnerStyle: {display: 'block'},
      resultStyle: {display: 'none'},
      errorStyle: {display: 'none'},
      hourlyFTempStyle: {display: 'inline'},
      hourlyCTempStyle: {display: 'none'},
      dailyFTempStyle: {display: 'inline'},
      dailyCTempStyle: {display: 'none'}
    };
    this.currentF = null;
    this.currentC = null;

    this.getSuccess = this.getSuccess.bind(this);
    this.getError = this.getError.bind(this);
    this.fetchGeocodingAPI = this.fetchGeocodingAPI.bind(this);
    this.fetchweatherAPI = this.fetchweatherAPI.bind(this);
    this.changeTempType = this.changeTempType.bind(this);
  }

  fetchGeocodingAPI() {
    const geocodingAPIKey = 'AIzaSyDF-M0gmMFMWJ2zO0tfKNs8Y0zbRUJaACA';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.lng}&key=${geocodingAPIKey}`);
  }

  fetchweatherAPI() {
    const weatherAPIKey = '6e76605e3f2672147d041fcb0df33e81';
    return axios.jsonp(`https://api.darksky.net/forecast/${weatherAPIKey}/${this.state.lat},${this.state.lng}`);
  }

  getSuccess(position) {
    this.setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });

    axios.all([this.fetchGeocodingAPI(), this.fetchweatherAPI()])
      .then(axios.spread((geocodingData, weatherData) => {
        this.currentF = Math.round(weatherData.currently.temperature);
        this.currentC = Math.round((weatherData.currently.temperature - 32) * (5/9));
        this.setState({
          location: geocodingData.data.results[0].address_components[3].long_name,
          currentTemp: this.currentF,
          currentWeatherIcon: `wi wi-forecast-io-${weatherData.currently.icon}`,
          currentWeather: weatherData.currently.summary,
          sunrise: weatherData.daily.data[0].sunriseTime,
          sunset: weatherData.daily.data[0].sunsetTime,
          hourlyForecast: weatherData.hourly.data,
          dailyForecast: weatherData.daily.data,
          spinnerStyle: {display: 'none'},
          resultStyle: {display: 'grid'}
        });
      })).catch(() => {
        this.setState({
          errorMessage: 'Unable to load current weather.',
          spinnerStyle: {display: 'none'},
          errorStyle: {display: 'block'}
        });
      });
  }

  getError(err) {
    this.setState({
      errorMessage: `${err.message}.`,
      spinnerStyle: {display: 'none'},
      errorStyle: {display: 'block'}
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getSuccess, this.getError);
  }

  changeTempType() {

    if (this.state.tempType === 'F') {
      this.setState({
        tempType: 'C',
        currentTemp: this.currentC,
        buttonClass: 'switch celsius',
        hourlyFTempStyle: {display: 'none'},
        hourlyCTempStyle: {display: 'inline'},
        dailyFTempStyle: {display: 'none'},
        dailyCTempStyle: {display: 'inline'}
      });
    }
    else {
      this.setState({
        tempType: 'F',
        currentTemp: this.currentF,
        buttonClass: 'switch fahrenheit',
        hourlyFTempStyle: {display: 'inline'},
        hourlyCTempStyle: {display: 'none'},
        dailyFTempStyle: {display: 'inline'},
        dailyCTempStyle: {display: 'none'}
      });
    }
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>View your local weather</h1>
        </header>
        <main>
          {/* LOADING SPINNER */}
          <div className="spinner" style={this.state.spinnerStyle}>
            <span className="fa fa-sync-alt fa-spin fa-3x fa-fw" aria-label="Loading..."></span>
          </div>
          <div className="card" style={this.state.resultStyle}>
            <div className="col">
              {/* CURRENT WEATHER */}
              <div className="location">{this.state.location}</div>
              <div className="temp">{this.state.currentTemp}&deg;{this.state.tempType}</div>
              <div className={`${this.state.currentWeatherIcon} weather-icon`}></div>
              <div className="weather">{this.state.currentWeather}</div>
              {/* SUNRISE/SUNSET */}
              <table className="sunrise-sunset">
                <thead>
                  <tr>
                    <th>Sunrise</th>
                    <th>Sunset</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{moment(this.state.sunrise * 1000).format('h:mm A')}</td>
                    <td>{moment(this.state.sunset * 1000).format('h:mm A')}</td>
                  </tr>
                </tbody>
              </table>
              {/* BUTTON */}
              <button type="button" className={this.state.buttonClass} onClick={() => this.changeTempType()}>&deg;{this.state.tempType}</button>
            </div>
            <div className="col">
              {/* HOURLY FORECAST */}
              <HourlyForecast hours={this.state.hourlyForecast} fTempStyle={this.state.hourlyFTempStyle} cTempStyle={this.state.hourlyCTempStyle} />
              {/* FIVE-DAY FORECAST */}
              <DailyForecast days={this.state.dailyForecast} fTempStyle={this.state.dailyFTempStyle} cTempStyle={this.state.dailyCTempStyle} />
            </div>
          </div>
          {/* ERROR MESSAGE */}
          <p className="message error-message" style={this.state.errorStyle}><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {this.state.errorMessage}</p>
        </main>
        {/* FOOTER */}
        <footer>
          <span>Coded by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a></span>
          <span>Powered by <a href="https://darksky.net/poweredby" target="_blank">Dark Sky</a></span>
        </footer>
      </div>
    );
  }
}
