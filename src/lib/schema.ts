import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

// ページ情報を管理するテーブル
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  pageId: varchar("page_id", { length: 50 }).unique().notNull(),
  pageName: text("page_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// パフォーマンスメトリクスを管理するテーブル
export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  pageId: varchar("page_id", { length: 50 }).notNull(),
  measuredAt: timestamp("measured_at").notNull(),
  lcp: numeric("lcp").notNull(),
  fid: numeric("fid").notNull(),
  cls: numeric("cls", { precision: 5, scale: 3 }).notNull(),
  ttfb: numeric("ttfb").notNull(),
  inp: numeric("inp").notNull(),
  fcp: numeric("fcp").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
