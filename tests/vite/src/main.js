import "./styles.css";
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

console.log("gclass-anims 1.0.0-beta.23 initialised (vite)");
