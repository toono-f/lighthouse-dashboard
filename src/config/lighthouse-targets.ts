import { LighthouseTarget } from "@/types/metrics";
import { db } from "@/lib/db";
import { pages } from "@/lib/schema";

const targets: LighthouseTarget[] = [
  {
    pageId: "zenn",
    pageName: "Zenn",
    pageUrl: "https://zenn.dev/",
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
