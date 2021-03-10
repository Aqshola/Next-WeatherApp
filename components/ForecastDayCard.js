import { parseDateToDay, parseToIcon } from "../utils/parser";

export default function ForecastDayCard({ forecast }) {
  return (
    <div className="w-full p-5 flex justify-between">
      {forecast.map((el, i) => {
        return (
          <div className="text-center" key={i}>
            <h2 className="text-center text-lg font-semibold">
              {parseDateToDay(el.date)}
            </h2>
            <div className="flex w-14 h-14">
              <img src={parseToIcon(el.weather.icon)} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
