import WeatherIcon from "../components/WeatherIcon";
import { parseToIcon } from "../utils/parser";

export default function WeatherTitle({ current }) {
  return (
    <div className="w-full flex items-center md:w-1/5 md:block">
      <div className="flex w-100 items-center flex-grow md:flex-grow-0">
        <div className="flex flex-col  flex-grow">
          <h3 className="text-6xl font-bold">
            {Math.round(current.main.temp, 0)}°
          </h3>
          <h2 className="text-2xl font-medium">
            {current.weather[0].description}
          </h2>
          <h1 className="text-lg flex-grow">{current.name}</h1>
        </div>
        <WeatherIcon
          src={parseToIcon(current.weather[0].icon)}
          size="sm"
          className="flex w-36 h-36  md:hidden"
        ></WeatherIcon>
      </div>
      <div className="hidden md:flex w-56 mt-2  space-x-4 md:space-x-0">
        <ul className="flex-grow">
          <li>Precipitation</li>
          <li>Humidity</li>
          <li>Wind</li>
        </ul>
        <ul>
          <li>80%</li>
          <li>{current.main.humidity}%</li>
          <li>{current.wind.speed} km/h</li>
        </ul>
      </div>
    </div>
  );
}
