type MetricsData = {
  measuredAt: string;
  pageUrl: string;
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

type LighthouseTarget = {
  pageId: string;
  pageName: string;
  pageUrl: string;
};

export type { MetricsData, PageMetrics, LighthouseTarget };
