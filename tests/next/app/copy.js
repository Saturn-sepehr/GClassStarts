/**
 * Copy-to-clipboard for every code block on this page.
 *
 * One delegated listener on `document` handles all of them: the button carries
 * `data-copy`, and the text comes from its sibling <code>. Importing this
 * module installs the handler.
 *
 * Guarded on `document` so it is safe to import from a module that also runs
 * during server rendering.
 */
if (typeof document !== "undefined" && !window.__gclassCopy) {
  window.__gclassCopy = true;

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
