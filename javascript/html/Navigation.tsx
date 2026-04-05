import { html, raw } from "hono/html";
import type { FC } from "hono/jsx";

const NavigationElements: FC = () => {
  return html`<div class="title-text-ALSO">
      <span class="title-text-ALSO">Color highlighting:</span><br />
    </div>
    <div class="title-text-OTHEREDITIONS">
      <span class="title-text-OTHEREDITIONS">
        <span style="color:black">Unchanged █</span>
      </span>
    </div>
    <div class="title-text-OTHEREDITIONS">
      <span class="title-text-OTHEREDITIONS">
        <span style="color:green">Scheme █</span>
      </span>
    </div>
    <div class="title-text-OTHEREDITIONS">
      <span class="title-text-OTHEREDITIONS">
        <span style="color:blue">Javascript █</span>
      </span>
    </div>
    <div class="title-text-OTHEREDITIONS">
      <span class="title-text-OTHEREDITIONS">
        <span style="color:grey">Explanation █</span>
      </span>
    </div>
    <div class="title-text-OTHEREDITIONS">
      <span class="title-text-OTHEREDITIONS">
        <span style="color:red">Web-only █</span>
      </span>
    </div>`;
};

const Navigation: FC<{
  toIndexFolder: string;
  shortTitle: string;
  longTitle: string;
}> = ({ toIndexFolder, shortTitle, longTitle }) => {
  return html`<!-- support for progressive web app, see README, DISABLED -->
    <!-- <script>
      if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) {
        navigator.serviceWorker.register("../sw.js").then(function (reg) {
          console.log(
            "Service worker has been registered for scope: " + reg.scope
          );
        });
      }
    </script> -->
    <nav
      class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top justify-content-between"
    >
      <button
        id="btn"
        class="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#nav-sidebar"
        aria-controls="nav-sidebar"
        aria-expanded="false"
        aria-label="Toggle navigation"
        title="navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <span class="navbar-brand-short"
        ><a
          title="Go back to front page"
          href="${toIndexFolder}index.html"
          class="gray"
          >${raw(shortTitle)}</a
        ></span
      >
      <span class="navbar-brand-long"
        ><a
          title="Go back to front page"
          href="${toIndexFolder}index.html"
          class="gray"
          >${raw(longTitle)}</a
        ></span
      >
      <span class="toolt"
        >Legend<span class="toolttext">
          ${raw(<NavigationElements />)}
        </span></span
      >
      <div
        class="btn-group btn-group-sm"
        role="group"
        style="margin-left: auto;"
      >
        <button
          id="lang-en"
          class="btn btn-sm btn-light"
          onclick="setLang('en')"
          style="font-size: 0.8rem; padding: 2px 8px;"
        >
          EN
        </button>
        <button
          id="lang-ja"
          class="btn btn-sm btn-outline-light"
          onclick="setLang('ja')"
          style="font-size: 0.8rem; padding: 2px 8px;"
        >
          JA
        </button>
        <button
          id="lang-both"
          class="btn btn-sm btn-outline-light"
          onclick="setLang('both')"
          style="font-size: 0.8rem; padding: 2px 8px;"
        >
          EN/JA
        </button>
      </div>
    </nav>`;
};

export default Navigation;
