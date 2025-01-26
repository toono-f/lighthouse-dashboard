import { db } from "@/lib/db";
import { metrics } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { syncLighthouseTargets } from "@/config/lighthouse-targets";
import { ApiMetric, LighthouseTarget, PageMetrics } from "@/types";
import { GOOGLE_API_KEY } from "@/lib/config";

export async function saveMetrics() {
  const targets = await syncLighthouseTargets();
  const apiMetrics = await collectMetrics(targets);

  await Promise.all(
    apiMetrics.map(async (metric: ApiMetric) => {
      await db.insert(metrics).values({
        pageId: metric.pageId,
        measuredAt: new Date(),
        lcp: String(metric.lcp),
        fid: String(metric.fid),
        cls: String(metric.cls),
        ttfb: String(metric.ttfb),
        inp: String(metric.inp),
        fcp: String(metric.fcp),
        performanceScore: String(metric.performanceScore),
      });
    })
  );
}

export async function getMetrics(): Promise<PageMetrics[]> {
  const targets = await syncLighthouseTargets();

  return Promise.all(
    targets.map(async (page) => {
      const metricsData = await db
        .select()
        .from(metrics)
        .where(eq(metrics.pageId, page.pageId))
        .orderBy(desc(metrics.measuredAt))
        .limit(10);

      return {
        pageId: page.pageId,
        pageName: page.pageName,
        pageUrl: page.pageUrl,
        data: metricsData.map((metric) => ({
          measuredAt: metric.measuredAt.toISOString(),
          lcp: Number(metric.lcp),
          fid: Number(metric.fid),
          cls: Number(metric.cls),
          ttfb: Number(metric.ttfb),
          inp: Number(metric.inp),
          fcp: Number(metric.fcp),
          performanceScore: Number(metric.performanceScore),
        })),
      };
    })
  );
}

const collectMetrics = async (
  targets: LighthouseTarget[]
): Promise<ApiMetric[]> => {
  const metrics = await Promise.all(
    targets.map(async (target: LighthouseTarget) => {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${target.pageUrl}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      return {
        pageId: target.pageId,
        pageName: target.pageName,
        pageUrl: target.pageUrl,
        lcp: data.lighthouseResult.audits["largest-contentful-paint"]
          .numericValue,
        fid: data.lighthouseResult.audits["max-potential-fid"].numericValue,
        cls: data.lighthouseResult.audits["cumulative-layout-shift"]
          .numericValue,
        ttfb: data.lighthouseResult.audits["server-response-time"].numericValue,
        inp: data.lighthouseResult.audits["interactive"].numericValue,
        fcp: data.lighthouseResult.audits["first-contentful-paint"]
          .numericValue,
        performanceScore:
          data.lighthouseResult.categories.performance.score * 100,
      };
    })
  );

  return metrics;
};
