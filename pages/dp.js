import { Line } from "react-chartjs-2";
import datalabels from "chartjs-plugin-datalabels";
import axios from "axios";
import Image from "next/image";

export default function dp({
  current,
  forecast,
  forecastDay,
  forecastLabel,
  forecastWeather,
}) {
  const data = {
    labels: forecastLabel,
    dataLabels: forecastWeather,
    datasets: [
      {
        data: forecastDay,
        borderColor: "orange",
        backgroundColor: "transparent",
        pointRadius: 0,
      },
    ],
  };

  const currentDate = Intl.DateTimeFormat("en-ID", {
    weekday: "short",
    hour: "numeric",
  }).format(new Date());

  const getDay = (date) => {
    const parsing = new Date(date);
    return new Intl.DateTimeFormat("en-ID", {
      weekday: "short",
    }).format(parsing);
  };

  const getIcon = (icon) => {
    return `/assets/WeatherIcon/${icon}.svg`;
  };

  return (
    <div className="max-w-screen-xl mx-auto h-screen max-h-screen relative">
      <div className="h-56 w-56 block md:hidden z-0  overflow-hidden absolute top-0 right-0">
        <div className="w-full bg-yellow-400 h-full block rounded-full absolute -top-10 -right-20"></div>
      </div>
      <div className="flex w-full flex-col relative">
        <div className="w-full flex flex-col p-5 z-10">
          <div className="flex space-x-5  items-center">
            <div className="flex space-x-10 flex-grow items-center">
              <input
                type="text"
                placeholder="Search City"
                className="p-2 focus:outline-none bg-gray-100 rounded-md w-56 "
              />
            </div>
            <div className="flex items-center space-x-4">
              <h2>{currentDate}</h2>
              <button className="focus:outline-none">
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
        </div>
        <div className="flex p-5 w-full flex-col  ">
          <div className="w-full flex flex-col md:flex-row md:space-x-2 items-center">
            <div className="w-full flex items-center md:w-1/5 md:block">
              <div className="flex w-100 items-center flex-grow md:flex-grow-0">
                <div className="flex flex-col  flex-grow">
                  <h3 className="text-6xl font-bold">
                    {Math.round(current.main.temp, 0)}°
                  </h3>
                  <h2 className="text-2xl font-medium">
                    {current.weather[0].description}
                  </h2>
                  <h1 className="text-lg flex-grow">Jakarta</h1>
                </div>
                <div className="flex w-36 h-36  md:hidden">
                  <img src={getIcon(current.weather[0].icon)} />
                </div>
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
            <div className="md:flex w-56 h-56 hidden">
              <img src={getIcon(current.weather[0].icon)} />
            </div>
            <div className=" w-full  md:w-3/5 h-72 md:h-80 md:p-10">
              <Line
                data={data}
                options={{
                  layout: {
                    padding: {
                      top: 130,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        offset: true,
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        offset: true,
                        display: false,
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  legend: {
                    display: false,
                  },
                  tooltips: {
                    enabled: false,
                  },
                  responsive: true,
                  maintainAspectRatio: false,

                  plugins: {
                    datalabels: {
                      font: {
                        size: 15,
                      },

                      labels: {
                        index: {
                          align: "end",
                          textAlign: "center",
                          formatter: function (value, ctx) {
                            return (
                              ctx.chart.data.dataLabels[ctx.dataIndex] +
                              "\n" +
                              value +
                              "°"
                            );
                          },
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full p-5 flex  md:pr-10 justify-between">
          {forecast.list.map((el, i) => {
            if (i % 8 === 0 && i > 0) {
              return (
                <div className="text-center" key={i}>
                  <h2 className="text-center text-lg font-semibold">
                    {getDay(el.dt_txt)}
                  </h2>
                  <div className="flex w-14 h-14 md:w-28 md:h-28">
                    <img src={getIcon(el.weather[0].icon)} alt="" />
                  </div>
                  <h1>{Math.ceil(el.main.temp)}°</h1>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

dp.getInitialProps = async () => {
  const parseDate = (date) => {
    const parsing = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
    }).format(parsing);
  };
  const Current_weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=jakarta&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
  );

  const Forecast_weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=jakarta&units=metric&appid=0e1d8596d00a9cb7562359634209c46d`
  );

  const forecastDay = Forecast_weather.data.list
    .filter((el, i) => {
      if (i < 4) {
        return el;
      }
    })
    .map((el) => {
      return Math.round(el.main.temp, 0);
    });

  const forecastLabel = Forecast_weather.data.list
    .filter((el, i) => {
      if (i < 4) {
        return el;
      }
    })
    .map((el) => {
      return parseDate(el.dt_txt);
    });

  const forecastLabelWeather = Forecast_weather.data.list
    .filter((el, i) => {
      if (i < 4) {
        return el;
      }
    })
    .map((el) => {
      return el.weather[0].main;
    });

  return {
    current: Current_weather.data,
    forecast: Forecast_weather.data,
    forecastDay: forecastDay,
    forecastLabel: forecastLabel,
    forecastWeather: forecastLabelWeather,
  };
};
