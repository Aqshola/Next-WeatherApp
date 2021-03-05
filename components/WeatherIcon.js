import switchClassNames from "classnames";

export default function WeatherIcon({ size, src, className }) {
  const imgSize = switchClassNames(
    {
      "w-56 h-56": size === "md",
    },
    {
      "w-36 h-36": size === "sm",
    }
  );
  return (
    <div className={imgSize + " " + className}>
      <img src={src} />
    </div>
  );
}
