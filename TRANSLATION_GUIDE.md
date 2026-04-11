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

判断が必要な用語のみを掲載する。英和辞書で一意に決まる訳（「式 / expression」「ノード / node」「キュー / queue」など）は省略している。同じ英単語が複数訳になり得るもの、Scheme 版と JS 版で訳が分かれるもの、SICP 特有の概念、専門用語、漢語/カタカナの選択を伴うものを優先して残している。

### 言語の基本要素

| 英語 | 日本語 | 備考 |
|------|--------|------|
| primitive expression / function / data | プリミティブな式 / プリミティブ関数 / プリミティブなデータ | 「原始式」より馴染みのカタカナを採用 |
| compound function | 複合関数 | JS 版 |
| compound procedure | 複合手続き | Scheme 版 |
| function declaration | 関数宣言 | const とともに JS 版固有の宣言形 |
| function application | 関数適用 | SICP 用語。「関数呼び出し」とは区別する |
| return statement | return 文 | キーワードはそのまま英語表記 |
| return expression | return 式 | return 文の中の式 |
| body | 本体 | 関数の本体 |
| operand | オペランド | 「被演算子」より馴染みのカタカナを採用 |

### 環境・名前

| 英語 | 日本語 | 備考 |
|------|--------|------|
| variable | 変数 | Chapter 3 で導入。Chapter 1〜2 の名前束縛は constant（定数） |
| naming | 名前付け | 「命名」「名付け」より平易 |
| means of abstraction | 抽象化の手段 | 章のキー概念 |

### データ抽象・ペア

| 英語 | 日本語 | 備考 |
|------|--------|------|
| data abstraction | データ抽象 | 「データ抽象化」ではない |
| abstract data | 抽象データ | |
| concrete data representation | 具体的なデータ表現 | |
| abstraction barriers | 抽象バリア | 「抽象化境界」より簡潔 |
| wishful thinking | 希望的思考（wishful thinking） | SICP の方法論。原語を併記 |
| message passing | メッセージパッシング | |
| functional representation of data | データの関数的表現 | |
| closure (data combining) | 閉包性 | 関数クロージャとは別概念。データを組み合わせた結果を同じ操作で再び組み合わせられる性質 |
| conventional interface | 規約インターフェース | SICP 特有の用語 |
| symbolic expression | シンボリック式 | |
| generic operation / generic selector | ジェネリック演算 / ジェネリックセレクタ | |
| data-directed programming | データ指向プログラミング | 「データ駆動」より採用 |
| dispatching on type | 型によるディスパッチ | |
| package | パッケージ | 表現パッケージ |
| additivity / additive | 加法性 / 加法的 | システムの拡張性に関する SICP 用語 |
| principle of least commitment | 最小コミットメントの原則 | |
| operation-and-type table | 演算と型のテーブル | |
| coercion | 型変換 | 「強制変換」とも訳されるが本書では「型変換」 |
| coercion table | 型変換テーブル | |
| cross-type operations | 型をまたぐ演算 | |
| hierarchy of types | 型の階層 | |
| tower (of types) | タワー | 型の階層が線形の場合 |
| raise | raise / 引き上げ | 型のタワーで上位に変換 |
| lower / drop | 引き下げ / drop | 型のタワーで下位に変換 |
| project | project | 型を下位に射影 |
| indeterminate | 不定元 | 多項式の変数。専門用語 |
| term | 項 | 多項式の |
| term list | 項リスト | |
| order (of term) | 次数 | |
| pseudoremainder | 擬剰余 | 多項式の専門用語 |
| integerizing factor | 整数化因子 | 多項式の専門用語 |

### 数値データ型

| 英語 | 日本語 | 備考 |
|------|--------|------|
| reducing to lowest terms | 既約分数に約分 | |
| interval arithmetic | 区間算術 | |
| tolerance | 公差 | 区間の |
| Church numerals | チャーチ数 | 固有名 |
| rectangular form | 直交形式 | 実部と虚部による複素数表現 |
| polar form | 極形式 | 絶対値と偏角による複素数表現 |
| magnitude | 絶対値 | 複素数の。「大きさ」「ノルム」ではなく |
| angle | 偏角 | 複素数の。「角度」ではなく |

### 再帰・反復・増加のオーダー

