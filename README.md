# loveero
loveero



## batch
```
batch/
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
├── README.md
├── src/
│   ├── index.ts                      # アプリケーションのエントリーポイント
│   ├── config/
│   │   ├── config.ts                 # 環境設定
│   │   └── logger.ts                 # ロギング設定
│   ├── interfaces/
│   │   ├── scraper.interface.ts      # スクレイパーのインターフェース定義
│   │   └── video.interface.ts        # 動画関連のインターフェース定義
│   ├── models/
│   │   └── result.model.ts           # スクレイピング結果のモデル
│   ├── scrapers/
│   │   ├── index.ts                  # スクレイパーのエクスポート
│   │   ├── base-scraper.ts           # 基本スクレイパークラス
│   │   ├── site-a-scraper.ts         # サイトA用スクレイパー
│   │   ├── site-b-scraper.ts         # サイトB用スクレイパー
│   │   └── site-c-scraper.ts         # サイトC用スクレイパー
│   ├── services/
│   │   ├── http.service.ts           # HTTPリクエスト処理
│   │   ├── scraping.service.ts       # スクレイピングロジック
│   │   └── storage.service.ts        # 結果保存サービス
│   ├── routes/
│   │   ├── index.ts                  # ルートのエクスポート
│   │   ├── scraper.routes.ts         # スクレイパー関連のルート
│   │   └── scraping.routes.ts        # スクレイピング実行のルート
│   ├── controllers/
│   │   ├── scraper.controller.ts     # スクレイパー管理コントローラー
│   │   └── scraping.controller.ts    # スクレイピング実行コントローラー
│   ├── middlewares/
│   │   ├── error.middleware.ts       # エラーハンドリング
│   │   └── rate-limit.middleware.ts  # レート制限
│   └── utils/
│       ├── cheerio-helper.ts         # Cheerioヘルパー関数
│       ├── url-helper.ts             # URL処理ヘルパー
│       └── validation.ts             # 入力検証
├── data/                            # スクレイピング結果の保存先
│   ├── site-a/
│   ├── site-b/
│   └── site-c/
└── tests/
    ├── scrapers/
    │   ├── site-a-scraper.test.ts
    │   └── site-b-scraper.test.ts
    ├── services/
    │   └── scraping.service.test.ts
    └── controllers/
        └── scraper.controller.test.ts
```

### テスト
```
npm run test
```

```
root@5132071aa9c4:/app# npm run test

> batch@1.0.0 test
> jest

 PASS  src/test/dummy.test.ts
  sum 関数
    ✓ 1 + 1 は 2 である (6 ms)
    ✓ 正の数同士の足し算 (1 ms)
    ✓ 負の数同士の足し算
    ✓ 正の数と負の数の足し算 (1 ms)
    ✓ ゼロとの足し算 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        4.615 s
```

### backend+frontend
```
full-stack-app/
│
├── frontend/                  # Next.jsフロントエンド
│   ├── public/                # 静的ファイル
│   │   ├── favicon.ico
│   │   └── images/
│   │
│   ├── src/                   # ソースコード
│   │   ├── components/        # 再利用可能なコンポーネント
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── UserList.tsx
│   │   │   └── UserForm.tsx
│   │   │
│   │   ├── pages/             # ページコンポーネント
│   │   │   ├── _app.tsx
│   │   │   ├── index.tsx
│   │   │   ├── users/
│   │   │   │   ├── index.tsx
│   │   │   │   └── [id].tsx
│   │   │   └── api/          # Next.js内APIルート（必要な場合）
│   │   │
│   │   ├── styles/            # スタイルシート
│   │   │   ├── globals.css
│   │   │   └── Home.module.css
│   │   │
│   │   ├── types/             # TypeScript型定義
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/             # カスタムReactフック
│   │   │   └── useApi.ts
│   │   │
│   │   ├── utils/             # ユーティリティ関数
│   │   │   ├── api.ts
│   │   │   └── helpers.ts
│   │   │
│   │   └── context/           # Reactコンテキスト（必要な場合）
│   │       └── UserContext.tsx
│   │
│   ├── .eslintrc.json         # ESLint設定
│   ├── next.config.js         # Next.js設定
│   ├── package.json           # パッケージ設定
│   ├── tsconfig.json          # TypeScript設定
│   └── README.md              # フロントエンドのREADME
│
├── backend/                   # Express APIバックエンド
│   ├── src/                   # ソースコード
│   │   ├── controllers/       # コントローラー
│   │   │   ├── userController.ts
│   │   │   └── authController.ts
│   │   │
│   │   ├── models/            # データモデル
│   │   │   └── User.ts
│   │   │
│   │   ├── routes/            # APIルート
│   │   │   ├── userRoutes.ts
│   │   │   ├── authRoutes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── middleware/        # ミドルウェア
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   │
│   │   ├── config/            # 設定
│   │   │   └── db.ts
│   │   │
│   │   ├── types/             # TypeScript型定義
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/             # ユーティリティ関数
│   │   │   └── helpers.ts
│   │   │
│   │   └── index.ts           # エントリーポイント
│   │
│   ├── .env                   # 環境変数（.gitignoreに追加）
│   ├── .eslintrc.json         # ESLint設定
│   ├── package.json           # パッケージ設定
│   ├── tsconfig.json          # TypeScript設定
│   └── README.md              # バックエンドのREADME
│
├── .gitignore                 # Git除外ファイル
├── docker-compose.yml         # Docker Compose設定（オプション）
├── README.md                  # プロジェクト全体のREADME
└── package.json               # ルートパッケージ設定（オプション、開発ツール用）
```

nextのインストール
```
root@5eaf00200483:/app/front# npx create-next-app@latest front_test --no-app
Need to install the following packages:
create-next-app@15.3.1
Ok to proceed? (y) y

✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? …  Yes
✔ Would you like to use Tailwind CSS? …  Yes
✔ Would you like your code inside a `src/` directory? …Yes
✔ Would you like to use Turbopack for `next dev`? … No
✔ Would you like to customize the import alias (`@/*` by default)? … Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /app/front/front_test.
```

nextの起動
```
cd /app/front
npm run dev
```