import React, {useState} from "react";
import axios from "axios";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast (props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }

    if (loaded){
        return (
        <div className="WeatherForecast">
            <div className="row">
                {forecast.map(function (dailyForecast, index) {
                    if (index < 5) {
                        return (
                            <div className="col" key={index}>
                <div className="card-day">
                    <div className="card-body">
                        <WeatherForecastDay data={dailyForecast} />
                    </div>
                </div>
            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
    } else{

    let apikey = "816a63a33af440332c05784e3d9896ea";
    let long = props.coordinates.lon;
    let lat = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return null;

    }

    
    
}