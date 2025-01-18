import { PageMetrics } from "@/types/metrics";

// 7日分のデータを生成する関数
const generateWeekData = (baseValues: {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  inp: number;
  fcp: number;
}) => {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    // 基準値から±20%のランダムな変動を加える
    const randomVariation = () => 1 + (Math.random() * 0.4 - 0.2);

    return {
      timestamp: date.toISOString().split("T")[0] + "T00:00:00",
      lcp: Math.round(baseValues.lcp * randomVariation()),
      fid: Math.round(baseValues.fid * randomVariation()),
      cls: Number((baseValues.cls * randomVariation()).toFixed(3)),
      ttfb: Math.round(baseValues.ttfb * randomVariation()),
      inp: Math.round(baseValues.inp * randomVariation()),
      fcp: Math.round(baseValues.fcp * randomVariation()),
    };
  });
};

export const dummyMetricsData: PageMetrics[] = [
  {
    pageId: "home",
    pageName: "ホームページ",
    data: generateWeekData({
      lcp: 2500,
      fid: 100,
      cls: 0.1,
      ttfb: 800,
      inp: 300,
      fcp: 1200,
    }),
  },
  {
    pageId: "about",
    pageName: "会社概要",
    data: generateWeekData({
      lcp: 1800,
      fid: 80,
      cls: 0.08,
      ttfb: 600,
      inp: 250,
      fcp: 1000,
    }),
  },
  {
    pageId: "products",
    pageName: "製品一覧",
    data: generateWeekData({
      lcp: 3000,
      fid: 120,
      cls: 0.15,
      ttfb: 900,
      inp: 350,
      fcp: 1400,
    }),
  },
  {
    pageId: "contact",
    pageName: "お問い合わせ",
    data: generateWeekData({
      lcp: 2000,
      fid: 90,
      cls: 0.09,
      ttfb: 700,
      inp: 280,
      fcp: 1100,
    }),
  },
  {
    pageId: "blog",
    pageName: "ブログ",
    data: generateWeekData({
      lcp: 2800,
      fid: 110,
      cls: 0.12,
      ttfb: 850,
      inp: 320,
      fcp: 1300,
    }),
  },
];