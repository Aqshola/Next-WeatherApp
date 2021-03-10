import { Line } from "react-chartjs-2";
import datalabels from "chartjs-plugin-datalabels";

export default function WeatherChart({ forecast, condition }) {
  const switchBorderColor = () => {
    if (condition === "Rain") {
      return "#60A5FA";
    } else if (condition === "Snow") {
      return "#BFDBFE";
    } else if (condition === "Clear") {
      return "#FBBF24";
    } else if (
      condition === "Mist" ||
      "Fog" ||
      "Haze" ||
      "Sand" ||
      "Dust" ||
      "Ash" ||
      "Squall" ||
      "Tornado" ||
      "Drizzle" ||
      "Thunderstorm"
    ) {
      return "#9CA3AF";
    } else if (condition === "Clear") {
      return "#FBBF24";
    } else {
      return "#9CA3AF";
    }
  };

  const data = {
    labels: forecast.map((el) => el.hours),
    dataLabels: forecast.map((el) => el.weather.main),
    datasets: [
      {
        data: forecast.map((el) => Math.round(el.info.temp, 0)),
        borderColor: switchBorderColor(condition),
        borderWidth: 5,
        backgroundColor: "transparent",
        pointRadius: 0,
      },
    ],
  };
  return (
    <div className=" w-full h-64">
      <Line
        data={data}
        options={{
          elements: {
            line: {
              tension: 0.2,
            },
          },
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
  );
}
