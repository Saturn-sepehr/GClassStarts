import { Controller } from "@hotwired/stimulus";

// The row list, as a Stimulus controller — the same shape as the standalone
// stimulus environment's, but here it shares a page with Turbo.
//
// Appending real elements is what the animation engine's MutationObserver
// reacts to, so this controller never mentions gclass-anims and never needs to:
// the single initAnimations() call in main.js covers both this and anything a
// Turbo visit swaps in.
export default class extends Controller {
  static targets = ["list", "count"];

  add() {
    const row = document.createElement("li");
    row.className = "appear spawn-up time-1 space-top-s";
    row.textContent = `row ${this.countTargets[0]?.textContent ?? 0} — appended by a Stimulus controller`;

    this.listTarget.append(row);

    const n = Number(this.countTarget.textContent) + 1;
    this.countTarget.textContent = String(n);
    this.dispatch("row-added", { detail: { total: n } });
  }

  reset() {
    this.listTarget.replaceChildren();
    this.countTarget.textContent = "0";
  }
}