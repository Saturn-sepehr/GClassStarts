// Hotwire is two libraries, and this page uses both the way a Rails app does:
//
//   Turbo     — Drive-style page visits. The navigation links below carry
//               data-turbo-permanent on the header so a visit does not replace
//               it, and the page's own turbo:load handler is the one place the
//               animation engine is started.
//   Stimulus  — the row list and the counter, as ordinary controllers.
//
// The ordering is the whole integration. Turbo's first visit fires
// turbo:load, but this module also handles the case where Turbo is not driving
// a navigation at all (a hard load, a link with data-turbo="false"). Whichever
// runs first wins, and the other is a no-op because the engine only needs to be
// started once.
import "@hotwired/turbo";
import { Application } from "@hotwired/stimulus";
import { initAnimations } from "gclass-anims";
import RowListController from "./controllers/row_list_controller.js";
import CounterController from "./controllers/counter_controller.js";
import "./styles.css";

const application = Application.start();

application.register("row-list", RowListController);
application.register("counter", CounterController);

// `turbo:load` fires on the first visit and again after every Drive
// navigation. Calling initAnimations() once per page visit is Turbo's own
// documented lifecycle — the engine needs a fresh walk after a page swap, the
// same way Stimulus controllers reconnect.
document.addEventListener("turbo:load", start);

// …and this covers a hard load where Turbo never took over, so the engine is
// not silently absent on a page that skipped Drive.
let started = false;

function start() {
  if (started) return;
  started = true;

  initAnimations();

  initCopyButtons();

  console.log("gclass-anims 1.0.0-beta.24 initialised (hotwire)");
}

// One delegated handler on document covers every [data-copy] button, including
// any a Turbo swap or a Stimulus controller adds later.
function initCopyButtons() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-copy]");
    if (!btn) return;

    const code = btn.parentElement.querySelector("code");
    if (!code) return;

    const done = (label) => {
      btn.textContent = label;
      btn.classList.add("text-ok");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("text-ok");
      }, 1400);
    };

    navigator.clipboard
      .writeText(code.innerText)
      .then(() => done("Copied"), () => done("Failed"));
  });
}