import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ country }) => {
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${process.env.REACT_APP_API_URL}&q=${country}&aqui=no`)
        .then(res => {
          setTemp(res.data.current.temp_c);
          setWind(res.data.current.wind_mph);
        })
        .catch(err => console.error(err));
    }

    fetchData();
    console.log("Fetching weather");
  }, []);

  return (
    <div>
      <h1>Weather in {country}</h1>
      <p>Temperature: {temp} Celcius</p>
      <p>Wind: {wind} m/s</p>
    </div>
  );
};
export default Weather;
