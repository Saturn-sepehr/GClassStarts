import htmx from "htmx.org";
import { initAnimations } from "gclass-anims";
import "./styles.css";

// htmx replaces innerHTML. Every swap it performs is therefore a batch of real
// DOM insertions, which is exactly what the gclass engine's MutationObserver
// reacts to. One initAnimations() call at the bottom of the body covers the
// server-rendered markup and every partial swapped in afterwards.
//
// initAnimations() runs on DOMContentLoaded rather than inline, so htmx is
// already listening by the time any request can fire.
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();

  initCopyButtons();

  document.body.setAttribute("data-htmx-ready", "true");
});

console.log("gclass-anims 1.0.0-beta.24 initialised (htmx.org 2.0.11)");

// One delegated handler on document covers every [data-copy] button, including
// any inside a partial htmx swaps in later. htmx's own `htmx:afterSwap` is not
// needed for this: the handler is on document, so it is already in scope.
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

export { htmx };