import { useEffect, useState } from "react";
import ForecastDayCard from "../components/ForecastDayCard";
import LoadComponent from "../components/LoadComponent";
import Nav from "../components/Nav";
import Ornament from "../components/Ornament";
import WeatherChart from "../components/WeatherChart";

import WeatherTitle from "../components/WeatherTitle";
import { getLocation } from "../utils/getLocation";

import {
  getCurrentData,
  getForecastData,
  getForecastDay,
  getForecastHours,
} from "../utils/getWeather";
import Head from "next/head";

export default function Home() {
  const [forecastData, setforecastData] = useState({});
  const [currentData, setcurrentData] = useState({});
  const [loading, setloading] = useState(true);
  const [firstLoad, setfirstLoad] = useState(false);

  const _updateWeather = async (current, day, hour) => {
    setcurrentData(current);
    setforecastData({
      ...forecastData,
      forecastDay: day,
      forecastHours: hour,
    });
  };

  const _getWeather = async () => {
    const locationCoords = await getLocation();

    const currentWeather = await getCurrentData(locationCoords.city);
    const forecastCoords = await getForecastData(locationCoords.city);
    const forecastDay = getForecastDay(forecastCoords.listData);
    const forecastHours = getForecastHours(forecastCoords.listData);

    setcurrentData(currentWeather);
    setforecastData({
      forecastDay,
      forecastHours,
    });
    setfirstLoad(true);
    setloading(false);
  };

  useEffect(() => {
    _getWeather();
  }, []);

  return (
    <>
      <Head>
        <title>WeatherApp</title>
      </Head>
      <div className="max-w-screen-sm mx-auto p-0.5 min-h-screen relative shadow-lg">
        <LoadComponent
          loading={loading}
          condition={currentData.weather ? currentData.weather.main : "Mist"}
        />

        {currentData.type === "success" && (
          <Ornament condition={currentData.weather.main} />
        )}
        <div className="flex w-full flex-col relative">
          <Nav handleLoading={setloading} updateWeather={_updateWeather} />

          {currentData.type === "fail" ? (
            <div className="w-full h-96 flex justify-center items-center">
              <h2 className="text-3xl font-medium text-center">
                {currentData.message} ☹
              </h2>
            </div>
          ) : (
            (!loading || firstLoad) && (
              <>
                <div className=" p-5 w-full flex flex-col ">
                  <WeatherTitle current={currentData} />

                  <WeatherChart
                    forecast={forecastData.forecastHours}
                    condition={currentData.weather.main}
                  />
                </div>

                <ForecastDayCard forecast={forecastData.forecastDay} />
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}
