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

## 翻訳ガイド

`TRANSLATION_GUIDE.md` に用語集・文体・タグ配置ルールをまとめている。翻訳作業時は必ず参照すること。

- **読者像**: C#/Java/JS の業務経験あり、Scheme/関数型言語は未経験
- **文体**: です/ます体
- **用語方針**: 学術的な漢語（原始式、被演算子）よりカタカナ語（プリミティブな式、オペランド）を優先

## 翻訳進捗

- [x] Section 1.1.1 Expressions
- [x] Section 1.1.2 Naming and the Environment
- [x] Section 1.1.3 Evaluating Operator Combinations
- [x] Section 1.1.4 Compound Functions
- [ ] Section 1.1.5〜1.1.8
- [ ] Section 1.2〜1.3
- [ ] Chapter 2〜5

## インライン実行

- `static/assets/snippet-runner.js` — eval スニペットに Run/Open/Copy/Reset ボタンを追加
- ビルド時に `processSnippetHtml.js` が `<pre>` に `data-preamble`（依存コード）と `data-url`（Source Academy URL）を付与
- Run: `data-preamble` + 編集中コードを `eval()` で実行、結果をスニペット直下に表示
- コードは `contenteditable` で編集可能、Reset で元に戻せる

## ブランチ戦略

- `ja`（デフォルトブランチ）: fork 独自の変更（翻訳、機能追加）はすべてここで作業
- `master`: upstream と同期するためのブランチ。直接コミットしない

## デプロイ

- `ja` への push で GitHub Actions が自動デプロイ
- `.github/workflows/deploy-pages.yml` で `yarn web-js && yarn js && yarn json` を実行
- `peaceiris/actions-gh-pages@v4` で `docs_out/` を `gh-pages` ブランチに公開

## Lint

```bash
yarn lint  # prettier で javascript/ ディレクトリをチェック
```

CI で lint が走るので、`javascript/` 配下のファイルを編集したら prettier でフォーマットすること。

## ライセンス

- upstream は CC BY-SA 4.0（テキスト・図）+ GPLv3（プログラム）
- 日本語翻訳は CC BY-SA 4.0 の Adapted Material に該当
- `javascript/html/Licences.tsx` に翻訳である旨・原作リンク・ライセンス表記を記載済み
