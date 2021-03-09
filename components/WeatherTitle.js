import WeatherIcon from "../components/WeatherIcon";
import { parseToIcon } from "../utils/parser";

export default function WeatherTitle({ current }) {
  return (
    <>
      <div className="w-full flex items-center md:w-1/5 md:block">
        <div className="flex w-100 items-center flex-grow md:flex-grow-0">
          <div className="flex flex-col  flex-grow">
            <h3 className="text-6xl font-bold">
              {Math.round(current.info.temp, 0)}°
            </h3>
            <h2 className="text-2xl font-medium">{current.weather.desc}</h2>
            <h1 className="text-lg flex-grow">{current.city}</h1>
          </div>
          <WeatherIcon
            src={parseToIcon(current.weather.icon)}
            size="sm"
            className="flex w-36 h-36  md:hidden"
          ></WeatherIcon>
        </div>
        <div className="hidden md:flex  flex-col justify-center w-48 mt-2  space-x-4 md:space-x-0">
          <div className="flex items-center ">
            <div className="w-10 h-10 ">
              <img src="/assets/iconAsset/humidity.svg" alt="" srcset="" />
            </div>
            <p className="text-sm font-medium flex-grow">Humidity</p>
            <p className="text-base font-semibold">{current.info.humidity}%</p>
          </div>
          <div className="flex items-center ">
            <div className="w-10 h-10">
              <img src="/assets/iconAsset/wind.svg" alt="" srcset="" />
            </div>
            <p className="text-sm font-medium flex-grow">Wind</p>
            <p className="text-base font-semibold">
              {Math.round(current.info.wind, 0)} km/h
            </p>
          </div>
        </div>
      </div>
      <div className="flex self-start flex-col justify-center w-36 mt-2  md:hidden">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 ">
            <img src="/assets/iconAsset/humidity.svg" alt="" srcset="" />
          </div>
          <p className="text-sm font-medium flex-grow">Humidity</p>
          <p className="text-sm font-semibold">{current.info.humidity}%</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 ">
            <img src="/assets/iconAsset/wind.svg" alt="" srcset="" />
          </div>
          <p className="text-sm font-medium flex-grow">Wind</p>
          <p className="text-sm font-semibold">
            {Math.round(current.info.wind, 0)} km/h
          </p>
        </div>
      </div>
    </>
  );
}
