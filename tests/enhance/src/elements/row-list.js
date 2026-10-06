// <row-list> — Enhance's progressive-enhancement model in its purest form.
//
// The markup in the page is a plain <ul> with a plain <button>. With no
// JavaScript at all it renders, and the button does nothing — which is exactly
// what "progressive enhancement" means. This element upgrades that markup to add
// the behaviour.
//
// Light DOM. gclass-anims queries the document and reads ordinary class
// attributes, so a shadow root would hide both the utility classes and the
// elements it watches. Enhance elements are light DOM anyway.
export class RowList extends HTMLElement {
  // ── state ──────────────────────────────────────────────────────────────────
  // Local to the instance, as Enhance elements are: no module-level store, no
  // global. `this.rows` is the element's own state.
  get rows() {
    this._rows ??= [];
    return this._rows;
  }

  set rows(next) {
    this._rows = next;
    this.render();
  }

  connectedCallback() {
    // The server-rendered markup is already in place at upgrade time. The
    // buttons only get their handlers here, which is what keeps the page
    // functional without JavaScript.
    this.querySelector(".js-add")?.addEventListener("click", this.add);
    this.querySelector(".js-reset")?.addEventListener("click", this.reset);

    this.list = this.querySelector(".js-list");
    this.count = this.querySelector(".js-count");
  }

  add = () => {
    this.rows = [...this.rows, this.rows.length + 1];
  };

  reset = () => {
    this.rows = [];
  };

  render() {
    if (!this.list) return;

    this.count.textContent = String(this.rows.length);

    // InnerHTML is the honest choice for a demo of a server-rendered framework:
    // the inserted nodes are real, and they are real insertions, which is the
    // case the animation engine's MutationObserver exists to react to. Each row
    // carries .appear and plays its entrance with no further wiring.
    this.list.innerHTML = this.rows
      .map(
        (row) =>
          `<li class="row-item appear spawn-up time-1 border-is1 border-is3 border-solid radius-none p3 font-mono text0">
             row ${row} — appended by an Enhance element
           </li>`,
      )
      .join("");
  }
}

customElements.define("row-list", RowList);