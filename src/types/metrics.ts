type MetricsData = {
  measuredAt: string;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  inp: number;
  fcp: number;
};

type PageMetrics = {
  pageId: string;
  pageName: string;
  data: MetricsData[];
};

export type { MetricsData, PageMetrics };
