import { Component } from "react";

import "./index.css";

class WeatherHome extends Component {
  state = {
    weatherData: [],
   
    
  };

  getData = async (event) => {
    if (event.key === "Enter") {
      const {cityName} = this.state
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c1175c5fd819dc71e8f548042b7058d7`;

      const options = {
        method: "GET",
      };

      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      this.setState({ weatherData: data });
    }
  };

  
    
  renderLocation = () => {
    const { weatherData } = this.state;

    return (
      <>
        <p className="location">{weatherData.name}</p>
        {weatherData.main ? (
          <div>
          <p className="temp">Heigh Temperature: {Math.floor(weatherData.main.temp_max - 273)}F</p>
          <p className="temp">Low Temperature: {Math.floor(weatherData.main.temp_min - 273)}F</p>
          <p className="temp">Humidity: {weatherData.main.humidity}</p>
          </div>
        ) : null}
        {weatherData.wind ? (
          <p className="speed">wind speed : {weatherData.wind.speed}</p>
        ) : null} 
        {weatherData.weather ? (
          <p className="speed">Description : {weatherData.weather.map(item => item.description)}</p>
        ) : null}
          
        </>
    );
  };

  changeInput = (event) => {
    this.setState({ cityName: event.target.value });
  };

 

  render() {
    const {cityName} = this.state;
  return (
      <div className="main-container">
        <h1 className="main-heading">Weather Report</h1>
       
        <div className="form">
          <input
            type="text"
            value={cityName}
            onChange={this.changeInput}
            placeholder="Enter city name"
            className="input"
            onKeyDown={this.getData}
            onClick={this.onChangeColor}
          />
          
          <button type="submit" className="button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              alt="search"
              className="search"
            />
          </button>
        </div>
        <div>{this.renderLocation()}</div>
        
      </div>
    );
  }
}

export default WeatherHome;