#!/usr/bin/env node

/**
 * TRANSLATION_GUIDE.md の BILINGUAL タグ配置ルールを検証するスクリプト。
 *
 * 検証項目:
 * 0. U+FFFD（置換文字/文字化け）が含まれていないこと
 * 1. FOOTNOTE が EN/JA の中にネストされていないこと
 * 2. SNIPPET が BILINGUAL の中にネストされていないこと
 * 3. BILINGUAL が EN と JA の両方を持つこと
 * 4. EN/JA が BILINGUAL の外で使われていないこと
 * 5. BILINGUAL のネスト（BILINGUAL の中に BILINGUAL）がないこと
 *    ただし FOOTNOTE > BILINGUAL は許可（FOOTNOTE は独立スコープ）
 * 6. SOLUTION 内に SNIPPET 以外のテキストがある場合、BILINGUAL で翻訳されていること
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const xmlDir = path.join(__dirname, "..", "xml");

// 翻訳対象のディレクトリ（段階的に翻訳しているため、BILINGUAL が存在するファイルのみ対象）
const targetDirs = ["chapter1"];

let errorCount = 0;
let fileCount = 0;

/**
 * タグの位置（行番号・列番号）を返す
 */
function getPosition(content, index) {
  const lines = content.substring(0, index).split("\n");
  return { line: lines.length, col: lines[lines.length - 1].length + 1 };
}

/**
 * 開始タグと終了タグのペアを見つけて、ネスト構造を解析する。
 * 自己閉じタグ（<TAG/>）は無視する。
 */
function findTagRanges(content, tagName) {
  const ranges = [];
  // 自己閉じタグを除外するため、終了の > の前に / がないものだけマッチ
  const openRegex = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, "g");
  const closeRegex = new RegExp(`</${tagName}>`, "g");

  // すべての開始・終了タグを収集
  const events = [];
  let match;

  while ((match = openRegex.exec(content)) !== null) {
    // 自己閉じタグ（<TAG/>）を除外
    if (match[0].endsWith("/>")) continue;
    events.push({ type: "open", index: match.index, end: match.index + match[0].length });
  }
  while ((match = closeRegex.exec(content)) !== null) {
    events.push({ type: "close", index: match.index, end: match.index + match[0].length });
  }

  // 位置順にソート
  events.sort((a, b) => a.index - b.index);

  // スタックでネスト構造を追跡
  const stack = [];
  for (const event of events) {
    if (event.type === "open") {
      stack.push(event);
    } else if (event.type === "close") {
      if (stack.length > 0) {
        const open = stack.pop();
        ranges.push({
          start: open.index,
          contentStart: open.end,
          contentEnd: event.index,
          end: event.end,
        });
      }
    }
  }

  return ranges;
}

/**
 * rangeA が rangeB の中に含まれているかを判定
 */
function isInside(inner, outer) {
  return inner.start >= outer.contentStart && inner.end <= outer.contentEnd;
}

/**
 * FOOTNOTE の中かどうかを判定（FOOTNOTE 内は独立スコープ）
 */
function isInsideFootnote(range, footnoteRanges) {
  return footnoteRanges.some((fn) => isInside(range, fn));
}

