import { TextField, Button, Box, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function CitySearch({ onSearch, getLocation }) {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    if (city) {
      onSearch(city);
    }
  };
  const getLocationByIP = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const { latitude, longitude } = data;

      getLocation(latitude, longitude);
    } catch (er) {
      console.log(er);
      alert("Failed to determine the location");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "30vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 1,
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: "750px",
        }}
      >
        {/* City Name */}
        <TextField
          label="City name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            flex: 1,
            minWidth: 0,
            maxWidth: "350px",

            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={{
            height: "40px",
            minWidth: {
              xs: "45px",
              sm: "100px",
            },
            px: {
              xs: 0,
              sm: 2,
            },
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",

            "& .MuiButton-startIcon": {
              margin: {
                xs: 0,
                sm: "0 8px 0 0",
              },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: {
                xs: "none",
                sm: "inline",
              },
            }}
          >
            Search
          </Box>
        </Button>

        {/* Location Button */}
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={getLocationByIP}
          startIcon={<LocationOnIcon />}
          sx={{
            height: "40px",
            minWidth: {
              xs: "45px",
              sm: "135px",
            },
            px: {
              xs: 0,
              sm: 2,
            },
            borderRadius: "12px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.08)",
            "& .MuiButton-startIcon": {
              margin: {
                xs: 0,
                sm: "0 8px 0 0",
              },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: {
                xs: "none",
                sm: "inline",
              },
            }}
          >
            Your location
          </Box>
        </Button>
      </Stack>
    </Box>
  );
}
