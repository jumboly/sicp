(function () {
  var STORAGE_KEY = "sicp-lang";

  function setLanguage(lang) {
    var enElements = document.querySelectorAll(".lang-en");
    var jaElements = document.querySelectorAll(".lang-ja");

    for (var i = 0; i < enElements.length; i++) {
      enElements[i].style.display = lang === "en" ? "" : "none";
    }
    for (var i = 0; i < jaElements.length; i++) {
      jaElements[i].style.display = lang === "ja" ? "" : "none";
    }

    var btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = lang === "en" ? "JA に切替" : "Switch to EN";
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  window.toggleLanguage = function () {
    var current = localStorage.getItem(STORAGE_KEY) || "en";
    setLanguage(current === "en" ? "ja" : "en");
  };

  document.addEventListener("DOMContentLoaded", function () {
    var saved = "en";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "en";
    } catch (e) {}
    if (saved === "ja") {
      setLanguage("ja");
    }
  });
})();
