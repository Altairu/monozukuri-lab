# 舞鶴高専 ものつくりラボ 公式サイト

Vue 3 + Vite で構築された、舞鶴高専ものつくりラボの公式ウェブサイトです。

## 📖 このドキュメントについて

このREADMEは、サイトの運営を引き継ぐ次の世代のTA・スタッフ向けに書かれています。  
**プログラミング初心者でも運営できる**ように、できるだけ詳しく書いています。

---

## 🚀 クイックスタート（開発環境の準備）

### 1. 必要なソフトウェア

以下をインストールしてください：

- **Node.js 18以上** - [公式サイト](https://nodejs.org/)からダウンロード
- **Git** - [公式サイト](https://git-scm.com/)からダウンロード
- **VSCode**（推奨） - コードエディタ

### 2. リポジトリをクローン

```bash
# GitHubからコードをダウンロード
git clone https://github.com/Altairu/monozukuri-lab.git
cd monozukuri-lab
```

### 3. 依存関係をインストール

```bash
# 必要なパッケージをインストール
npm install
```

### 4. 開発サーバーを起動

```bash
# ローカルサーバーを起動（ホットリロード有効）
npm run dev
```

ブラウザで `http://localhost:5173` を開くと、サイトが表示されます。  
ファイルを編集すると自動で反映されます。

---

## 📁 プロジェクト構造

```
monozukuri-lab/
├── index.html              # トップページ
├── pages/                  # 公開ページ（6ページ）
│   ├── activities.html     # 活動ページ
│   ├── facility.html       # 施設紹介
│   ├── members.html        # スタッフ紹介
│   ├── contact.html        # お問い合わせ
│   ├── game.html          # ミニゲーム
│   └── python.html        # Python実行環境
├── admin/                  # 管理者ページ（パスワード保護）
│   ├── admin.html         # 管理ガイド（このREADMEと同じ内容）
│   ├── secret.html        # イースターエッグページ
│   └── secret2.html       # 隠しページ
├── events/                 # イベントページ
│   ├── 3dcontest2025.html
│   └── 3dprinter2025.html
├── images/                 # 画像ファイル
│   ├── staff/             # スタッフ写真
│   └── ...                # その他の画像
├── css/
│   └── style.css          # 共通スタイル（約350行）
├── js/
│   ├── mobile-menu.js     # ハンバーガーメニュー
│   └── vue-apps.js        # Vueアプリ
└── vite.config.js         # ビルド設定
```

---

## ✏️ コンテンツの編集方法

### よくある編集作業

#### 1️⃣ トップページのイベントバナーを表示する

**ファイル:** `index.html`

1. `index.html` を開く
2. 50行目あたりにあるコメントアウトされたバナーコードを探す：

```html
<!-- イベント告知バナー（使う時はコメント解除）
<div class="max-w-xl mx-auto mt-8 mb-6">
  <a href="events/your-event.html"
    class="block bg-blue-600 hover:bg-blue-700 text-white text-center text-lg font-bold rounded-xl shadow-lg px-6 py-5">
    <div>【イベント名】</div>
    <div class="mt-2">
      <span class="text-yellow-300 text-xl">📅 日時情報</span>
    </div>
  </a>
</div>
-->
```

3. `<!--` と `-->` を削除してコメント解除
4. リンク先（`href`）、イベント名、日時を編集
5. イベント終了後は再度コメントアウト

---

#### 2️⃣ 新しいイベントページを追加する

**手順:**

1. `events/` フォルダに新しいHTMLファイルを作成
2. 既存ファイル（例：`3dprinter2025.html`）をコピーして使うのが簡単
3. 内容を編集
4. **重要:** `vite.config.js` にページを追加

**vite.config.js の編集例:**

```javascript
rollupOptions: {
  input: {
    main: resolve(__dirname, 'index.html'),
    // ...既存のページ
    
    // 新しいイベントページを追加
    newevent: resolve(__dirname, 'events/newevent2026.html'),
  }
}
```

5. `npm run dev` を再起動

---

#### 3️⃣ スタッフ情報を更新する

**ファイル:** `pages/members.html`

1. `pages/members.html` を開く
2. スタッフカードのセクションを探す（47行目あたり）：

```html
<div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
  <img src="../images/staff/staff1.jpg" alt="名前"
    class="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-200">
  <h3 class="font-bold text-lg mb-1">山田 太郎</h3>
  <p class="text-sm text-gray-600 mb-1">所属：専攻科 電気電子システム</p>
  <p class="text-sm text-gray-600 mb-3">役割：TA</p>
  <p class="text-sm text-gray-700">一言メッセージ</p>
</div>
```

3. 名前、所属、写真パス、メッセージを編集
4. スタッフが増える場合は、このブロックをコピーして追加

---

#### 4️⃣ 施設・機材情報を更新する

**ファイル:** `pages/facility.html`

1. `pages/facility.html` を開く
2. 機材カードのセクションを編集（49行目あたり）
3. 画像パス、機材名、説明文を変更

---

#### 5️⃣ 画像を追加する

**手順:**

1. 画像を `images/` フォルダに配置
   - スタッフ写真 → `images/staff/`
   - イベント写真 → `images/events/`など
2. HTMLで参照：

```html
<img src="../images/your-image.jpg" alt="説明">
```

**画像の最適化（推奨）:**
- サイズ: 横幅1200px以下
- フォーマット: JPG または WebP
- ファイルサイズ: 500KB以下

---

## 🚢 デプロイ方法（サイトの公開）

### 自動デプロイ（推奨）

GitHub に変更をプッシュするだけで、自動でサイトが更新されます。

```bash
# 変更をステージング
git add .

# コミットメッセージを付けて保存
git commit -m "イベントバナーを追加"

# GitHubにプッシュ
git push origin main
```

→ GitHub Actions が自動でビルドして公開します（約3分）

### 手動デプロイ

```bash
# ビルド
npm run build

# dist/ フォルダの中身をサーバーにアップロード
```

---

## 🔐 管理者ページについて

### アクセス方法

**URL:** `http://localhost:5173/admin/admin.html`  
**パスワード:** `monotukuri`

管理者ページには、このREADMEと同じ内容の管理ガイドがあります。

### イースターエッグ

トップページのタイトルを**10回クリック**すると、隠しページにリダイレクトされます。

---

## 🛠️ トラブルシューティング

### Q1: `npm run dev` が失敗する

**原因:** Node.jsのバージョンが古い可能性

```bash
# Node.jsのバージョンを確認
node -v

# 18以上でない場合は、Node.jsを再インストール
```

**その他の解決策:**

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

---

### Q2: ビルドエラーが出る

**よくある原因:**
- HTMLタグの閉じ忘れ
- `vite.config.js` のパス間違い

**確認方法:**

```bash
# 開発サーバーで先に確認
npm run dev

# エラーメッセージをよく読む
```

---

### Q3: 画像が表示されない

**チェックポイント:**
- 画像のパスが正しいか？（`../images/`）
- ファイル名の大文字小文字が間違っていないか？
- 画像ファイルが実際に存在するか？

---

### Q4: 変更がサイトに反映されない

**解決策:**
1. ブラウザのキャッシュをクリア（Ctrl + Shift + R）
2. 開発サーバーを再起動
3. GitHubにプッシュしたか確認

---

### Q5: 前のバージョンに戻したい

```bash
# コミット履歴を確認
git log --oneline

# 特定のコミットに戻す
git revert <コミットID>

# または、直前のコミットを取り消す
git reset --hard HEAD~1
```

⚠️ **注意:** `git reset` は取り消せないので慎重に。

---

## 📚 参考リンク

- [Vite 公式ドキュメント](https://ja.vitejs.dev/)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [Vue 3 公式ガイド](https://ja.vuejs.org/)
- [Git 基本コマンド](https://qiita.com/konweb/items/621722f67fdd8f86a017)

---

## 🤝 コントリビューション

バグ報告や機能提案は [Issues](https://github.com/Altairu/monozukuri-lab/issues) で受け付けています。

---

## 📞 困ったときは

1. **GitHub Issues** - バグ報告・質問
2. **管理者ページ** - サイト内の管理ガイドを参照
3. **前任者に連絡** - 引き継ぎ時の連絡先リストを確認

---

## 📝 運営チェックリスト

### 定期的に確認すべきこと

- [ ] イベント終了後、バナーを非表示にする
- [ ] スタッフ情報を年度初めに更新
- [ ] 機材が新規導入されたら施設ページに追加
- [ ] リンク切れがないかチェック
- [ ] GitHubにバックアップされているか確認

### イベント前後

**イベント前:**
- [ ] イベントページを作成
- [ ] トップページにバナーを表示
- [ ] SNSで告知

**イベント後:**
- [ ] バナーを非表示
- [ ] イベントレポートを追加（オプション）
- [ ] 写真をアップロード

---

## 📄 ライセンス

MIT License

---

**© 2025 舞鶴高専 ものつくりラボ**

**最終更新:** 2026年1月28日  
