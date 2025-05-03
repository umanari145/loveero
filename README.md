# loveero
loveero



## batch

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