// Knockout owns the page's state and its DOM bindings; gclass-anims owns the
// motion. Knockout updates bindings in place and inserts/removes real nodes for
// its control-flow bindings, which is exactly what the engine's MutationObserver
// reacts to.
//
// One initAnimations() call, after applyBindings(). Everything Knockout renders
// afterwards — the rows below, the foreach items — is picked up automatically.
import ko from "knockout";
import { initAnimations } from "gclass-anims";
import "./styles.css";

const viewModel = {
  // Exposed so the footer can bind the running version with data-bind, the way
  // every other page in this repo prints its framework version.
  version: ko.version,

  rows: ko.observableArray([]),
  nextId: 1,

  addRow() {
    this.rows.push({ id: this.nextId++ });
  },

  resetRows() {
    this.rows.splice(0);
    this.nextId = 1;
  },
};

ko.applyBindings(viewModel, document.getElementById("wrapper"));

initAnimations();

initCopyButtons();

console.log(`gclass-anims 1.0.0-beta.24 initialised (knockout ${ko.version})`);

// One delegated handler on document covers every [data-copy] button, including
// any Knockout inserts later. The text is the sibling <code> block's content.
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