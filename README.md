# React Shopping Mock Store

Bootstrap 5を使用したショッピングサイトのモックアップです。

## 機能
- 商品一覧の表示
- カートへの追加/数量変更/削除機能
- 合計金額の自動計算
- レスポンシブデザイン（モバイル対応）

## 構成
- Frontend: React (Vite)
- Styling: Bootstrap 5
- Deployment: Docker / GitHub Pages

## ローカルでの起動 (Docker)
\`docker build -t shopping-mock .\`
\`docker run -p 8080:80 shopping-mock\`
その後、[http://localhost:8080](http://localhost:8080) にアクセスしてください。
