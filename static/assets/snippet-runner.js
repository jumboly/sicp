(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var snippets = document.querySelectorAll(
      "pre.prettyprint.eval[data-preamble]"
    );

    snippets.forEach(function (pre) {
      var wrapper = pre.closest(".pre-prettyprint");
      if (!wrapper) return;

      // 元のコードを保存（Reset用）
      var originalHTML = pre.innerHTML;

      // 編集可能にする
      pre.setAttribute("contenteditable", "true");
      pre.setAttribute("spellcheck", "false");

      var btnGroup = document.createElement("div");
      btnGroup.className = "snippet-buttons";

      // Run button
      var runBtn = document.createElement("button");
      runBtn.className = "snippet-btn snippet-btn-run";
      runBtn.textContent = "\u25b6 Run";
      runBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        runSnippet(pre, wrapper);
      });

      // Open in Source Academy button
      var openBtn = document.createElement("button");
      openBtn.className = "snippet-btn snippet-btn-open";
      openBtn.textContent = "\u2197 Open";
      openBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var url = pre.getAttribute("data-url");
        if (url) window.open(url);
      });

      // Copy button
      var copyBtn = document.createElement("button");
      copyBtn.className = "snippet-btn snippet-btn-copy";
      copyBtn.textContent = "\u29c9 Copy";
      copyBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var code = pre.textContent || "";
        navigator.clipboard.writeText(code).then(function () {
          var orig = copyBtn.textContent;
          copyBtn.textContent = "\u2713 Copied!";
          setTimeout(function () {
            copyBtn.textContent = orig;
          }, 1500);
        });
      });

      // Reset button
      var resetBtn = document.createElement("button");
      resetBtn.className = "snippet-btn snippet-btn-reset";
      resetBtn.textContent = "\u21ba Reset";
      resetBtn.style.display = "none";
      resetBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();
        pre.innerHTML = originalHTML;
        resetBtn.style.display = "none";
        var existing = wrapper.querySelector(".snippet-run-output");
        if (existing) existing.remove();
      });

      // 編集されたら Reset ボタンを表示
      pre.addEventListener("input", function () {
        resetBtn.style.display = "";
      });

      btnGroup.appendChild(runBtn);
      btnGroup.appendChild(openBtn);
      btnGroup.appendChild(copyBtn);
      btnGroup.appendChild(resetBtn);
      wrapper.insertBefore(btnGroup, wrapper.firstChild);
    });
  });

  function runSnippet(pre, wrapper) {
    // 既存の実行結果を削除
    var existing = wrapper.querySelector(".snippet-run-output");
    if (existing) existing.remove();

    // preamble（依存コード）+ 編集中のコード
    var preamble = pre.getAttribute("data-preamble") || "";
    var editedCode = pre.textContent || "";
    var code = preamble + "\n\n" + editedCode;

    var outputDiv = document.createElement("pre");
    outputDiv.className = "snippet-run-output";

    // console.log をキャプチャ
    var logs = [];
    var origLog = console.log;
    var origWarn = console.warn;
    var origError = console.error;
    console.log = function () {
      var args = Array.prototype.slice.call(arguments);
      logs.push(
        args
          .map(function (a) {
            return typeof a === "object" ? JSON.stringify(a) : String(a);
          })
          .join(" ")
      );
      origLog.apply(console, arguments);
    };
    console.warn = console.log;
    console.error = console.log;

    try {
      // eval はコード末尾の式の値を返す
      var result = eval(code);
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;

      var output = logs.join("\n");
      if (result !== undefined) {
        if (output) output += "\n";
        output += String(result);
      }

      outputDiv.textContent = output || "(no output)";
      outputDiv.classList.add("snippet-run-success");
    } catch (err) {
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;
      outputDiv.textContent = "Error: " + err.message;
      outputDiv.classList.add("snippet-run-error");
    }

    // pre の直後に挿入
    pre.parentNode.insertBefore(outputDiv, pre.nextSibling);
  }
})();
