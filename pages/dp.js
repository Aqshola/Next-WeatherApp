import { Line } from "react-chartjs-2";
import datalabels from "chartjs-plugin-datalabels";

export default function dp(params) {
  const data = {
    labels: ["", "b", "c", "d", "e", "f", ""],
    datasets: [
      {
        data: [0, 9, 7, 13, 8, 6, 0],
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="max-w-screen-xl mx-auto h-screen max-h-screen ">
      <div className="flex w-full flex-col ">
        <div className="w-full  flex space-x-5 p-5 items-center">
          <div className="flex space-x-10 flex-grow items-center">
            <h1>Weather App</h1>
            <input
              type="text"
              placeholder="Search City"
              className="p-2 focus:outline-none bg-gray-100 rounded-md w-56"
            />
          </div>
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
        <div className="flex p-10 w-full flex-col ">
          <div className="w-full flex space-x-2 items-center">
            <div className="w-1/5">
              <h2 className="text-3xl ">
                <span className="text-5xl">9°</span>Jakarta
              </h2>
              <div className="flex mt-5">
                <ul className="flex-grow">
                  <li>Precipitation</li>
                  <li>Humidity</li>
                  <li>Wind</li>
                </ul>
                <ul>
                  <li>80%</li>
                  <li>98%</li>
                  <li>18 km/h</li>
                </ul>
              </div>
            </div>
            <div className="w-4/5 h-72  p-10">
              <Line
                data={data}
                options={{
                  layout: {},
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
                          min: 0,
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
                      anchor: "end",
                      align: "right",
                      textAlign: "end",

                      font: {
                        size: 20,
                      },
                      formatter: function (value, index, values) {
                        if (value > 0) {
                          value = value.toString();
                          value = value.split(/(?=(?:...)*$)/);
                          value = value.join(",");
                          return value;
                        } else {
                          value = "";
                          return value;
                        }
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex  p-10 justify-between">
          <div className="text-center">
            <div className="block bg-blue-200 w-28 h-28"></div>
            <h1>9°</h1>
            <h2>Tue</h2>
          </div>
          <div className="text-center">
            <div className="block bg-blue-200 w-28 h-28"></div>
            <h1>9°</h1>
            <h2>Tue</h2>
          </div>
          <div className="text-center">
            <div className="block bg-blue-200 w-28 h-28"></div>
            <h1>9°</h1>
            <h2>Tue</h2>
          </div>
          <div className="text-center">
            <div className="block bg-blue-200 w-28 h-28"></div>
            <h1>9°</h1>
            <h2>Tue</h2>
          </div>
          <div className="text-center">
            <div className="block bg-blue-200 w-28 h-28"></div>
            <h1>9°</h1>
            <h2>Tue</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
