import { DashboardHeader } from "@/components/dashboard/header";
import { MetricsChart } from "@/components/dashboard/metrics-chart";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <DashboardHeader />
      <div className="mt-8">
        <MetricsChart
          data={[
            {
              timestamp: "2024-03-20T00:00:00",
              lcp: 2500,
              fid: 100,
              cls: 0.1,
              ttfb: 800,
              inp: 300,
              fcp: 1200,
            },
            {
              timestamp: "2024-03-21T00:00:00",
              lcp: 1500,
              fid: 80,
              cls: 0.05,
              ttfb: 600,
              inp: 250,
              fcp: 1000,
            },
            {
              timestamp: "2024-03-22T00:00:00",
              lcp: 1000,
              fid: 50,
              cls: 0.02,
              ttfb: 400,
              inp: 200,
              fcp: 800,
            },
            {
              timestamp: "2024-03-23T00:00:00",
              lcp: 500,
              fid: 30,
              cls: 0.01,
              ttfb: 300,
              inp: 150,
              fcp: 600,
            },
            {
              timestamp: "2024-03-24T00:00:00",
              lcp: 300,
              fid: 20,
              cls: 0.01,
              ttfb: 200,
              inp: 100,
              fcp: 400,
            },
            {
              timestamp: "2024-03-25T00:00:00",
              lcp: 200,
              fid: 10,
              cls: 0.01,
              ttfb: 150,
              inp: 80,
              fcp: 300,
            },
            {
              timestamp: "2024-03-26T00:00:00",
              lcp: 150,
              fid: 5,
              cls: 0.01,
              ttfb: 100,
              inp: 50,
              fcp: 200,
            },
          ]}
        />
      </div>
    </main>
  );
}
