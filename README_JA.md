# Geeker-Admin [🇨🇳](/README.md)  [🇯🇵](/README_JA.md)

### 紹介 📖

[Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin) は、Vue3.3、TypeScript、Vite3、Pinia、Element-Plus など最新のフロント技術を利用して開発されたオープンソースの管理システムテンプレートです。便利な [ProTable](https://juejin.cn/post/7166068828202336263) コンポーネントを提供し，より早くシステムが出来上がることができます。さらに、よく使われるコンポーネント、フック、ディレクティブ、ルーティングなども実装されています。
### プレビュー 👀

- Link：https://admin.spicyboy.cn

### リポジトリ ⭐

- Gitee：https://gitee.com/HalseySpicy/Geeker-Admin
- GitHub：https://github.com/HalseySpicy/Geeker-Admin

### ドキュメンション 📚

- 変更履歴：[CHANGELOG.md](./CHANGELOG.md)

- ドキュメンション：https://docs.spicyboy.cn

### 機能 🔨

- Vue3.3 + TypeScript で開発されています。シングルファイルコンポーネント**＜ script setup ＞**
- Vite4 を採用しています（Gzip パッケージ、TSX 言語、クロスドメインプロキシなどの対応）
- Vuex の代わりに Pinia を採用しています。軽量、シンプル、使いやすいです。Pinia 永続化プラグインを統合しています。
- Axios を TypeScript でカプセル化しています（リクエストインターセプト、キャンセル、よく使われるリクエストなどのカプセル化）
- Element の [ProTable](https://juejin.cn/post/7166068828202336263) コンポーネントをカプセル化しています。テーブルページはすべて columns で構成されています。
- Element のコンポーネントサイズの切り替え、ダークモード、i18n 国際化をサポートしています。
- VueRouter を使用してルーティングの権限をインターセプトし、ページボタンの権限を設定し、遅延ローディングルートをサポートしています。
- KeepAlive を使用してページをキャッシュし、多階層のネストページキャッシュをサポートしています。
- よく使われるカスタムディレクティブの開発（権限、コピー、ウォーターマーク、ドラッグ、スロットル、デバウンス、長押し…）
- Prettier を使用してコードを統一フォーマットし、ESLint、Stylelint コード検証規格を統合しています。
- husky、lint-staged、commitlint、czg、cz-git を使用してコミットメッセージを規格化しています。

### 使用手順 📔

- **ソースコードをクローンする：**

```text
# Gitee
git clone https://gitee.com/HalseySpicy/Geeker-Admin.git

# GitHub
  # https
  git clone https://github.com/HalseySpicy/Geeker-Admin.git
  # ssh
  git clone git@github.com:HalseySpicy/Geeker-Admin.git
```

- **インストール：**

```text
pnpm install
```

- **実行：**

```text
pnpm dev
pnpm serve
```

- **ビルド：**

```text
# 開発環境
pnpm build:dev

# 検証環境
pnpm build:test

# 本番環境
pnpm build:pro
```

- **ソースコードの型をチェックとフォーマットする：**

```text
# eslintでチェック
pnpm lint:eslint

# prettierでフォーマット
pnpm lint:prettier

# stylelintswでフォーマット
pnpm lint:stylelint
```

- **コミット：**

```text
# 変更をコミット（コミット前に自動的に lint:lint-staged コマンドが実行されます）
pnpm commit
```

### スクリーンショット 📷

- ログイン：

![login_light](https://i.imgtg.com/2023/04/13/8tknp.png)

![login_dark](https://i.imgtg.com/2023/04/13/8tmpP.png)

- ホーム：

![home_light](https://i.imgtg.com/2023/04/13/8tl1j.png)

![home_dark](https://i.imgtg.com/2023/04/13/8tpfb.png)

- テーブル：

![table_light](https://i.imgtg.com/2023/04/13/8tfMx.png)

![table_dark](https://i.imgtg.com/2023/04/13/8tv8F.png)

- ダッシュボード

![dashboard](https://i.imgtg.com/2023/04/14/82Grx.png)

- 視覚化：

![dataScreen](https://i.imgtg.com/2023/01/16/QP8HF.png)

### ソースコード構成 📚

```text
Geeker-Admin
├─ .husky                  # husky の設定ファイル
├─ .vscode                 # VSCode の推奨設定
├─ build                   # Vite の設定項目
├─ public                  # 静的リソースファイル（このフォルダはパッケージ化されません）
├─ src
│  ├─ api                 # API インターフェイス管理
│  ├─ assets              # 静的リソースファイル
│  ├─ components          # グローバルコンポーネント
│  ├─ config              # グローバル設定項目
│  ├─ directives          # グローバルディレクティヴファイル
│  ├─ enums               # プロジェクトでよく使う列挙型
│  ├─ hooks               # よく使う Hooks のラッパー
│  ├─ languages           # 言語の国際化 i18n
│  ├─ layouts             # フレームワークのレイアウトモジュール
│  ├─ routers             # ルーティング管理
│  ├─ stores              # pinia store
│  ├─ styles              # グローバルスタイルファイル
│  ├─ typings             # グローバルな ts 宣言
│  ├─ utils               # よく使うツールライブラリ
│  ├─ views               # プロジェクトの全てのページ
│  ├─ App.vue             # プロジェクトのメインコンポーネント
│  ├─ main.ts             # プロジェクトのエントリーファイル
│  └─ vite-env.d.ts       # ts が vue を認識するための指定
├─ .editorconfig           # エディタの設定
├─ .env                    # vite の一般設定
├─ .env.development        # 開発環境の設定
├─ .env.production         # 本番環境の設定
├─ .env.test               # テスト環境の設定
├─ .eslintignore           # Eslint 検証を無視
├─ .eslintrc.cjs           # Eslint 検証設定ファイル
├─ .gitignore              # Gitのトラッキングの対象外
├─ .prettierignore         # Prettier 形式化を無視
├─ .prettierrc.cjs         # Prettier 形式化設定
├─ .stylelintignore        # stylelint 形式化を無視
├─ .stylelintrc.cjs        # stylelint スタイル形式化設定
├─ CHANGELOG.md            # プロジェクトの更新ログ
├─ commitlint.config.cjs   # git コメットルール設定
├─ index.html              # エントリー html
├─ LICENSE                 # オープンソースライセンスファイル
├─ lint-staged.config.cjs  # lint-staged 設定ファイル
├─ package-lock.json       # 依存パッケージのバージョンロック
├─ package.json            # 依存パッケージ管理
├─ postcss.config.cjs      # postcss 設定
├─ README.md               # README の説明
├─ tsconfig.json           # typescript の全体設定
└─ vite.config.ts          # vite の全体設定ファイル
```

### 対応ブラウザ 🌎

- 開発環境では、最新ばの Chrome を利用することおすすめです。 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 本番環境では現代のブラウザがサポートされていますが、IE（Internet Explorer）ブラウザはサポートされていません。ブラウザサポートについては [Can I Use Es Module](https://caniuse.com/?search=ESModule)を参照してください。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|                   not support                   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |

### デモ用バックエンド 🧩

このプロジェクトのバックエンドインターフェースはすべて Mock データを使用しています。以下の Mock プラットフォームのサポートに感謝します。

- FastMock： https://www.fastmock.site
- EasyMock：https://mock.mengxuegu.com


### 支援 🍵

Geeker-Adminは、MIT ライセンスのオープンソースプロジェクトで、完全に無料で使用できます。
もし、気にいっていただけたら、以下の方法でサポートしていただけると嬉しいです。

- Star、Fork、Watch をお願いいたします。 🚀
- WeiChat Pay、AliPayでの寄付は下記QRコードからお願いいたします。 🙏

|                                        WeiChat Pay                                        |                                       Alipay                                       |
| :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| <img src="https://i.imgtg.com/2023/01/16/QRzBX.png" alt="Alipay QRcode" width=170> | <img src="https://i.imgtg.com/2023/01/16/QRFZt.png" alt="Wechat QRcode" width=170> |
