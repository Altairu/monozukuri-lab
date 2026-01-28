# 舞鶴高専 ものつくりラボ 公式サイト

Vue 3 + Vite で構築された、舞鶴高専ものつくりラボの公式ウェブサイトです。

## 🚀 開発環境のセットアップ

### 必要なもの
- Node.js 18 以上
- npm または yarn

### インストール

```bash
# 依存関係をインストール
npm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動（ホットリロード有効）
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

### ビルド

```bash
# 本番用にビルド
npm run build
```

ビルドされたファイルは `dist/` フォルダに出力されます。

### プレビュー

```bash
# ビルド後のプレビュー
npm run preview
```

## 📦 デプロイ方法

### 自動デプロイ（GitHub Actions）

1. コードを編集・コミット
2. `main` ブランチにプッシュ
3. GitHub Actions が自動でビルド

**リリースを作成する場合:**

```bash
# バージョンタグを作成してプッシュ
git tag v1.0.0
git push origin v1.0.0
```

→ GitHub Actionsが自動でビルド＆リリースを作成します

### 手動デプロイ

1. `npm run build` を実行
2. `dist/` フォルダの中身をサーバーにアップロード

## 📁 プロジェクト構造

```
monozukuri-lab/
├── .github/
│   └── workflows/
│       └── build-and-release.yml  # GitHub Actions設定
├── pages/                         # 公開ページ
│   ├── activities.html            # 活動ページ
│   ├── facility.html              # 施設ページ
│   ├── members.html               # スタッフページ
│   ├── contact.html               # お問い合わせページ
│   ├── game.html                  # ゲームページ
│   ├── python.html                # Python実行環境ページ
│   └── projects.html              # プロジェクトページ
├── admin/                         # 管理者ページ（非公開）
│   ├── admin.html                 # 管理者ガイド
│   ├── secret.html                # シークレットページ
│   └── secret2.html               # シークレットページ2
├── events/                        # イベントページ
│   ├── 3dcontest2025.html
│   └── 3dprinter2025.html
├── css/
│   └── style.css                  # グローバルCSS
├── images/                        # 画像ファイル
├── js/
│   └── mobile-menu.js             # モバイルメニュー
├── index.html                     # トップページ
├── package.json                   # npm設定
├── vite.config.js                 # Vite設定
└── README.md                      # このファイル
```

## 🛠️ 技術スタック

- **Vue 3** - プログレッシブJavaScriptフレームワーク
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSSフレームワーク
- **GitHub Actions** - CI/CD自動化

## 📝 開発ガイド

### Vue 3の導入

このプロジェクトでは段階的にVue 3を導入しています。

- 既存のHTMLはそのまま動作します
- 必要に応じてVueコンポーネントを追加できます
- CDN版ではなく、ビルド版を使用しています

### 新しいページを追加する場合

1. HTMLファイルを作成
2. `vite.config.js` の `input` に追加

```javascript
rollupOptions: {
  input: {
    // ...既存のページ
    newpage: './newpage.html',  // 追加
  }
}
```

## 🤝 コントリビューション

バグ報告や機能提案は Issues で受け付けています。

## 📄 ライセンス

MIT License

---

© 2025 舞鶴高専 ものつくりラボ
