import Backbone from "backbone";
import "./styles.css";
import { initAnimations } from "gclass-anims";

// A Backbone.Model with nothing but data, and a Collection to hold them. No
// sync/url here: this page is a rendering demo, not an API client.
const Row = Backbone.Model.extend();

const Rows = Backbone.Collection.extend({
  model: Row,
  comparator: "n",
});

// One row per model. className is where the gclass utilities live, so every
// row the view renders arrives already carrying its entrance.
const RowView = Backbone.View.extend({
  tagName: "li",
  className:
    "appear spawn-up time-1 rounded-lg border border-line bg-panel p-4 font-mono text-[13px]",

  render() {
    this.$el.text(`row ${this.model.get("n")} - rendered by Backbone.View`);
    return this;
  },
});

// The demo view: listens to the collection and re-renders when it changes.
const RowsView = Backbone.View.extend({
  el: "#rows",

  initialize() {
    this.listenTo(this.collection, "add remove reset", this.render);
    this.listenTo(this.collection, "add", this.updateCount);
    this.listenTo(this.collection, "remove reset", this.updateCount);
  },

  render() {
    this.$el.empty();
    this.collection.each((model) => {
      this.$el.append(new RowView({ model }).render().el);
    });
    this.updateCount();
    return this;
  },

  updateCount() {
    document.getElementById("row-count").textContent =
      `${this.collection.length} models`;
  },
});

document.addEventListener("DOMContentLoaded", () => {
  // The one init call. Everything the views render afterwards is inserted into
  // a DOM the engine is already watching.
  initAnimations();

  const collection = new Rows();
  const view = new RowsView({ collection });
  view.render();

  let n = 0;

  document.getElementById("add-row").addEventListener("click", () => {
    n += 1;
    // collection "add" -> view re-renders -> MutationObserver picks the rows up
    collection.add({ n });
  });

  document.getElementById("reset-rows").addEventListener("click", () => {
    collection.reset();
  });

  document.getElementById("backbone-version").textContent = Backbone.VERSION;

  initCopyButtons();

  console.log(
    `gclass-anims 1.0.0-beta.24 initialised (backbone ${Backbone.VERSION})`,
  );
});

// One delegated listener on document covers every [data-copy] button, including
// any re-rendered later. The text is the sibling <code> block's content.
function initCopyButtons() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-copy]");
    if (!btn) return;

    const code = btn.parentElement.querySelector("code");
    if (!code) return;

    const done = (label) => {
      btn.textContent = label;
      btn.classList.add("text-ok", "border-ok");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("text-ok", "border-ok");
      }, 1400);
    };

    navigator.clipboard
      .writeText(code.innerText)
      .then(() => done("Copied"), () => done("Failed"));
  });
}