import { Component, h } from "@stencil/core";

/**
 * The scroll-progress rule.
 *
 * `.scroll-progress` is a modifier, not a behaviour: it sets no geometry of its
 * own, so the element needs real CSS or it collapses to nothing. The rule lives
 * in src/styles/tailwind.css under `.gc-bar`, which is why this component is
 * needed at all — the class alone would not render a visible bar.
 *
 * Light DOM for the same reason as gc-row-list: the engine queries the document,
 * not a shadow tree.
 */
@Component({
  tag: "gc-bar",
  shadow: false,
})
export class GcBar {
  render() {
    return <div class="gc-bar scroll-progress"></div>;
  }
}