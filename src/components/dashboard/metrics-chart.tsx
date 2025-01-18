"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartProps {
  data: {
    date: string;
    value: number;
  }[];
}

export const MetricsChart = ({ data }: MetricsChartProps) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "メトリクス",
        data: data.map((item) => item.value),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "メトリクスチャート",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[400px] w-full p-4">
      <Line options={options} data={chartData} />
    </div>
  );
};
