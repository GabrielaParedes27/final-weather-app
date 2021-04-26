import React, { useState} from "react";
import "./WeatherTemp.css";

export default function WeatherTemp(props) {
    const [unit, setUnit] = useState("celsius");
    function displayFahrenheit(event) {
        event.preventDefault();
        setUnit("fahrenheit");
    }

    function displayCelsius(event) {
        event.preventDefault();
        setUnit("celsius");
    }

    function fahrenheit() {
        return (props.celsius * 9) / 5 + 32;
    }

    if (unit === "celsius") {
        return (
            <div className="WeatherTemp">
                <span className="temperature"> {Math.round(props.celsius)}°</span>
                <span className="unit">
                     C |{" "}
                    <a href="/" onClick={displayFahrenheit}>
                        F
                    </a>
                </span>
            </div>
        );
    } else {
        return (
            <div className="WeatherTemp">
                <span className="temperature"> {Math.round(fahrenheit())}° </span>
                <span className="unit">
                    <a href="/" onClick={displayCelsius}>
                     C
                    </a>{" "}
                    | F
                </span>
            </div>
        );
    }
}