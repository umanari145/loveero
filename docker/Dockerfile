FROM node:24-alpine
# アプリケーションディレクトリを作成
# 作業ディレクトリを設定
WORKDIR /usr/src/app
# package.jsonとpackage-lock.json（存在する場合）をコピー
COPY app/package*.json ./
# 依存関係をインストール（開発依存関係も含める）
RUN npm ci
# アプリケーションをビルド
COPY app/ .
RUN npm run build
# コンテナがリッスンするポートを指定
ENV HOST 0.0.0.0
EXPOSE 3000
# アプリケーション起動コマンド
CMD ["npm", "run", "start"]