// No bundler here, so there is no `import "./styles.css"` — a bare ESM import of
// a stylesheet is fetched as a module, rejected on MIME type, and takes the whole
// module graph (including initAnimations below) down with it. Tailwind is built by
// @tailwindcss/cli and linked from index.html instead.
import { initAnimations } from "gclass-anims";
import "./copy.js";

initAnimations();


const COPY = (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  const code = btn.parentElement.querySelector("code");
  if (!code) return;
  navigator.clipboard.writeText(code.innerText).then(
    () => {
      btn.textContent = "Copied";
      btn.classList.add("text-ok", "border-ok");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("text-ok", "border-ok");
      }, 1400);
    },
    () => {
      btn.textContent = "Failed";
      setTimeout(() => (btn.textContent = "Copy"), 1400);
    },
  );
};

if (!window.__gclassCopy) {
  window.__gclassCopy = true;
  document.addEventListener("click", COPY);
}

