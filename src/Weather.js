import React, { useState} from "react";
import "./Weather.css";
import axios from "axios";
import CurrentDate from "./CurrentDate";
import WeatherTemp from "./WeatherTemp";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props){
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState(props.defaultCity);
    
    function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      precipitation: response.data.clouds.all,
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      wind: Math.round(response.data.wind.speed),
      city: response.data.name + ", " + response.data.sys.country,
      date: new Date(response.data.dt * 1000),
      coordinates: response.data.coord,
      feels: Math.round(response.data.main.feels_like)
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "816a63a33af440332c05784e3d9896ea";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

    if (weatherData.ready) {
    return (
        <div className="Weather">
            <div className="container">
                <div className="Search">
      <form onSubmit={handleSubmit} id="search-form">
        <div className="searching-bar">
          <input
            id="search-bar"
            type="search"
            placeholder="Search another city"
            onChange= {handleCityChange}
          />
          <button id="search-button">Search</button>
          <button id="current-button">Current</button>
           
        </div>
      </form>
    </div>
    <div className="row">
        <div className="col-6">
    <div className="ppal-temp">
            <img
              src={weatherData.icon}
              alt={weatherData.description}
              id="icon"
            />
            <WeatherTemp celsius={weatherData.temperature} />
              <h2 className="location" id="city">
                {weatherData.city}
              </h2>
          </div>
          </div>
          <div className="col-6">
          <div className="details-info">
        <CurrentDate date={weatherData.date} />
        <h5 id="description">{weatherData.description}</h5>
        <ul>
          <li id="precipitation">Precipitation: {weatherData.precipitation} %</li>
          <li id="humidity">Humidity: {weatherData.humidity}%</li>
          <li id="wind">Wind: {weatherData.wind} km/hr</li>
          <li id="feels-like">Feels like: {weatherData.feels} °C</li>
        </ul>
      </div>
      </div>
      </div>
        <WeatherForecast coordinates={weatherData.coordinates} />
            </div>
      </div>
    );
    } else {
        search();
        return "Loading...";
    }
}