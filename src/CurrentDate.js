import React from "react";

export default function CurrentDate(props){
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[props.date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agust",
    "September",
    "October",
    "November",
    "December"
];
let month = months[props.date.getMonth()];
let dayNumber = props.date.getDate();
let year = props.date.getFullYear();
  let hours = props.date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = props.date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return (
    <div>
      <h5>
      {day}, {month} {dayNumber} {year} | {hours}:{minutes}
      </h5>
    </div>
  );
}