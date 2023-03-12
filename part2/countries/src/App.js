import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [queryCountries, setQueryCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const [oneCountry, setOneCountry] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(COUNTRIES_API_URL)
        .then(res => res.data)
        .then(data => setCountries(data));
    }
    fetchData();
  }, []);

  useEffect(() => {
    setQueryCountries([]);
    setOneCountry(null);
    if (countries.length === 0 || !query) return;
    let names = countries.map(country => country.name["common"]);
    let results = names.filter(c => c.toLowerCase().includes(query.toLowerCase()));
    setQueryCountries(results.sort());

    if (results.length > 10) {
      setMessage("Too many matches, specifiy another filter");
    } else if (results.length === 1) {
      setOneCountry(getCountryObject(results[0]));
    }
  }, [query]);

  function handleClick(e, countryName) {
    const country = getCountryObject(countryName);
    setOneCountry(country);
  }

  function getCountryObject(countryName) {
    const country = countries.find(c => c.name["common"] === countryName);
    return {
      name: country.name["common"],
      capital: country.capital,
      area: country.area,
      languages: Object.values(country.languages),
      flag: country.flags["png"]
    };
  }

  return (
    <div>
      <div>
        find countries <input onInput={e => setQuery(e.target.value)} />
      </div>
      {!oneCountry && (
        <div>
          {queryCountries.length > 10 && <p>{message}</p>}
          {queryCountries.length > 0 &&
            queryCountries.length <= 10 &&
            queryCountries.map(country => (
              <p key={country}>
                {country}
                <button onClick={e => handleClick(e, country)}>show</button>
              </p>
            ))}
        </div>
      )}
      {oneCountry && (
        <div>
          <h1>{oneCountry.name}</h1>
          <p>capital {oneCountry.capital}</p>
          <p>area {oneCountry.area}</p>

          <h4>languages:</h4>
          <ul>
            {oneCountry.languages.map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={oneCountry.flag} />
          <Weather country={oneCountry.name} />
        </div>
      )}
    </div>
  );
}
