import { Controller } from "@hotwired/stimulus";

// The greeting controller from the Stimulus homepage, verbatim in behaviour:
// a target for the input, a target for the output, an action on the button.
//
// gclass-anims is not involved here at all. That is the point — Stimulus
// controllers and utility classes sit side by side without either knowing
// about the other. The output this controller fills in carries `.appear
// spawn-up`, and it animates because the engine's MutationObserver saw the
// insertion, not because anything called initAnimations() again.
export default class extends Controller {
  static targets = ["name", "output"];

  greet() {
    this.outputTarget.textContent = `Hello, ${this.nameTarget.value}!`;
  }
}