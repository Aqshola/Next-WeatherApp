import { parseDateToDay, parseToIcon } from "../utils/parser";

export default function ForecastDayCard({ forecast }) {
  return (
    <div className="w-full p-5 flex  md:pr-10 justify-between">
      {forecast.map((el, i) => {
        return (
          <div className="text-center" key={i}>
            <h2 className="text-center text-lg font-semibold">
              {parseDateToDay(el.date)}
            </h2>
            <div className="flex w-14 h-14 md:w-28 md:h-28">
              <img src={parseToIcon(el.weather.icon)} alt="" />
            </div>
            <h1>{Math.ceil(el.info.temp)}°</h1>
          </div>
        );
      })}
    </div>
  );
}
