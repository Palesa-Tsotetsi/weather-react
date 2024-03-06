import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  let [city, setCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [showResults, setShowResults] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    alert("searching...");

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bc5ca568ee2d7c71357ca430a3ff8705&units=metric`;

    axios.get(apiUrl).then(displayData);
    setShowResults(true);
  }

  function updateCity(event) {
    setCity(event.target.value);
    setShowResults(false);
  }

  function displayData(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
    setShowResults(true);
  }

  return (
    <div>
      <h2>Weather Search Engine</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter City.." onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>

      {showResults && (
        <>
          <h3>Current Weather for {city}</h3>
          <ul>
            <li>Temperature : {Math.round(temperature)}°C </li>
            <li>Description: {description}</li>
            <li>Humidity: {humidity}%</li>
            <li>Wind Speed: {Math.round(wind)}km/h</li>
            {icon && (
              <img
                src={`https://api.openweathermap.org/img/wn/${icon}.png`}
                alt="Weather Icon"
              />
            )}
          </ul>
        </>
      )}
    </div>
  );
}
