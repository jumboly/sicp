---
title: Claude CodeでSICP JavaScript Editionを日本語化した — BILINGUALタグ設計からコンテンツフィルター対策まで
tags: Claude LLM 翻訳 SICP JavaScript
---

:::note info
この記事自体も Claude Code を使って作成しています。Git の履歴とソースコードをもとに Claude が下書きを生成し、筆者が構成・内容の方向付けやレビューを行いました。設計判断の理由やトレードオフの評価など、記事に込めた意図は筆者自身のものです。
:::

[SICP（計算機プログラムの構造と解釈）](https://sourceacademy.org/sicpjs/)は、MITの名著として知られるCSの教科書です。そのJavaScript版（SICP JS Edition）をClaude Codeを使って日本語に翻訳し、EN/JA/EN+JA の3モード切り替え付きサイトとして公開しました。

- 公開サイト: https://www.jumboly.jp/sicp/
- GitHub: https://github.com/jumboly/sicp

2日間、40コミットで Chapter 1〜2（全体の約40%）の翻訳を完了しました。この記事では、バイリンガルサイトの技術的な設計と、LLM翻訳で実際にハマった問題・対策についてまとめます。

<!-- スクリーンショット: EN/JA/EN+JAモードの表示例 -->

## なぜSICP JS Editionを翻訳するのか

SICPの原書（Scheme版）には[和田英一先生による和訳](https://sicp.iijlab.net/fulltext/)（非公式ウェブ版）がありますが、2022年にリリースされたJavaScript版の日本語訳は存在しませんでした。JavaScriptは慣れ親しんだ好きな言語の一つで、そのJS版を日本語で読みたかったので、自分で翻訳することにしました。SICP JS Editionは [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/) で公開されており、fork + 翻訳が可能です。

### 元のサイトの仕組み

SICP JS Edition のソースは XML で管理されています。ビルドの流れはシンプルな静的サイト生成です。

```
xml/ (原稿)  →  yarn web-js (ビルド)  →  html_js/ (静的HTML)  →  GitHub Pages で公開
```

XML には `<TEXT>`, `<SNIPPET>`, `<FOOTNOTE>` などの独自タグが使われており、ビルド時に Node.js のパーサーが HTML に変換します。Scheme版とJavaScript版の切り替えは `<SPLITINLINE>` タグで制御されており、この仕組みに乗る形で EN/JA の切り替えを追加しました。

### 段階的翻訳という設計判断

重要な設計判断として、**段階的翻訳**を可能にしました。未翻訳部分はそのまま英語で表示されるため、全セクションの翻訳を待たずにサイトを公開できます。

## BILINGUALタグ設計 — EN/JA/EN+JAの3モード切り替え

### なぜ独自タグを導入したか

翻訳プロジェクトでまず考えたのは「どこに日本語テキストを置くか」です。選択肢としては、(1) 別ファイルに翻訳を管理する、(2) 原文を日本語で上書きする、(3) 原文と翻訳を同じファイルに共存させる、の3つがありました。

(1) は原文との同期が大変で、(2) は原文が失われます。(3) の共存方式なら、原文との対応関係が明確で、前述の段階的翻訳も実現できます。

さらに、EN/JA/EN+JA の3モード切り替えを実装しました。EN+JA の併記モードを設けた理由は、**LLMの翻訳が正しいとは限らない**からです。誤訳や不自然な表現があったとき、読者がすぐに原文を参照して自分で判断できるようにしたかった、というのが動機です。

トレードオフとして、XMLソースを直接変更するため upstream との同期は困難になります。原著のScheme版は1996年（第2版）で内容は確定しており、JS版も本文の大きな改訂は落ち着いています。upstream にはバグ修正や依存関係の更新が継続的に入っていますが、XMLソースに BILINGUAL タグを埋め込む方式ではマージが現実的に困難なため、upstream 追従はあきらめて翻訳の利便性を優先しました。

### XMLソースの変更前と変更後

upstreamのXMLソースは以下のような構造です。

```xml
<!-- 変更前（upstream） -->
<TEXT>
  One easy way to get started at programming is to examine some typical
  interactions with an interpreter for the
  <SPLITINLINE>
    <JAVASCRIPT>JavaScript language.</JAVASCRIPT>
  </SPLITINLINE>
</TEXT>
```

ここに `<BILINGUAL>` タグを追加し、EN/JA両方のテキストを保持します。

```xml
<!-- 変更後（翻訳版） -->
<TEXT>
  <BILINGUAL>
    <EN>
    One easy way to get started at programming is to examine some typical
    interactions with an interpreter for the
    <SPLITINLINE>
      <JAVASCRIPT>JavaScript language.</JAVASCRIPT>
    </SPLITINLINE>
    </EN>
    <JA>
    プログラミングを始める簡単な方法の一つは、
    <SPLITINLINE>
      <JAVASCRIPT>JavaScript 言語</JAVASCRIPT>
    </SPLITINLINE>のインタプリタとの典型的なやり取りを調べることです。
    </JA>
  </BILINGUAL>
</TEXT>
```

元のテキストを `<EN>` で囲んで残し、対応する `<JA>` を隣に置きます。`<BILINGUAL>` で囲まれていないテキストは英語のまま表示されるので、翻訳が終わったブロックから順次公開していけます。

ビルド時に `<EN>` / `<JA>` をそれぞれ別の `<div>` に変換し、ブラウザ側の JavaScript でボタンに応じて表示/非表示を切り替えるシンプルな仕組みです。選択状態は `localStorage` に保存されます。

### タグ配置のバリデーション — LLMはXML構造を守らない

BILINGUALタグには配置制約があります。例えば、コードスニペット（`<SNIPPET>`）は BILINGUAL の外に、脚注（`<FOOTNOTE>`）も BILINGUAL の外に置いて中身を BILINGUAL で翻訳する、といったルールです。

**しかし、LLMにこれらのルールを指示しても守ってくれないことが頻繁にありました。** FOOTNOTE ごと BILINGUAL の中に入れてしまったり、SNIPPET を BILINGUAL で囲んでしまったり。XMLの入れ子構造のルールはプロンプトで伝えるだけでは不十分で、自動検証が必須でした。

そこで `validate-bilingual.js` を作り、以下の7項目を自動チェックしています。

1. U+FFFD（文字化け）が含まれていないこと
2. FOOTNOTE が EN/JA の中にネストされていないこと
3. SNIPPET が BILINGUAL の中にネストされていないこと
4. BILINGUAL に EN と JA の両方があること
5. EN/JA が BILINGUAL の外で使われていないこと
6. BILINGUAL のネスト禁止（FOOTNOTE 内は例外）
7. SOLUTION 内のテキストが BILINGUAL で翻訳されていること

翻訳のたびに `yarn validate-bilingual` を実行し、違反があれば修正するサイクルを回しています。

## インラインスニペット実行

翻訳以外にも、学習体験を改善する機能を追加しました。SICPの特徴は「読みながらコードを動かす」体験にあります。本家サイトでは Source Academy という外部環境へのリンクのみでしたが、ページ内で直接実行できるようにしました。

ビルド時に各コードスニペットに `data-preamble`（そのスニペットが依存する先行コード）を付与しておき、ブラウザ側で **Run / Open / Copy / Reset** の4ボタンを表示します。コードは `contenteditable` で編集可能で、Run を押すと `eval()` で実行し、`console.log` をキャプチャして結果をスニペット直下に表示します。ユーザー自身のブラウザ内で完結するため、セキュリティリスクは限定的です。

<!-- スクリーンショット: スニペット実行のRun前後 -->

## LLM翻訳のワークフロー設計

### CLAUDE.mdによる再現性の確保

翻訳ルール・タグ配置ルール・用語集・ワークフローを `CLAUDE.md` と `TRANSLATION_GUIDE.md` に集約しました。Claude Codeは会話開始時にこれらを自動的にロードするため、新しいセッションでもコンテキストが維持されます。

例えば、`CLAUDE.md` には一括翻訳ワークフローを以下のように記述しています。

```markdown
## 一括翻訳ワークフロー

「〜まで翻訳して」といった指示があった場合、以下を各セクションごとに直列で繰り返す：

1. **翻訳（サブエージェント）**: コンテンツフィルター回避のため、翻訳は必ず
   サブエージェントで実行する（メインプロセスでの直接翻訳は禁止）
   - 400エラー時のリトライ: 翻訳範囲を半分に分割してリトライする
2. **品質確認（メインプロセス）**: validate-bilingual で構造検証 + 文字化けチェック
3. **レビュー（サブエージェント）**: 用語の一貫性、文体、タグ配置ルールを確認
4. **用語連携**: レビューで指摘された用語を次セクションの翻訳に反映する
5. **用語集更新**: TRANSLATION_GUIDE.md に新出用語があれば追加
6. **進捗更新**: CLAUDE.md の翻訳進捗チェックリストを更新
```

これを書いておくだけで、「Chapter 2 を翻訳して」と指示するだけで Claude Code がこのワークフローに従って自律的に作業を進めます。コンテンツフィルター対策やバリデーションも自動的に実行されるため、人間は最終的なレビューに集中できます。

### 想定読者と用語方針

翻訳ガイドでは想定読者を以下のように定義しました。

- C#、Java、JavaScriptの業務開発経験がある
- Scheme / Lisp / 関数型言語は未経験

この読者像に基づき、学術的な漢語よりも開発者に馴染みのあるカタカナ語を優先しています。

| 英語 | ❌ 学術的な訳 | ✅ 採用した訳 |
|------|------------|------------|
| primitive expression | 原始式 | プリミティブな式 |
| operand | 被演算子 | オペランド |
| compound function | 合成関数 | 複合関数 |

用語集は250項目以上に達しました。翻訳中にレビューで指摘された用語の揺れは、次セクションの翻訳プロンプトにフィードバックし、用語集に追記するサイクルを回しています。

### Scheme版和訳との違い

実際に翻訳してみて感じたのは、Scheme版の和田訳で独特だった言い回しが解消され、格段に読みやすくなったことです。和田訳は正確ですが、現代の開発者には馴染みのない用語が多く使われていました。

| 概念 | 和田訳（Scheme版） | 本プロジェクト（JS版） |
|------|------------------|---------------------|
| bug / debugging | 虫 / 虫取り | バグ / デバッグ |
| function | 函数 | 関数 |
| procedure | 手続き | 関数（JS版で function に統一） |
| operand | 被演算子 | オペランド |
| primitive expression | 原始式 | プリミティブな式 |

JS版では `procedure` が `function` に置き換わっているため、「手続き」という訳語自体が不要になりました。言語の変更と用語方針の見直しが相まって、業務で JavaScript を書いている開発者にとって自然に読める訳文になったと思います。

### 翻訳→検証→レビューの3ステップ

各セクションの翻訳は以下のサイクルで進めています。

1. **翻訳**（サブエージェント）: 対象ファイル・行範囲・用語集を渡して翻訳を委任
2. **品質確認**（メインプロセス）: `yarn validate-bilingual` でタグ検証 + 文字化けチェック
3. **レビュー**（別のサブエージェント）: 用語の一貫性・文体・タグ配置を確認

翻訳をサブエージェントで実行するのは、コンテンツフィルターのエラー時にセッション全体が停止するのを防ぐためです（詳細は後述）。

## 実際にハマった問題と対策

### コンテンツフィルター対策

LLMを使った翻訳で最も厄介だったのが、APIのコンテンツフィルター（400エラー）です。教科書のテキストでも、特定の文脈で安全性フィルターに引っかかることがあります。

メインプロセスで翻訳すると、400エラーが発生した時点でセッション全体が止まります。そこで、**翻訳は必ずサブエージェント（Agent ツール）に委任**するようにしました。サブエージェントが失敗してもメインプロセスは継続できます。

それでも失敗する場合のリトライ戦略:

1. 翻訳範囲を**半分に分割**してリトライ
2. さらに失敗したら、さらに半分に分割
3. 最小単位（単一のTEXTブロック）でも失敗する場合は、JA に英文をコピーし `<!-- content filter blocked translation -->` コメントを付けて次に進む

このルールを `CLAUDE.md` に記述しておくことで、Claude Code が自律的に判断してリトライします。

### 文字化け対策（U+FFFD問題）

サブエージェントでの翻訳時に、Unicode置換文字 `U+FFFD`（�）が混入することがありました。LLMのストリーミング出力で、マルチバイト文字（UTF-8で3バイト）の境界でチャンクが分割され、不正なバイト列が `U+FFFD` に置換されたものと考えられます。

対策として、翻訳後に毎回 `yarn validate-bilingual` を実行しています。バリデーションスクリプトのルール0で U+FFFD を自動検出し、文字化けが本番に紛れ込むことを防いでいます。

## コンプライアンス対応

OSSをforkして翻訳する際、ライセンスへの対応は避けて通れません。SICP JS Editionのテキストは CC BY-SA 4.0、プログラムコードは GPLv3 でライセンスされています。

### CC BY-SA 4.0 Adapted Material としての要件

CC BY-SA 4.0 では、翻訳は「Adapted Material（翻案物）」に該当します。以下の要件を満たす必要があります。

| 要件 | 対応 |
|------|------|
| 原作者のクレジット表示 | Abelson, Sussman, Henz, Wrigstad をライセンスページに記載 |
| ライセンスの表示 | CC BY-SA 4.0 バッジ + リンクを掲載 |
| 変更内容の明示 | 「Japanese translation (adapted work)」と明記 |
| 同じライセンスでの公開 | 翻訳版も CC BY-SA 4.0 で公開 |

### AI翻訳の開示

AI（Claude）を使って翻訳したことを、以下の3箇所で開示しています。

1. **README.md**（GitHubプロジェクトページ）
2. **サイトトップページ**（Attribution 直下にイタリックで表示）
3. **ライセンスページ**（`Licences.tsx`）

```html
<!-- ライセンスページの日本語翻訳セクション -->
This is a Japanese translation (adapted work) of SICP JavaScript Edition,
based on the original source. The Japanese translation was produced with
the assistance of AI (Claude by Anthropic) and is licensed under CC BY-SA 4.0.
```

### GPLv3 対応

プログラムコード部分は GPLv3 で別途ライセンスされているため、`LICENSE-GPLv3` ファイルをリポジトリに配置し、ライセンスページでも区別して表示しています。

## まとめ

2日間でChapter 1〜2を翻訳して感じたのは、**LLM翻訳で重要なのは「翻訳そのもの」より「翻訳を支える設計」**だということです。

- **BILINGUALタグ設計**: 段階的翻訳を可能にし、未完成でも公開できる
- **バリデーション自動化**: タグ配置・文字化けを7ルールで検証
- **CLAUDE.md**: ワークフロー・用語集・リトライ戦略をコードとして管理
- **コンテンツフィルター対策**: サブエージェント委任で障害を局所化

コスト面では、Claude Code の Max プラン（$200/月）で Chapter 1〜2 の翻訳に週の約20%を消費しました。トークン消費が大きいため、以降の翻訳は週の使用量が切り替わる直前にまとめて行う運用にしています。

Chapter 3〜5 の翻訳を引き続き進めていきます。Issue / PR も歓迎です。

- 公開サイト: https://www.jumboly.jp/sicp/
- GitHub: https://github.com/jumboly/sicp
