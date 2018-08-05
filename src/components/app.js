import React, { Component } from 'react';
import axios from 'axios-jsonp-pro';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coords: {
        lat: null,
        lng: null
      },
      location: '',
      tempType: 'F',
      current: {
        temp: '',
        weather: ''
      }
    };
    this.currentF = null;
    this.currentC = null;

    this.getSuccess = this.getSuccess.bind(this);
    this.getError = this.getError.bind(this);
    this.fetchGeocodingAPI = this.fetchGeocodingAPI.bind(this);
    this.fetchweatherAPI = this.fetchweatherAPI.bind(this);
  }

  fetchGeocodingAPI() {
    const geocodingAPIKey = 'AIzaSyDF-M0gmMFMWJ2zO0tfKNs8Y0zbRUJaACA';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.coords.lat},${this.state.coords.lng}&key=${geocodingAPIKey}`);
  }

  fetchweatherAPI() {
    const weatherAPIKey = '6e76605e3f2672147d041fcb0df33e81';
    return axios.jsonp(`https://api.darksky.net/forecast/${weatherAPIKey}/${this.state.coords.lat},${this.state.coords.lng}`);
  }

  getSuccess(position) {
    this.setState({
      coords: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });

    axios.all([this.fetchGeocodingAPI(), this.fetchweatherAPI()])
      .then(axios.spread((geocodingData, weatherData) => {
        this.currentF = Math.round(weatherData.currently.temperature);
        this.currentC = Math.round((weatherData.currently.temperature - 32) * (5/9));

        this.setState({
          location: geocodingData.data.results[0].address_components[3].long_name,
          current: {
            temp: this.currentF,
            weather: weatherData.currently.summary
          }
        });
        console.log(weatherData);
      })).catch((err) => {
        console.log(err);
      });
  }

  getError(err) {
    console.log(err);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getSuccess, this.getError);
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>View your local weather</h1>
        </header>
        <main>
          <div className="card">
            <div className="col">
              {/* CURRENT WEATHER */}
              <div className="location">{this.state.location}</div>
              <div className="temp">{this.state.current.temp}&deg;{this.state.tempType}</div>
              <div className="weather">{this.state.current.weather}</div>
            </div>
          </div>
        </main>
        {/* FOOTER */}
        <footer>
          <span>Coded by <a href="../portfolio" target="_blank">Autumn Bullard</a></span>
          <span>Powered by <a href="https://darksky.net/poweredby" target="_blank">Dark Sky</a></span>
        </footer>
      </div>
    );
  }
}
