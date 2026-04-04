# 翻訳ガイド

SICP JavaScript Edition 日本語翻訳の用語集・文体・タグ配置ルール。

## 読者像

- C#, Java, JavaScript の業務開発経験がある
- Scheme / Lisp / 関数型言語は未経験
- CS の基礎概念（変数、関数、ループ等）は理解している

## 文体

- **です/ます体**で統一する
- 難解な学術用語を避け、開発者に馴染みのあるカタカナ語を優先する
- 直訳ではなく、日本語として自然に読める文にする

## 用語集

### プリミティブ・複合

| 英語 | 日本語 | 備考 |
|------|--------|------|
| primitive expression | プリミティブな式 | |
| primitive function | プリミティブ関数 | |
| primitive data | プリミティブなデータ | |
| compound expression | 複合式 | |
| compound function | 複合関数 | |
| compound procedure | 複合手続き | Scheme 版 |

### 関数・宣言

| 英語 | 日本語 | 備考 |
|------|--------|------|
| function declaration | 関数宣言 | |
| function application | 関数適用 | |
| function expression | 関数式 | |
| constant declaration | 定数宣言 | |
| return statement | return 文 | キーワードはそのまま |
| return expression | return 式 | |
| return value | 戻り値 | |
| body | 本体 | 関数の本体 |
| parameter | パラメータ | |
| argument | 引数 | |

### 式・文・評価

| 英語 | 日本語 | 備考 |
|------|--------|------|
| expression | 式 | |
| statement | 文 | |
| expression statement | 式文 | |
| evaluation | 評価 | |
| evaluate | 評価する | |

### 演算子・組み合わせ

| 英語 | 日本語 | 備考 |
|------|--------|------|
| operator | 演算子 | |
| operand | オペランド | |
| operator combination | 演算子の組み合わせ | |
| combination | 組み合わせ | |
| infix notation | 中置記法 | |
| precedence | 優先順位 | |
| associativity | 結合性 | |
| left-associative | 左結合 | |

### 環境・名前

| 英語 | 日本語 | 備考 |
|------|--------|------|
| environment | 環境 | |
| global environment | グローバル環境 | |
| program environment | プログラム環境 | |
| constant | 定数 | |
| variable | 変数 | Chapter 3 で導入 |
| naming | 名前付け | |
| means of abstraction | 抽象化の手段 | |

### データ構造・再帰

| 英語 | 日本語 | 備考 |
|------|--------|------|
| recursion / recursive | 再帰 / 再帰的 | |
| tree | ツリー | |
| tree accumulation | ツリーの累積 | |
| node | ノード | |
| terminal node | 末端ノード | |
| branch | 枝 | |
| nested | 入れ子 | |

### 評価モデル

| 英語 | 日本語 | 備考 |
|------|--------|------|
| substitution model | 置換モデル | |
| substitution / substitute | 置換 / 置換する | 「代入」は assignment の訳なので混同しない |
| applicative-order evaluation | 適用順序の評価 | |
| normal-order evaluation | 正規順序の評価 | |
| mutable data | ミュータブルなデータ | |
| stream processing | ストリーム処理 | |

### 条件式・述語

| 英語 | 日本語 | 備考 |
|------|--------|------|
| conditional expression | 条件式 | |
| predicate | 述語 | |
| consequent expression | 帰結式 | |
| alternative expression | 代替式 | |
| case analysis | 場合分け | |
| clause | 節 | 場合分けの節 |
| boolean | ブーリアン | |
| logical conjunction | 論理積 | `&&` |
| logical disjunction | 論理和 | `\|\|` |
| logical negation | 論理否定 | `!` |
| syntactic sugar | 糖衣構文 | |
| unary operator | 単項演算子 | |
| binary operator | 二項演算子 | |
| prefix operator | 前置演算子 | |
| right-associative | 右結合 | |
| declarative knowledge | 宣言的知識 | |
| imperative knowledge | 命令的知識 | |

### ブラックボックス・スコープ

| 英語 | 日本語 | 備考 |
|------|--------|------|
| black box | ブラックボックス | |
| functional abstraction | 関数的抽象化 | |
| procedural abstraction | 手続き的抽象化 | Scheme 版 |
| bound name | 束縛された名前 | JS版。Scheme版は束縛変数 (bound variable) |
| free name | 自由な名前 | JS版。Scheme版は自由変数 (free variable) |
| scope | スコープ | |
| block structure | ブロック構造 | |
| block | ブロック | |
| internal declaration | 内部宣言 | |
| lexical scoping | レキシカルスコーピング | |
| radicand | 被開平数 | |
| successive approximation | 逐次近似 | |

