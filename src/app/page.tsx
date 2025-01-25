import { DashboardHeader } from "@/components/dashboard/header";
import { MetricsChart } from "@/components/dashboard/metrics-chart";
import { saveMetrics, getMetrics } from "./actions/metrics";

export default async function Home() {
  // 本番環境でのみメトリクスを収集・保存
  if (process.env.NODE_ENV === "production") await saveMetrics();

  // メトリクスデータを取得
  const pageMetrics = await getMetrics();

  return (
    <main className="container max-w-4xl mx-auto p-4">
      <DashboardHeader />
      <div className="space-y-6">
        {pageMetrics.map((pageMetric) => (
          <div key={pageMetric.pageId} className="mt-4">
            <h2 className="text-xl font-semibold mb-2">
              {pageMetric.pageName}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              <a
                href={pageMetric.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {pageMetric.pageUrl}
              </a>
            </p>
            <MetricsChart data={pageMetric.data} />
          </div>
        ))}
      </div>
    </main>
  );
}
