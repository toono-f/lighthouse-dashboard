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
import { useState } from "react";

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

// 新しい型を追加
type DatasetVisibility = {
  [key: string]: boolean;
};

type MetricsChartProps = {
  data: MetricsData[];
};

export function MetricsChart({ data }: MetricsChartProps) {
  // データセットの表示状態を管理するuseState
  const [visibleDatasets, setVisibleDatasets] = useState<DatasetVisibility>({
    "LCP (ms)": true,
    "FID (ms)": true,
    CLS: true,
    "TTFB (ms)": true,
    "INP (ms)": true,
    "FCP (ms)": true,
  });

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
        labels: {
          generateLabels: () => [], // カスタムレジェンドを使用するため、デフォルトのレジェンドを非表示
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            if (label.includes("CLS")) return `${label}: ${value.toFixed(3)}`;
            return `${label}: ${value.toFixed(0)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };

  // データセットの表示/非表示を切り替える関数
  const toggleDataset = (datasetLabel: string) => {
    setVisibleDatasets((prev) => ({
      ...prev,
      [datasetLabel]: !prev[datasetLabel],
    }));
  };

  // 表示するデータセットをフィルタリング
  const filteredChartData = {
    ...chartData,
    datasets: chartData.datasets.filter(
      (dataset) => visibleDatasets[dataset.label || ""]
    ),
  };

  return (
    <div className="w-full p-8 bg-white rounded-lg shadow-sm">
      <p className="text-2xl font-bold mb-4">Web Vitals</p>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {chartData.datasets.map((dataset) => (
          <button
            key={dataset.label}
            onClick={() => dataset.label && toggleDataset(dataset.label)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                visibleDatasets[dataset.label || ""]
                  ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              }
              border border-gray-200
              flex items-center gap-2
            `}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dataset.borderColor }}
            />
            {dataset.label}
          </button>
        ))}
      </div>
      <Line data={filteredChartData} options={options} />
    </div>
  );
}
