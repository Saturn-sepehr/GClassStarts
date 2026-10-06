import { Controller } from "@hotwired/stimulus";

// Adds rows to the DOM on demand. Each appended row carries `.appear spawn-up`,
// and it plays its entrance without the page re-initialising gclass-anims —
// the engine's MutationObserver picks up every inserted `.appear` element.
//
// This is the same live-insertion case the alpine env proves with x-for, but
// driven by a Stimulus action instead of a template clone.
export default class extends Controller {
  static targets = ["list", "count"];
  static values = { total: { type: Number, default: 0 } };

  add() {
    this.totalValue += 1;

    const row = document.createElement("div");
    row.className =
      "appear spawn-up time-1 rounded-none border-2 border-ink bg-page px-4 py-3 font-mono text-[13px]";
    row.textContent = `row ${this.totalValue} — appended by a Stimulus controller`;

    this.listTarget.append(row);
    this.countTarget.textContent = this.totalValue;

    this.dispatch("rows-added", { detail: { total: this.totalValue } });
  }

  reset() {
    this.totalValue = 0;
    this.listTarget.replaceChildren();
    this.countTarget.textContent = "0";
  }
}