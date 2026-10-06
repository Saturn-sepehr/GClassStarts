// <row-item> — the second element, so this is not just one custom element in a
// demo. It is a plain presentational element: it reads its own text and sets a
// class based on it, which is the smallest thing a custom element can usefully
// do and is genuinely how Enhance elements are written.
//
// It also demonstrates the attribute-observer half of the platform: watch an
// attribute, react when it changes. Here the element animates itself on
// attribute change by adding a gclass-anims class — the two libraries talking
// through the DOM, with neither importing the other.
export class RowItem extends HTMLElement {
  static get observedAttributes() {
    return ["status"];
  }

  connectedCallback() {
    if (!this.textContent.trim()) {
      this.textContent = "row";
    }
  }

  attributeChangedCallback(name, previous, next) {
    if (name !== "status") return;
    if (previous === next) return;

    // The class is added here, not by the page, so the animation is a
    // consequence of state rather than something the markup declared.
    this.classList.add("appear", "spawn-down", "time-1");
    this.setAttribute("data-status-seen", next);
  }
}

customElements.define("row-item", RowItem);