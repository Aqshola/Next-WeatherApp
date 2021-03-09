import { useState } from "react";
import {
  getCurrentData,
  getForecastData,
  getForecastDay,
  getForecastHours,
} from "../utils/getWeather";

import { getLocation } from "../utils/getLocation";

export default function Nav({ handleLoading, updateWeather }) {
  const [form, setform] = useState("");

  const _handleChange = (e) => {
    setform(e.target.value);
  };

  const currentDate = Intl.DateTimeFormat("en-ID", {
    weekday: "short",
    hour: "numeric",
  }).format(new Date());

  const _handleLocation = async () => {
    handleLoading(true);
    const ip = await getLocation();
    const resCurrent = await getCurrentData(ip.city);
    const resForecast = await getForecastData(ip.city);
    const day = getForecastDay(resForecast.listData);
    const hours = getForecastHours(resForecast.listData);

    updateWeather(resCurrent, day, hours);

    handleLoading(false);
  };

  const _searchCity = async () => {
    handleLoading(true);
    const resCurrent = await getCurrentData(form);
    const resForecast = await getForecastData(form);
    const day = getForecastDay(resForecast.listData);
    const hours = getForecastHours(resForecast.listData);
    updateWeather(resCurrent, day, hours);
    handleLoading(false);
  };

  return (
    <div className="w-full flex space-x-5  items-center p-5 z-10">
      <div className=" flex-grow  ">
        <div className="flex p-2 bg-gray-100 w-max items-center rounded-md">
          <input
            type="text"
            placeholder="Search City"
            className="focus:outline-none bg-transparent  w-44 md:w-56 flex-grow"
            onChange={_handleChange}
          />

          <button
            className="w-7 h-7 flex focus:outline-none"
            onClick={_searchCity}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <h2>{currentDate}</h2>
        <button className="focus:outline-none" onClick={_handleLocation}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="2em"
            height="2em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
