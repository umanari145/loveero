# loveero
loveero

### Next(backend+frontend)

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
cd /app
npm run dev
```
https://learning-next.app/blog/fullstack-development/nextjs-backend


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
## mongoDB
```
docker exec -it l-mongo-node sh
cd init/
node create.js 
Connected to MongoDB
User 'loveero_user' created for database 'loveero'
Collection 'movies' created in database 'loveero'
Connection to MongoDB closed
```
## prisma
ORマッパ-<br>
mongoDBも対応。migrationも一応ある
一応下記でcollection作成
```
cd /app
npx prisma db push
```

## 参考文献
https://qiita.com/am_765/items/5e42bd5f87b296f61fbc<br>
https://qiita.com/boragi/items/1e3038a87e36e19d2951<br>
https://zenn.dev/thirosue/books/49a4ee418743ed/viewer/57d161<br>
https://zenn.dev/denham/scraps/fe266461827012