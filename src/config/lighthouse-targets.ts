import { LighthouseTarget } from "@/types/metrics";
import { db } from "@/lib/db";
import { pages } from "@/lib/schema";

const targets: LighthouseTarget[] = [
  {
    // Zenn
    pageId: "zenn",
    pageName: "Zenn",
    pageUrl: "https://zenn.dev/",
  },
  {
    // Qiita
    pageId: "qiita",
    pageName: "Qiita",
    pageUrl: "https://qiita.com/",
  },
  {
    // note
    pageId: "note",
    pageName: "note",
    pageUrl: "https://note.com/",
  },
  {
    // バス比較なび
    pageId: "buscompare",
    pageName: "バス比較なび",
    pageUrl: "https://www.bushikaku.net/search/tokyo_osaka/",
  },
  {
    // 格安移動
    pageId: "idou",
    pageName: "格安移動",
    pageUrl: "https://idou.me/search/all/tokyo/osaka",
  },
  {
    // ツアー
    pageId: "tour",
    pageName: "ツアー",
    pageUrl: "https://tour.bushikaku.net/list?from_prefecture=tokyo",
  },
  // TODO: 他の計測対象ページをここに追加
];

// ページ情報をDBに同期する関数
export const syncLighthouseTargets = async () => {
  await Promise.all(
    targets.map(async (target) => {
      await db
        .insert(pages)
        .values({
          pageId: target.pageId,
          pageName: target.pageName,
          pageUrl: target.pageUrl,
        })
        .onConflictDoUpdate({
          target: [pages.pageId],
          set: {
            pageName: target.pageName,
            pageUrl: target.pageUrl,
          },
        });
    })
  );

  return targets;
};