| 英語 | 日本語 | 備考 |
|------|--------|------|
| iterative process | 反復的プロセス | process は「過程」ではなく「プロセス」で統一 |
| linear recursive process / linear iterative process | 線形再帰的プロセス / 線形反復的プロセス | |
| tree-recursive process | ツリー再帰的プロセス | |
| deferred operations | 遅延された演算 | SICP 特有。再帰過程で積み残される演算 |
| tail-recursive | 末尾再帰的 | |
| successive squaring | 逐次二乗法 | |
| greatest common divisor (GCD) | 最大公約数（GCD） | |
| Euclid's Algorithm | ユークリッドの互除法 | |
| Fermat's Little Theorem | フェルマーの小定理 | |
| Fermat test | フェルマーテスト | |
| probabilistic algorithm | 確率的アルゴリズム | |
| Carmichael numbers | カーマイケル数 | |

### シーケンス・ツリー

| 英語 | 日本語 | 備考 |
|------|--------|------|
| box-and-pointer notation | ボックスとポインタの記法 | |
| box notation / list notation | ボックス記法 / リスト記法 | |
| accumulate / accumulation | 累積 | 「集積」ではなく「累積」で統一 |
| enumerate / enumerator | 列挙 / 列挙子 | |
| signal-flow diagram | 信号フロー図 | |
| flatmap | flatmap | カナにせず英語のまま |
| fold-right / fold-left | fold_right / fold_left | カナにせず英語のまま |
| nested mapping | 入れ子のマッピング | |
| tree accumulation | ツリーの累積 | 「木の累積」より「ツリー」を採用（カナで統一） |

### 画像言語

| 英語 | 日本語 | 備考 |
|------|--------|------|
| stratified design | 階層的設計 | 「層化設計」「成層設計」も候補だが平易な表現を採用 |

### シンボリック微分

| 英語 | 日本語 | 備考 |
|------|--------|------|
| deriv | deriv | 関数名そのまま |
| addend / augend | 加数 / 被加数 | 和の第1項 / 第2項。専門用語 |
| multiplier / multiplicand | 乗数 / 被乗数 | 積の第1項 / 第2項。専門用語 |
| reduction rules | 簡約規則 | |
| simplification | 簡約化 | 代数的簡約化。「単純化」ではなく |

### 集合・情報検索

| 英語 | 日本語 | 備考 |
|------|--------|------|
| key | キー | レコードの識別用 |

### ハフマン符号化

| 英語 | 日本語 | 備考 |
|------|--------|------|
| Huffman encoding tree | ハフマン符号化木 | 「ハフマン木」「ハフマンツリー」も候補だが原語に忠実な訳 |
| weight | 重み | ノードの |
| leaf (Huffman tree) | 葉 | ハフマン木の文脈では「葉」、一般のツリーは「リーフ」と揺れがあるので注意 |
| alphabet | アルファベット | 符号化対象のシンボル集合 |
| generic function | ジェネリック関数 | |

### 高階関数・抽象

| 英語 | 日本語 | 備考 |
|------|--------|------|
| higher-order function | 高階関数 | JS 版 |
| higher-order procedure | 高階手続き | Scheme 版 |
| lambda expression | ラムダ式 | |
| first-class | 第一級 | |
| fixed point | 不動点 | |
| half-interval method | 二分法 | 「二分法」を採用、「半区間法」「中点法」より一般的 |
| average damping | 平均減衰 | |
| Newton's method | ニュートン法 | |
| iterative improvement | 反復的改善 | |
| sigma notation | シグマ記法 | |
| hoisting | ホイスティング / 巻き上げ | 関数宣言の |

### 評価モデル

| 英語 | 日本語 | 備考 |
|------|--------|------|
| substitution model | 置換モデル | |
| substitution / substitute | 置換 / 置換する | 「代入」は assignment の訳。混同しない |
| environment model | 環境モデル | Section 3.2 で導入 |
| function object | 関数オブジェクト | コードと環境へのポインタのペア |
| binding | 束縛 | 名前と値の対応 |
| unbound | 未束縛 | |
| shadow (a binding) | シャドウする | 外側のフレームの束縛を隠す |
| immediately invoked lambda expression | 即時呼び出しラムダ式 | |
| temporal dead zone (TDZ) | テンポラルデッドゾーン（TDZ） | 名前の束縛作成から宣言評価までの期間 |
| applicative-order evaluation | 適用順序の評価 | |
| normal-order evaluation | 正規順序の評価 | |
| mutable data | ミュータブルなデータ | 「可変データ」ではなくカタカナで統一 |
| functional abstraction | 関数的抽象化 | JS 版 |
| procedural abstraction | 手続き的抽象化 | Scheme 版 |
| bound name | 束縛された名前 | JS 版。Scheme 版は束縛変数 (bound variable) |
| free name | 自由な名前 | JS 版。Scheme 版は自由変数 (free variable) |
| radicand | 被開平数 | 平方根を取られる数。専門用語 |
| successive approximation | 逐次近似 | |

