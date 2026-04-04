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

### データ抽象・ペア

| 英語 | 日本語 | 備考 |
|------|--------|------|
| data abstraction | データ抽象 | |
| abstract data | 抽象データ | |
| concrete data representation | 具体的なデータ表現 | |
| compound data | 複合データ | |
| compound data object | 複合データオブジェクト | |
| selector | セレクタ | |
| constructor | コンストラクタ | |
| pair | ペア | |
| list-structured data | リスト構造データ | |
| abstraction barriers | 抽象バリア | |
| wishful thinking | 希望的思考（wishful thinking） | |
| message passing | メッセージパッシング | |
| functional representation of data | データの関数的表現 | |
| closure (data combining) | 閉包性 | 関数クロージャとは異なる。データを組み合わせた結果を同じ操作で再び組み合わせられる性質 |
| conventional interface | 規約インターフェース | |
| symbolic expression | シンボリック式 | |
| generic operation | ジェネリック演算 | |
| generic selector | ジェネリックセレクタ | |
| data-directed programming | データ指向プログラミング | |
| dispatching on type | 型によるディスパッチ | |
| type tag | 型タグ | |
| tagged data | タグ付きデータ | |
| package | パッケージ | 表現パッケージ |
| additivity / additive | 加法性 / 加法的 | |
| principle of least commitment | 最小コミットメントの原則 | |
| operation-and-type table | 演算と型のテーブル | |
| coercion | 型変換 | |
| coercion table | 型変換テーブル | |
| cross-type operations | 型をまたぐ演算 | |
| hierarchy of types | 型の階層 | |
| tower (of types) | タワー | 型の階層が線形の場合 |
| subtype | サブタイプ | |
| supertype | スーパータイプ | |
| raise | raise / 引き上げ | 型のタワーで上位に変換 |
| lower / drop | 引き下げ / drop | 型のタワーで下位に変換 |
| project | project | 型を下位に射影 |
| polynomial | 多項式 | |
| polynomial arithmetic | 多項式算術 | |
| univariate polynomial | 一変数多項式 | |
| indeterminate | 不定元 | 多項式の変数 |
| coefficient | 係数 | |
| term | 項 | 多項式の |
| term list | 項リスト | |
| order (of term) | 次数 | |
| dense polynomial | 密な多項式 | |
| sparse polynomial | 疎な多項式 | |
| symbolic algebra | シンボリック代数 | |
| rational function | 有理関数 | |
| pseudoremainder | 擬剰余 | |
| integerizing factor | 整数化因子 | |

### 数値データ型

| 英語 | 日本語 | 備考 |
|------|--------|------|
| rational number | 有理数 | |
| numerator | 分子 | |
| denominator | 分母 | |
| reducing to lowest terms | 既約分数に約分 | |
| interval arithmetic | 区間算術 | |
| interval | 区間 | |
| tolerance | 公差 | |
| Church numerals | チャーチ数 | |
| complex number | 複素数 | |
| rectangular form | 直交形式 | 実部と虚部 |
| polar form | 極形式 | 絶対値と偏角 |
| real part | 実部 | |
| imaginary part | 虚部 | |
| magnitude | 絶対値 | 複素数の |
| angle | 偏角 | 複素数の |

### 再帰・反復・増加のオーダー

| 英語 | 日本語 | 備考 |
|------|--------|------|
| recursion / recursive | 再帰 / 再帰的 | |
| recursive process | 再帰的プロセス | |
| iterative process | 反復的プロセス | |
| linear recursive process | 線形再帰的プロセス | |
| linear iterative process | 線形反復的プロセス | |
| tree recursion | ツリー再帰 | |
| tree-recursive process | ツリー再帰的プロセス | |
| deferred operations | 遅延された演算 | |
| state variable | 状態変数 | |
| tail-recursive | 末尾再帰的 | |
| order of growth | 増加のオーダー | |
| successive squaring | 逐次二乗法 | |
| greatest common divisor (GCD) | 最大公約数（GCD） | |
| Euclid's Algorithm | ユークリッドの互除法 | |
| Fermat's Little Theorem | フェルマーの小定理 | |
| Fermat test | フェルマーテスト | |
| probabilistic algorithm | 確率的アルゴリズム | |
| Carmichael numbers | カーマイケル数 | |
| golden ratio | 黄金比 | |

