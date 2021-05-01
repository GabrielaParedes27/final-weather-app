import React from "react";

export default function WeatherForecastDay(props) {
    function maxTemp() {
        let temperature = Math.round(props.data.temp.max);
        return `${temperature}°`;
    }

    function minTemp() {
        let temperature = Math.round(props.data.temp.min);
        return `${temperature}°`;
    }

    function day() {
        let date = new Date(props.data.dt * 1000);
        let day = date.getDay();

        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return days[day];
    }

    function icon() {
        let iconCode = props.data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        return iconUrl;
    }

    return (
        <div>
            <div className="WeatherForecast-day">{day()}</div>
            <img src={icon()} alt=" " />
            <div className="forecast-temp">
                <strong> {maxTemp()} </strong> | {minTemp()}
            </div>
        </div>
    )
}