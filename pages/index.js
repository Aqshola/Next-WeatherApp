import Head from "next/head";
import { Bar, Line } from "react-chartjs-2";

import datalabels from "chartjs-plugin-datalabels";

export default function Home() {
  const data = {
    labels: ["x", "y", "z"],
    datasets: [
      {
        data: [122, 11, 20],
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1>Chart JS</h1>
      <div
        style={{
          width: "500px",
          height: "500px",
          boxSizing: "border-box",
          border: "1px solid black",
        }}
      >
        <Line
          data={data}
          options={{
            scales: {
              xAxes: [
                {
                  offset: true,
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
                display: true,
                align: "end",
                font: {
                  size: 40,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
