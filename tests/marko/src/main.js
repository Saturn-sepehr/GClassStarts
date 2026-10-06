import { initAnimations } from "gclass-anims";
import Page from "./page.marko";
import "./styles.css";

// Marko 6 mounts a template into a DOM node rather than streaming one from a
// server, so there is no SSR boundary here and no hydration flag to wait on.
//
// The ordering matters: mount() runs the component and connects its
// interactivity, and only then does initAnimations() walk the tree. Anything
// Marko renders later — the <for> rows below, driven by a signal — is a real
// DOM insertion, so the engine's MutationObserver picks it up on its own.
// Exactly one initAnimations() call for the whole page.
Page.mount({}, document.getElementById("app"));

initAnimations();

initCopyButtons();

console.log("gclass-anims 1.0.0-beta.24 initialised (marko 6)");

// One delegated handler on document covers every [data-copy] button, including
// any Marko renders later. The text is the sibling <code>.
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