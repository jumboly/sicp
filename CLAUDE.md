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
- セクション名（`<NAME>` タグ）も `<BILINGUAL>` で翻訳する。トップページ（目次）とバーガーメニューに反映される
- 章冒頭の引用（`<EPIGRAPH>` タグ）内のテキストも `<BILINGUAL>` で翻訳する

### パーサー

- `javascript/parseXmlHtml.tsx` に `processTextFunctionsBilingual` ハンドラがある
- `<EN>` → `<div class="lang-en">`、`<JA>` → `<div class="lang-ja" style="display:none">`
- `<div>` を使用する理由: `<span>` だと UL/OL などのブロック要素が `<p>` 内で DOM 構造が壊れるため
- `version == "js"` のときにハンドラが有効化される

### クライアントサイド

- `static/assets/lang-toggle.js` — EN/JA/EN+JA の3モード切り替え、localStorage 永続化
- `static/assets/stylesheet.css` 末尾 — `.lang-ja` フォント設定、`body.lang-mode-both` の併記スタイル
- `javascript/html/Navigation.tsx` — ナビバーの EN/JA/EN+JA ボタングループ

### ビルド・CSS の注意点

- CSSは `stylesheet.css` に書くこと。`book.css` は HTML から直接リンクされておらず、`application.js` 経由で参照されるのみ
- `LinksHead.tsx` でローカルアセットの URL にビルド時ハッシュを付与してキャッシュバスティングしている
- `SCHEME` タグは `tagsToRemove` に追加済み（JS版で Scheme コンテンツを抑制）

### 翻訳タグの注意点

- **FOOTNOTE は BILINGUAL の外に置く**。EN/JA 両方に FOOTNOTE を入れると注釈番号が重複する。FOOTNOTE の中身に BILINGUAL を使って EN/JA を切り替える
- **SNIPPET は BILINGUAL の外に置く**。テキストが SNIPPET で分断される場合、前後を別の BILINGUAL ブロックにする
- UL/OL などのブロック要素は BILINGUAL 内にそのまま入れてよい（`<div>` で出力されるため）
- 詳細なルール・用語集は `TRANSLATION_GUIDE.md` を参照

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
- [x] Section 1.1.5 The Substitution Model for Function Application
- [x] Section 1.1.6 Conditional Expressions and Predicates
- [x] Section 1.1.7 Example: Square Roots by Newton's Method
- [x] Section 1.1.8 Functions as Black-Box Abstractions
- [x] Section 1.2 Functions and the Processes They Generate (導入部)
- [x] Section 1.2.1 Linear Recursion and Iteration
- [x] Section 1.2.2 Tree Recursion
- [x] Section 1.2.3 Orders of Growth
- [x] Section 1.2.4 Exponentiation
- [x] Section 1.2.5 Greatest Common Divisors
- [x] Section 1.2.6 Example: Testing for Primality
- [x] Section 1.3 Formulating Abstractions with Higher-Order Functions (導入部)
- [x] Section 1.3.1 Functions as Arguments
- [x] Section 1.3.2 Constructing Functions using Lambda Expressions
- [x] Section 1.3.3 Functions as General Methods
- [x] Section 1.3.4 Functions as Returned Values
- [x] Chapter 2 導入部
- [x] Section 2.1 Introduction to Data Abstraction (導入部)
- [x] Section 2.1.1 Example: Arithmetic Operations for Rational Numbers
- [x] Section 2.1.2 Abstraction Barriers
- [x] Section 2.1.3 What Is Meant by Data?
- [x] Section 2.1.4 Extended Exercise: Interval Arithmetic
- [x] Section 2.2 Hierarchical Data and the Closure Property (導入部)
- [x] Section 2.2.1 Representing Sequences
- [x] Section 2.2.2 Hierarchical Structures
- [x] Section 2.2.3 Sequences as Conventional Interfaces
- [x] Section 2.2.4 Example: A Picture Language
- [x] Section 2.3 Symbolic Data (導入部)
- [x] Section 2.3.1 Strings (Quotation)
- [x] Section 2.3.2 Example: Symbolic Differentiation
- [x] Section 2.3.3 Example: Representing Sets
- [x] Section 2.3.4 Example: Huffman Encoding Trees
- [x] Section 2.4 Multiple Representations for Abstract Data (導入部)
- [x] Section 2.4.1 Representations for Complex Numbers
- [x] Section 2.4.2 Tagged data
- [x] Section 2.4.3 Data-Directed Programming and Additivity
- [x] Section 2.5 Systems with Generic Operations (導入部)
- [x] Section 2.5.1 Generic Arithmetic Operations
- [x] Section 2.5.2 Combining Data of Different Types
- [x] Section 2.5.3 Example: Symbolic Algebra
- [x] Chapter 3 導入部
- [x] Section 3.1 Assignment and Local State (導入部)
- [x] Section 3.1.1 Local State Variables
- [x] Section 3.1.2 The Benefits of Introducing Assignment
- [x] Section 3.1.3 The Costs of Introducing Assignment
- [x] Section 3.2 The Environment Model of Evaluation (導入部)
- [x] Section 3.2.1 The Rules for Evaluation
- [x] Section 3.2.2 Applying Simple Functions
- [x] Section 3.2.3 Frames as the Repository of Local State
- [x] Section 3.2.4 Internal Declarations
- [x] Section 3.2.5 CSE Machine
- [x] Section 3.3 Modeling with Mutable Data (導入部)
- [x] Section 3.3.1 Mutable List Structure
- [x] Section 3.3.2 Representing Queues
- [x] Section 3.3.3 Representing Tables
- [x] Section 3.3.4 A Simulator for Digital Circuits
- [x] Section 3.3.5 Propagation of Constraints
- [ ] Chapter 3 (残り: 3.4〜3.5)〜5

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

