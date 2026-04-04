# CLAUDE.md

## プロジェクト概要

SICP JavaScript Edition の日本語翻訳版。source-academy/sicp のフォークに EN/JA 切り替え機能を追加し、GitHub Pages で公開している。

- 公開URL: https://www.jumboly.jp/sicp/
- GitHub: https://github.com/jumboly/sicp
- upstream: https://github.com/source-academy/sicp

## ビルド

```bash
yarn web-js    # JS版 HTML をビルド (html_js/ に出力)
yarn js        # JavaScript プログラム抽出
yarn json      # JSON (cadet frontend 用) 生成
yarn prepare   # docs_out/ にパッケージング
```

PDF ビルドは日本語 CJK 対応が未了のためスキップしている。

## 翻訳の仕組み

### XML構造

`xml/` 配下の XML ソースに `<BILINGUAL>` タグで EN/JA 両方を埋め込む：

```xml
<TEXT>
  <BILINGUAL>
    <EN>English text here.</EN>
    <JA>日本語テキストをここに。</JA>
  </BILINGUAL>
</TEXT>
```

- `<BILINGUAL>` で囲まれていないテキストはそのまま表示される（段階的翻訳が可能）
- コードブロック (`<SNIPPET>`) は翻訳対象外
- `<SPLITINLINE>` 内のテキストも `<BILINGUAL>` 内で使用可能

### パーサー

- `javascript/parseXmlHtml.tsx` に `processTextFunctionsBilingual` ハンドラがある
- `<EN>` → `<span class="lang-en">`、`<JA>` → `<span class="lang-ja" style="display:none">`
- `version == "js"` のときにハンドラが有効化される

### クライアントサイド

- `static/assets/lang-toggle.js` — EN/JA/EN+JA の3モード切り替え、localStorage 永続化
- `static/assets/stylesheet.css` 末尾 — `.lang-ja` フォント設定、`body.lang-mode-both` の併記スタイル
- `javascript/html/Navigation.tsx` — ナビバーの EN/JA/EN+JA ボタングループ

### 注意点

- CSSは `stylesheet.css` に書くこと。`book.css` は HTML から直接リンクされておらず、`application.js` 経由で参照されるのみ
- `LinksHead.tsx` でローカルアセットの URL にビルド時ハッシュを付与してキャッシュバスティングしている
- `SCHEME` タグは `tagsToRemove` に追加済み（JS版で Scheme コンテンツを抑制）

## 翻訳進捗

- [x] Section 1.1.1 Expressions
- [x] Section 1.1.2 Naming and the Environment
- [x] Section 1.1.3 Evaluating Operator Combinations
- [ ] Section 1.1.4〜1.1.8
- [ ] Section 1.2〜1.3
- [ ] Chapter 2〜5

## デプロイ

- `master` への push で GitHub Actions が自動デプロイ
- `.github/workflows/deploy-pages.yml` で `yarn web-js && yarn js && yarn json` を実行
- `peaceiris/actions-gh-pages@v4` で `docs_out/` を `gh-pages` ブランチに公開

## Lint

```bash
yarn lint  # prettier で javascript/ ディレクトリをチェック
```

CI で lint が走るので、`javascript/` 配下のファイルを編集したら prettier でフォーマットすること。
