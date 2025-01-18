export type LighthouseTarget = {
  pageId: string;
  pageName: string;
  url: string;
};

export const lighthouseTargets: LighthouseTarget[] = [
  {
    pageId: "zenn",
    pageName: "Zenn",
    url: "https://zenn.dev/",
  },
  // TODO: 他の計測対象ページをここに追加
];
