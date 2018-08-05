import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>View your local weather</h1>
        </header>
        {/* FOOTER */}
        <footer>
          <span>Coded by <a href="../portfolio" target="_blank">Autumn Bullard</a></span>
          <span>Powered by <a href="https://darksky.net/poweredby" target="_blank">Dark Sky</a></span>
        </footer>
      </div>
    );
  }
}
