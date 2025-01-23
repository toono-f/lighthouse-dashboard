# Performance Dashboard

パフォーマンスメトリクスを視覚化するためのダッシュボード。

## 必要条件

- Node.js
- npm

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. データベースのセットアップ
```bash
npm run generate  # データベーススキーマの生成
npm run migrate   # マイグレーションの実行
```

## 開発手順

開発サーバーの起動
```bash
npm run dev
```

## ビルドと本番環境

プロジェクトのビルド
```bash
npm run build
```

本番環境での起動
```bash
npm run start
```

## その他のコマンド

リントの実行
```bash
npm run lint
```

パフォーマンスメトリクスの収集（lighthouseを使用）
```bash
npm run collect-metrics
```

## 技術スタック

- Next.js
- React
- Chart.js
- Drizzle ORM
- TailwindCSS
- TypeScript