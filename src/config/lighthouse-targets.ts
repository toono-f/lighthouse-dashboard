export type LighthouseTarget = {
  pageId: string;
  pageName: string;
  url: string;
};

export const lighthouseTargets: LighthouseTarget[] = [
  {
    pageId: "home",
    pageName: "ホームページ",
    url: "https://example.com",
  },
  // TODO: 他の計測対象ページをここに追加
];
