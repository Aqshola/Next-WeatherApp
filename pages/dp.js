import ForecastDayCard from "../components/ForecastDayCard";
import Nav from "../components/Nav";
import Ornament from "../components/Ornament";
import WeatherChart from "../components/WeatherChart";
import WeatherIcon from "../components/WeatherIcon";
import WeatherTitle from "../components/WeatherTitle";
import {
  getCurrentData,
  getForecastData,
  getForecastDay,
  getForecastHours,
} from "../utils/getWeather";
import { parseDateToHour } from "../utils/parser";

export default function dp({ current, forecastDay, forecastHours }) {
  const getIcon = (icon) => {
    return `/assets/WeatherIcon/${icon}.svg`;
  };

  return (
    <div className="max-w-screen-xl mx-auto h-screen max-h-screen relative">
      <Ornament />
      <div className="flex w-full flex-col relative">
        <Nav />
        <div className=" p-5 w-full flex flex-col md:flex-row md:space-x-2 items-center">
          <WeatherTitle current={current} />
          <WeatherIcon
            src={getIcon(current.weather[0].icon)}
            size="md"
            className="md:flex hidden"
          />
          <WeatherChart forecast={forecastHours} />
        </div>

        <ForecastDayCard forecast={forecastDay} />
      </div>
    </div>
  );
}

dp.getInitialProps = async () => {
  const Current_weather = await getCurrentData();

  const Forecast_weather = await getForecastData();

  const forecastDay = getForecastDay(Forecast_weather);
  const forecastHours = getForecastHours(Forecast_weather);

  return {
    current: Current_weather.data,
    forecastDay: forecastDay,
    forecastHours: forecastHours,
  };
};
