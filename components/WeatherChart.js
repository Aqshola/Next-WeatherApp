import { Line } from "react-chartjs-2";
import datalabels from "chartjs-plugin-datalabels";

export default function WeatherChart({ forecast }) {
  const data = {
    labels: forecast.map((el) => el.hours),
    dataLabels: forecast.map((el) => el.weather.main),
    datasets: [
      {
        data: forecast.map((el) => Math.round(el.info.temp, 0)),
        borderColor: "orange",
        backgroundColor: "transparent",
        pointRadius: 0,
      },
    ],
  };
  return (
    <div className=" w-full  md:w-3/5 h-72 md:h-80 md:p-10">
      <Line
        data={data}
        options={{
          elements: {
            line: {
              tension: 0,
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