### 条件式・述語

| 英語 | 日本語 | 備考 |
|------|--------|------|
| consequent expression | 帰結式 | if の真側。「結果式」も候補 |
| alternative expression | 代替式 | if の偽側 |
| clause | 節 | 場合分けの節 |
| logical conjunction | 論理積 | `&&` |
| logical disjunction | 論理和 | `\|\|` |
| logical negation | 論理否定 | `!` |
| syntactic sugar | 糖衣構文 | |
| declarative knowledge | 宣言的知識 | 章キー概念 |
| imperative knowledge | 命令的知識 | 章キー概念 |

### 代入・状態・モジュール性（Chapter 3）

| 英語 | 日本語 | 備考 |
|------|--------|------|
| assignment | 代入 | substitution（置換）と区別 |
| encapsulation / encapsulate | カプセル化 | |
| hiding principle | 隠蔽の原則 | |
| referential transparency / referentially transparent | 参照透過性 / 参照透過的 | |
| sameness / identity | 同一性 | 両者とも「同一性」と訳す。文脈で区別が必要な場合は「同一であること」などで補足 |
| aliasing | エイリアシング | |
| side effect / side-effect bug | 副作用 / 副作用バグ | |
| Monte Carlo simulation / method / integration | モンテカルロシミュレーション / モンテカルロ法 / モンテカルロ積分 | |
| pseudo-random | 擬似ランダム | |
| random-number generator | 乱数生成器 | |
| mutator / mutation | ミューテータ / ミューテーション | カタカナで統一（「変更子」「変異」ではない） |
| mutable list structure | ミュータブルなリスト構造 | |
| sharing | 共有 | mutable data の共有 |
| deque | 両端キュー | double-ended queue |
| FIFO | FIFO（先入れ先出し） | |
| memoization / memoize | メモ化 / メモ化する | |
| informant | 情報源 | 制約システムの値の出どころ |
| retract | 撤回 | 制約システム |

### 並行性（Section 3.4）

| 英語 | 日本語 | 備考 |
|------|--------|------|
| thread | スレッド | JS 版。Scheme 版は process（プロセス） |
| nondeterministic / nondeterminism | 非決定的 / 非決定性 | indeterminacy（不確定性）と区別 |
| interleave / interleaving | インターリーブする / インターリーブ | |
| serializer | シリアライザ | 「直列化器」「逐次化器」より採用 |
| serialize / serialization | シリアル化する / シリアル化 | 「直列化」「逐次化」も候補だがカナで統一 |
| serialized procedure / function | シリアル化された手続き / 関数 | |
| mutual exclusion | 相互排他 | |
| acquire / release (mutex) | 取得する / 解放する | mutex の取得と解放 |
| atomically / atomic / atomic operation | アトミックに / アトミック / アトミック操作 | |
| rest parameter | レストパラメータ | |
| spread syntax | スプレッド構文 | |
| vector (data structure) | ベクトル | rest パラメータが集める配列 |
| timing constraint | タイミング上の制約 | |
| timing diagram | タイミング図 | |

### メタ言語的抽象化・評価器（Chapter 4）

| 英語 | 日本語 | 備考 |
|------|--------|------|
| metalinguistic abstraction | メタ言語的抽象化 | Chapter 4 のキー概念 |
| metacircular evaluator | メタ循環評価器 | 同じ言語で書かれた評価器 |
| implemented language / implementation language | 実装対象の言語 / 実装言語 | 評価器で実装される言語とそれを実装する言語の区別 |
| component | コンポーネント | プログラムの文または式をまとめて指す用語。Chapter 4 で頻出 |
| syntax predicate | 構文述語 | `is_name`, `is_application` など |
| abstract syntax | 抽象構文 | 具体的表現から独立した構文 |
| literal expression | リテラル式 | 数値などそのままの値を返す式 |
| operator combination | 演算子の組み合わせ | `1 + 2` のような演算子式 |
| function expression | 関数式 | 関数適用の関数部分の式 |
| argument expression | 引数式 | 関数適用の引数部分の式 |
| syntactic form | 構文形式 | 条件式やブロックなど |
| return value | 戻り値 | 「返り値」ではない |
| return expression | return 式 | return 文の中の式 |
| scan out declarations / scanning out | スキャンアウト | ブロック内の宣言を事前に収集する処理 |
| is_truthy / truthiness | is_truthy / 真理性 | 条件式の値を真偽値化する |
| deep binding | 深い束縛（deep binding） | 環境表現の実装方式。原語を併記 |
| lexical addressing | レキシカルアドレッシング | Section 4.1.6 で詳述。変数参照の最適化手法 |
| derived component | 派生コンポーネント | 他のコンポーネントに変換して処理される構文形式 |
| driver loop | ドライバループ | |

