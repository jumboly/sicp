(function () {
  var STORAGE_KEY = "sicp-lang";
  var MODES = ["en", "ja", "both"];
  var LABELS = { en: "EN", ja: "JA", both: "EN/JA" };

  function setLanguage(mode) {
    var enElements = document.querySelectorAll(".lang-en");
    var jaElements = document.querySelectorAll(".lang-ja");

    var showEn = mode === "en" || mode === "both";
    var showJa = mode === "ja" || mode === "both";

    for (var i = 0; i < enElements.length; i++) {
      enElements[i].style.display = showEn ? "" : "none";
    }
    for (var i = 0; i < jaElements.length; i++) {
      jaElements[i].style.display = showJa ? "" : "none";
    }

    // Update button states
    for (var j = 0; j < MODES.length; j++) {
      var btn = document.getElementById("lang-" + MODES[j]);
      if (btn) {
        if (MODES[j] === mode) {
          btn.classList.remove("btn-outline-light");
          btn.classList.add("btn-light");
        } else {
          btn.classList.remove("btn-light");
          btn.classList.add("btn-outline-light");
        }
      }
    }

    // Set body class for CSS styling in both mode
    document.body.classList.remove("lang-mode-en", "lang-mode-ja", "lang-mode-both");
    document.body.classList.add("lang-mode-" + mode);

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {}
  }

  window.setLang = function (mode) {
    setLanguage(mode);
  };

  document.addEventListener("DOMContentLoaded", function () {
    var saved = "ja";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "ja";
    } catch (e) {}
    setLanguage(saved);
  });
})();
