import React from "react";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast (props) {
    function handleResponse(response) {
        console.log(response.data);
    }

    let apikey = "816a63a33af440332c05784e3d9896ea";
    let long = props.coordinates.lon;
    let lat = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return (
        <div className="WeatherForecast">
            <div className="col">
                <div className="card-day">
                    <div className="card-body">
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
            </div>
        </div>
    )
}