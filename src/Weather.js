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

  function currentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    const apiKey = "816a63a33af440332c05784e3d9896ea";
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(geoUrl).then(handleResponse);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentPosition);
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
          <button id="current-button" onClick={getCurrentLocation} >Current</button>
           
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
          <li id="precipitation"> Precipitation: <strong>{weatherData.precipitation}%</strong> </li>
          <li id="humidity">Humidity: <strong>{weatherData.humidity}%</strong> </li>
          <li id="wind">Wind: <strong>{weatherData.wind}km/hr</strong> </li>
          <li id="feels-like">Feels like: <strong>{weatherData.feels}°C</strong> </li>
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