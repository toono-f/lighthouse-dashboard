import { PageMetrics } from "@/types/metrics";

// 7日分のデータを生成する関数
const generateWeekData = (baseValues: {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  inp: number;
  fcp: number;
  performanceScore: number;
}) => {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    // 基準値から±20%のランダムな変動を加える
    const randomVariation = () => 1 + (Math.random() * 0.4 - 0.2);

    return {
      timestamp: date.toISOString().split("T")[0] + "T00:00:00",
      measuredAt: date.toISOString(),
      pageUrl: "https://example.com",
      lcp: Math.round(baseValues.lcp * randomVariation()),
      fid: Math.round(baseValues.fid * randomVariation()),
      cls: Number((baseValues.cls * randomVariation()).toFixed(3)),
      ttfb: Math.round(baseValues.ttfb * randomVariation()),
      inp: Math.round(baseValues.inp * randomVariation()),
      fcp: Math.round(baseValues.fcp * randomVariation()),
      performanceScore: Math.round(
        baseValues.performanceScore * randomVariation()
      ),
    };
  });
};

export const dummyMetricsData: PageMetrics[] = [
  {
    pageId: "home",
    pageName: "ホームページ",
    pageUrl: "https://example.com",
    data: generateWeekData({
      lcp: 2500,
      fid: 100,
      cls: 0.1,
      ttfb: 800,
      inp: 300,
      fcp: 1200,
      performanceScore: 80,
    }),
  },
  {
    pageId: "about",
    pageName: "会社概要",
    pageUrl: "https://example.com/about",
    data: generateWeekData({
      lcp: 1800,
      fid: 80,
      cls: 0.08,
      ttfb: 600,
      inp: 250,
      fcp: 1000,
      performanceScore: 80,
    }),
  },
  {
    pageId: "products",
    pageName: "製品一覧",
    pageUrl: "https://example.com/products",
    data: generateWeekData({
      lcp: 3000,
      fid: 120,
      cls: 0.15,
      ttfb: 900,
      inp: 350,
      fcp: 1400,
      performanceScore: 80,
    }),
  },
  {
    pageId: "contact",
    pageName: "お問い合わせ",
    pageUrl: "https://example.com/contact",
    data: generateWeekData({
      lcp: 2000,
      fid: 90,
      cls: 0.09,
      ttfb: 700,
      inp: 280,
      fcp: 1100,
      performanceScore: 80,
    }),
  },
  {
    pageId: "blog",
    pageName: "ブログ",
    pageUrl: "https://example.com/blog",
    data: generateWeekData({
      lcp: 2800,
      fid: 110,
      cls: 0.12,
      ttfb: 850,
      inp: 320,
      fcp: 1300,
      performanceScore: 80,
    }),
  },
];