## Lint・検証

```bash
yarn lint                 # prettier で javascript/ ディレクトリをチェック
yarn validate-bilingual   # BILINGUAL タグ配置ルールを検証
```

- CI で lint が走るので、`javascript/` 配下のファイルを編集したら prettier でフォーマットすること
- `validate-bilingual` は翻訳 XML の構造ルール違反を検出する（FOOTNOTE/SNIPPET の配置、EN/JA の対応など）。翻訳作業後に実行すること

## 一括翻訳ワークフロー

「〜まで翻訳して」「〜まで一括で」といった指示があった場合、以下を各セクションごとに**直列で**繰り返す（並列エージェント不可）：

1. **翻訳（サブエージェント）**: Agent ツールで翻訳用サブエージェントを起動し、XMLファイルの翻訳を委任する
   - コンテンツフィルター回避のため、翻訳は必ずサブエージェントで実行する（メインプロセスでの直接翻訳は禁止）
   - サブエージェントには以下を渡す：対象ファイルパス、翻訳対象の行範囲、TRANSLATION_GUIDE.md のパス、BILINGUAL タグ配置ルール、用語集（前セクションのレビューで得たフィードバックがあればそれも含める）
   - 大きなファイルは範囲を分割して複数回のサブエージェントに分ける（目安：TEXT ブロック10個程度ずつ）
   - **400エラー時のリトライ**: サブエージェントがコンテンツフィルター（400エラー）で失敗した場合、翻訳範囲を半分に分割してリトライする。それでも失敗する場合はさらに半分にする。最小単位（単一のTEXTブロック）でも失敗する場合は、JA に英文をコピーし `<!-- content filter blocked translation -->` コメントを付けて次に進む
2. **品質確認（メインプロセス）**: サブエージェント完了後、以下をメインプロセスで実行する
   - `yarn validate-bilingual` で構造検証
   - `grep -n '�'` で文字化けチェック（サブエージェントは文字化けを起こすことがある）
   - 文字化けがあれば修正
3. **レビュー（サブエージェント）**: 別のサブエージェントで翻訳をレビュー（用語の一貫性、文体、タグ配置ルール）
4. **用語連携**: レビューで指摘された用語の問題や新出用語をメモし、次セクションの翻訳サブエージェントへのプロンプトに反映する
5. **用語集更新**: TRANSLATION_GUIDE.md に新出用語があれば追加
6. **進捗更新**: CLAUDE.md の翻訳進捗チェックリストを更新

- 途中で確認を求めず、すべて完了するまで自律的に進める
- 判断に迷った箇所は最後にまとめて報告する
- **このワークフローは yolo モード（--dangerously-skip-permissions）でのみ実行する。通常モードの場合は yolo モードで再起動するよう促すこと**

## ライセンス

- upstream は CC BY-SA 4.0（テキスト・図）+ GPLv3（プログラム）
- 日本語翻訳は CC BY-SA 4.0 の Adapted Material に該当
- `javascript/html/Licences.tsx` に翻訳である旨・原作リンク・ライセンス表記を記載済み
