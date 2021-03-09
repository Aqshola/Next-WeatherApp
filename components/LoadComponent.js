import switchClassNames from "classnames";

export default function LoadComponent({ loading, condition = "Mist" }) {
  const switchBorderColor = switchClassNames(
    {
      "border-yellow-400": condition === "Clear",
    },
    {
      "border-blue-400": condition === "Rain",
    },
    {
      "border-blue-200": condition === "Snow",
    },
    {
      "border-gray-200":
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
    <div
      className={
        (loading
          ? "translate-y-0 opacity-100 "
          : "opacity-100 -translate-y-10 invisible ") +
        " w-full absolute top-0 flex justify-center mt-20 z-30 transition-all transform "
      }
    >
      <div className="bg-white w-max shadow rounded-full flex items-center justify-center p-2 border-2">
        <div
          className={
            "rounded-full h-10 w-10 border-4 border-t-4  animate-spin " +
            switchBorderColor
          }
          style={{ borderTopColor: "white" }}
        ></div>
      </div>
    </div>
  );
}
