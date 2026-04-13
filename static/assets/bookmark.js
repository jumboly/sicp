(function () {
  var STORAGE_KEY = "sicp-bookmark";
  var SAVE_BUTTON_ID = "bookmark-save";
  var JUMP_BUTTON_ID = "bookmark-jump";
  var THRESHOLD = 120;

  function loadBookmark() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveBookmark(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function getPageTitle() {
    var t = document.querySelector("title");
    return t ? t.textContent.trim() : location.pathname;
  }

  function findTopAnchor() {
    var anchors = document.querySelectorAll("a[name]");
    var best = null;
    for (var i = 0; i < anchors.length; i++) {
      var rect = anchors[i].getBoundingClientRect();
      if (rect.top <= THRESHOLD) {
        best = anchors[i];
      } else {
        break;
      }
    }
    return best;
  }

  function showToast(msg) {
    var el = document.createElement("div");
    el.textContent = msg;
    el.style.cssText =
      "position:fixed;top:60px;left:50%;transform:translateX(-50%);" +
      "background:#323232;color:#fff;padding:8px 16px;border-radius:4px;" +
      "z-index:10000;font-size:0.9rem;opacity:0;transition:opacity 0.2s;";
    document.body.appendChild(el);
    setTimeout(function () {
      el.style.opacity = "1";
    }, 10);
    setTimeout(function () {
      el.style.opacity = "0";
      setTimeout(function () {
        el.remove();
      }, 300);
    }, 1500);
  }

  function updateJumpButton() {
    var btn = document.getElementById(JUMP_BUTTON_ID);
    if (!btn) return;
    var bm = loadBookmark();
    if (!bm) {
      btn.setAttribute("disabled", "disabled");
      btn.setAttribute("title", "しおり未保存");
      btn.classList.add("bookmark-empty");
    } else {
      btn.removeAttribute("disabled");
      btn.setAttribute("title", "しおりへジャンプ: " + (bm.title || bm.path));
      btn.classList.remove("bookmark-empty");
    }
  }

  window.saveBookmarkHere = function () {
    var anchor = findTopAnchor();
    var name = anchor ? anchor.getAttribute("name") : "top";
    saveBookmark({
      path: location.pathname,
      anchor: name,
      title: getPageTitle(),
      ts: Date.now()
    });
    updateJumpButton();
    showToast("しおりを保存しました");
  };

  window.jumpToBookmark = function () {
    var bm = loadBookmark();
    if (!bm) return;
    if (location.pathname === bm.path) {
      location.hash = "#" + bm.anchor;
    } else {
      location.href = bm.path + "#" + bm.anchor;
    }
  };

  document.addEventListener("DOMContentLoaded", updateJumpButton);
})();