function reportError(filePath, content, index, message) {
  const pos = getPosition(content, index);
  const relPath = path.relative(path.join(__dirname, ".."), filePath);
  console.error(`  ${relPath}:${pos.line}:${pos.col}: ${message}`);
  errorCount++;
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  // ルール0: U+FFFD（文字化け）がないこと — BILINGUAL の有無に関係なくチェック
  const fffdRegex = /\uFFFD/g;
  let fffdMatch;
  while ((fffdMatch = fffdRegex.exec(content)) !== null) {
    reportError(
      filePath,
      content,
      fffdMatch.index,
      "U+FFFD（置換文字）が含まれています。文字化けの可能性があります"
    );
  }

  // BILINGUAL タグが無いファイルはスキップ
  if (!content.includes("<BILINGUAL>")) return;

  fileCount++;

  const bilingualRanges = findTagRanges(content, "BILINGUAL");
  const enRanges = findTagRanges(content, "EN");
  const jaRanges = findTagRanges(content, "JA");
  const footnoteRanges = findTagRanges(content, "FOOTNOTE");
  const snippetRanges = findTagRanges(content, "SNIPPET");

  const schemeRanges = findTagRanges(content, "SCHEME");

  // ルール1: FOOTNOTE が EN/JA の中にネストされていないこと
  // ただし SCHEME タグ内の FOOTNOTE は JS 版ビルドで除外されるため無視
  for (const fn of footnoteRanges) {
    const insideScheme = schemeRanges.some((sc) => isInside(fn, sc));
    if (insideScheme) continue;

    for (const en of enRanges) {
      if (isInside(fn, en)) {
        reportError(
          filePath,
          content,
          fn.start,
          "FOOTNOTE が <EN> の中にあります。FOOTNOTE は BILINGUAL の外に置き、中身に BILINGUAL を使ってください"
        );
      }
    }
    for (const ja of jaRanges) {
      if (isInside(fn, ja)) {
        reportError(
          filePath,
          content,
          fn.start,
          "FOOTNOTE が <JA> の中にあります。FOOTNOTE は BILINGUAL の外に置き、中身に BILINGUAL を使ってください"
        );
      }
    }
  }

  // ルール2: SNIPPET が BILINGUAL の中にネストされていないこと
  for (const sn of snippetRanges) {
    for (const bi of bilingualRanges) {
      if (isInside(sn, bi) && !isInsideFootnote(sn, footnoteRanges)) {
        reportError(
          filePath,
          content,
          sn.start,
          "SNIPPET が <BILINGUAL> の中にあります。SNIPPET は BILINGUAL の外に置き、前後を別の BILINGUAL ブロックにしてください"
        );
      }
    }
  }

  // ルール3: BILINGUAL が EN と JA の両方を持つこと
  for (const bi of bilingualRanges) {
    const biContent = content.substring(bi.contentStart, bi.contentEnd);
    const hasEN = /<EN[\s>]/.test(biContent);
    const hasJA = /<JA[\s>]/.test(biContent);
    if (!hasEN && !hasJA) {
      reportError(
        filePath,
        content,
        bi.start,
        "BILINGUAL に <EN> も <JA> もありません"
      );
    } else if (!hasEN) {
      reportError(
        filePath,
        content,
        bi.start,
        "BILINGUAL に <EN> がありません"
      );
    } else if (!hasJA) {
      reportError(
        filePath,
        content,
        bi.start,
        "BILINGUAL に <JA> がありません"
      );
    }
  }

  // ルール4: EN/JA が BILINGUAL の外で使われていないこと
  for (const en of enRanges) {
    const insideBilingual = bilingualRanges.some((bi) => isInside(en, bi));
    if (!insideBilingual) {
      reportError(
        filePath,
        content,
        en.start,
        "<EN> が <BILINGUAL> の外で使われています"
      );
    }
  }
  for (const ja of jaRanges) {
    const insideBilingual = bilingualRanges.some((bi) => isInside(ja, bi));
    if (!insideBilingual) {
      reportError(
        filePath,
        content,
        ja.start,
        "<JA> が <BILINGUAL> の外で使われています"
      );
    }
  }

  // ルール6: SOLUTION 内に SNIPPET 以外のテキストがある場合、BILINGUAL で翻訳されていること
  const solutionRanges = findTagRanges(content, "SOLUTION");
  for (const sol of solutionRanges) {
    const solContent = content.substring(sol.contentStart, sol.contentEnd);
    // SOLUTION 内に BILINGUAL があればOK
    if (/<BILINGUAL[\s>]/.test(solContent)) continue;
    // SNIPPET とタグを除去して、残りのテキストを確認
    let textOnly = solContent;
    // SNIPPET ブロックを除去
    const solSnippets = findTagRanges(solContent, "SNIPPET");
    // 後ろから除去してインデックスがずれないようにする
    for (const sn of [...solSnippets].reverse()) {
      textOnly = textOnly.substring(0, sn.start) + textOnly.substring(sn.end);
    }
    // すべてのタグを除去
    textOnly = textOnly.replace(/<[^>]+>/g, "");
    // 空白を除去して、意味のあるテキストが残るか確認
    textOnly = textOnly.replace(/\s+/g, "").trim();
    if (textOnly.length > 0) {
      reportError(
        filePath,
        content,
        sol.start,
        "SOLUTION 内に未翻訳のテキストがあります。解説テキストは BILINGUAL で囲んでください"
      );
    }
  }

  // ルール5: BILINGUAL のネストがないこと（FOOTNOTE 内は独立スコープなので除外）
  for (const inner of bilingualRanges) {
    for (const outer of bilingualRanges) {
      if (inner === outer) continue;
      if (isInside(inner, outer) && !isInsideFootnote(inner, footnoteRanges)) {
        reportError(
          filePath,
          content,
          inner.start,
          "BILINGUAL が別の BILINGUAL の中にネストされています"
        );
      }
    }
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith(".xml")) {
      validateFile(fullPath);
    }
  }
}

// メイン
console.log("BILINGUAL タグ配置ルールを検証中...\n");

for (const targetDir of targetDirs) {
  walkDir(path.join(xmlDir, targetDir));
}

console.log(`\n検証完了: ${fileCount} ファイル, ${errorCount} エラー`);

if (errorCount > 0) {
  process.exit(1);
}
