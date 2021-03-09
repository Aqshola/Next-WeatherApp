import { useEffect, useState } from "react";
import ForecastDayCard from "../components/ForecastDayCard";
import LoadComponent from "../components/LoadComponent";
import Nav from "../components/Nav";
import Ornament from "../components/Ornament";
import WeatherChart from "../components/WeatherChart";
import WeatherIcon from "../components/WeatherIcon";
import WeatherTitle from "../components/WeatherTitle";
import { getLocation } from "../utils/getLocation";
import {
  getCurrentData,
  getForecastData,
  getForecastDay,
  getForecastHours,
} from "../utils/getWeather";
export default function Home({ currentWeather, forecastDay, forecastHours }) {
  const [forecastData, setforecastData] = useState({
    forecastDay,
    forecastHours,
  });
  const [currentData, setcurrentData] = useState(currentWeather);

  const [loading, setloading] = useState(false);

  const _updateLocation = (locate) => {
    setlocation(locate);
  };

  const _updateWeather = async (current, day, hour) => {
    setcurrentData(current);
    setforecastData({
      ...forecastData,
      forecastDay: day,
      forecastHours: hour,
    });
  };

  const getIcon = (icon) => {
    return `/assets/WeatherIcon/${icon}.svg`;
  };

  return (
    <div className="max-w-screen-lg mx-auto h-screen max-h-screen relative">
      <LoadComponent
        loading={loading}
        condition={currentData.weather ? currentData.weather.main : "Mist"}
      />

      {currentData.type === "success" && (
        <Ornament condition={currentData.weather.main} />
      )}
      <div className="flex w-full flex-col relative">
        <Nav
          updateGeo={_updateLocation}
          handleLoading={setloading}
          updateWeather={_updateWeather}
        />

        {currentData.type === "fail" ? (
          <div className="w-full h-96 flex justify-center items-center">
            <h2 className="text-3xl font-medium text-center">
              {currentData.message} ☹
            </h2>
          </div>
        ) : (
          <>
            <div className=" p-5 w-full flex flex-col md:flex-row md:space-x-2 items-center">
              <WeatherTitle current={currentData} />
              <WeatherIcon
                src={getIcon(currentData.weather.icon)}
                size="md"
                className="md:flex hidden"
              />
              <WeatherChart
                forecast={forecastData.forecastHours}
                condition={currentData.weather.main}
              />
            </div>

            <ForecastDayCard forecast={forecastData.forecastDay} />
          </>
        )}
      </div>
    </div>
  );
}

Home.getInitialProps = async () => {
  const locationCoords = await getLocation();

  const currentWeather = await getCurrentData(locationCoords.city);
  const forecastCoords = await getForecastData(locationCoords.city);

  const forecastDay = getForecastDay(forecastCoords.listData);
  const forecastHours = getForecastHours(forecastCoords.listData);

  return {
    currentWeather: currentWeather,
    forecastDay,
    forecastHours,
  };
};
