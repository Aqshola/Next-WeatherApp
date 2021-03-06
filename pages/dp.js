import { useEffect, useState } from "react";
import ForecastDayCard from "../components/ForecastDayCard";
import Nav from "../components/Nav";
import Ornament from "../components/Ornament";
import WeatherChart from "../components/WeatherChart";
import WeatherIcon from "../components/WeatherIcon";
import WeatherTitle from "../components/WeatherTitle";
import {
  getCurrentData,
  getCurrentDataByCoord,
  getForecastData,
  getForecastDataByCoord,
  getForecastDay,
  getForecastHours,
  getLocation,
} from "../utils/getWeather";
export default function dp() {
  const [forecastData, setforecastData] = useState({});
  const [currentData, setcurrentData] = useState({});
  const [location, setlocation] = useState({});

  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const locate = await getLocation();

      if (locate.type === "success") {
        const currentWeather = (
          await getCurrentDataByCoord(locate.latitude, locate.longitude)
        ).data;
        const forecastCoords = await getForecastDataByCoord(
          locate.latitude,
          locate.longitude
        );
        const forecastDay = getForecastDay(forecastCoords);
        const forecastHours = getForecastHours(forecastCoords);

        setcurrentData(currentWeather);
        setforecastData({
          forecastDay: forecastDay,
          forecastHours: forecastHours,
        });
      }
      setlocation(locate);
      setloading(false);
    };
    fetch();
  }, []);

  const getIcon = (icon) => {
    return `/assets/WeatherIcon/${icon}.svg`;
  };

  return (
    <div className="max-w-screen-xl mx-auto h-screen max-h-screen relative">
      <Ornament />
      <div className="flex w-full flex-col relative">
        <Nav />

        {loading ? (
          <div className="self-center h-72 w-max flex items-end">
            <h1 className="text-4xl font-medium">looking for weather...</h1>
          </div>
        ) : location.type === "error" ? (
          <div className="self-center h-72 w-56 flex items-end">
            <h1 className="text-2xl font-medium text-center">{location.msg}</h1>
          </div>
        ) : (
          <>
            <div className=" p-5 w-full flex flex-col md:flex-row md:space-x-2 items-center">
              <WeatherTitle current={currentData} />
              <WeatherIcon
                src={getIcon(currentData.weather[0].icon)}
                size="md"
                className="md:flex hidden"
              />
              <WeatherChart forecast={forecastData.forecastHours} />
            </div>

            <ForecastDayCard forecast={forecastData.forecastDay} />
          </>
        )}
      </div>
    </div>
  );
}
