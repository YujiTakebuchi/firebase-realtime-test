# firebase-realtime-test

## 概要

firebase のリアルタイムデータベースを検証するためのリポジトリ

## 技術

### 依存関係

- Node.js v20.3.0

### 使用ライブラリ

- react v18
- sass v1.63
- firebase js sdk v1.22

### インストール

```bash
npm i
```

## 実行

### 開発モード

```bash
npm start
```

### ビルド

```bash
npm run build
```

### ビルドデータローカルホスティング

ビルドデータは build ディレクトリに保存されています。

通常の Web サーバーのホスティング同様の環境で動作します。

お気に入りのホスティング CLI を使用してください。

特にお気に入りがなければ

```bash
npm i -g serve
```

```bash
serve -s build
```

とすることでホスティングすることができます。