### その他

| 英語 | 日本語 | 備考 |
|------|--------|------|
| interpreter | インタプリタ | |
| keyword | キーワード | |
| syntactic form | 構文形式 | |
| syntax | 構文 | |
| read-evaluate-print loop | read-evaluate-print ループ | |
| camel case | キャメルケース | |
| snake case | スネークケース | |

## BILINGUAL タグ配置ルール

### 基本

```xml
<TEXT>
  <BILINGUAL>
    <EN>English text.</EN>
    <JA>日本語テキスト。</JA>
  </BILINGUAL>
</TEXT>
```

### SNIPPET の前後で分割

SNIPPET は BILINGUAL の外に置く。テキストが SNIPPET で分断される場合、前後を別の BILINGUAL ブロックにする：

```xml
<BILINGUAL>
<EN>Consider the following:</EN>
<JA>次の例を考えてみましょう：</JA>
</BILINGUAL>
<SNIPPET>...</SNIPPET>
<BILINGUAL>
<EN>This shows that...</EN>
<JA>これは...を示しています。</JA>
</BILINGUAL>
```

### SPLITINLINE は JA 内でもそのまま使う

```xml
<BILINGUAL>
<EN>
The <SPLITINLINE>
  <SCHEME>procedure</SCHEME>
  <JAVASCRIPT>function</JAVASCRIPT>
</SPLITINLINE> returns a value.
</EN>
<JA>
この<SPLITINLINE>
  <SCHEME>手続き</SCHEME>
  <JAVASCRIPT>関数</JAVASCRIPT>
</SPLITINLINE>は値を返します。
</JA>
</BILINGUAL>
```

### SPLIT 内の JAVASCRIPT テキスト

```xml
<SPLIT>
  <JAVASCRIPT>
    <BILINGUAL>
    <EN>JavaScript-specific text.</EN>
    <JA>JavaScript 固有のテキスト。</JA>
    </BILINGUAL>
  </JAVASCRIPT>
</SPLIT>
```

### INDEX タグ

- BILINGUAL 内では EN と JA の両方に複製する
- BILINGUAL の外にある INDEX は複製不要

### UL / OL（リスト）

UL・OL は BILINGUAL の中にそのまま入れてよい。パーサーが `<div>` を生成するため、ブロック要素も正しく表示される：

```xml
<BILINGUAL>
<EN>
<UL>
  <LI>First item.</LI>
  <LI>Second item.</LI>
</UL>
</EN>
<JA>
<UL>
  <LI>最初の項目。</LI>
  <LI>2番目の項目。</LI>
</UL>
</JA>
</BILINGUAL>
```

### FOOTNOTE

- FOOTNOTE は BILINGUAL の**外**に置く。BILINGUAL の EN/JA 両方に FOOTNOTE を入れると注釈が重複する
- FOOTNOTE の中身に BILINGUAL を使って EN/JA を切り替える
- Scheme テキストは英語のまま残す

```xml
<BILINGUAL>
<EN>Some text.</EN>
<JA>テキスト。</JA>
</BILINGUAL><FOOTNOTE>
<BILINGUAL>
<EN>Footnote in English.</EN>
<JA>脚注の日本語。</JA>
</BILINGUAL>
</FOOTNOTE>
```

### SOLUTION（演習問題の解答）

- SOLUTION 内の解説テキストも BILINGUAL で翻訳する。SNIPPET のみの解答は翻訳不要
- SNIPPET の前後で分割するルールは SOLUTION 内でも同様に適用する
- SOLUTION が `<SPLIT><JAVASCRIPT>` の中にある場合は、その内側に BILINGUAL を置く

```xml
<SOLUTION>
  <BILINGUAL>
  <EN>The answer is ... because ...</EN>
  <JA>答えは...です。なぜなら...</JA>
  </BILINGUAL>
  <SNIPPET>...</SNIPPET>
</SOLUTION>
```

SPLIT 内の場合：

```xml
<SPLIT>
  <JAVASCRIPT>
    <SOLUTION>
      <BILINGUAL>
      <EN>Explanation text.</EN>
      <JA>解説テキスト。</JA>
      </BILINGUAL>
    </SOLUTION>
  </JAVASCRIPT>
</SPLIT>
```
