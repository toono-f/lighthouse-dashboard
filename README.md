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

2. 環境変数の設定
`.env.sample`ファイルを`.env`にコピーし、必要な環境変数を設定してください：
```bash
cp .env.sample .env
```

必要な環境変数：
- `DATABASE_URL`: データベース接続文字列（PostgreSQLを想定）
- `GOOGLE_API_KEY`: Google APIキー（PageSpeed Insights APIを利用するため）

1. データベースのセットアップ
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