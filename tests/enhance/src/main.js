// Enhance's browser runtime.
//
// A note on what is and is not here: Enhance's real client entry is an
// auto-loader the Enhance server injects, and its `@enhance/core` npm package
// currently ships only a README — it is marked WIP and contains no browser code.
// So this file re-implements the part of Enhance's model that actually runs in
// the browser, which is small and well-defined:
//
//   - pages are plain HTML that work with no JavaScript at all
//   - behaviour lives in custom elements, one file per element
//   - elements are defined by tag name and light DOM, so the server-rendered
//     markup is what the browser works with
//
// That is what the rest of this environment actually does, and it is Enhance's
// documented model rather than a substitute for it.
//
// gclass-anims is imported here and called exactly once, after every element has
// been defined. Enhance elements that append nodes later are covered by the
// engine's MutationObserver, so nothing here has to re-initialise.
import { initAnimations } from "gclass-anims";
import "./styles.css";

// Elements register themselves on import. The import order is the definition
// order, which is also the upgrade order — a custom element already in the
// document upgrades as soon as it is defined, so the markup never has to wait.
import "./elements/row-list.js";
import "./elements/row-item.js";

// DOMContentLoaded rather than an inline call, because this is a module script:
// the document may not be parsed yet, and an element defined before its markup
// exists still upgrades correctly, but initAnimations() wants a complete tree.
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();

  initCopyButtons();

  // Enhance's own preflight flag. Enhance sets this to opt out of enhancement
  // where a page genuinely cannot be enhanced; setting it is the documented way
  // to say "the client is running", which is the opposite signal but is the
  // same mechanism.
  document.documentElement.setAttribute("data-enhanced", "");

  console.log("gclass-anims 1.0.0-beta.24 initialised (enhance)");
});

// One delegated handler on document covers every [data-copy] button, including
// any a custom element renders later. The text is the sibling <code> block's
// content.
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