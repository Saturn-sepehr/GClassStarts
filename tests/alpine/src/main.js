import Alpine from "alpinejs";
import "./styles.css";
import { initAnimations } from "gclass-anims";

// alpine:init fires before Alpine walks the tree, so gclass-anims is watching
// by the time Alpine renders its first pass. Everything after that - x-for
// clones, x-if swaps, x-show reveals - is covered by the same
// MutationObserver, so there is exactly one initAnimations() call on the page.
document.addEventListener("alpine:init", () => {
  initAnimations();
});

window.Alpine = Alpine;
Alpine.start();

initCopyButtons();

document.getElementById("alpine-version").textContent = Alpine.version;

console.log(`gclass-anims 1.0.0-beta.23 initialised (alpine ${Alpine.version})`);

// One delegated handler on document covers every [data-copy] button, including
// any Alpine clones later. The text is the sibling <code> block's content.
function initCopyButtons() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-copy]");
    if (!btn) return;

    const code = btn.parentElement.querySelector("code");
    if (!code) return;

    const done = (label) => {
      btn.textContent = label;
      btn.classList.add("text-ok", "border-ok");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("text-ok", "border-ok");
      }, 1400);
    };

    navigator.clipboard
      .writeText(code.innerText)
      .then(() => done("Copied"), () => done("Failed"));
  });
}