import { Component, State, h } from "@stencil/core";

/**
 * The live demo: rows added by a Stencil component.
 *
 * Stencil re-renders by diffing its virtual DOM and inserting real elements for
 * anything new. That is the case gclass-anims' MutationObserver covers, so this
 * component never tells the animation engine anything.
 *
 * Light DOM, deliberately. gclass-anims reads ordinary `class` attributes off
 * elements in the document, and shadow DOM would hide both the utility classes
 * and the watched elements from inside the tree. Every Stencil page that wants
 * GSAP animations has to make the same choice, so it is stated here rather than
 * left as a trap.
 */
@Component({
  tag: "gc-row-list",
  shadow: false,
})
export class RowList {
  @State() rows: number[] = [];

  private nextId = 1;

  private add = () => {
    this.rows = [...this.rows, this.nextId++];
  };

  private reset = () => {
    this.rows = [];
    this.nextId = 1;
  };

  render() {
    return (
      <div class="card mt-5">
        <div class="flex flex-wrap items-center gap-3">
          <button type="button" class="btn click-hover amount-2" onClick={this.add}>
            Add a row
          </button>
          <button
            type="button"
            class="btn btn--secondary click-hover amount-2"
            onClick={this.reset}
          >
            Reset
          </button>
          <span class="pill">{this.rows.length} rows</span>
        </div>

        <div class="mt-4 grid gap-2">
          {this.rows.map((row) => (
            <div
              key={row}
              class="appear spawn-up time-1 rounded-[8px] border border-line bg-[color:var(--color-indigo-0)] px-4 py-3 font-mono text-[13px]"
            >
              row {row} — inserted by a Stencil component
            </div>
          ))}
        </div>
      </div>
    );
  }
}