import { useState } from "react";
import "./App.css";

const api = {
  key:  import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [favorites, setFavorites] = useState([]);

  // Search button handler.
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  // Function to add a city to favorites.
  const addToFavorites = () => {
    if (!favorites.includes(weather.name)) {
      setFavorites([...favorites, weather.name]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}

        <div>
          <h2>Favorites</h2>
          <ul>
            {favorites.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
