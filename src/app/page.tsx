import { DashboardHeader } from "@/components/dashboard/header";
import { MetricsChart } from "@/components/dashboard/metrics-chart";
import { db } from "@/lib/db";
import { metrics, pages } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export default async function Home() {
  // ページ情報とメトリクスを取得
  const pagesData = await db.select().from(pages);

  // 各ページの最新のメトリクスデータを取得
  const pageMetrics = await Promise.all(
    pagesData.map(async (page) => {
      const metricsData = await db
        .select()
        .from(metrics)
        .where(eq(metrics.pageId, page.pageId))
        .orderBy(desc(metrics.measuredAt))
        .limit(10);

      return {
        pageId: page.pageId,
        pageName: page.pageName,
        data: metricsData.map((metric) => ({
          measuredAt: metric.measuredAt.toISOString(),
          lcp: Number(metric.lcp),
          fid: Number(metric.fid),
          cls: Number(metric.cls),
          ttfb: Number(metric.ttfb),
          inp: Number(metric.inp),
          fcp: Number(metric.fcp),
        })),
      };
    })
  );

  return (
    <main className="mx-auto p-8">
      <DashboardHeader />
      {pageMetrics.map((pageMetric) => (
        <div key={pageMetric.pageId} className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{pageMetric.pageName}</h2>
          <MetricsChart data={pageMetric.data} />
        </div>
      ))}
    </main>
  );
}
