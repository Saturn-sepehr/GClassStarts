import { Controller } from "@hotwired/stimulus";

// A second controller, so this is not a one-controller page. It demonstrates the
// Turbo half: `data-turbo-permanent` on the target means the element is carried
// across a Drive navigation rather than being replaced, which is exactly the
// case where a `.preserve`-style decision matters.
export default class extends Controller {
  static values = { total: { type: Number, default: 0 } };

  bump() {
    this.totalValue += 1;
  }

  reset() {
    this.totalValue = 0;
  }
}
