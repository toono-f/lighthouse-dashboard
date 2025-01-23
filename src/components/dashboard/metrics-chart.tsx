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
import { Button } from "@/components/ui/button";
import { MetricsData } from "@/types/metrics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type MetricsChartProps = {
  data: MetricsData[];
};

type DatasetVisibility = {
  [key: string]: boolean;
};

export const MetricsChart = ({ data }: MetricsChartProps) => {
  // データセットの表示状態を管理するuseState
  const [visibleDatasets, setVisibleDatasets] = useState<DatasetVisibility>({
    "LCP (ms)": true,
    "FID (ms)": true,
    CLS: true,
    "TTFB (ms)": true,
    "INP (ms)": true,
    "FCP (ms)": true,
  });

  // データを日付順に並び替え
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
  );

  const labels = sortedData.map((item) => {
    const date = new Date(item.measuredAt);
    // 日付と時刻を日本時間で表示
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Tokyo",
    }).format(date);
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "LCP (ms)",
        data: sortedData.map((item) => item.lcp),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        borderWidth: 2.5,
      },
      {
        label: "FID (ms)",
        data: sortedData.map((item) => item.fid),
        borderColor: "rgb(75, 192, 255)",
        backgroundColor: "rgba(75, 192, 255, 0.2)",
        tension: 0.4,
        borderWidth: 2.5,
      },
      {
        label: "CLS",
        data: sortedData.map((item) => item.cls),
        borderColor: "rgb(75, 220, 192)",
        backgroundColor: "rgba(75, 220, 192, 0.2)",
        tension: 0.4,
        borderWidth: 2.5,
      },
      {
        label: "TTFB (ms)",
        data: sortedData.map((item) => item.ttfb),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.4,
        borderWidth: 2.5,
      },
      {
        label: "INP (ms)",
        data: sortedData.map((item) => item.inp),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
        borderWidth: 2.5,
      },
      {
        label: "FCP (ms)",
        data: sortedData.map((item) => item.fcp),
        borderColor: "rgb(72, 192, 72)",
        backgroundColor: "rgba(72, 192, 72, 0.2)",
        tension: 0.4,
        borderWidth: 2.5,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          generateLabels: () => [],
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
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
          color: "rgba(0, 0, 0, 0.08)",
        },
        ticks: {
          color: "#666",
          padding: 8,
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
          padding: 8,
          font: {
            size: 11,
          },
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
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
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
    <div className="w-full p-4 sm:p-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <p className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-700 text-center">
        Web Vitals
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
        {chartData.datasets.map((dataset) => (
          <Button
            key={dataset.label}
            onClick={() => dataset.label && toggleDataset(dataset.label)}
            variant={
              visibleDatasets[dataset.label || ""] ? "secondary" : "outline"
            }
            className={`
              relative transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4
              ${
                visibleDatasets[dataset.label || ""]
                  ? "border-2 border-gray-300 bg-gray-100 shadow-sm hover:shadow hover:bg-gray-200"
                  : "border border-gray-200 opacity-50 hover:opacity-90 hover:bg-gray-50"
              }
              hover:scale-102 active:scale-98
            `}
          >
            <span
              className={`
                w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1.5 sm:mr-2 transition-all duration-200
                ${!visibleDatasets[dataset.label || ""] && "opacity-30"}
              `}
              style={{ backgroundColor: dataset.borderColor }}
            />
            <span className="font-medium whitespace-nowrap">
              {dataset.label}
            </span>
          </Button>
        ))}
      </div>
      <Line data={filteredChartData} options={options} />
    </div>
  );
};
