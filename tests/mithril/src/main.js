// Mithril mounts a component tree into a DOM node and re-renders by diffing its
// virtual DOM. m.render() is synchronous, so the whole page is in the document by
// the time it returns and initAnimations() sees all of it on the first pass.
//
// The redraw below is the important part for a page like this: it returns the
// same data every time, so Mithril's redraw ends up doing nothing to the
// existing nodes. That is fine — re-rendering is not re-mounting, and
// gclass-anims has no reason to re-initialise.
import m from "mithril";
import { initAnimations } from "gclass-anims";
import Page from "./Page.js";
import "./styles.css";

m.mount(document.getElementById("app"), Page);

initAnimations();

initCopyButtons();

console.log(`gclass-anims 1.0.0-beta.24 initialised (mithril ${m.version})`);

// One delegated handler on document covers every [data-copy] button, including
// any Mithril renders later. The text is the sibling <code> block's content.
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