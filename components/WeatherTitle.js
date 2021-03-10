import WeatherIcon from "../components/WeatherIcon";
import { parseToIcon } from "../utils/parser";

export default function WeatherTitle({ current }) {
  return (
    <>
      <div className="w-full flex items-center ">
        <div className="flex w-100 items-center flex-grow ">
          <div className="flex flex-col  flex-grow">
            <h3 className="text-6xl font-bold">
              {Math.round(current.info.temp, 0)}°
            </h3>
            <h2 className="text-2xl font-medium">{current.weather.desc}</h2>
            <h1 className="text-lg flex-grow">{current.city}</h1>
            <div className="flex self-start flex-col justify-center w-36 mt-2 ">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 ">
                  <img src="/assets/iconAsset/humidity.svg" />
                </div>
                <p className="text-sm font-medium flex-grow">Humidity</p>
                <p className="text-sm font-semibold">
                  {current.info.humidity}%
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 ">
                  <img src="/assets/iconAsset/wind.svg" />
                </div>
                <p className="text-sm font-medium flex-grow">Wind</p>
                <p className="text-sm font-semibold">
                  {Math.round(current.info.wind, 0)} km/h
                </p>
              </div>
            </div>
          </div>
          <WeatherIcon
            src={parseToIcon(current.weather.icon)}
            size="sm"
            className="flex w-36 h-36"
          ></WeatherIcon>
        </div>
      </div>
    </>
  );
}
