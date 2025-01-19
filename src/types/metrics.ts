// 基本的なメトリクス値の型定義
type MetricValues = {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  inp: number; // Interaction to Next Paint
  fcp: number; // First Contentful Paint
};

// 測定データの型定義
export type MetricsData = MetricValues & {
  measuredAt: string;
};

// Lighthouseのターゲット
export type LighthouseTarget = {
  pageId: string;
  pageName: string;
  pageUrl: string;
};

// APIから取得したメトリクスデータ
export type ApiMetric = LighthouseTarget & MetricValues;

// ページごとのメトリクスデータ
export type PageMetrics = LighthouseTarget & {
  data: MetricsData[];
};
