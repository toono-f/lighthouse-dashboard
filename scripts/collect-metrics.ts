import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { lighthouseTargets } from "../src/config/lighthouse-targets.js";
import { db } from "../src/lib/db.js";
import { metrics, pages } from "../src/lib/schema.js";

// TODO: 本処理はvercelで実行できないため、Next.js側で、ビルド時にlighthouse apiを利用して取得する方向性に変更したい
async function collectMetrics() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info" as const,
    output: "json" as const,
    onlyCategories: ["performance"],
    port: chrome.port,
  };

  try {
    for (const target of lighthouseTargets) {
      console.log(`Collecting metrics for ${target.pageName}...`);

      // ページ情報をDBに保存または更新
      await db
        .insert(pages)
        .values({
          pageId: target.pageId,
          pageName: target.pageName,
          pageUrl: target.url,
        })
        .onConflictDoUpdate({
          target: pages.pageId,
          set: {
            pageName: target.pageName,
            pageUrl: target.url,
            updatedAt: new Date(),
          },
        });

      // Lighthouseでメトリクスを収集
      const runnerResult = await lighthouse(target.url, options);
      if (!runnerResult?.lhr?.categories?.performance) continue;

      const audits = runnerResult.lhr.audits;
      await db.insert(metrics).values({
        pageId: target.pageId,
        measuredAt: new Date(),
        lcp: String(audits["largest-contentful-paint"].numericValue),
        fid: String(audits["max-potential-fid"].numericValue),
        cls: String(audits["cumulative-layout-shift"].numericValue),
        ttfb: String(audits["server-response-time"].numericValue),
        inp: String(audits["interactive"].numericValue),
        fcp: String(audits["first-contentful-paint"].numericValue),
      });

      console.log(`Metrics collected for ${target.pageName}`);
    }
  } catch (error) {
    console.error("Error collecting metrics:", error);
  } finally {
    await chrome.kill();
  }
}

// スクリプトが直接実行された場合のみ実行
if (import.meta.url === new URL(import.meta.url).href) {
  collectMetrics()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
