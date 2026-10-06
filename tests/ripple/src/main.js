// Ripple mounts a .tsrx component into a DOM node. The build is ssr: false
// (see vite.config.js), so there is no server render and no hydration cursor:
// components compile straight to DOM reads.
//
// Ordering matters. mount() renders synchronously, so by the time it returns the
// whole page is in the document and initAnimations() sees all of it on the first
// pass. Anything a track() writes afterwards is a real DOM insertion and is
// picked up by the engine's MutationObserver - the rows below are exactly that.
import { mount } from "ripple";
import { initAnimations } from "gclass-anims";
import { App } from "./App.tsrx";
import "./styles.css";

mount(App, { target: document.getElementById("root") });

initAnimations();

// One delegated handler on document covers every [data-copy] button, including
// any Ripple renders later. The text is the sibling <code>.
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

console.log("gclass-anims 1.0.0-beta.24 initialised (ripple)");