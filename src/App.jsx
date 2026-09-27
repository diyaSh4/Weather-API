import { useEffect, useState } from "react";
import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";

import { Brightness4, Brightness7 } from "@mui/icons-material";

import CitySearch from "./Components/CitySearch";
import CurrentWeather from "./Components/CurrentWeather";

import axios from "axios";

import "./App.css";

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "dark";
  });

  const [weatherData, setWeatherData] = useState(null);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const fetchWeather = (city) => {
    const apiKey = "782f40fe67d623ff1947e18e2a5b706c";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ar`,
      )
      .then((res) => {
        const { main, weather, wind, name } = res.data;
        const weatherDetails = {
          city: name,
          temp: main.temp,
          description: weather[0].description,
          icon: weather[0].main,
          minTemp: main.temp_min,
          maxTemp: main.temp_max,
          humidity: main.humidity,
          windSpeed: wind.speed,
        };
        setWeatherData(weatherDetails);
      })
      .catch((error) => {
        console.log(error);
        setWeatherData(null);
      });
  };
  const fetchWeatherByLocation = (latitude, longitude) => {
    const apiKey = "782f40fe67d623ff1947e18e2a5b706c";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=ar`,
      )

      .then((res) => {
        const { main, weather, wind, name } = res.data;
        const weatherDetails = {
          city: name,
          temp: main.temp,
          description: weather[0].description,
          icon: weather[0].main,
          minTemp: main.temp_min,
          maxTemp: main.temp_max,
          humidity: main.humidity,
          windSpeed: wind.speed,
        };
        setWeatherData(weatherDetails);
      })
      .catch((error) => {
        console.log(error);
        setWeatherData(null);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <CssBaseline />
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            style={{ position: "absolute", left: "85%", top: "50px" }}
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <CitySearch
            onSearch={fetchWeather}
            getLocation={fetchWeatherByLocation}
          />
          {weatherData && <CurrentWeather data={weatherData} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