### シーケンス・リスト操作

| 英語 | 日本語 | 備考 |
|------|--------|------|
| sequence | シーケンス | |
| list | リスト | |
| list structure | リスト構造 | |
| empty list | 空リスト | |
| nested | 入れ子 | |
| box-and-pointer notation | ボックスとポインタの記法 | |
| box notation | ボックス記法 | |
| list notation | リスト記法 | |
| filter | フィルタ | |
| accumulate / accumulation | 累積 | |
| enumerate / enumerator | 列挙 / 列挙子 | |
| signal-flow diagram | 信号フロー図 | |
| flatmap | flatmap | そのまま |
| fold-right / fold-left | fold_right / fold_left | そのまま |
| nested mapping | 入れ子のマッピング | |
| permutation | 順列 | |

### ツリー構造

| 英語 | 日本語 | 備考 |
|------|--------|------|
| tree | ツリー | |
| tree accumulation | ツリーの累積 | |
| binary tree | 二分木 | |
| balanced tree | 平衡木 | |
| unbalanced tree | 不均衡なツリー | |
| B-tree | B木 | |
| red-black tree | 赤黒木 | |
| node | ノード | |
| terminal node | 末端ノード | |
| leaf node | 葉ノード | |
| root | 根 | |
| branch | 枝 | |
| left branch / right branch | 左の枝 / 右の枝 | |
| subtree | 部分木 | |

### 画像言語

| 英語 | 日本語 | 備考 |
|------|--------|------|
| painter | ペインタ | |
| frame (picture language) | フレーム | |
| stratified design | 階層的設計 | |
| robust | 堅牢 | |

### シンボリック微分

| 英語 | 日本語 | 備考 |
|------|--------|------|
| symbolic data | シンボリックデータ | |
| symbolic differentiation | シンボリック微分 | |
| algebraic expression | 代数式 | |
| deriv | deriv | 関数名そのまま |
| addend | 加数 | 和の第1項 |
| augend | 被加数 | 和の第2項 |
| multiplier | 乗数 | 積の第1項 |
| multiplicand | 被乗数 | 積の第2項 |
| reduction rules | 簡約規則 | |
| simplification | 簡約化 | 代数的簡約化 |

### 集合・情報検索

| 英語 | 日本語 | 備考 |
|------|--------|------|
| set | 集合 | |
| union set | 和集合 | |
| intersection set | 共通集合 | |
| ordered list | 順序付きリスト | |
| unordered list | 順序なしリスト | |
| database | データベース | |
| key | キー | レコードの識別用 |
| record | レコード | |

### ハフマン符号化

| 英語 | 日本語 | 備考 |
|------|--------|------|
| Huffman code | ハフマンコード | |
| Huffman encoding tree | ハフマン符号化木 | |
| fixed-length code | 固定長コード | |
| variable-length code | 可変長コード | |
| prefix code | プレフィックスコード | |
| encoding / encode | 符号化 | |
| decoding / decode | 復号化 | |
| weight | 重み | ノードの |
| leaf (Huffman tree) | 葉 | |
| relative frequency | 相対頻度 | |
| optimal code | 最適なコード | |
| merge | マージ | 木構築の |
| alphabet | アルファベット | 符号化対象のシンボル集合 |
| weighted elements | 重み付き要素 | |
| generic function | ジェネリック関数 | |

### 高階関数・抽象

| 英語 | 日本語 | 備考 |
|------|--------|------|
| higher-order function | 高階関数 | |
| higher-order procedure | 高階手続き | Scheme 版 |
| lambda expression | ラムダ式 | |
| first-class | 第一級 | |
| fixed point | 不動点 | |
| half-interval method | 二分法 | |
| average damping | 平均減衰 | |
| Newton's method | ニュートン法 | |
| derivative | 導関数 | |
| continued fraction | 連分数 | |
| composition | 合成 | 関数の合成 |
| smoothing | 平滑化 | |
| iterative improvement | 反復的改善 | |
| summation | 総和 | |
| sigma notation | シグマ記法 | |
| conditional statement | 条件文 | |
| hoisting | ホイスティング / 巻き上げ | 関数宣言の |

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
