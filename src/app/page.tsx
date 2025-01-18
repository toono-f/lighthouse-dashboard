import { DashboardHeader } from "@/components/dashboard/header";
import { MetricsChart } from "@/components/dashboard/metrics-chart";
import { dummyMetricsData } from "@/data/dummy-metrics";

export default function Home() {
  return (
    <main className="mx-auto p-8">
      <DashboardHeader />
      {dummyMetricsData.map((pageMetrics) => (
        <div key={pageMetrics.pageId} className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{pageMetrics.pageName}</h2>
          <MetricsChart data={pageMetrics.data} />
        </div>
      ))}
    </main>
  );
}
