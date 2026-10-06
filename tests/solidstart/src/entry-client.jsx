// SolidStart owns the document shell and the route. gclass-anims is booted once
// from the root layout's onMount, which onMount gives us after the router has
// resolved the first route - so the markup the route rendered is already in the
// DOM and the initial pass covers it.
//
// SolidStart is an SPA here (`ssr: false` in app.config.ts), so there is no
// hydration boundary to wait for and no server bundle to keep the animation
// engine out of.
import { onMount } from "solid-js";
import { initAnimations } from "gclass-anims";

onMount(() => {
  initAnimations();

  // One delegated handler on document covers every [data-copy] button, including
  // any a later route renders. The text is the sibling <code> block's content.
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

  console.log("gclass-anims 1.0.0-beta.24 initialised (solidstart)");
});