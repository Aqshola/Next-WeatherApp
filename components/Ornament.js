import switchClassNames from "classnames";

export default function Ornament({ condition }) {
  const bgColor = switchClassNames(
    {
      "bg-yellow-400": condition === "Clear",
    },
    {
      "bg-blue-400": condition === "Rain",
    },
    {
      "bg-blue-200": condition === "Snow",
    },
    {
      "bg-gray-400":
        condition === "Mist" ||
        "Fog" ||
        "Haze" ||
        "Sand" ||
        "Dust" ||
        "Ash" ||
        "Squall" ||
        "Tornado" ||
        "Drizzle" ||
        "Thunderstorm",
    }
  );
  return (
    <div className="h-56 w-56 block  z-0  overflow-hidden absolute top-0 right-0">
      <div
        className={
          bgColor +
          " transition w-full  h-full block rounded-full absolute -top-10 -right-20"
        }
      ></div>
    </div>
  );
}
