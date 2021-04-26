import React, { useState} from "react";
import "./Weather.css";
import axios from "axios";
import CurrentDate from "./CurrentDate";
import WeatherTemp from "./WeatherTemp";


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
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      wind: Math.round(response.data.wind.speed),
      city: response.data.name + ", " + response.data.sys.country,
      date: new Date(response.data.dt * 1000),
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
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
            
            <div className="location-icon">
              <i className="fas fa-map-marker-alt" id="location"></i>
              <h2 className="location" id="city">
                {weatherData.city}
              </h2>
            </div>
          </div>
          </div>
          <div className="col-6">
          <div className="details-info">
        <CurrentDate date={weatherData.date} />
        <h5 id="description">{weatherData.description}</h5>
        <ul>
          <i className="fas fa-cloud-showers-heavy"></i>
          <li id="precipitation">Precipitation: {weatherData.precipitation} %</li>
          <i className="fas fa-tint"></i>
          <li id="humidity">Humidity: {weatherData.humidity}%</li>
          <i className="fas fa-wind"></i>
          <li id="wind">Wind: {weatherData.wind} km/hr</li>
          <i className="fas fa-temperature-high"></i>
          <li id="feels-like">Feels like: {weatherData.feels} °C</li>
        </ul>
      </div>
      </div>
      <div className="Forecast">
      <div className="col">
        <div className="card-day" id="day-1">
          <div class="card-body">
            <h5>00:00</h5>
            <img
              src="https://openweathermap.org/img/wn/04d@2x.png"
              alt="Forecast weather icon"
            />
            <div className="forecast-temp">
              <strong>12° </strong> | 10°
            </div>
          </div>
        </div>
        <div className="card-day" id="day-2">
          <div class="card-body">
            <h5>03:00</h5>
            <img
              src="https://openweathermap.org/img/wn/01d@2x.png"
              alt="Forecast weather icon"
            />
            <div className="forecast-temp">
              <strong>10° </strong> | 9°
            </div>
          </div>
        </div>
        <div className="card-day" id="day-3">
          <div class="card-body">
            <h5>06:00</h5>
            <img
              src="https://openweathermap.org/img/wn/02d@2x.png"
              alt="Forecast weather icon"
            />
            <div className="forecast-temp">
              <strong>9° </strong> | 9°
            </div>
          </div>
        </div>
        <div className="card-day" id="day-4">
          <div class="card-body">
            <h5>09:00</h5>
            <img
              src="https://openweathermap.org/img/wn/03d@2x.png"
              alt="Forecast weather icon"
            />
            <div className="forecast-temp">
              <strong>13° </strong> | 13°
            </div>
          </div>
        </div>
        <div className="card-day" id="day-5">
          <div class="card-body">
            <h5>12:00</h5>
            <img
              src="https://openweathermap.org/img/wn/04d@2x.png"
              alt="Forecast weather icon"
            />
            <div className="forecast-temp">
              <strong>17° </strong> | 17°
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
            </div>
      </div>
    );
    } else {
        search();
        return "Loading...";
    }
}