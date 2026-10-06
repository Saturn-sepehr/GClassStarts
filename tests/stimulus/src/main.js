// Stimulus owns the page's behaviour; gclass-anims owns the motion. The two
// never collide: Stimulus connects controllers to elements that are already in
// the DOM, and the gclass engine wires classes to whatever is in the DOM at
// boot and to everything inserted after it.
//
// One init call, inside Stimulus' own start() flow, is all the page needs.
import { Application } from "@hotwired/stimulus";
import { initAnimations } from "gclass-anims";
import "./styles.css";
import HelloController from "./controllers/hello_controller.js";
import CounterController from "./controllers/counter_controller.js";

const application = Application.start();

application.register("hello", HelloController);
application.register("counter", CounterController);

// Stimulus.start() walks the tree synchronously and fires the initial
// connect() callbacks before it returns, so controllers are already live by
// the time this runs. Everything a controller inserts later (the rows below,
// the greet output) is picked up by the engine's MutationObserver without a
// second initAnimations().
initAnimations();

initCopyButtons();

console.log("gclass-anims 1.0.0-beta.24 initialised (stimulus 3.2.2)");

// One delegated handler on document covers every [data-copy] button, including
// any a Stimulus controller adds later. The text is the sibling <code>.
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