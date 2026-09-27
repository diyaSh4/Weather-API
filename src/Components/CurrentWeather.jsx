import { AcUnit, Cloud, Thunderstorm, WbSunny } from "@mui/icons-material";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

export default function CurrentWeather({ data }) {
  const {
    city,
    temp,
    description,
    icon,
    minTemp,
    maxTemp,
    humidity,
    windSpeed,
  } = data;

  const renderIcon = () => {
    switch (icon) {
      case "Clear":
        return <WbSunny />;
      case "Snow":
        return <AcUnit />;
      case "Clouds":
        return <Cloud />;
      case "ThunderStorms":
        return <Thunderstorm />;
      default:
        return <Cloud />;
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: "30%",
      }}
    >
      <CardContent>
        <Typography variant="h5" component={"div"} align="center">
          {city}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" component="span">
            {temp}°C
          </Typography>
          <Box sx={{ marginLeft: 2 }}>{renderIcon()}</Box>
        </Box>
        <Typography variant="body1" align="center">
          {description}
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexWrap: "nowrap",
          }}
        >
          <Grid item>
            <Typography variant="body2">Min: {minTemp}°C</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Max: {maxTemp}°C</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Humidity: {humidity}%</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Wind:{windSpeed} m/s</Typography>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
