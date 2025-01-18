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
  ChartOptions,
  TooltipItem,
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

type MetricsData = {
  timestamp: string;
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  inp: number; // Interaction to Next Paint
  fcp: number; // First Contentful Paint
};

interface MetricsChartProps {
  data: MetricsData[];
}

export function MetricsChart({ data }: MetricsChartProps) {
  const labels = data.map((item) => {
    const date = new Date(item.timestamp);
    return date.toLocaleDateString("ja-JP");
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "LCP (ms)",
        data: data.map((item) => item.lcp),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "FID (ms)",
        data: data.map((item) => item.fid),
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "CLS",
        data: data.map((item) => item.cls),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "TTFB (ms)",
        data: data.map((item) => item.ttfb),
        borderColor: "rgb(153, 102, 255)",
        tension: 0.1,
      },
      {
        label: "INP (ms)",
        data: data.map((item) => item.inp),
        borderColor: "rgb(255, 159, 64)",
        tension: 0.1,
      },
      {
        label: "FCP (ms)",
        data: data.map((item) => item.fcp),
        borderColor: "rgb(255, 205, 86)",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Web Vitals メトリクス",
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            if (label.includes("CLS")) {
              return `${label}: ${value.toFixed(3)}`;
            }
            return `${label}: ${value.toFixed(0)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
}