### 遅延評価（Section 4.2）

| 英語 | 日本語 | 備考 |
|------|--------|------|
| lazy evaluation | 遅延評価 | |
| lazy evaluator | 遅延評価器 | |
| thunk | サンク | 遅延された式と環境のパッケージ |
| forcing (a thunk) | フォース（する） | サンクの値を計算すること |
| strict (function) | 正格（strict） | 引数を適用前に評価する |
| non-strict (function) | 非正格（non-strict） | 引数を適用前に評価しない |
| lazy list | 遅延リスト | |
| lazy pair | 遅延ペア | |
| call-by-need | call-by-need | メモ化付き遅延評価。英語のまま |
| call-by-name | call-by-name | メモ化なし遅延評価。英語のまま |

### 非決定的計算（Section 4.3）

| 英語 | 日本語 | 備考 |
|------|--------|------|
| nondeterministic computing | 非決定的計算 | |
| nondeterministic evaluation | 非決定的評価 | |
| nondeterministic program | 非決定的プログラム | |
| nondeterministic choice point | 非決定的選択ポイント | |
| amb evaluator | amb 評価器 | |
| backtrack / backtracking | バックトラック / バックトラッキング | |
| depth-first search | 深さ優先探索 | |
| chronological backtracking | 時系列バックトラッキング | |
| dependency-directed backtracking | 依存性指向バックトラッキング | |
| truth maintenance | 真理維持 | |
| choice point | 選択ポイント | |
| continuation | 継続 | |
| success continuation | 成功継続 | amb 評価器の実装で使用 |
| failure continuation | 失敗継続 | amb 評価器の実装で使用 |
| execution function | 実行関数 | analyze が返す関数 |
| permanent assignment | 永続代入 | バックトラック時に取り消されない代入 |
| Pythagorean triples | ピタゴラスの三つ組 | |
| automagically | 自動魔法的に（automagically） | ジャーゴン。原語を併記 |
| natural language parsing | 自然言語の構文解析 | |

### 論理プログラミング・クエリ言語（Section 4.4）

| 英語 | 日本語 | 備考 |
|------|--------|------|
| logic programming | 論理プログラミング | |
| query language | クエリ言語 | |
| query | クエリ | |
| query system | クエリシステム | |
| query interpreter | クエリインタプリタ | |
| query evaluator | クエリ評価器 | |
| simple query | 単純クエリ | |
| compound query | 複合クエリ | |
| assertion | アサーション | データベースに格納された事実 |
| pattern | パターン | |
| pattern variable | パターン変数 | |
| pattern matching | パターンマッチング | |
| pattern matcher | パターンマッチャー | 長音あり |
| unification | ユニフィケーション | |
| unify | ユニファイする | |
| unifier | ユニファイア | |
| rule (query language) | ルール | |
| conclusion (of rule) | 結論 | ルールの結論部 |
| body (of rule) | 本体 | ルールの本体部 |
| closed world assumption | 閉世界仮定 | |
| negation as failure | 失敗としての否定 | |
| Horn clause | ホーン節 | |
| resolution principle | 導出原理 | |
| deductive | 演繹的 | |
| instantiate | インスタンス化する | |
| driver loop | ドライバループ | 長音なし |
| rename | リネームする | 変数のリネーム |
| interleave | インターリーブする | |

### その他

| 英語 | 日本語 | 備考 |
|------|--------|------|
| interpreter | インタプリタ | 長音省略形を採用（「インタープリタ」ではない） |
| read-evaluate-print loop | read-evaluate-print ループ | カナにせず英語のまま |

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

### EPIGRAPH（章冒頭の引用）

- EPIGRAPH 内のテキストも BILINGUAL で翻訳する
- ATTRIBUTION（著者名・書名・日付）は翻訳しない

```xml
<EPIGRAPH>
  <BILINGUAL>
  <EN>
    English quote text.
  </EN>
  <JA>
    引用の日本語訳。
  </JA>
  </BILINGUAL>
  <ATTRIBUTION>
    <AUTHOR>Author Name</AUTHOR>
    <TITLE>Book Title</TITLE>
  </ATTRIBUTION>
</EPIGRAPH>
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
